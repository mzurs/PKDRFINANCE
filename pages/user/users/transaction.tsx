import { useAtom, useAtomValue } from "jotai";
import React, { useEffect, useState } from "react";
import { GoPerson } from "react-icons/go";
import { userInfoAtom, userName } from "../../../state/jotai";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";

const transaction = () => {
  type ReturnParams = {
    id: string;
    From: string;
    Amount: number;
    TimeStamp: number;
  };

  const info = useAtomValue(userInfoAtom);
  const [username, setUserName] = useAtom(userName);
  const [transactions, setTransactions] = useState<any[] | null>(null);
  const [dateList, setDateList] = useState<Set<string> | null>(null);
  const [display, setDisplay] = useState<boolean>();
  const [apiWorked, setApiWork] = useState<boolean>(false);
  let worked = false;

  const getDateList = (tx: any[]) => {
    const dates = tx.map((t) => t.date);
    const uniqueDates = new Set(dates);

    return uniqueDates;
  };

  const getSortedList = (
    credit: ReturnParams[] | null,
    debit: ReturnParams[] | null
  ): any[] | null => {
    let transaction: any[] = [];
    if (credit != null) {
      credit.forEach(function (element: any) {
        let date = new Date(element.TimeStamp);
        element.type = "credit";
        element.time = date.toLocaleTimeString();
        element.date = date.toLocaleDateString("en-US", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
      });
    }
    if (debit != null) {
      debit.forEach(function (element: any) {
        let date = new Date(element.TimeStamp);
        element.type = "debit";
        element.time = date.toLocaleTimeString();
        element.date = date.toLocaleDateString("en-US", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
      });
    }
    if (credit != null && debit != null) {
      transaction = credit.concat(debit);
    } else if (credit != null) {
      transaction = credit;
    } else if (debit != null) {
      transaction = debit;
    }
    if (credit != null || debit != null) {
      transaction.sort((a: any, b: any) => b.TimeStamp - a.TimeStamp);
      return transaction;
    } else {
      return null;
    }
  };

  const get_transaction = async (): Promise<boolean> => {
    try {
      const headers = new Headers();
      headers.append("content-type", "application/json");
      headers.append(
        "x-custom-header",
        JSON.stringify(["info.idToken", "info.oAuthIdToken]"])
      );
      const credit_response = await fetch(
        "/api/user/query/recentTransactions/getCreditList",
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify({ username: username }),
        }
      );
      const debit_response = await fetch(
        "/api/user/query/recentTransactions/getDebitList",
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify({ username: username }),
        }
      );

      const credit = await credit_response.json();
      const debit = await debit_response.json();

      setTransactions(getSortedList(credit, debit));
      if (transactions != null) {
        setDateList(getDateList(transactions));
      }

      dateList?.forEach((date) => {
        console.log(`-------------DATE---${date}-----------`);
        transactions?.forEach((object) => {
          if (object.date == date) {
            console.log(
              `🚀Date: ${object.date} ~ Time: ${object.time}~ object:`,
              object
            );
          }
        });
      });
      worked = true;
      setApiWork(worked);
      return true;
    } catch (error) {
      console.log(error);
      worked = false;
      setApiWork(worked);
      return false;
    }
  };

  useEffect(() => {
    callApi();
  }, []);

  const callApi = async () => {
    for (let index = 0; index < 3; index++) {
      if (!(await get_transaction()) && !apiWorked) {
        setApiWork(false);
      }
    }
  };
  return (
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
          {dateList != null
            ? Array.from(dateList).map((d) => {
                return (
                  <>
                    <div className="flex flex-row items-stretch justify-between">
                      <div className="border-b-2 border-gray-400 w-1/2 mb-5"></div>
                      <div className="px-4 py-2 text-xl font-semibold text-[#127d9e] -z-10 w-48 flex justify-center">
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
                                  <li className="flex flex-row mb-2 border-gray-400  -z-10">
                                    <div className="transition duration-500 shadow-sm ease-in-out transform hover:-translate-x-1 hover:shadow-lg select-none cursor-pointer bg-white dark:bg-gray-800 rounded-md flex flex-1 items-center p-4 -z-10">
                                      <div className="flex flex-col items-center justify-center w-10 h-10 mr-4 border-2 border-black rounded-full">
                                        <div className="rounded-full p-2 bg-[#1aa4a2] mx-2">
                                          <BsArrowDown className="text-3xl text-gray-100" />
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
                                      {/* <button className="flex justify-end w-24 text-right">
                      <svg
                        width="12"
                        fill="currentColor"
                        height="12"
                        className="text-gray-500 hover:text-gray-800 dark:hover:text-white dark:text-gray-200"
                        viewBox="0 0 1792 1792"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
                      </svg>
                    </button> */}
                                    </div>
                                  </li>
                                </>
                              );
                            } else {
                              return (
                                <>
                                  <li className="flex flex-row mb-2 border-gray-400">
                                    <div className="transition duration-500 shadow-sm ease-in-out transform hover:-translate-x-1 hover:shadow-lg select-none cursor-pointer bg-white dark:bg-gray-800 rounded-md flex flex-1 items-center p-4 -z-10">
                                      <div className="flex flex-col items-center justify-center w-10 h-10 mr-4 border-2 border-black rounded-full">
                                        <div className="rounded-full p-2 bg-[#920f0f] mx-2">
                                          <BsArrowUp className="text-3xl text-gray-100" />
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
                                      {/* <button className="flex justify-end w-24 text-right">
                      <svg
                        width="12"
                        fill="currentColor"
                        height="12"
                        className="text-gray-500 hover:text-gray-800 dark:hover:text-white dark:text-gray-200"
                        viewBox="0 0 1792 1792"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
                      </svg>
                    </button> */}
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
            : ""}
        </ul>
      </div>
    </div>
  );
};

export default transaction;
