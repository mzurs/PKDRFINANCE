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

const AdminSideBar = () => {
  const [auth, setAuth] = useAtom(web3authAtom);
  const [privKey, setPrivKey] = useAtom(privKeyAtom);
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);
  const [web3authState, setWeb3authState] = useAtom(web3authStateAtom);
  const [providerAtomState, setProviderAtomState] = useAtom(providerAtom);
  const [page, setpage] = useState<string>("");
  const [verified, setVerified] = useAtom(isVerified);
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
      setVerified(false);
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
    "border-r-4 border-[#659157] bg-gradient-to-r from-[#162F0E] dark:from-gray-900 dark:to-gray-900 text-[#659157] font-extrabold";

  return (
    <>
      <div className=" hidden md:block right-0 top-[4rem] fixed bg-black text-white h-auto border-2 shadow-md border-[#171717]">
        <div className="relative hidden h-screen my-4 shadow-lg lg:block w-[20rem]">
          <div className="h-full">
            <div className="flex items-center justify-center pt-6 ">
              <Image src="/logo1.png" alt="pkdr logo" width="120" height="120" />
            </div>
            <nav className="mt-6">
              <div>
                <div
                  id="profile"
                  className={`flex text-[#659157] font-extrabold items-center justify-center w-full p-4 my-2`}
                >
                  <p className="mx-4 text-2xl text-center">
                    {userInfo?.name}
                  </p>
                </div>
                <Link
                  id="profile"
                  className={`${
                    page === "profile" ? style : "text-white"
                  } flex items-center justify-start w-full p-4 my-2 font-thin transition-colors duration-200 hover:text-[#659157]`}
                  href="/user/admin/profile"
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
                  id="settings"
                  onClick={() => setpage("settings")}
                  className={`${
                    page === "settings" ? style : "text-white"
                  } flex items-center justify-start w-full p-4 my-2 font-thin transition-colors duration-200 hover:text-[#659157]`}
                  href="/user/admin/settings"
                >
                  <span className="text-left">
                    <div>
                      <FiSettings className="text-2xl mr-3 ml-5" />
                    </div>
                  </span>
                  <span className="mx-4 text-lg font-normal">Settings</span>
                </Link>
                <Link
                  id="test"
                  onClick={() => setpage("test")}
                  className={`${
                    page === "test" ? style : "text-white"
                  } flex items-center justify-start w-full p-4 my-2 font-thin transition-colors duration-200 hover:text-[#659157]`}
                  href="/user/admin/test"
                >
                  <span className="text-left">
                    <div>
                      <FiSettings className="text-2xl mr-3 ml-5" />
                    </div>
                  </span>
                  <span className="mx-4 text-lg font-normal">Test</span>
                </Link>

                <div className={`${
                    page === "settings" ? style : "text-white"
                  } flex items-center justify-start w-full p-4 my-2 font-thin transition-colors duration-200 hover:text-[#659157]`}
                 >
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

export default AdminSideBar;
