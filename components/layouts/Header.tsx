import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useAtom, useAtomValue } from "jotai";
import Link from "next/link";
import {
  web3authAtom,
  web3authStateAtom,
  providerAtom,
  privKeyAtom,
  userInfoAtom,
} from "../../state/jotai";
import { Web3AuthCore } from "@web3auth/core";
import { SafeEventEmitterProvider, WALLET_ADAPTERS } from "@web3auth/base";
import Head from "next/head";
import dynamic from "next/dynamic";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { polygonMumbaiPRC } from "./config/RPC/polygon-mumbai";
import { CLIENT_ID } from "./config/constants";

// const Loading = dynamic(() => import('../components/loading/Loading'), {
// ssr: false,
// })
const clientId: string = CLIENT_ID;
import RPC from "./config/ethersRPC";
function Header() {
  // const [web3auth, setWeb3auth] = useAtom(web3authStateAtom);
  // const [provider, setProvider] = useAtom(providerAtom);
  // const [auth, setAuth] = useAtom(web3authAtom);
  // const [, setPrivKey] = useAtom(privKeyAtom);
  // const [userInfo, setUserInfo] = useAtom(userInfoAtom);

  const [auth, setAuth] = useAtom(web3authAtom);
  const [privKey, setPrivKey] = useAtom(privKeyAtom);
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);
  const [web3authState, setWeb3authState] = useAtom(web3authStateAtom);
  const [providerAtomState, setProviderAtomState] = useAtom(providerAtom);

  const [web3auth, setWeb3auth] = useState<Web3AuthCore | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(
    null
  );

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
          setProviderAtomState(web3auth.provider)
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
          const authentication = await web3auth?.authenticateUser();
          const userData = await web3auth?.getUserInfo();

          //@ user info related to Web3Auth is being pass to defined atom states
          setAuth(authentication);
          setPrivKey(privateKey);
          setUserInfo(userData);
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
      window.location.href =
        "https://pkdr-finance-test.auth.us-west-2.amazoncognito.com/logout?client_id=3tihr2r882rhmgvfmkdh56vdqe&logout_uri=http://localhost:3000&redirect_uri=http://localhost:3000";
    } catch (error: any) {
      console.log(
        `Error while signing out from Header Component: \n ERROR MESSAGE: ${error.message}`
      );
    }
  };

  const unloggedInView = (
    <button onClick={login}     className="px-3 py-2 rounded-md text-sm font-medium bg-gray-800 hover:bg-gray-700">
      Sign up
    </button>
  );
  const loggedInView = (
    <button onClick={logout}     className="px-3 py-2 rounded-md text-sm font-medium bg-gray-800 hover:bg-gray-700">
      Sign out
    </button>
  );

  return (
    <header className=" flex top-0 left-0 z-50 w-full h-16 bg-gray-900 text-white p-4 border-2 border-black">
      <div className="container mx-auto flex items-center">
        <div>
          {" "}
          <Image
            src="https://flowbite.com/docs/images/logo.svg"
            alt="Vercel Logo"
            width={30}
            height={5}
          />
        </div>
        <Link href="/" className="font-medium text-xl italic  ">
          PKDR Finance
        </Link>

        <nav className="ml-auto">
       {auth?loggedInView:unloggedInView}
        </nav>
      </div>
    </header>
  );
}

export default Header;
