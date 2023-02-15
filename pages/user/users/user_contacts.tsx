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
      <form action="/api/checkout/checkout_sessions" method="POST">
        <div className=" text-gray-600 body-font">
          <div className="w-[50%] px-2 mx-auto py-20">
            <div className="mx-auto flex items-center justify-between lg:w-[82%] border-b pb-4 mb-10 border-gray-200">
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Search Contacts"
                className="focus:outline-none text-md"
              />
              <button className="text-2xl">
                <FiSearch className="hover:text-[#0389b1]" title="Search" />
              </button>
            </div>

            <div className="flex items-center mx-auto lg:w-[95%] border-b pb-4 mb-10 border-gray-200 sm:flex-row flex-col">
              <div className="rounded-full p-2 bg-[#0ab0e3] mx-2">
                <GoPerson className="text-3xl text-gray-100" />
              </div>
              <div className="flex-grow flex items-center justify-between  sm:text-left text-center mt-6 sm:mt-0 text-sm">
                <div className="mx-4 float-left">
                  <h2 className="text-gray-900 text-md title-font font-medium mb-1">
                    Zohaib
                  </h2>
                  <p>example@gmail.com</p>
                </div>
                <button
                  className="text-md p-2 text-[#009ac9] hover:underline"
                  type="submit"
                >
                  Pay Now
                </button>
              </div>
            </div>
            <div className="flex items-center mx-auto lg:w-[95%] border-b pb-4 mb-10 border-gray-200 sm:flex-row flex-col">
              <div className="rounded-full p-2 bg-[#0ab0e3] mx-2">
                <GoPerson className="text-3xl text-gray-100" />
              </div>
              <div className="flex-grow flex items-center justify-between  sm:text-left text-center mt-6 sm:mt-0 text-sm">
                <div className="mx-4 float-left">
                  <h2 className="text-gray-900 text-md title-font font-medium mb-1">
                    Zohaib
                  </h2>
                  <p>example@gmail.com</p>
                </div>
                <button
                  className="text-md p-2 text-[#009ac9] hover:underline"
                  type="submit"
                >
                  Pay Now
                </button>
              </div>
            </div>
            <div className="flex items-center mx-auto lg:w-[95%] border-b pb-4 mb-10 border-gray-200 sm:flex-row flex-col">
              <div className="rounded-full p-2 bg-[#0ab0e3] mx-2">
                <GoPerson className="text-3xl text-gray-100" />
              </div>
              <div className="flex-grow flex items-center justify-between  sm:text-left text-center mt-6 sm:mt-0 text-sm">
                <div className="mx-4 float-left">
                  <h2 className="text-gray-900 text-md title-font font-medium mb-1">
                    Zohaib
                  </h2>
                  <p>example@gmail.com</p>
                </div>
                <button
                  className="text-md p-2 text-[#009ac9] hover:underline"
                  type="submit"
                >
                  Pay Now
                </button>
              </div>
            </div>
            <div className="flex items-center mx-auto lg:w-[95%] border-b pb-4 mb-10 border-gray-200 sm:flex-row flex-col">
              <div className="rounded-full p-2 bg-[#0ab0e3] mx-2">
                <GoPerson className="text-3xl text-gray-100" />
              </div>
              <div className="flex-grow flex items-center justify-between  sm:text-left text-center mt-6 sm:mt-0 text-sm">
                <div className="mx-4 float-left">
                  <h2 className="text-gray-900 text-md title-font font-medium mb-1">
                    Zohaib
                  </h2>
                  <p>example@gmail.com</p>
                </div>
                <button
                  className="text-md p-2 text-[#009ac9] hover:underline"
                  type="submit"
                >
                  Pay Now
                </button>
              </div>
            </div>
            <div className="flex items-center mx-auto lg:w-[95%] border-b pb-4 mb-10 border-gray-200 sm:flex-row flex-col">
              <div className="rounded-full p-2 bg-[#0ab0e3] mx-2">
                <GoPerson className="text-3xl text-gray-100" />
              </div>
              <div className="flex-grow flex items-center justify-between  sm:text-left text-center mt-6 sm:mt-0 text-sm">
                <div className="mx-4 float-left">
                  <h2 className="text-gray-900 text-md title-font font-medium mb-1">
                    Zohaib
                  </h2>
                  <p>example@gmail.com</p>
                </div>
                <button
                  className="text-md p-2 text-[#009ac9] hover:underline"
                  type="submit"
                >
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default contacts;
