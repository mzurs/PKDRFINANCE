import React, { useEffect, useState } from "react";
import { TbGridDots } from "react-icons/tb";
import Image from "next/image";
import { useAtom } from "jotai";
import LoadingBar from "react-top-loading-bar";
import Link from "next/link";
import { getPublicCompressed } from "@toruslabs/eccrypto";
import Cookies from "js-cookie";
import { BsFileEarmarkPerson } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";
import { FaTelegramPlane } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";

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
import Front from "../Front";

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
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeComplete", () => {
      setProgress(100);
    });
    router.events.on("routeChangeStart", () => {
      setProgress(30);
    });
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
        "https://pkdr-finance-test.auth.us-west-2.amazoncognito.com/logout?client_id=3tihr2r882rhmgvfmkdh56vdqe&logout_uri=http://localhost:3000&redirect_uri=http://localhost:3000 hover:font-xl";
      localStorage.clear();
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
      className="text-xl right-0 text-gray-200  font-sm font-normal text-md border-transparent px-[3px] py-1  hover:text-yellow-600"
    >
      Sign up
    </button>
  );

  const togglemenu = () => {
    const menu = document.getElementById("menu");
    const grid = document.getElementById("grid");
    console.log("Triggered");
    if (!menu?.classList.contains("hidden")) {
      menu?.classList.add("hidden");
      grid?.classList.remove("rotate-45");
    } else {
      menu?.classList.remove("hidden");
      grid?.classList.add("rotate-45");
      grid?.classList.add("rotate-45");
    }
  };

  const usermenu = (
    <div
      id="menu"
      className="right-0 hidden top-[5rem] absolute bg-[#0c1407dc]  text-gray-200 h-auto border-l-[3px] border-yellow-600"
      onMouseLeave={togglemenu}
    >
      <div className="relative hidden h-screen my-4 ml-4 shadow-lg lg:block w-72">
        <div className="h-full">
          <div className="flex items-center justify-center pt-6">
            <Image src="/logo.png" alt="logo" width="85" height="85" />
          </div>
          <nav className="mt-6">
            <div>
              <Link
                className="flex items-center justify-start w-full p-4 my-2 font-thin text-yellow-600 uppercase transition-colors duration-200 border-r-4 border-yellow-600 bg-gradient-to-r from-white to-blue-100 dark:from-gray-800 dark:to-gray-900"
                href="/profile"
              >
                <span className="text-left">
                  <div>
                    <BsFileEarmarkPerson />
                  </div>
                </span>
                <span className="mx-4 text-sm font-normal">Your Profile</span>
              </Link>
              <Link
                className="flex items-center justify-start w-full p-4 my-2 font-thin text-gray-500 uppercase transition-colors duration-200 dark:text-gray-200 hover:text-yellow-600"
                href="/settings"
              >
                <span className="text-left">
                  <div>
                    <IoMdSettings />
                  </div>
                </span>
                <span className="mx-4 text-sm font-normal">Settings</span>
              </Link>
              <Link
                className="flex items-center justify-start w-full p-4 my-2 font-thin text-gray-500 uppercase transition-colors duration-200 dark:text-gray-200 hover:text-yellow-600"
                href="/pkdrInfo/contact"
              >
                <span className="text-left">
                  <div>
                    <FaTelegramPlane />
                  </div>
                </span>
                <span className="mx-4 text-sm font-normal">Contact Us</span>
              </Link>
              <Link
                className="flex items-center justify-start w-full p-4 my-2 font-thin text-gray-500 uppercase transition-colors duration-200 dark:text-gray-200 hover:text-yellow-600"
                href="/pkdrInfo/about"
              >
                <span className="text-left">
                  <div>
                    <IoIosPeople />
                  </div>
                </span>
                <span className="mx-4 text-sm font-normal">About Us</span>
              </Link>
              <div
                className="flex items-center justify-start w-full p-4 my-2 font-thin text-gray-500 uppercase transition-colors duration-200 dark:text-gray-200 hover:text-yellow-600"
                onClick={logout}
              >
                <span className="text-left">
                  <div>
                    <BiLogOut />
                  </div>
                </span>
                <span className="mx-4 text-sm font-normal">Signout</span>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );

  const loggedInView = (
    <div className="w-[20rem] flex flex-row text-xl items-center justify-end">
      <div className="text-yellow-600">{userInfo?.name}</div>

      <div>
        <TbGridDots
          onClick={togglemenu}
          id="grid"
          title="Menu"
          className="mr-2 ml-5 duration-200 text-white hover:text-yellow-600 text-2xl"
        />
      </div>

      {usermenu}
    </div>
  );

  const navMenu = (
    <div className="text-gray-200">
      <ul
        className="flex items-center font-medium text-center text-xl"
        id="myTab"
        data-tabs-toggle="#myTabContent"
        role="tablist"
      >
        <li className="mr-2 " role="presentation">
          <Link
            href={"/"}
            className="mx-3 px-3 my-1 hover:border-yellow-600 hover:border-l-[1px] hover:border-r-[1px] hover:text-yellow-600 "
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
        <li className="mr-2" role="presentation">
          <Link
            href={"/profile"}
            className="mx-3 px-3 py-0.5 my-1 hover:border-yellow-600 hover:border-l-[1px] hover:border-r-[1px] hover:text-yellow-600 "
            id="profile-tab"
            data-tabs-target="#profile"
            type="button"
            role="tab"
            aria-controls="profile"
            aria-selected="false"
          >
            Profile
          </Link>
        </li>
        <li className="mr-2" role="presentation">
          <Link
            href={"/settings"}
            className="mx-3 px-3 py-0.5 my-1 hover:border-yellow-600 hover:border-l-[1px] hover:border-r-[1px] hover:text-yellow-600 "
            id="settings-tab"
            data-tabs-target="#settings"
            type="button"
            role="tab"
            aria-controls="settings"
            aria-selected="false"
          >
            Settings
          </Link>
        </li>
        <li role="presentation">
          <Link
            href={"/pkdrInfo/contact"}
            className="mx-3 px-3 py-0.5 my-1 hover:border-yellow-600 hover:border-l-[1px] hover:border-r-[1px] hover:text-yellow-600 "
            id="contacts-tab"
            data-tabs-target="#contacts"
            type="button"
            role="tab"
            aria-controls="contacts"
            aria-selected="false"
          >
            Contacts
          </Link>
        </li>
      </ul>
    </div>
  );
  return (
    <>
      <LoadingBar
        color="#8b8343"
        progress={progress}
        waitingTime={400}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className="fixed flex flex-wrap items-center w-full">
        <header className="border-yellow-600 border-b-[3.5px] shadow-md right-0 left-0 w-[100vw] bg-[#18270D] flex top-0 z-1 h-[8.2vh] p-3 items-center">
          <div>
            <Image src="/logo.png" alt="logo" width="50" height="50" />
          </div>
          <Link
            href="/"
            className="font-light text-[22px]  text-green-600 hover:text-green-500"
          >
            PKDR Finance
          </Link>
          <nav className="ml-[480px]">{auth && web3auth ? navMenu : ""}</nav>

          <nav className="ml-auto">
            {auth && web3auth ? loggedInView : unloggedInView}
          </nav>
        </header>
        <body>
          <Front />
        </body>
      </div>
    </>
  );
}

export default Header;
