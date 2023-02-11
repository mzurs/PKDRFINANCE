import React, { useEffect, useState } from "react";
import { TbGridDots } from "react-icons/tb";
import Image from "next/image";
import { useAtom } from "jotai";
import LoadingBar from "react-top-loading-bar";
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
import Sidebar from "./Sidebar";

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
  const [prevlocation, setprevlocation] = useState<string>("home");

  const change_color = (current_page: string) => {
    if (current_page !== "home") {
      let prev = document.getElementById(`${prevlocation}-tab`);
      let curr = document.getElementById(`${current_page}-tab`);

      curr?.classList.remove("hover:border-yellow-600");
      curr?.classList.remove("hover:border-l-[1px]");
      curr?.classList.remove("hover:border-r-[1px]");
      curr?.classList.remove("hover:text-yellow-600");
      curr?.classList.remove("text-gray-200");
      curr?.classList.add("bg-yellow-600");
      curr?.classList.add("text-white");

      prev?.classList.remove("bg-yellow-600");
      prev?.classList.remove("text-white");
      prev?.classList.add("hover:border-yellow-600");
      prev?.classList.add("hover:border-l-[1px]");
      prev?.classList.add("hover:border-r-[1px]");
      prev?.classList.add("hover:text-yellow-600");
      prev?.classList.add("text-gray-200");
    }
    else{
      let home = document.getElementById(`${prevlocation}-tab`);
      home?.classList.remove("bg-yellow-600");
      home?.classList.remove("text-white");
      home?.classList.add("hover:border-yellow-600");
      home?.classList.add("hover:border-l-[1px]");
      home?.classList.add("hover:border-r-[1px]");
      home?.classList.add("hover:text-yellow-600");
      home?.classList.add("text-gray-200");
    }
  };

  const get_page = () => {
    let url = window.location.href;
    if (
      !(url === "http://localhost:3000/" || url === "http://localhost:3000")
    ) {
      let url_fragment = url.split("/");
      let len = url_fragment.length;
      let page_name = url_fragment[len - 1];
      change_color(page_name);
      setprevlocation(page_name);
      //console.log("Current URL = " + page_name);
    } else {
      change_color("home");
      setprevlocation("home");
    }
  };

  try {
    useEffect(() => {
      //console.log("Previous URL = " + prevlocation);
      get_page();
    }, [window.location.href]);
  } catch {}

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setProgress(30);
    });
    router.events.on("routeChangeComplete", () => {
      setProgress(100);
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
      className="text-xl p-4 right-0 text-gray-200  font-sm font-normal text-md border-transparent px-[3px] py-1  hover:text-yellow-600"
    >
      Sign up
    </button>
  );

  const togglemenu = () => {
    const menu = document.getElementById("menu");
    const grid = document.getElementById("grid");
    if (!menu?.classList.contains("hidden")) {
      menu?.classList.add("hidden");
      grid?.classList.remove("rotate-45");
    } else {
      menu?.classList.remove("hidden");
      grid?.classList.add("rotate-45");
      grid?.classList.add("rotate-45");
    }
  };

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

      <div className="hidden" id="menu" onMouseLeave={togglemenu}>
        <Sidebar />
      </div>
    </div>
  );

  const navMenu = (
    <div>
      <ul
        className="flex items-center font-medium text-center text-xl"
        id="myTab"
        data-tabs-toggle="#myTabContent"
        role="tablist"
      >
        <li role="presentation">
          <Link
            href={"/"}
            className="px-10 py-6 text-white bg-yellow-600 hover:border-yellow-600 hover:border-l-[1px] hover:border-r-[1px] "
            id="home-tab"
            data-tabs-target="#home"
            type="button"
            role="tab"
            aria-controls="home"
            aria-selected="false"
          >
            <button onClick={homePage}>Home</button>
          </Link>
        </li>
        <li role="presentation">
          <Link
            href={"/profile"}
            className="px-10 py-6 text-gray-200 hover:border-yellow-600 hover:border-l-[1px] hover:border-r-[1px] hover:text-yellow-600 "
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
        <li role="presentation">
          <Link
            href={"/pkdrInfo/contact"}
            className="px-10 py-6 text-gray-200 hover:border-yellow-600 hover:border-l-[1px] hover:border-r-[1px] hover:text-yellow-600 "
            id="contact-tab"
            data-tabs-target="#contact"
            type="button"
            role="tab"
            aria-controls="contact"
            aria-selected="false"
          >
            Contact
          </Link>
        </li>
        <li role="presentation">
          <Link
            href={"/pkdrInfo/about"}
            className="px-10 py-6 text-gray-200 hover:border-yellow-600 hover:border-l-[1px] hover:border-r-[1px] hover:text-yellow-600 "
            id="about-tab"
            data-tabs-target="#about"
            type="button"
            role="tab"
            aria-controls="about"
            aria-selected="false"
          >
            About
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
        onLoaderFinished={() => {
          setProgress(0);
        }}
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
      </div>
    </>
  );
}

export default Header;
