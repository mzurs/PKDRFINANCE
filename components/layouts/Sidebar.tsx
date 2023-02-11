import React, { useEffect, useState } from "react";
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
import { FiSettings } from "react-icons/fi";
import { IoIosPeople } from "react-icons/io";
import { VscFeedback } from "react-icons/vsc";
import { RiContactsBookLine } from "react-icons/ri";

const Sidebar = () => {
  const [auth, setAuth] = useAtom(web3authAtom);
  const [privKey, setPrivKey] = useAtom(privKeyAtom);
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);
  const [web3authState, setWeb3authState] = useAtom(web3authStateAtom);
  const [providerAtomState, setProviderAtomState] = useAtom(providerAtom);
  const [prevlocation, setprevlocation] = useState<string>("home");

  const change_color = (current_page: string) => {
    let prev = document.getElementById(prevlocation);
    let curr = document.getElementById(current_page);

    prev?.classList.remove("border-r-4");
    prev?.classList.remove("border-yellow-600");
    prev?.classList.remove("bg-gradient-to-r");
    prev?.classList.remove("from-[#03213b]");
    prev?.classList.remove("to-[#021b30]");
    prev?.classList.remove("dark:from-gray-800");
    prev?.classList.remove("dark:to-gray-900");
    prev?.classList.remove("text-yellow-600");
    prev?.classList.remove("font-extrabold");
    prev?.classList.add("text-gray-200");

    curr?.classList.add("border-r-4");
    curr?.classList.add("border-yellow-600");
    curr?.classList.add("bg-gradient-to-r");
    curr?.classList.add("from-[#03213b]");
    curr?.classList.add("to-[#021b30]");
    curr?.classList.add("dark:from-gray-800");
    curr?.classList.add("dark:to-gray-900");
    curr?.classList.remove("text-gray-200");
    curr?.classList.add("text-yellow-600");
    curr?.classList.add("font-extrabold");
  };

  const get_page = () => {
    let url = window.location.href;
    if (url !== "http://localhost:3000/") {
      let url_fragment = url.split("/");
      let len = url_fragment.length;
      let page_name = url_fragment[len - 1];
      //console.log("Current URL = " + page_name);
      change_color(page_name);
      setprevlocation(page_name);
    }
  };

  useEffect(() => {
    //console.log("Previous URL = " + prevlocation);
    get_page();
  }, [window.location.href]);

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
                  id="profile"
                  className="flex items-center justify-start w-full p-4 my-2 font-thin uppercase transition-colors duration-200 text-gray-200 hover:text-yellow-600"
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
                  id="user_contacts"
                  className="flex items-center justify-start w-full p-4 my-2 font-thin uppercase transition-colors duration-200 text-gray-200 hover:text-yellow-600"
                  href="/user/users/user_contacts"
                >
                  <span className="text-left">
                    <div>
                      <RiContactsBookLine />
                    </div>
                  </span>
                  <span className="mx-4 text-sm font-normal">
                    User Contacts
                  </span>
                </Link>
                <Link
                  id="settings"
                  className="flex items-center justify-start w-full p-4 my-2 font-thin uppercase transition-colors duration-200 text-gray-200 hover:text-yellow-600"
                  href="/settings"
                >
                  <span className="text-left">
                    <div>
                      <FiSettings />
                    </div>
                  </span>
                  <span className="mx-4 text-sm font-normal">Settings</span>
                </Link>
                <Link
                  id="about"
                  className="flex items-center justify-start w-full p-4 my-2 font-thin uppercase transition-colors duration-200 text-gray-200 hover:text-yellow-600"
                  href="/pkdrInfo/about"
                >
                  <span className="text-left">
                    <div>
                      <IoIosPeople />
                    </div>
                  </span>
                  <span className="mx-4 text-sm font-normal">About Us</span>
                </Link>
                <Link
                  id="contact"
                  className="flex items-center justify-start w-full p-4 my-2 font-thin uppercase transition-colors duration-200 text-gray-200 hover:text-yellow-600"
                  href="/pkdrInfo/contact"
                >
                  <span className="text-left">
                    <div>
                      <VscFeedback />
                    </div>
                  </span>
                  <span className="mx-4 text-sm font-normal">Contact Us</span>
                </Link>
                <div className="flex items-center justify-start w-full p-4 my-2 font-thin text-white uppercase transition-colors duration-200 dark:text-gray-200 hover:text-yellow-600">
                  <span className="text-left">
                    <div>
                      <BiLogOut />
                    </div>
                  </span>
                  <span
                    className="cursor-pointer mx-4 text-sm font-normal"
                    onClick={logout}
                  >
                    Signout
                  </span>
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
