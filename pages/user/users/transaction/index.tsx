import { useAtom, useAtomValue } from "jotai";
import React, { useEffect, useState } from "react";
import { userInfoAtom, userName, isVerified } from "../../../../state/jotai";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import { useRouter } from "next/router";
import { notify } from "../../../../components/users/settingsLayout/ProfileInfo";
import { ThreeDots } from "react-loader-spinner";

const transaction = () => {
  const info = useAtomValue(userInfoAtom);
  const [username, setUserName] = useAtom(userName);
  const [transactions, setTransactions] = useState<any[] | null>(null);
  const [dateList, setDateList] = useState<Set<string> | null>(null);
  const [loader, setLoader] = useState<boolean>(false);
  const router = useRouter();
  let user: string = username;
  let count = 1;

  useEffect(() => {
    if (!isVerified) {
      router.push("/user/users/");
    } else {
      callApi();
    }
  }, []);

  const callApi = async () => {
    if (username == "") {
      setLoader(true);
      await checkUser();
    }
    setLoader(true);
    await get_transaction();
  };

  async function checkUser() {
    await fetchUserName().then((result) => {
      if (result === false && username === "" && user == "") {
        if (count == 1) {
          notify(
            "Username Not Found: Set your Username first to perform transaction  ❌",
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

  const getDateList = (tx: any[]) => {
    const dates = tx.map((t) => t.date);
    const uniqueDates = new Set(dates);

    return uniqueDates;
  };

  useEffect(() => {
    if (transactions != null) {
      setDateList(getDateList(transactions));
      setLoader(false);
    }
  }, [transactions]);

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
          setTransactions(data);
        });
    } catch (error) {
      notify("Error Occurred: while fetching transactions", "error");
      console.log(error);
    }
  };

  return (
    <>
      <div className="pt-[4.5rem] w-[100vw] h-[100vh] overflow-x-hidden -z-10">
        <div className="w-[94vw] mx-auto my-3">
          <div className="w-full p-4 mb-2 bg-white sm:px-6 dark:bg-gray-800">
            <h3
              className="text-2xl font-semibold leading-6 text-gray-900 dark:text-white"
              onClick={get_transaction}
            >
              Transaction Records
            </h3>
            <p className="max-w-2xl mt-1 text-lg text-gray-500 dark:text-gray-200">
              Details and informations about all transactions.
            </p>
          </div>
          <ul className="flex flex-col">
            {dateList != null ? (
              Array.from(dateList).map((d) => {
                return (
                  <>
                    <div className="flex flex-row items-stretch justify-between">
                      <div className="border-b-2 border-gray-400 w-1/2 mb-5"></div>
                      <div className="px-4 py-2 text-xl font-semibold text-[#005c79] -z-10 w-48 flex justify-center">
                        {d}
                      </div>
                      <div className="w-1/2 border-b-2 border-gray-400 mb-5"></div>
                    </div>

                    {transactions != null
                      ? transactions?.map((tx) => {
                          if (tx.date === d) {
                            if (tx.type == "credit") {
                              return (
                                <>
                                  <li
                                    className="flex flex-row mb-2 rounded-md border-2 border-gray-100 hover:border-gray-200 hover:bg-gray-300"
                                    onClick={() => {
                                      router.push({
                                        pathname:
                                          "/user/users/transaction/record",
                                        query: {
                                          id: tx.id,
                                          From: tx.From,
                                          Amount: tx.Amount,
                                          time: tx.time,
                                          date: tx.date,
                                          type: tx.type,
                                        },
                                      });
                                    }}
                                  >
                                    <div className="text-gray-800 transition duration-500  ease-in-out transform hover:-translate-x-1 hover:shadow-lg select-none cursor-pointer bg-white dark:bg-gray-800 rounded-md flex flex-1 items-center px-4 py-3">
                                      <div className="flex flex-col items-center justify-center w-10 h-10 mr-4 border-2 border-black rounded-full">
                                        <div className="rounded-full p-2 bg-white border-2 border-green-600 mx-2">
                                          <BsArrowDown className="text-3xl text-green-600" />
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
                                      <div className="text-xl text-gray-600 dark:text-gray-200">
                                        Rs.&nbsp;{tx.Amount}
                                      </div>
                                      <button
                                        onClick={() => {
                                          router.push({
                                            pathname:
                                              "/user/users/transaction/record",
                                            query: {
                                              id: tx.id,
                                              From: tx.From,
                                              Amount: tx.Amount,
                                              time: tx.time,
                                              date: tx.date,
                                              type: tx.type,
                                            },
                                          });
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
                                  </li>
                                </>
                              );
                            } else {
                              return (
                                <>
                                  <li
                                    className="flex flex-row mb-2 rounded-md border-2 border-gray-100 hover:border-gray-200 hover:bg-gray-300 hover:border"
                                    onClick={() => {
                                      router.push({
                                        pathname:
                                          "/user/users/transaction/record",
                                        query: {
                                          id: tx.id,
                                          To: tx.To,
                                          Amount: tx.Amount,
                                          time: tx.time,
                                          date: tx.date,
                                          type: tx.type,
                                        },
                                      });
                                    }}
                                  >
                                    <div className="transition duration-500  ease-in-out transform hover:-translate-x-1 hover:shadow-md select-none cursor-pointer bg-white dark:bg-gray-800 rounded-md flex flex-1 items-center px-4 py-3">
                                      <div className="flex flex-col items-center justify-center w-10 h-10 mr-4 border-2 border-black rounded-full">
                                        <div className="rounded-full p-2 bg-white border-2 border-red-800 mx-2">
                                          <BsArrowUp className="text-3xl text-red-800" />
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
                                      <div className="text-xl text-gray-600 dark:text-gray-200">
                                        Rs.&nbsp;{tx.Amount}
                                      </div>
                                      <button
                                        onClick={() => {
                                          router.push({
                                            pathname:
                                              "/user/users/transaction/record",
                                            query: {
                                              id: tx.id,
                                              To: tx.To,
                                              Amount: tx.Amount,
                                              time: tx.time,
                                              date: tx.date,
                                              type: tx.type,
                                            },
                                          });
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
                                  </li>
                                </>
                              );
                            }
                          }
                        })
                      : ""}
                  </>
                );
              })
            ) : (
              <div
                tabIndex={-1}
                aria-hidden="true"
                className={`h-[100vh] ${
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
        <div className="absolute w-[5vw] bg-transparent flex items-center justify-center">
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
};

export default transaction;
