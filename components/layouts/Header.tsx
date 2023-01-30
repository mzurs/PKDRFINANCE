import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useAtom } from "jotai";
import Link from "next/link";
import { getPublicCompressed } from "@toruslabs/eccrypto";
import Cookies from "js-cookie";
import {
  web3authAtom,
  web3authStateAtom,
  providerAtom,
  privKeyAtom,
  userInfoAtom,
} from "../../state/jotai";
import { Web3AuthCore } from "@web3auth/core";
import { SafeEventEmitterProvider, WALLET_ADAPTERS } from "@web3auth/base";

import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { polygonMumbaiPRC } from "./config/RPC/polygon-mumbai";
import { CLIENT_ID } from "./config/constants";
import { useRouter } from "next/router";
const clientId: string = CLIENT_ID;
import RPC from "./config/ethersRPC";
function Header() {
  const [auth, setAuth] = useAtom(web3authAtom);
  const [privKey, setPrivKey] = useAtom(privKeyAtom);
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);
  const [web3authState, setWeb3authState] = useAtom(web3authStateAtom);
  const [providerAtomState, setProviderAtomState] = useAtom(providerAtom);

  const [web3auth, setWeb3auth] = useState<Web3AuthCore | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(
    null
  );

  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3AuthCore({
          chainConfig: polygonMumbaiPRC, //zkSyncRPC,otherRPC,solanaDevRPC
          clientId,
          enableLogging: true,
          sessionTime: 3000,
        });

        const openloginAdapter = new OpenloginAdapter({
          adapterSettings: {
            clientId,
            network: "testnet",
            uxMode: "redirect",
            whiteLabel: {
              name: "PKDR Finance Server",
              logoLight: "https://web3auth.io/images/w3a-L-Favicon-1.svg",
              logoDark: "https://web3auth.io/images/w3a-D-Favicon-1.svg",
              defaultLanguage: "en",
              dark: true, // whether to enable dark mode. defaultValue: false
            },

            loginConfig: {
              jwt: {
                name: "Custom AWS Cognito Login via Google",
                verifier: "test-pkdr-finance",
                typeOfLogin: "jwt",
                clientId: "3tihr2r882rhmgvfmkdh56vdqe", //use your app client id you will get from aws cognito app
              },
            },
          },
          loginSettings: {
            mfaLevel: "optional",
            sessionTime: 3000,
          },
        });
        web3auth.configureAdapter(openloginAdapter);
        setWeb3auth(web3auth);
        setWeb3authState(web3auth);
        await web3auth.init();
        if (web3auth.provider) {
          setProvider(web3auth.provider);
          setProviderAtomState(web3auth.provider);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  useEffect(() => {
    const info = async () => {
      if (!provider) {
        console.log("provider not initialized yet");
        return;
      } else {
        try {
          const rpc = new RPC(provider);
          const privateKey = await rpc.getPrivateKey();
          const authentication: any = await web3auth?.authenticateUser();
          const userData: any = await web3auth?.getUserInfo();

          //getting public key of a logged in  user and set in  a cookie
          const app_scoped_privkey = await web3auth?.provider?.request({
            method: "eth_private_key", // use "private_key" for other non-evm chains
          });
          const app_pub_key = getPublicCompressed(
            Buffer.from(
              (app_scoped_privkey as unknown as any).padStart(64, "0"),
              "hex"
            )
          ).toString("hex");

          //@ user info related to Web3Auth is being pass to defined atom states
          setAuth(authentication);
          setPrivKey(privateKey);
          setUserInfo(userData);

          //cookies are set into browser for use in middlewares
          Cookies.set("web3auth", JSON.stringify(userData));
          Cookies.set("pub_key", JSON.stringify(app_pub_key));
          Cookies.set("idToken", JSON.stringify(authentication));
          Cookies.set("oAuthIdToken", JSON.stringify(userData.oAuthIdToken));
          // Cookies.set("userRole",null)
        } catch (error: any) {
          console.log(
            `Error While set the user info from Web3Auth to Atom State \nERROR MESSAGE: ${error.message}`
          );
        }
      }
    };
    if (!auth) {
      info();
    }
  });
  const homePage = async () => {
    window.location.href = "/";
  };
  const login = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    try {
      const web3authProvider = await web3auth.connectTo(
        WALLET_ADAPTERS.OPENLOGIN,
        {
          // mfaLevel: "mandatory",
          loginProvider: "jwt",
          extraLoginOptions: {
            domain:
              "https://pkdr-finance-test.auth.us-west-2.amazoncognito.com",
            verifierIdField: "email",
            response_type: "token",
            scope: "email profile openid",
          },
        }
      );
      setProvider(web3authProvider);
    } catch (error: any) {
      console.log(`Error while connecting to Wallet: ${error.message}`);
    }
  };

  const logout = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    try {
      await web3auth.logout();
      setProvider(null);
      setAuth(null);
      setPrivKey(null);
      setUserInfo(null);
      Cookies.remove("web3auth");
      Cookies.remove("pub_key");
      Cookies.remove("idToken");
      Cookies.remove("oAuthIdToken");
      window.location.href =
        "https://pkdr-finance-test.auth.us-west-2.amazoncognito.com/logout?client_id=3tihr2r882rhmgvfmkdh56vdqe&logout_uri=http://localhost:3000&redirect_uri=http://localhost:3000";
    } catch (error: any) {
      console.log(
        `Error while signing out from Header Component: \n ERROR MESSAGE: ${error.message}`
      );
    }
  };
  if (router.pathname === "/login") {
    if (
      !Cookies.get("idToken") ||
      !Cookies.get("pub_key") ||
      !Cookies.get("web3auth")
    ) {
      console.log(`Login page......Logging out, ${router.pathname}`);
      logout();
    }
  }
  const unloggedInView = (
    <button
      onClick={login}
      className="text-green-600 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
    >
      Sign up
    </button>
  );
  const loggedInView = (
    <button
      onClick={logout}
      className="right-0 text-green-600  font-sm font-normal text-sm border-transparent px-[3px] py-1 border-1 rounded-md hover:border-green-600 border-2"
    >
      Sign out
    </button>
  );
  const navMenu = (
    <div className=" border-gray-200 dark:border-gray-700  text-green-600 ">
      <ul
        className="flex items-center text-sm font-medium text-center"
        id="myTab"
        data-tabs-toggle="#myTabContent"
        role="tablist"
      >
        <li className="mr-2" role="presentation">
          <Link
            href={"/"}
            className="mx-1 px-2 py-1.5 border-transparent rounded-sm hover:border-b-2 hover:border-green-700 hover:text-green-700"
            id="dashboard-tab"
            data-tabs-target="#dashboard"
            type="button"
            role="tab"
            aria-controls="dashboard"
            aria-selected="false"
          >
            <button onClick={homePage}>Home</button>
          </Link>
        </li>
        <li
          className="mr-2 flex justify-between align-center"
          role="presentation"
        >
          <Link
            href={"/profile"}
            className="mx-1 px-2 py-1.5 border-transparent rounded-sm hover:border-b-2 hover:border-green-700 hover:text-green-700"
            id="dashboard-tab"
            data-tabs-target="#dashboard"
            type="button"
            role="tab"
            aria-controls="dashboard"
            aria-selected="false"
          >
            Profile
          </Link>
        </li>
        <li className="mr-2" role="presentation">
          <button
            className="mx-1 px-2 py-1.5 border-transparent rounded-sm hover:border-b-2 hover:border-green-700 hover:text-green-700"
            id="settings-tab"
            data-tabs-target="#settings"
            type="button"
            role="tab"
            aria-controls="settings"
            aria-selected="false"
          >
            Settings
          </button>
        </li>
        <li role="presentation">
          <button
            className="mx-1 px-2 py-1.5 border-transparent rounded-sm hover:border-b-2 hover:border-green-700 hover:text-green-700"
            id="contacts-tab"
            data-tabs-target="#contacts"
            type="button"
            role="tab"
            aria-controls="contacts"
            aria-selected="false"
          >
            Contacts
          </button>
        </li>
      </ul>
    </div>
  );
  return (
    <header className="border-slate-1000 shadow-md right-0 left-0 bg-slate-900 flex top-0 z-1 w-full h-[8.2vh] p-3 border-0 items-center">
      <div className="container flex items-center">
        <div>
          <Image src="/logo.png" alt="logo" width="50" height="50" />
        </div>
        <Link href="/" className="font-light text-m  text-green-600 ">
          PKDR Finance
        </Link>
        <nav className="m-auto">{auth && web3auth ? navMenu : ""}</nav>
      </div>
      <nav className="ml-auto">
        {auth && web3auth ? loggedInView : unloggedInView}
      </nav>
    </header>
  );
}

export default Header;
