import React, { useState } from "react";
import { userInfoAtom, web3authAtom, loading } from "../../../state/jotai";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { UserInfo } from "../../../Types/userTypes";
import { useRouter } from "next/router";

const transfer = () => {
  const [auth, setAuth] = useAtom(web3authAtom);
  const info: UserInfo = useAtomValue(userInfoAtom);
  const [Amount, setAmount] = useState<number>(0);
  const router = useRouter();

  const handleChange = (event: any) => {
    setAmount(event.target.value);
  };

  if (auth) {
    if (info) {      
      const data = router.query;
      return (
        <div className="body-font w-[100vw] mx-auto h-[100vh] overflow-x-hidden flex  justify-center md:pt-[4rem]">
          <form className="w-full max-w-xl pt-20 pb-4" action="#" method="POST">
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-first-name"
                >
                  From Account
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight"
                  disabled
                  id="grid-first-name"
                  type="text"
                  value={info.email}
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-last-name"
                >
                  Account Holder Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  disabled
                  id="grid-last-name"
                  type="text"
                  value={info.name}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-first-name"
                >
                  To Account
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight"
                  disabled
                  id="grid-first-name"
                  type="text"
                  value={data.email}
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-last-name"
                >
                  Account Holder Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  disabled
                  id="grid-last-name"
                  type="text"
                  value={data.name}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Amount
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-password"
                  type="number"
                  value={Amount}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-state"
                >
                  Purpose of Payment
                </label>
                <div className="relative">
                  <select
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-state"
                  >
                    <option>Select Purpose of Payment</option>
                    <option>Courier Service</option>
                    <option>Donations</option>
                    <option>Educational Payment</option>
                    <option>Family Support</option>
                    <option>Insurance Payment</option>
                    <option>Loan Payment</option>
                    <option>Medical Allowance</option>
                    <option>Miscellaneous Payments</option>
                    <option>Mutual Funds</option>
                    <option>Online Purchaces</option>
                    <option>Family Support</option>
                    <option>Others</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-ful flex mt-6">
              <button
                className={`${
                  Amount <= 0
                    ? "bg-[#81adba] disabled"
                    : "bg-[#028db7] hover:bg-[#017699] hover:underline"
                } px-4 py-2  mx-auto rounded-full text-white  text-md`}
              >
                Pay Now
              </button>
            </div>
          </form>
        </div>
      );
    }
  }
};

export default transfer;
