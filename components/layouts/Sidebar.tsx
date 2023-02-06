import { Web3AuthCore } from "@web3auth/core";
import React, { useContext, useState } from "react";
import { useAtom } from "jotai";
import Image from "next/image";
import Link from "next/link";
import {
  web3authAtom,
  web3authStateAtom,
  providerAtom,
  privKeyAtom,
  userInfoAtom,
} from "../../state/jotai";
import Cookies from "js-cookie";
import { BsFileEarmarkPerson } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";
import { FaTelegramPlane } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";

const Sidebar = () => {
  const [auth, setAuth] = useAtom(web3authAtom);
  const [privKey, setPrivKey] = useAtom(privKeyAtom);
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);
  const [web3authState, setWeb3authState] = useAtom(web3authStateAtom);
  const [providerAtomState, setProviderAtomState] = useAtom(providerAtom);

  const logout = async () => {
    if (!web3authState) {
      console.log("web3auth not initialized yet");
      return;
    }
    try {
      await web3authState.logout();
      setProviderAtomState(null);
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

  return (
    <>
      <div className="right-0 top-[5rem] absolute bg-[#0c1407dc] text-gray-200 h-auto border-l-[3px] border-yellow-600">
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
                >
                  <span className="text-left">
                    <div>
                      <BiLogOut />
                    </div>
                  </span>
                  <span className="cursor-pointer mx-4 text-sm font-normal" onClick={logout}>Signout</span>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
