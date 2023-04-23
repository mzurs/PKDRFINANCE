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
        {/* <!-- component -->
        {/* <!-- This is an example component --> */}
  

        <h1 className=" mt-20	mb-20 text-4xl	text-blue-700 not-italic  underline text-center">
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
        </div>
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
