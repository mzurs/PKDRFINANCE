import { useAtom, useAtomValue } from "jotai";
import React, { useEffect, useState } from "react";
import { GoPerson } from "react-icons/go";
import { userInfoAtom, userName } from "../../state/jotai";
import { notify } from "./settingsLayout/ProfileInfo";
import { useRouter } from "next/router";
import { Triangle } from "react-loader-spinner";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import MultilineChart from "./MultilineChart";

const Recent = (props: any) => {
  const info = useAtomValue(userInfoAtom);
  const [username, setUserName] = useAtom(userName);
  const [transactions, setTransactions] = useState<any[] | null>(null);
  const [dateList, setDateList] = useState<Set<string> | null>(null);
  const [loader, setLoader] = useState<boolean>(false);
  let user: string = username;
  let count = 1;
  const router = useRouter();

  useEffect(() => {
    callApi();
  }, []);
  useEffect(() => {
    if (transactions != null) {
      console.log(
        "🚀 ~ file: Recent.tsx:24 ~ useEffect ~ transactions:",
        transactions
      );
      setLoader(false);
    }
  }, [transactions]);

  const callApi = async () => {
    if (username == "") {
      setLoader(true);
      await fetchUserName();
    }
    setLoader(true);
    await get_transaction();
  };

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

  const get_transaction = async () => {
    try {
      const headers = new Headers();
      headers.append("content-type", "application/json");
      headers.append(
        "x-custom-header",
        JSON.stringify([info.idToken, info.oAuthIdToken])
      );
      await fetch("http://localhost:3000/api/user/query/recentTransactions", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ username: username }),
      })
        .then((response) => response.json())
        .then(async (data) => {
          if (data.length > 5) {
            setTransactions(data.slice(0, 5));
          } else {
            setTransactions(data);
          }
        });
    } catch (error) {
      if (count == 1) {
        notify("Error Occurred: while fetching transactions", "error");
        console.log(error);
        count++;
      }
    }
  };
  return (
    <>
      <div className="relative pr-2">
        <div className="w-[63vw] mx-auto mt-3.5 mb-1">
          <div className="flex justify-between py-4 px-4 mb-2 bg-white border rounded-md shadow pr-6 dark:bg-gray-800">
            <div>
              <h3 className="text-xl font-semibold leading-6 text-gray-900 dark:text-white">
                {props.title}
              </h3>
              <p className="max-w-2xl mt-1 text-sm text-gray-500 dark:text-gray-200">
                {props.sub}
              </p>
            </div>
            <button
              onClick={() => {
                router.push("/user/users/transaction");
              }}
              className="flex justify-end ml-5 pl-4 py-5 text-right hover:text-gray-800  dark:hover:text-white dark:text-gray-200"
            >
              <svg
                width="18"
                fill="currentColor"
                height="18"
                className="text-gray-300 hover:text-gray-600"
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
              </svg>
            </button>
          </div>
          <ul className="flex flex-col">
            {transactions != null ? (
              transactions?.map((tx) => {
                if (tx.type == "credit") {
                  return (
                    <>
                      <li className="flex flex-row rounded-md mb-0.5 border-2 border-gray-100 hover:border-gray-200 hover:bg-gray-300">
                        <div className="text-gray-800 transition duration-500  ease-in-out transform hover:-translate-x-1 hover:shadow-lg select-none cursor-pointer bg-white dark:bg-gray-800 rounded-md flex flex-1 items-center px-4 py-1.5">
                          <div className="flex flex-col items-center justify-center w-10 h-10 mr-4 border-2 border-black rounded-full">
                            <div className="rounded-full p-2 bg-white border-2 border-green-600 mx-2">
                              <BsArrowDown className="text-2xl text-green-600" />
                            </div>
                          </div>
                          <div className="flex-1 pl-1 md:mr-16">
                            <div className="font-medium text-lg dark:text-white">
                              {tx.From}
                            </div>
                            <div className="text-md text-gray-600 dark:text-gray-200">
                              {tx.type}
                            </div>
                          </div>
                          <div className="text-xl text-gray-600 dark:text-gray-200 pr-3">
                            Rs.&nbsp;{tx.Amount}
                          </div>
                        </div>
                      </li>
                    </>
                  );
                } else {
                  return (
                    <>
                      <li className="flex flex-row rounded-md mb-0.5 border-2 border-gray-100 hover:border-gray-200 hover:bg-gray-300 hover:border">
                        <div className="text-gray-800 transition duration-500  ease-in-out transform hover:-translate-x-1 hover:shadow-lg select-none cursor-pointer bg-white dark:bg-gray-800 rounded-md flex flex-1 items-center px-4 py-1.5">
                          <div className="flex flex-col items-center justify-center w-10 h-10 mr-4 border-2 border-black rounded-full">
                            <div className="rounded-full p-2 bg-white border-2 border-red-800 mx-2">
                              <BsArrowUp className="text-2xl text-red-800" />
                            </div>
                          </div>
                          <div className="flex-1 pl-1 md:mr-16">
                            <div className="font-medium text-lg dark:text-white">
                              {tx.To}
                            </div>
                            <div className="text-md text-gray-600 dark:text-gray-200">
                              {tx.type}
                            </div>
                          </div>
                          <div className="text-xl text-gray-600 dark:text-gray-200 pr-3">
                            Rs.&nbsp;{tx.Amount}
                          </div>
                        </div>
                      </li>
                    </>
                  );
                }
              })
            ) : (
              <div
                tabIndex={-1}
                aria-hidden="true"
                className={`h-[34vh] ${
                  loader ? "hidden" : ""
                } relative flex items-center justify-center top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 `}
              >
                <div className="fixed w-full bg-transparent flex items-center justify-center">
                  <p className="text-2xl font-medium">
                    No Transactions to Show
                  </p>
                </div>
              </div>
            )}
          </ul>
          <div
            id="loader"
            tabIndex={-1}
            aria-hidden="true"
            className={`h-[34vh] relative flex items-center justify-center top-0 left-0 right-0 z-50 p-4 ${
              !loader ? "hidden" : ""
            } overflow-x-hidden overflow-y-auto md:inset-0 `}
          >
            <div className="fixed w-[5vw] bg-transparent flex items-center justify-center">
              <Triangle
                height="80"
                width="80"
                color="#017699"
                ariaLabel="triangle-loading"
                wrapperStyle={{fontWeight: "bolder"}}
                wrapperClass=""
                visible={true}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Recent;
