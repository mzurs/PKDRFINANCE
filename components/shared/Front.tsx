// import React from "react";
// import { web3authAtom } from "../state/jotai";
// import { useAtomValue } from "jotai";

// function Front() {
//   const auth = useAtomValue(web3authAtom);
//   return (
//     <div className="bg-white md:pt-36 w-[100vw] h-[100vh] overflow-x-hidden ">
//       <div className="mx-auto px-6 lg:px-14">
//         <div className="mx-auto lg:text-center">
//           <h2 className="text-2xl font-semibold leading-8 tracking-tight text-[#009ac9]">
//             Fast and Secure Money Transfer
//           </h2>
//           <p className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
//             Everything you need for secure transactions
//           </p>
//           <p className="mt-6 text-xl leading-8 text-gray-600 text-center md:mx-80">
//             Quis tellus eget adipiscing convallis sit sit eget aliquet quis.
//             Suspendisse eget egestas a elementum pulvinar et feugiat blandit at.
//             In mi viverra elit nunc.
//           </p>
//         </div>
//         <div className="mx-auto mt-16 sm:mt-10 lg:mt-4 lg:max-w-3xl">
//           <dl className="grid max-w-xl grid-cols-1 gap-y-10 gap-x-8 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
//             <div className="relative pl-16">
//               <dt className="text-xl font-semibold leading-7 text-gray-900">
//                 <div className="absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg bg-[#009ac9]">
//                   <svg
//                     className="h-6 w-6 text-white"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     strokeWidth="1.5"
//                     stroke="currentColor"
//                     aria-hidden="true"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
//                     />
//                   </svg>
//                 </div>
//                 Push to deploy
//               </dt>
//               <dd className="mt-2 text-lg leading-7 text-gray-600">
//                 Morbi viverra dui mi arcu sed. Tellus semper adipiscing
//                 suspendisse semper morbi. Odio urna massa nunc massa.
//               </dd>
//             </div>

//             <div className="relative pl-16">
//               <dt className="text-xl font-semibold leading-7 text-gray-900">
//                 <div className="absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg bg-[#009ac9]">
//                   <svg
//                     className="h-6 w-6 text-white"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     strokeWidth="1.5"
//                     stroke="currentColor"
//                     aria-hidden="true"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
//                     />
//                   </svg>
//                 </div>
//                 SSL certificates
//               </dt>
//               <dd className="mt-2 text-lg leading-7 text-gray-600">
//                 Sit quis amet rutrum tellus ullamcorper ultricies libero dolor
//                 eget. Sem sodales gravida quam turpis enim lacus amet.
//               </dd>
//             </div>

//             <div className="relative pl-16">
//               <dt className="text-xl font-semibold leading-7 text-gray-900">
//                 <div className="absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg bg-[#009ac9]">
//                   <svg
//                     className="h-6 w-6 text-white"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     strokeWidth="1.5"
//                     stroke="currentColor"
//                     aria-hidden="true"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
//                     />
//                   </svg>
//                 </div>
//                 Simple queues
//               </dt>
//               <dd className="mt-2 text-lg leading-7 text-gray-600">
//                 Quisque est vel vulputate cursus. Risus proin diam nunc commodo.
//                 Lobortis auctor congue commodo diam neque.
//               </dd>
//             </div>

//             <div className="relative pl-16">
//               <dt className="text-xl font-semibold leading-7 text-gray-900">
//                 <div className="absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg bg-[#009ac9]">
//                   <svg
//                     className="h-6 w-6 text-white"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     strokeWidth="1.5"
//                     stroke="currentColor"
//                     aria-hidden="true"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33"
//                     />
//                   </svg>
//                 </div>
//                 Advanced security
//               </dt>
//               <dd className="mt-2 text-lg leading-7 text-gray-600">
//                 Arcu egestas dolor vel iaculis in ipsum mauris. Tincidunt mattis
//                 aliquet hac quis. Id hac maecenas ac donec pharetra eget.
//               </dd>
//             </div>
//           </dl>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Front;

