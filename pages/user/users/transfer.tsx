import React, { useEffect, useState } from "react";
import {
  userInfoAtom,
  web3authAtom,
  loading,
  isVerified,
} from "../../../state/jotai";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { UserInfo } from "../../../components/users/settingsLayout/type/userTypes";
import { useRouter } from "next/router";
import { ThreeDots } from "react-loader-spinner";
import { notify } from "../../../components/users/settingsLayout/ProfileInfo";

type transferData = {
  from_name: string;
  to_name: string;
  amount: string;
  purpose: string;
  date: Date;
  idToken: string;
  oAuthIdToken: string;
};

export type parsedData = {
  from_name: string;
  to_name: string;
  amount: string;
};

const transfer = (d: any) => {
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
  const [Purpose, setPurpose] = useState<string>("none");
  const [loader, setLoader] = useState<boolean>(false);
  const router = useRouter();
  const data = router.query;
  const [username, setUserName] = useState<string>("");
  let count=1;

  useEffect(() => {
    if (!isVerified) {
      router.push("/user/users/settings");
    } else {
      if (username == "" && count==1) {
        count++;
        checkUser();
      }
    }
  }, []);

  async function checkUser() {
    if(username!=""){
      if(await fetchUserName()==false){
        notify("Username is not set: Set your Username first","error");
        setTimeout(()=>{router.push("/user/users/settings");}, 3000);          
      }
    }
  }

  async function fetchUserName(): Promise<boolean> {
    const headers = new Headers();
    headers.append("content-type", "application/json");
    headers.append(
      "x-custom-header",
      JSON.stringify([info.idToken, info.oAuthIdToken])
    );
    try {
      await fetch("http://localhost:3000/api/user/query/getUserAttrInfo", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ attr_name: "USERNAME" }),
      })
        .then((response) => response.json())
        .then(async (d) => {
          setUserName(d.data.getUserInfo.value);
          console.log("UserName = " + d.data.getUserInfo.value);
          if(d.data.getUserInfo.message.includes("Not found")){
            return false;
          }
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
      from_name: username,
      to_name: data.name as string,
      amount: Amount,
      purpose: Purpose,
      date: new Date(),
      idToken: info.idToken,
      oAuthIdToken: info.oAuthIdToken,
    };

    let parsedata: parsedData = {
      from_name: obj.from_name,
      to_name: obj.to_name,
      amount: obj.amount,
    };

    try {
      const headers = new Headers();
      headers.append("content-type", "application/json");
      headers.append(
        "x-custom-header",
        JSON.stringify([obj.idToken, obj.oAuthIdToken])
      );
      await fetch("/api/user/mutation/transferFrom/transferFrom", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(parsedata),
      })
        .then((response) => response.json())
        .then(async (d) => {
          console.log(d);
          setLoader(false);
          if (d.message.includes("Successfully transfer")) {
            notify(
              `Amount of ${Amount} PKDR has been transfered to ${obj.to_name} successfully 🎉`,
              "success"
            );
          } else if (d.message.includes("cannot estimate gas")) {
            notify(
              "Transaction failed due to some internal problem ❌",
              "error"
            );
          } else {
            notify(d.message, "warn");
          }
          setTimeout(() => {
            router.push("/user/users/user_contacts");
          }, 2000);
        });
    } catch (error) {
      console.log(error);
      setLoader(false);
      notify(error as string, "error");
    }
    setAmount("0");
    setPurpose("none");
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
                Send Money
              </h1>
            </div>
            <div className="body-font w-full md:pt-[4rem]">
              <div className="w-full max-w-2xl mx-auto pb-4">
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
                      value={username}
                      // onChange={(e) => setName(e.target.value)}
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
                      <span title="required" className="cursor-pointer text-md">
                        &nbsp;*
                      </span>
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
                    {Number(Amount) < 2 ? (
                      <label htmlFor="less_amount" className="text-red-700">
                        Please enter amount greator than or equal to 2
                      </label>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-2">
                  <div className="w-full px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2"
                      htmlFor="grid-state"
                    >
                      Purpose of Payment
                      <span title="required" className="cursor-pointer text-md">
                        &nbsp;*
                      </span>
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
                        <option value={"none"} selected>
                          Select Purpose of Payment
                        </option>
                        <option value={"Courier Service"}>
                          Courier Service
                        </option>
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
                    {Purpose == "none" ? (
                      <label htmlFor="less_amount" className="text-red-700">
                        Please select purpose of your payment
                      </label>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="w-ful flex mt-6">
                  <button
                    className={`${
                      Number(Amount) < 2 ||
                      Purpose == "none" ||
                      data == null ||
                      username === ""
                        ? "bg-[#81adba] disabled cursor-default"
                        : "bg-[#028db7] hover:bg-[#017699] hover:underline"
                    } px-6 py-2  mx-auto rounded-full text-white  text-xl`}
                    onClick={handletransfer}
                    disabled={
                      Number(Amount) < 2 ||
                      Purpose == "none" ||
                      data == null ||
                      username === ""
                        ? true
                        : false
                    }
                  >
                    Pay Now
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
            <div className="absolute w-[5vw] bg-transparent dark:bg-gray-700 flex items-center justify-center">
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

// export async function getServerSideProps() {
//   let info =
//     "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlRZT2dnXy01RU9FYmxhWS1WVlJZcVZhREFncHRuZktWNDUzNU1aUEMwdzAifQ.eyJpYXQiOjE2ODE0Nzc1NzAsImF1ZCI6IkJHVE1qSUw4Uk9MZ3FSSzhZdng5b3JHWF9ad0dmQVA3aDE5ckdrdVVvX1VPQXFRWmlHTURtRFVMc2pISGdoVFNNUmFfQXJYODVuNEVuX0FhMzZvQzE2dy1feXMiLCJub25jZSI6IjAzZGM5MTAzNjg3OTZmNTVhMjZmMDJjMTljMjZiY2E2NzE2NjQ0YzAwZDBiYWZlZjgxNTQ2YjliOTk3OTA5ODRlNSIsImlzcyI6Imh0dHBzOi8vYXBpLm9wZW5sb2dpbi5jb20iLCJ3YWxsZXRzIjpbeyJwdWJsaWNfa2V5IjoiMDJkNGZiNWIxOTliM2UxY2ViOTMzZTE5NmU4YjI0Zjk2YjMxNDI0MjMzYmIyYzQzOTUzODg1OTUzN2RhNmFiOGUzIiwidHlwZSI6IndlYjNhdXRoX2FwcF9rZXkiLCJjdXJ2ZSI6InNlY3AyNTZrMSJ9XSwiZW1haWwiOiJrMTkwMTU1QG51LmVkdS5wayIsIm5hbWUiOiJrMTkwMTU1IFN5ZWQgQW1tYXIgQWxhbSIsInZlcmlmaWVyIjoidGVzdC1wa2RyLWZpbmFuY2UiLCJ2ZXJpZmllcklkIjoiazE5MDE1NUBudS5lZHUucGsiLCJhZ2dyZWdhdGVWZXJpZmllciI6InRlc3QtcGtkci1maW5hbmNlIiwiZXhwIjoxNjgxNDgwNTcwfQ.zcOmzW9rkFBSBLCvkYFAuwemQ7ymlRhHV5lV_oBjYqtHRLWWOyjw0hmbM9d542lICn13BRe0IsNvkldIdaanGw";
//   const headers = new Headers();
//   headers.append("content-type", "application/json");
//   headers.append("x-custom-header", JSON.stringify([info]));
//   let data:any;
//   try {
//     await fetch("http://localhost:3000/api/user/query/getUserAttrInfo", {
//       method: "POST",
//       headers: headers,
//       body: JSON.stringify({ attr_name: "USERNAME" }),
//     })
//       .then((response) => response.json())
//       .then(async (d) => {
//         console.log(d);
//         data=d;
//       });
//   } catch (error) {
//     return { props: { message: error } };
//   }
//   return { props: { data } };
// }

export default transfer;
