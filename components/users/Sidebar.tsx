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
  isVerified,
} from "../../state/jotai";
import Cookies from "js-cookie";
import { BsFileEarmarkPerson } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { IoIosPeople } from "react-icons/io";
import { VscFeedback } from "react-icons/vsc";
import { RiContactsBookLine } from "react-icons/ri";
import { AiOutlineHistory } from "react-icons/ai";

const Sidebar = () => {
  const [auth, setAuth] = useAtom(web3authAtom);
  const [privKey, setPrivKey] = useAtom(privKeyAtom);
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);
  const [web3authState, setWeb3authState] = useAtom(web3authStateAtom);
  const [providerAtomState, setProviderAtomState] = useAtom(providerAtom);
  const [page, setpage] = useState<string>("");
  const [verified,setVerified]=useAtom(isVerified);
  const get_page = () => {
    let url = window.location.href;
    if (url !== "http://localhost:3000/") {
      let url_fragment = url.split("/");
      let len = url_fragment.length;
      setpage(url_fragment[len - 1]);
    }
  };

  try {
    useEffect(() => {
      get_page();
    }, [window.location.href]);
  } catch (error) {}

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
      setVerified(false)
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

  const style =
    "border-r-4 border-[#009ac9] font-extrabold bg-gradient-to-l from-gray-900 to-gray-500 text-gray-100";

  return (
    <>
      <div className=" hidden md:block right-0 top-[3rem] fixed bg-white text-black h-auto z-10">
        <div className="relative hidden h-screen my-4 shadow-lg lg:block w-[20rem]">
          <div className="h-full" >
            <div className="flex items-center justify-center pt-2 ">
              <Image src="/logo2.png" alt="logo2" width="170" height="170" />
            </div>
            <nav className="mt-2">
              <div>
                <div
                  id="profile"
                  className={`flex  font-extrabold bg-black text-white items-center justify-center w-full px-4 py-5 my-2 transition-colors duration-200`}
                >
                  <p className="mx-4 text-xl font-normal text-center">{userInfo?.name}</p>
                </div>
                <Link
                  id="profile"
                  className={`${
                    page === "profile" ? style : "text-black"
                  } flex items-center justify-start w-full p-4 my-2 font-thin transition-colors duration-200 hover:text-[#009ac9]`}
                  href="/user/users/profile"
                  onClick={() => setpage("profile")}
                >
                  <span className="text-left">
                    <div>
                      <BsFileEarmarkPerson className="text-2xl mr-3 ml-5" />
                    </div>
                  </span>
                  <span className="mx-4 text-lg font-normal">Your Profile</span>
                </Link>
                <Link
                  id="user_contacts"
                  onClick={() => setpage("user_contacts")}
                  className={`${
                    page === "user_contacts" ? style : "text-black"
                  } flex items-center justify-start w-full p-4 my-2 font-thin transition-colors duration-200 hover:text-[#009ac9]`}
                  href="/user/users/user_contacts"
                >
                  <span className="text-left">
                    <div>
                      <RiContactsBookLine className="text-2xl mr-3 ml-5" />
                    </div>
                  </span>
                  <span className="mx-4 text-lg font-normal">
                    User Contacts
                  </span>
                </Link>
                <Link
                  id="settings"
                  onClick={() => setpage("settings")}
                  className={`${
                    page === "settings" ? style : "text-black"
                  } flex items-center justify-start w-full p-4 my-2 font-thin transition-colors duration-200 hover:text-[#009ac9]`}
                  href="/user/users/settings"
                >
                  <span className="text-left">
                    <div>
                      <FiSettings className="text-2xl mr-3 ml-5" />
                    </div>
                  </span>
                  <span className="mx-4 text-lg font-normal">Settings</span>
                </Link>
                <Link
                  id="about"
                  onClick={() => setpage("about")}
                  className={`${
                    page === "about" ? style : "text-black"
                  } flex items-center justify-start w-full p-4 my-2 font-thin transition-colors duration-200 hover:text-[#009ac9]`}
                  href="/pkdrInfo/about"
                >
                  <span className="text-left">
                    <div>
                      <IoIosPeople className="text-2xl mr-3 ml-5" />
                    </div>
                  </span>
                  <span className="mx-4 text-lg font-normal">About Us</span>
                </Link>
                <Link
                  id="contact"
                  onClick={() => setpage("contact")}
                  className={`${
                    page === "contact" ? style : "text-black"
                  } flex items-center justify-start w-full p-4 my-2 font-thin transition-colors duration-200 hover:text-[#009ac9]`}
                  href="/pkdrInfo/contact"
                >
                  <span className="text-left">
                    <div>
                      <VscFeedback className="text-2xl mr-3 ml-5" />
                    </div>
                  </span>
                  <span className="mx-4 text-lg font-normal">Contact Us</span>
                </Link>
                <Link
                  id="transaction"
                  onClick={() => setpage("transaction")}
                  className={`${
                    page === "transaction" ? style : "text-black"
                  } flex items-center justify-start w-full p-4 my-2 font-thin transition-colors duration-200 hover:text-[#009ac9]`}
                  href="/user/users/transaction"
                >
                  <span className="text-left">
                    <div>
                      <AiOutlineHistory className="text-2xl mr-3 ml-5" />
                    </div>
                  </span>
                  <span className="mx-4 text-lg font-normal">Transaction History</span>
                </Link>
                <div className="flex items-center justify-start w-full p-4 my-2 font-thin text-black transition-colors duration-200 dark:text-black">
                  <span className="text-left">
                    <div>
                      <BiLogOut className="text-2xl mr-3 ml-5" />
                    </div>
                  </span>
                  <span
                    className="cursor-pointer mx-4 text-lg font-normal"
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
