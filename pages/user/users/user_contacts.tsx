import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { isVerified, web3authAtom } from "../../../state/jotai";
import { useRouter } from "next/router";
import { GoPerson } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import Link from "next/link";

function contacts() {
  const router = useRouter();
  const [verified, setVerified] = useAtom(isVerified);
  const [auth, setAuth] = useAtom(web3authAtom);

  // useEffect(() => {
  //   if (!auth) {
  //     router.push("/");
  //   }
  //   }
  // );

  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-2 py-24 mx-auto overflow-x-hidden">
          <div className="flex items-center justify-between lg:w-2/5 mx-auto border-b pb-4 mb-10 border-gray-200">
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search Contacts"
              className="md:w-full focus:outline-none"
            />
            <button className="text-2xl">
              <FiSearch className="hover:text-[#0389b1]" title="Search"/>
            </button>
          </div>

          <div className="flex items-center lg:w-3/5 mx-auto border-b pb-4 mb-10 border-gray-200 sm:flex-row flex-col">
            <div className="rounded-full p-2 bg-[#0ab0e3] mx-2">
              <GoPerson className="text-3xl text-gray-100" />
            </div>
            <div className="flex-grow flex items-center justify-between  sm:text-left text-center mt-6 sm:mt-0 ">
              <div className="mx-4 float-left">
                <h2 className="text-gray-900 text-lg title-font font-medium mb-1">
                  Zohaib
                </h2>
                <p>example@gmail.com</p>
              </div>
              <Link href="/user/users/payment" className="text-md p-2 text-[#009ac9] hover:underline">
                Pay Now
              </Link>
            </div>
          </div>

          <div className="flex items-center lg:w-3/5 mx-auto border-b pb-4 mb-10 border-gray-200 sm:flex-row flex-col">
            <div className="rounded-full p-2 bg-[#0ab0e3] mx-2">
              <GoPerson className="text-3xl text-gray-100" />
            </div>
            <div className="flex-grow flex items-center justify-between  sm:text-left text-center mt-6 sm:mt-0 ">
              <div className="mx-4 float-left">
                <h2 className="text-gray-900 text-lg title-font font-medium mb-1">
                  Zohaib
                </h2>
                <p>example@gmail.com</p>
              </div>
              <Link href="/user/users/payment" className="text-md p-2 text-[#009ac9] hover:underline">
                Pay Now
              </Link>
            </div>
          </div>

          <div className="flex items-center lg:w-3/5 mx-auto border-b pb-4 mb-10 border-gray-200 sm:flex-row flex-col">
            <div className="rounded-full p-2 bg-[#0ab0e3] mx-2">
              <GoPerson className="text-3xl text-gray-100" />
            </div>
            <div className="flex-grow flex items-center justify-between  sm:text-left text-center mt-6 sm:mt-0 ">
              <div className="mx-4 float-left">
                <h2 className="text-gray-900 text-lg title-font font-medium mb-1">
                  Zohaib
                </h2>
                <p>example@gmail.com</p>
              </div>
              <Link href="/user/users/payment" className="text-md p-2 text-[#009ac9] hover:underline">
                Pay Now
              </Link>
            </div>
          </div>

          <div className="flex items-center lg:w-3/5 mx-auto border-b pb-4 mb-10 border-gray-200 sm:flex-row flex-col">
            <div className="rounded-full p-2 bg-[#0ab0e3] mx-2">
              <GoPerson className="text-3xl text-gray-100" />
            </div>
            <div className="flex-grow flex items-center justify-between  sm:text-left text-center mt-6 sm:mt-0 ">
              <div className="mx-4 float-left">
                <h2 className="text-gray-900 text-lg title-font font-medium mb-1">
                  Zohaib
                </h2>
                <p>example@gmail.com</p>
              </div>
              <Link href="/user/users/payment" className="text-md p-2 text-[#009ac9] hover:underline">
                Pay Now
              </Link>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}

export default contacts;
