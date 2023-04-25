import React, { useEffect, useState } from "react";
import get_USD_PKDR_rate from "../../../api/get_USD_PKDR_rate";
import { isVerified, userRole } from "../../../../state/jotai";
import { useAtom, useAtomValue } from "jotai";
import Link from "next/link";

const buyPKDRList = ({ rate }: any) => {
  const [latestRate, setLatestRate] = useState(0);
  const [verified, useVerified] = useAtom(isVerified);
  const [input1Value, setInput1Value] = useState<number>(0);
  const [input2Value, setInput2Value] = useState<number>(0);

  const handleInputChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;

    if (name === "input1") {
      setInput1Value(value);
      setInput2Value(value);
    } else if (name === "input2") {
      setInput2Value(value);
    }
  };
  const checkout = async () => {
    fetch("/api/checkout/checkout_sessions");
  };

  useEffect(() => {
    setLatestRate(rate);
  });
  return (
    <div className=" flex pt-[10rem] w-[100vw] overflow-x-hidden">
      <div className="max-w-100 mx-auto bg-white">
        {/* <!-- component -->
        {/* <!-- This is an example component --> */}

        <div className="shadow-lg shadow-black  relative overflow-x-auto  sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr className="border-2">
                <th scope="col" className="px-4 pt-5 ">
                  <h4 className="text-2xl  dark:text-gray-400 font-mono">
                    USD-PKR Exchange Rates
                  </h4>
                </th>
                <th scope="col" className="px-6 py-3"></th>
                <th scope="col" className="px-6 py-3"></th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <thead className="text-center text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr className="border-2">
                <th scope="col" className="px-6 py-3">
                  Exchange name
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Amount ($)</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Amount (Rs)</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Quantity</div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <Link
                    className="italic text-cyan-500	"
                    href="https://wise.com/gb/send-money/"
                  >
                    wise.com
                  </Link>
                </th>
                <td className="px-6 py-4"> $1</td>
                <td className="px-6 py-4">{(1 * rate).toFixed(2)}</td>
                <td className="px-6 py-4">{(1 * rate).toFixed(2)}</td>
              </tr>
              <tr className="text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <Link
                    className="italic text-cyan-500	"
                    href="https://wise.com/gb/send-money/"
                  >
                    wise.com
                  </Link>
                </th>
                <td className="px-6 py-4"> $5</td>
                <td className="px-6 py-4">{(5 * rate).toFixed(2)}</td>
                <td className="px-6 py-4">{(5 * rate).toFixed(2)}</td>
              </tr>
              <tr className="text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <Link
                    className="italic text-cyan-500	"
                    href="https://wise.com/gb/send-money/"
                  >
                    wise.com
                  </Link>
                </th>
                <td className="px-6 py-4"> $10</td>
                <td className="px-6 py-4">{(10 * rate).toFixed(2)}</td>
                <td className="px-6 py-4">{(10 * rate).toFixed(2)}</td>
              </tr>
              <tr className="text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <Link
                    className="italic text-cyan-500	"
                    href="https://wise.com/gb/send-money/"
                  >
                    wise.com
                  </Link>
                </th>
                <td className="px-6 py-4"> $20</td>
                <td className="px-6 py-4">{(20 * rate).toFixed(2)}</td>
                <td className="px-6 py-4">{(20 * rate).toFixed(2)}</td>
              </tr>
              <tr className="text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <Link
                    className="italic text-cyan-500	"
                    href="https://wise.com/gb/send-money/"
                  >
                    wise.com
                  </Link>
                </th>
                <td className="px-6 py-4"> $50</td>
                <td className="px-6 py-4">{(50 * rate).toFixed(2)}</td>
                <td className="px-6 py-4">{(50 * rate).toFixed(2)}</td>
              </tr>

              <tr className="text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <Link
                    className="italic text-cyan-500	"
                    href="https://wise.com/gb/send-money/"
                  >
                    wise.com
                  </Link>
                </th>
                <td className="px-6 py-4"> $100</td>
                <td className="px-6 py-4">{(100 * rate).toFixed(2)}</td>
                <td className="px-6 py-4">{(100 * rate).toFixed(2)}</td>
              </tr>

              <tr className="text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-mono text-cyan-500 whitespace-nowrap "
                >
                  Calculate
                </th>
                <td className="px-6 py-4">{(input1Value / rate).toFixed(2)}</td>
                <td className="px-6 py-4">
                  {" "}
                  <input
                    type="text"
                    name="input1"
                    value={input1Value}
                    onChange={handleInputChange}
                    className="text-center text-white  dark:bg-gray-700 "
                  />
                </td>
                <td className="px-6 py-4">{input1Value}</td>
              </tr>

              <tr className="text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-mono text-gray-900 whitespace-nowrap  dark:text-gray-400"
                ></th>
                <td className="px-6 py-4"></td>
                <td className="px-6 py-4"> </td>
                <td className="px-6 py-4">
                  <form action="/api/checkout/checkout_sessions" method="POST">
                    <button
                      type="submit"
                      className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                      BUY NOW
                    </button>
                  </form>
                </td>
              </tr>
            </tbody>
          </table>
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
