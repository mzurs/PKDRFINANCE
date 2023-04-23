import React, { useEffect, useState } from "react";
import get_USD_PKDR_rate from "../../../api/get_USD_PKDR_rate";
import { isVerified, userRole } from "../../../../state/jotai";
import { useAtom, useAtomValue } from "jotai";

const buyPKDRList = ({ rate }: any) => {
  const [latestRate, setLatestRate] = useState(0);
  const [verified, useVerified] = useAtom(isVerified);

  const checkout = async () => {
    fetch("/api/checkout/checkout_sessions");
  };

  useEffect(() => {
    setLatestRate(rate);
  });
  return (
    <div className="flex pt-[4.6rem] w-[100vw] overflow-x-hidden">
      <div className="max-w-100 mx-auto bg-white">
        {/* <!-- component --> */}
        {/* <!-- This is an example component --> */}
        <div className="max-w-2xl mx-auto">
          {/* <!-- Modal toggle --> */}
          {/* <button className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button" data-modal-toggle="default-modal">
    Toggle modal
    </button> */}

          {/* <!-- Main modal --> */}
          <div
            id="default-modal"
            data-modal-show="true"
            aria-hidden="true"
            className="hidden overflow-x-hidden overflow-y-auto fixed h-modal md:h-full top-4 left-0 right-0 md:inset-0 z-50 justify-center items-center"
          >
            <div className="relative w-full max-w-2xl px-4 h-full md:h-auto">
              {/* <!-- Modal content --> */}
              <div className="bg-white rounded-lg shadow relative dark:bg-gray-700">
                {/* <!-- Modal header --> */}
                <div className="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-gray-900 text-xl lg:text-2xl font-semibold dark:text-white">
                    Terms of Service
                  </h3>
                  {/* <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-toggle="default-modal"
                  > */}
                    {/* <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg> */}
                  {/* </button> */}
                </div>
                {/* <!-- Modal body --> */}
                <div className="p-6 space-y-6">
                  <p className="text-gray-500 text-base leading-relaxed dark:text-gray-400">
                    With less than a month to go before the European Union
                    enacts new consumer privacy laws for its citizens, companies
                    around the world are updating their terms of service
                    agreements to comply.
                  </p>
                  <p className="text-gray-500 text-base leading-relaxed dark:text-gray-400">
                    The European Union’s General Data Protection Regulation
                    (G.D.P.R.) goes into effect on May 25 and is meant to ensure
                    a common set of data rights in the European Union. It
                    requires organizations to notify users as soon as possible
                    of high-risk data breaches that could personally affect
                    them.
                  </p>
                </div>
                {/* <!-- Modal footer --> */}
                <div className="flex space-x-2 items-center p-6 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button
                    data-modal-toggle="default-modal"
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    I accept
                  </button>
                  <button
                    data-modal-toggle="default-modal"
                    type="button"
                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600"
                  >
                    Decline
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* <p className="mt-5">This modal element is part of a larger, open-source library of Tailwind CSS components. Learn more by going to the official <a className="text-blue-600 hover:underline" href="#" target="_blank">Flowbite Documentation</a>.</p> */}
        </div>

        <script src="https://unpkg.com/flowbite@1.4.4/dist/flowbite.js"></script>

        {/* <h1 className=" mt-20	mb-20 text-4xl	text-blue-700 not-italic  underline text-center">
          USD-PKR Conversion Rate
        </h1>
        <div className=" relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="border-x-1  mx-auto	 text-center text-black">
            <thead
              className=" border-b-4

 uppercase text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              <tr className="rounded-lg">
                <th scope="col" className="p-4"></th>
                <th scope="col" className="px-6 py-3">
                  Amount($)
                </th>
                <th scope="col" className="px-6 py-3">
                  Amount(PKR)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className=" border-b text-black">
                <td className="w-4 p-4"></td>
                <th
                  scope="row"
                  className="text-center  px-6 py-4 font-medium text-black  whitespace-nowrap"
                >
                  1
                </th>
                <td className="text-center px-6 py-4">
                  {(1 * rate).toFixed(0)}
                </td>
              </tr>
              <tr className=" border-b text-black">
                <td className="w-4 p-4"></td>
                <th
                  scope="row"
                  className="text-center  px-6 py-4 font-medium text-black  whitespace-nowrap"
                >
                  5
                </th>
                <td className="text-center px-6 py-4">
                  {(5 * rate).toFixed(0)}
                </td>
              </tr>
              <tr className=" border-b text-black">
                <td className="w-4 p-4"></td>
                <th
                  scope="row"
                  className="text-center  px-6 py-4 font-medium text-black  whitespace-nowrap"
                >
                  10
                </th>
                <td className="text-center px-6 py-4">
                  {(10 * rate).toFixed(0)}
                </td>
              </tr>
              <tr className=" border-b text-black">
                <td className="w-4 p-4"></td>
                <th
                  scope="row"
                  className="text-center  px-6 py-4 font-medium text-black  whitespace-nowrap"
                >
                  50
                </th>
                <td className="text-center px-6 py-4">
                  {(50 * rate).toFixed(0)}
                </td>
              </tr>
              <tr className=" border-b text-black">
                <td className="w-4 p-4"></td>
                <th
                  scope="row"
                  className="text-center  px-6 py-4 font-medium text-black  whitespace-nowrap"
                >
                  100
                </th>
                <td className="text-center px-6 py-4">
                  {(100 * rate).toFixed(0)}
                </td>
              </tr>
            </tbody>
          </table>
          {useAtomValue(userRole) === "users" && Boolean(verified) ? (
            <div className=" flex flex-grow h-12 mt-5 text-xl hover:text-[#127a97] font-normal cursor-pointer hover:underline">
              <form action="/api/checkout/checkout_sessions" method="POST">
                <button
                  className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                  type="submit"
                >
                  Buy PKDR
                </button>
              </form>
            </div>
          ) : (
            <></>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default buyPKDRList;

export async function getServerSideProps(context: any) {
  const rate = await get_USD_PKDR_rate();
  console.log("🚀 ~ file: index.tsx:52 ~ getServerSideProps ~ rate:", rate);
  return {
    props: {
      rate: rate,
    },
  };
}
