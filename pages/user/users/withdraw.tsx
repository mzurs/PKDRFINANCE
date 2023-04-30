import React, { useEffect, useState } from "react";
import {
  userInfoAtom,
  web3authAtom,
  isVerified,
  userName,
} from "../../../state/jotai";
import { useAtom, useAtomValue } from "jotai";
import { UserInfo } from "../../../components/users/settingsLayout/type/userTypes";
import { useRouter } from "next/router";
import { ThreeDots } from "react-loader-spinner";
import { notify } from "../../../components/users/settingsLayout/ProfileInfo";

type transferData = {
  iban: string;
  acc_name: string;
  amount: number;
  username: string;
  date: Date;
};

const withdraw = () => {
  let info: UserInfo = {
    email: "",
    name: "",
    profileImage: "",
    aggregateVerifier: "",
    verifier: "",
    verifierId: "",
    typeOfLogin: "",
    dappShare: "",
    idToken: "",
    oAuthIdToken: "",
    oAuthAccessToken: "",
  };

  const [auth, setAuth] = useAtom(web3authAtom);
  info = useAtomValue(userInfoAtom);
  const [Amount, setAmount] = useState<string>("0");
  const [iban, setIban] = useState<string>("");
  const [acc_name, setAccName] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);
  const router = useRouter();
  const [username, setUserName] = useAtom(userName);
  let user: string = username;
  let count = 1;

  useEffect(() => {
    if (!isVerified) {
      router.push("/user/users/");
    } else {
      if (username == "") {
        setLoader(true);
        checkUser();
      }
    }
  }, []);

  async function checkUser() {
    await fetchUserName().then((result) => {
      if (result === false && username === "" && user == "") {
        if (count == 1) {
          notify(
            "Username Not Found: Set your Username first to withdraw PKDR",
            "error"
          );
          ++count;
        }
        setTimeout(() => {
          router.push("/user/users/settings");
        }, 3000);
      }
      setLoader(false);
    });
  }

  async function fetchUserName(): Promise<boolean> {
    const headers = new Headers();
    headers.append("content-type", "application/json");
    headers.append(
      "x-custom-header",
      JSON.stringify([info.idToken, info.oAuthIdToken])
    );
    try {
      await fetch("/api/user/query/getUserAttrInfo", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ attr_name: "USERNAME" }),
      })
        .then((response) => response.json())
        .then(async (d) => {
          console.log("🚀 ~ file: transfer.tsx:100 ~ .then ~ d:", d);
          user = d.data.getUserInfo.value;
          setUserName(d.data.getUserInfo.value);
          return d.data.getUserInfo.success;
        });
    } catch (error) {
      return false;
    }
    return false;
  }

  async function handletransfer(e: any) {
    setLoader(true);
    e.preventDefault();
    let obj: transferData = {
      iban: iban,
      acc_name: acc_name,
      amount: Number(Amount),
      date: new Date(),
      username: user,
    };

    try {
      const headers = new Headers();
      headers.append("content-type", "application/json");
      headers.append(
        "x-custom-header",
        JSON.stringify([info.idToken, info.oAuthIdToken])
      );
      await fetch("/api/user/mutation/withdraw", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(obj),
      })
        .then((response) => response.json())
        .then(async (d) => {
          console.log("🚀 ~ file: withdraw.tsx:129 ~ .then ~ d:", d);

          setLoader(false);
          if (d.withdraw.result === false) {
            if (
              d.withdraw.burnResult.message.includes(
                "Amount Exceeds Current Balance"
              )
            ) {
              notify(
                `Amount Exceed: Your current account balance is less than ${obj.amount} ❌`,
                "error"
              );
            } else {
              // d.withdraw.errorMessage
              notify("Withdrawl Rejected, Can't withdraw amount yet ❌", "error");
            }
          } else {
            notify(
              `Amount of Rs ${Amount} withdrawn successfully 🎉`,
              "success"
            );
          }
        });
      setTimeout(() => {
        router.push("/user/users/");
      }, 2000);
    } catch (error) {
      console.log(error);
      setLoader(false);
      notify("Error Occurred, Can't withdraw amount yet ❌", "error");
    }
    setAmount("0");
  }

  if (auth) {
    if (info) {
      return (
        <>
          <div
            className={`${
              loader ? "opacity-40" : ""
            } w-[100vw] mx-auto h-[100vh] overflow-x-hidden -z-10`}
          >
            <div>
              <h1 className="md:pt-[5.5rem] pt-3 md:text-4xl text-2xl font-bold pl-8 pb-0 mb-0">
                Withdraw PKDR
              </h1>
            </div>
            <div className="body-font w-full md:pt-[4rem]">
              <div className="w-full max-w-2xl mx-auto pb-4">
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                      htmlFor="grid-first-name"
                    >
                      From PKDR Account
                    </label>
                    <input
                      className="text-lg appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight"
                      disabled
                      id="grid-first-name"
                      type="text"
                      value={info.email}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                      htmlFor="grid-last-name"
                    >
                      PKDR Username
                    </label>
                    <input
                      className="text-lg appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      disabled
                      id="grid-last-name"
                      type="text"
                      value={username}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                      htmlFor="grid-first-name"
                    >
                      Enter IBAN
                      <span title="required" className="cursor-pointer text-md">
                        &nbsp;*
                      </span>
                    </label>
                    <input
                      className="text-lg appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight"
                      id="grid-iban"
                      type="text"
                      name="iban"
                      value={iban}
                      placeholder="Enter IBAN"
                      onChange={(e: any) => {
                        setIban(e.target.value);
                      }}
                    />
                    {iban === "" ? (
                      <label htmlFor="iban" className="text-red-700">
                        Please enter IBAN
                      </label>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                      htmlFor="grid-last-name"
                    >
                      IBAN Account Holder Name
                      <span title="required" className="cursor-pointer text-md">
                        &nbsp;*
                      </span>
                    </label>
                    <input
                      className="text-lg appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-acc-name"
                      type="text"
                      name="acc-name"
                      value={acc_name}
                      placeholder="Enter IBAN Account Holder Name"
                      onChange={(e: any) => {
                        setAccName(e.target.value);
                      }}
                      required
                    />
                    {acc_name === "" ? (
                      <label htmlFor="acc-name" className="text-red-700">
                        Please enter IBAN account holder name
                      </label>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Amount
                      <span title="required" className="cursor-pointer text-md">
                        &nbsp;*
                      </span>
                    </label>
                    <input
                      className="text-lg appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-amount"
                      type="number"
                      value={Amount}
                      placeholder="Enter Amount"
                      onChange={(e: any) => {
                        setAmount(e.target.value);
                      }}
                      required
                      name="amount"
                    />
                    {Number(Amount) < 1000 ? (
                      <label htmlFor="amount" className="text-red-700">
                        Please enter amount greator than or equal to 1000
                      </label>
                    ) : (
                      ""
                    )}
                  </div>
                </div>

                <div className="w-ful flex mt-6">
                  <button
                    className={`${
                      Number(Amount) < 1000 ||
                      iban === "" ||
                      username === "" ||
                      acc_name === ""
                        ? "bg-[#81adba] disabled cursor-default"
                        : "bg-[#028db7] hover:bg-[#017699] hover:underline"
                    } px-6 py-2  mx-auto rounded-full text-white  text-xl`}
                    onClick={handletransfer}
                    disabled={
                      Number(Amount) < 1000 ||
                      iban === "" ||
                      username === "" ||
                      acc_name === ""
                        ? true
                        : false
                    }
                  >
                    Withdraw
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            id="loader"
            tabIndex={-1}
            aria-hidden="true"
            className={`fixed flex items-center justify-center  top-0 left-0 right-0 z-50  w-[100vw] p-4 ${
              !loader ? "hidden" : ""
            } overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}
          >
            <div className="absolute w-[5vw] bg-transparent  flex items-center justify-center">
              <ThreeDots
                height="120"
                width="120"
                radius="9"
                color="#028db7"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={loader}
              />
            </div>
          </div>
        </>
      );
    }
  }
};

export default withdraw;
