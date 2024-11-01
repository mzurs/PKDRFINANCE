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
} from "../../../state/jotai";
import { Web3AuthCore } from "@web3auth/core";
import { SafeEventEmitterProvider, WALLET_ADAPTERS } from "@web3auth/base";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { polygonMumbaiPRC } from "./config/RPC/polygon-mumbai";
import { CLIENT_ID } from "./config/constants";
import { useRouter } from "next/router";
const clientId: string = CLIENT_ID;
import RPC from "./config/ethersRPC";
import Sidebar from "../../users/Sidebar";
import { float } from "aws-sdk/clients/cloudfront";
import AdminSideBar from "../../admin/AdminSideBar";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

function Header() {
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
      useVerified(false);
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

  const Navbar = (
    <div>
      <nav className={`fixed w-full ${auth && web3auth ? "bg-white" : ""}`}>
        <div className="bg-slate-900 shadow shadow-blue-900 border-transparent border-b-8">
          <div className="relative flex h-20 sm:h-[72px] items-center justify-between">
            <div
              className={`${
                auth && web3auth ? "" : "hidden"
              } absolute inset-y-0 left-0 flex items-center sm:hidden`}
            >
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
                <svg
                  className="hidden h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div
              className={`${
                auth && web3auth
                  ? " flex-1 justify-center sm:items-stretch sm:justify-center"
                  : ""
              } flex items-center `}
            >
              {router.pathname === "/" ? (
                <div className="  border-b-15 border-white flex flex-shrink-0 items-center ">
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
                        width={100}
                        height={100}
                      />
                      {/* <h2 className="text-xl">PKDR Finance</h2> */}
                    </div>
                  </Link>
                </div>
              ) : (
                <div className="  border-b-15 border-white flex flex-shrink-0 lg:ml-3 items-center mt-1.5">
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
                        width={100}
                        height={100}
                      />
                      {/* <h2 className="text-xl">PKDR Finance</h2> */}
                    </div>
                  </Link>
                </div>
              )}
              <div
                className={`${
                  auth && web3auth ? "sm:block" : "sm:hidden"
                } hidden mx-auto`}
              >
                <div className=" border-b-4 border-white flex justify-between">
                  <Link
                    href={"/"}
                    onClick={() => setpage("home")}
                    className={`cursor-pointer ${
                      page === "home" ? style : ""
                    } text-white px-4 mx-4 md:text-md pt-5 pb-3 text-xl font-medium hover:text-[#2297d1] ${
                      page === "home" ? style : ""
                    }`}
                    aria-current="page"
                    id="home"
                  >
                    Home
                  </Link>

                  <Link
                    href={"/user/users/profile"}
                    onClick={() => setpage("profile")}
                    className={`cursor-pointer ${
                      page === "profile" ? style : ""
                    } text-white px-4 mx-4 md:text-md pt-5 pb-3 text-xl font-medium hover:text-[#2297d1] ${
                      page === "profile" ? "border-b-[4px] text-[#020f13]" : ""
                    }`}
                    id="profile"
                  >
                    Profile
                  </Link>

                  <Link
                    href={"/user/users/user_contacts"}
                    onClick={() => setpage("user_contacts")}
                    className={`cursor-pointer ${
                      page === "user_contacts" ? style : ""
                    } text-white px-4 mx-4 md:text-md pt-5 pb-3 text-xl font-medium hover:text-[#2297d1] `}
                    id="contact"
                  >
                    Contacts
                  </Link>

                  {/* <Link
                    href={"/pkdrInfo/about"}
                    onClick={() => setpage("about")}
                    className={`cursor-pointer ${
                      page === "about" ? style : ""
                    } text-black px-4 mx-4 md:text-md pt-5 pb-3 text-xl font-medium hover:text-[#030f13] `}
                    id="about"
                  >
                    About
                  </Link> */}
                </div>
              </div>
              <div
                className={`${
                  auth && web3auth ? "md:flex" : "hidden"
                } items-center`}
              >
                {useAtomValue(userRole) === "users" && Boolean(verified) ? (
                  <div className=" flex flex-grow h-12 mt-5 text-xl hover:text-[#127a97] font-normal cursor-pointer hover:underline">
                    <Link
                      className="text-white font-serif bg-slate-900 relative transition-all ease-in duration-75  rounded-md group-hover:bg-opacity-0 items-center"
                      href="/user/users/purchase/"
                    >
                      Buy PKR
                    </Link>
                  </div>
                ) : (
                  <></>
                )}
                <TbGridDots
                  onClick={togglemenu}
                  id="grid"
                  title="Menu"
                  className={`hidden duration-200 text-white md:block  ml-5 mr-4 text-[22px] hover:text-[#158ba0] ${
                    sidebar ? "rotate-45" : ""
                  } cursor-pointer`}
                />
              </div>
              <div
                className={`${
                  auth && web3auth ? "hidden" : ""
                } text-black rounded border-solid border-2 border-black absolute right-2 text-xl px-2 py-1 hover:bg-[#01010184] hover:text-[#ffffff] cursor-pointer mx-3`}
                onClick={login}
              >
                <button>Sign in</button>
              </div>
            </div>
          </div>
          <div
            className={`${auth && web3auth ? "sm:hidden" : "hidden"} `}
            id="mobile-menu"
          >
            <div className="space-y-1 px-2 pt-2 pb-3">
              <Link
                href={"/"}
                className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
                aria-current="page"
              >
                Home
              </Link>

              <Link
                href="/profile"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Profile
              </Link>

              <Link
                href={"/pkdrInfo/contact"}
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Contact
              </Link>

              <Link
                href={"/pkdrInfo/about"}
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                About
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <div
        className={`${sidebar ? "block" : "hidden"}`}
        id="menu"
        onMouseLeave={togglemenu}
      >
        <Sidebar />
      </div>
    </div>
  );

  const AdminNavbar = (
    <div>
      <nav className=" bg-black fixed w-full z-50 border-b-[4px] border-[#436139]">
        <div className="">
          <div className="relative flex h-20 sm:h-[72px] items-center justify-between">
            <div
              className={`${
                auth && web3auth ? "" : "hidden"
              } absolute inset-y-0 left-0 flex items-center sm:hidden`}
            >
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
                <svg
                  className="hidden h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div
              className={`${
                auth && web3auth
                  ? " flex-1 justify-center sm:items-stretch sm:justify-center"
                  : ""
              } flex items-center `}
            >
              {router.pathname === "/" ? (
                <div className="  border-b-15 border-white flex flex-shrink-0 items-center">
                  <Image
                    className="block h-8 w-auto lg:hidden"
                    src="/logo1.png"
                    alt="PKDR Finance"
                    width={60}
                    height={60}
                  />
                  <Link href={"/"} className="cursor-pointer">
                    <div className="ml-4 hidden h-8 w-auto text-white lg:flex items-center md:text-md">
                      <Image
                        src="/logo1.png"
                        alt="PKDR Finance"
                        width={100}
                        height={100}
                      />
                      {/* <h2 className="text-xl">PKDR Finance</h2> */}
                    </div>
                  </Link>
                </div>
              ) : (
                <div className="  border-b-15 border-white flex flex-shrink-0 items-center">
                  <Image
                    className="block h-8 w-auto lg:hidden"
                    src="/logo1.png"
                    alt="PKDR Finance"
                    width={60}
                    height={60}
                  />
                  <Link href={"/"} className="cursor-pointer">
                    <div className="ml-4 sshidden h-8 w-auto text-white lg:flex items-center md:text-md">
                      <Image
                        src="/logo1.png"
                        alt="PKDR Finance"
                        width={100}
                        height={100}
                      />
                      {/* <h2 className="text-xl">PKDR Finance</h2> */}
                    </div>
                  </Link>
                </div>
              )}
              <div
                className={`${
                  auth && web3auth ? "sm:block" : "sm:hidden"
                } hidden mx-auto`}
              >
                <div className="flex justify-between">
                  <Menu
                    as="div"
                    className={`cursor-pointer ${
                      page === "profile" ? style : ""
                    } text-white px-4 mx-4 md:text-md p-5 text-xl font-medium hover:text-[#17b2dd] ${
                      page === "profile" ? "border-b-[4px] text-[#020f13]" : ""
                    } relative inline-block text-center `}
                  >
                    <div>
                      <Menu.Button className="inline-flex w-full justify-center gap-x-1.5  bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1  ring-gray-300">
                        Home
                        <ChevronDownIcon
                          className="-mr-1 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          <Menu.Item>
                            {({ active }: any) => (
                              <Link
                                href="/user/admin/"
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                Home
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }: any) => (
                              <a
                                href="#"
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                Support
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }: any) => (
                              <a
                                href="#"
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                License
                              </a>
                            )}
                          </Menu.Item>
                          <form method="POST" action="#">
                            <Menu.Item>
                              {({ active }: any) => (
                                <button
                                  type="submit"
                                  className={classNames(
                                    active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700",
                                    "block w-full px-4 py-2 text-center text-sm"
                                  )}
                                >
                                  Sign out
                                </button>
                              )}
                            </Menu.Item>
                          </form>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>

                  <Menu
                    as="div"
                    className={`cursor-pointer ${
                      page === "profile" ? style : ""
                    } text-white px-4 mx-4 md:text-md p-5 text-xl font-medium hover:text-[#17b2dd] ${
                      page === "profile" ? "border-b-[4px] text-[#020f13]" : ""
                    } relative inline-block text-center `}
                  >
                    <div>
                      <Menu.Button className="inline-flex w-full justify-center gap-x-1.5  bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1  ring-gray-300">
                        Profile
                        <ChevronDownIcon
                          className="-mr-1 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          <Menu.Item>
                            {({ active }: any) => (
                              <Link
                                href="/user/admin/profile"
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                Go to Profile
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }: any) => (
                              <a
                                href="#"
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                Support
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }: any) => (
                              <a
                                href="#"
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                License
                              </a>
                            )}
                          </Menu.Item>
                          <form method="POST" action="#">
                            <Menu.Item>
                              {({ active }: any) => (
                                <button
                                  type="submit"
                                  className={classNames(
                                    active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700",
                                    "block w-full px-4 py-2 text-center text-sm"
                                  )}
                                >
                                  Sign out
                                </button>
                              )}
                            </Menu.Item>
                          </form>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>

                  <Menu
                    as="div"
                    className={`cursor-pointer ${
                      page === "profile" ? style : ""
                    } text-white px-4 mx-4 md:text-md p-5 text-xl font-medium hover:text-[#17b2dd] ${
                      page === "profile" ? "border-b-[4px] text-[#020f13]" : ""
                    } relative inline-block text-center `}
                  >
                    <div>
                      <Menu.Button className="inline-flex w-full justify-center gap-x-1.5  bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1  ring-gray-300">
                        On-Chain Data
                        <ChevronDownIcon
                          className="-mr-1 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          <Menu.Item>
                            {({ active }: any) => (
                              <Link
                                href="/user/admin/view/transactions"
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                Recent Txn's
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }: any) => (
                              <a
                                href="#"
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                Support
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }: any) => (
                              <a
                                href="#"
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                License
                              </a>
                            )}
                          </Menu.Item>
                          <form method="POST" action="#">
                            <Menu.Item>
                              {({ active }: any) => (
                                <button
                                  type="submit"
                                  className={classNames(
                                    active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700",
                                    "block w-full px-4 py-2 text-center text-sm"
                                  )}
                                >
                                  Sign out
                                </button>
                              )}
                            </Menu.Item>
                          </form>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>

              <div
                className={`${
                  auth && web3auth ? "md:flex" : "hidden"
                } items-center`}
              >
                <TbGridDots
                  onClick={togglemenu}
                  id="grid"
                  title="Menu"
                  className={`hidden duration-200 md:block  ml-5 mr-3 text-[22px] hover:text-[#1b7a8d] ${
                    sidebar ? "rotate-45 text-white" : "text-white"
                  } cursor-pointer`}
                />
              </div>
              <div
                className={`${
                  auth && web3auth ? "hidden" : ""
                } text-black rounded border-solid border-2 border-black absolute right-2 text-xl px-2 py-2 hover:text-[#1da8d3] cursor-pointer`}
                onClick={login}
              >
                <button>Sign in</button>
              </div>
            </div>
          </div>
          <div
            className={`${auth && web3auth ? "sm:hidden" : "hidden"} `}
            id="mobile-menu"
          >
            <div className="space-y-1 px-2 pt-2 pb-3">
              <Link
                href={"/"}
                className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
                aria-current="page"
              >
                Home
              </Link>

              <Link
                href="/profile"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Profile
              </Link>

              <Link
                href={"/pkdrInfo/contact"}
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Contact
              </Link>

              <Link
                href={"/pkdrInfo/about"}
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                About
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <div
        className={`${sidebar ? "block" : "hidden"}`}
        id="menu"
        onMouseLeave={togglemenu}
      >
        <AdminSideBar />
      </div>
    </div>
  );
  if (userRoleType === "admin") {
    return (
      <>
        <LoadingBar
          color="#165300"
          progress={progress}
          waitingTime={400}
          onLoaderFinished={() => {
            setProgress(0);
          }}
          height={4}
        />
        {AdminNavbar}
      </>
    );
  } else if (userRoleType === "users") {
    return (
      <>
        <LoadingBar
          color="#009ac9"
          progress={progress}
          waitingTime={400}
          onLoaderFinished={() => {
            setProgress(0);
          }}
          height={4}
        />
        {Navbar}
      </>
    );
    // }else{
    //   <Link href="/" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Go Back Home</Link>

    //
  } else {
    return <></>;
  }
}

export default Header;