// import vid from "public/vid.mp4"
import Header from "./layouts/Header";
import React, { useEffect, useState } from "react";
import { TbGridDots } from "react-icons/tb";
import Image from "next/image";
import Link from "next/link";
import { useAtom, useAtomValue } from "jotai";
import LoadingBar from "react-top-loading-bar";
import { getPublicCompressed } from "@toruslabs/eccrypto";
import Cookies from "js-cookie";
import {
  web3authAtom,
  web3authStateAtom,
  providerAtom,
  privKeyAtom,
  userInfoAtom,
  isVerified,
  userRole,
} from "../../state/jotai";
import { Web3AuthCore } from "@web3auth/core";
import { SafeEventEmitterProvider, WALLET_ADAPTERS } from "@web3auth/base";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { polygonMumbaiPRC } from "../shared/layouts/config/RPC/polygon-mumbai";
import { CLIENT_ID } from "../shared/layouts/config/constants";
import { useRouter } from "next/router";
const clientId: string = CLIENT_ID;
import RPC from "../shared/layouts/config/ethersRPC";
// import Sidebar from "../../users/Sidebar";
import { float } from "aws-sdk/clients/cloudfront";
// import AdminSideBar from "../../admin/AdminSideBar";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

function Front() {
  const userRoleType = useAtomValue(userRole);
  const [auth, setAuth] = useAtom(web3authAtom);
  const [privKey, setPrivKey] = useAtom(privKeyAtom);
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);
  const [web3authState, setWeb3authState] = useAtom(web3authStateAtom);
  const [providerAtomState, setProviderAtomState] = useAtom(providerAtom);
  const [verified, useVerified] = useAtom(isVerified);
  const [web3auth, setWeb3auth] = useState<Web3AuthCore | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(
    null
  );
  const [progress, setProgress] = useState(0);
  const router = useRouter();
  const [sidebar, setsidebar] = useState<boolean>(false);
  const [page, setpage] = useState<string>("home");
  const style = "sm:border-b-[4px] border-[#009ac9] text-[#11aede]";
  function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
  }
  const get_page = () => {
    let url = window.location.href;
    if (url !== undefined) {
      if (
        !(
          url === "http://localhost:3000/" ||
          url === "http://localhost:3000/user/users" ||
          url === "http://localhost:3000"
        )
      ) {
        let url_fragment = url.split("/");
        let len = url_fragment.length;
        setpage(url_fragment[len - 1]);
      } else if (
        url === "http://localhost:3000/" ||
        url === "http://localhost:3000/user/users" ||
        url === "http://localhost:3000"
      ) {
        setpage("home");
      }
    }
  };

  const togglemenu = () => {
    if (sidebar === false) {
      setsidebar(true);
    } else {
      setsidebar(false);
    }
  };

  try {
    useEffect(() => {
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
            mfaLevel: "none",
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

  return (
    <div className="main">
      <div className="overlay"></div>
      <video src="/vid.mp4" autoPlay loop muted></video>
      <div className="logo"> <div className="  border-b-15 border-white flex flex-shrink-0 items-center">
                  <Image
                    className="block h-8 w-auto lg:hidden"
                    src="/logo1.png"
                    alt="PKDR Finance"
                    width={60}
                    height={60}
                  />
                  <Link href={"/"} className="cursor-pointer">
                    <div className="hidden h-8 w-auto text-white lg:flex items-center md:text-md">
                      <Image
                        src="/logo1.png"
                        alt="PKDR Finance"
                        width={200}
                        height={170}
                      />
                      {/* <h2 className="text-xl">PKDR Finance</h2> */}
                    </div>
                  </Link>
                </div></div>
      <div
        className="content text-5xl font-mono
"
      >
        
        <h1 className="underline italic mb-4 text-8xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          PKDR Finance
        </h1>

        <p className="text-xl italic  ">
          The Optimal Solution for Next-Gen Online Banking
        </p>
        <br />
        <div className="flex font-sans">
          <button
            onClick={login}
            className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
               &nbsp;Sign Up&nbsp;
            </span>
          </button>
          <button
            onClick={login}
            className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              &nbsp;Sign in&nbsp;&nbsp;
            </span>
          </button>
        </div>
      </div>
      {/* <img className="  " src="/a1.png" max-width="5000" alt="" /> */}
      {/* <Image
        className="dark:shadow-gray-800 bg-cover h-[100vh] w-[100vw] object-cover"
        src="/a1.png"
        alt=""
        width={1000}
        height={1000}
      /> */}
    </div>
  );
}

export default Front;
