import React, { useState } from "react";
import { userInfoAtom, web3authAtom, loading } from "../../../state/jotai";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { UserInfo } from "../../../components/users/settingsLayout/Types/userTypes";
import { useRouter } from "next/router";
import Loading from "../../../components/shared/loading/Loading";

const transfer = () => {
  const [auth, setAuth] = useAtom(web3authAtom);
  const info: UserInfo = useAtomValue(userInfoAtom);
  const [Amount, setAmount] = useState<number>(0);
  const [Purpose, setPurpose] = useState<string>("none");
  const router = useRouter();
  const data = router.query;

  const handletransfer = (e: any) => {
    e.preventDefault();
    let transfer_obj = {
      Benificiary_Name: data.name,
      Benificiary_Email: data.email,
      Amount: Amount,
      Purpose: Purpose,
      Date: new Date(),
    };

    fetch("http://localhost:3000/api/transfer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transfer_obj),
    })
      .then((response) => response.json())
      .then((d) => {
        console.log("Successfull Transfer : " + d);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  if (auth) {
    if (info) {
      return (
        <div className="w-[100vw] mx-auto h-[100vh] overflow-x-hidden">
          <div>
            <h1 className="md:pt-[5.5rem] pt-3 md:text-3xl text-2xl font-bold pl-4 pb-0 mb-0">
              Send Money
            </h1>
          </div>
          <div className="body-font w-full md:pt-[4rem]">
            <form
              className="w-full max-w-2xl mx-auto pb-4"
              onSubmit={handletransfer}
            >
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="grid-first-name"
                  >
                    From Account
                  </label>
                  <input
                    className="text-lg appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight"
                    disabled
                    id="grid-first-name"
                    type="text"
                    value={info.email}
                  />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="grid-last-name"
                  >
                    Account Holder Name
                  </label>
                  <input
                    className="text-lg appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
                    className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="grid-first-name"
                  >
                    To Account
                  </label>
                  <input
                    className="text-lg appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight"
                    disabled
                    id="grid-first-name"
                    type="text"
                    name="Benificiary Email"
                    value={data.email}
                  />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="grid-last-name"
                  >
                    Account Holder Name
                  </label>
                  <input
                    className="text-lg appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    disabled
                    id="grid-last-name"
                    type="text"
                    name="Benificiary Name"
                    value={data.name}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Amount
                  </label>
                  <input
                    className="text-lg appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-password"
                    type="number"
                    value={Amount}
                    onChange={(e: any) => {
                      setAmount(e.target.value);
                    }}
                    required
                    name="amount"
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                    htmlFor="grid-state"
                  >
                    Purpose of Payment
                  </label>
                  <div className="relative">
                    <select
                      className="text-lg block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-state"
                      name="purpose"
                      value={Purpose}
                      onChange={(e) => {
                        setPurpose(e.target.value);
                      }}
                    >
                      <option value={"none"}>Select Purpose of Payment</option>
                      <option value={"Courier Service"}>Courier Service</option>
                      <option value={"Donations"}>Donations</option>
                      <option value={"Educational Payment"}>
                        Educational Payment
                      </option>
                      <option value={"Family Support"}>Family Support</option>
                      <option value={"Insurance Payment"}>
                        Insurance Payment
                      </option>
                      <option value={"Loan Payment"}>Loan Payment</option>
                      <option value={"Medical Allowance"}>
                        Medical Allowance
                      </option>
                      <option value={"Miscellaneous Payments"}>
                        Miscellaneous Payments
                      </option>
                      <option value={"Mutual Funds"}>Mutual Funds</option>
                      <option value={"Online Purchaces"}>
                        Online Purchaces
                      </option>
                      <option value={"Family Support"}>Family Support</option>
                      <option value={"Others"}>Others</option>
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
                    Amount <= 0 || Purpose == "none" || data == null
                      ? "bg-[#81adba] disabled cursor-default"
                      : "bg-[#028db7] hover:bg-[#017699] hover:underline"
                  } px-6 py-2  mx-auto rounded-full text-white  text-xl`}
                  type="submit"
                >
                  Pay Now
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    }
  }
};

export default transfer;
