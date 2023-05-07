import { useAtom, useAtomValue } from "jotai";
import React, { useEffect, useState } from "react";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import { useRouter } from "next/router";
import { notify } from "../../../../components/users/settingsLayout/ProfileInfo";
import { ThreeDots } from "react-loader-spinner";
import moment from "moment";
import { BiTransferAlt } from "react-icons/bi";

const transaction = () => {
  const [transactions, setTransactions] = useState<any[] | null>(null);
  const [dateList, setDateList] = useState<Set<string> | null>(null);
  const [loader, setLoader] = useState<boolean>(false);
  const router = useRouter();
  let count = 1;

  useEffect(() => {
    setLoader(true);
    get_transaction();
  }, []);

  const getDateList = () => {
    let dates: any[] = [];
    try {
      transactions?.forEach((record) => {
        let momentObj = moment(record.TimeStamp);
        let d = momentObj.format("DD/MMM/YYYY");
        dates.push(d);
      });

      const uniqueDates = new Set(dates);
      setDateList(uniqueDates);
    } catch (err) {
      console.error(err);
    }
    setLoader(false);
  };

  useEffect(() => {
    if (transactions != null) {
      getDateList();
      setLoader(false);
    }
  }, [transactions]);

  const get_transaction = async () => {
    try {
      await fetch("/api/admin/query/getAllTransactionList", {
        method: "POST",
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
      <div className="pt-[4.5rem] w-[100vw] h-[100vh] overflow-x-hidden -z-10 bg-black">
        <div className="w-[94vw] mx-auto my-3 bg-black">
          <div className="w-full p-4 mb-2 bg-black sm:px-6 shadow-black border-2 border-transparent">
            <h3 className="text-4xl pt-5 text-center font-semibold leading-6 text-[#518a5e] shadow-black">
              Transaction Records of Users
            </h3>
            <p className="text-lg pt-5 text-center font-semibold leading-6 text-[#518a5e] shadow-black">
              Details and informations about all transactions of Users.
            </p>
          </div>
          <ul className="flex flex-col">
            {dateList != null ? (
              Array.from(dateList).map((d) => {
                return (
                  <>
                    <div className="flex flex-row items-stretch justify-between">
                      <div className="border-b-2 border-[#45613c] w-1/2 mb-5"></div>
                      <div className="px-4 py-2 text-xl font-semibold text-[#5a9868] w-48 flex justify-center">
                        {d}
                      </div>
                      <div className="w-1/2 border-b-2 border-[#45613c] mb-5"></div>
                    </div>

                    {transactions != null
                      ? transactions?.map((tx) => {
                          if (
                            moment(tx.TimeStamp).format("DD/MMM/YYYY") === d
                          ) {
                            if (tx.Type === "DEPOSIT") {
                              return (
                                <>
                                  <li
                                    className="flex flex-row mb-2 rounded-md border-2 border-transparent hover:border-[#2f2f2f] hover:bg-[#2f2f2fb3]"
                                    onClick={() => {
                                      router.push({
                                        pathname:
                                          "/user/admin/transaction/record",
                                        query: {
                                          id: tx.id,
                                          From: tx.From,
                                          Amount: tx.Amount,
                                          TimeStamp: tx.TimeStamp,
                                          type: tx.Type,
                                        },
                                      });
                                    }}
                                  >
                                    <div className=" transition duration-500 bg-[#1e1e1eab] ease-in-out transform hover:translate-x-0.5 hover:shadow-lg select-none cursor-pointer text-white  rounded-md flex flex-1 items-center px-4 py-3">
                                      <div className="flex flex-col items-center justify-center w-10 h-10 mr-4 border-2 border-black rounded-full">
                                        <div className="rounded-full p-2 bg-black border-2 border-green-600 mx-2">
                                          <BsArrowDown className="text-3xl text-green-600" />
                                        </div>
                                      </div>
                                      <div className="flex-1 md:pl-1 md:mr-16  ml-4">
                                        <div className="font-medium text-lg text-white">
                                          <div>From :&nbsp; {tx.From}</div>
                                          <div>To :&nbsp; {tx.To}</div>
                                        </div>
                                        <div className="text-sm  text-gray-400">
                                          {tx.Type}
                                        </div>
                                      </div>
                                      <div className="text-xl text-[#5a9868]">
                                        Rs.&nbsp;{tx.Amount}
                                      </div>
                                      <button
                                        onClick={() => {
                                          router.push({
                                            pathname:
                                              "/user/admin/transaction/record",
                                            query: {
                                              id: tx.id,
                                              From: tx.From,
                                              Amount: tx.Amount,
                                              TimeStamp: tx.TimeStamp,
                                              type: tx.Type,
                                            },
                                          });
                                        }}
                                        className="flex justify-end ml-5 pl-4 py-5 text-right hover:text-gray-800 text-white dark:hover:text-white dark:text-gray-200"
                                      >
                                        <svg
                                          width="18"
                                          fill="currentColor"
                                          height="18"
                                          className="hover:text-[#A1C084] text-[#518a5e]"
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
                            } else if (tx.Type === "WITHDRAW") {
                              return (
                                <>
                                  <li
                                    className="flex flex-row mb-2 rounded-md border-2 border-transparent text-white hover:border-[#2f2f2f] hover:bg-[#2f2f2fb3] hover:border"
                                    onClick={() => {
                                      router.push({
                                        pathname:
                                          "/user/users/transaction/record",
                                        query: {
                                          id: tx.id,
                                          To: tx.To,
                                          Amount: tx.Amount,
                                          TimeStamp: tx.TimeStamp,
                                          type: tx.Type,
                                        },
                                      });
                                    }}
                                  >
                                    <div className="transition duration-500 bg-[#1e1e1eab] ease-in-out transform hover:translate-x-0.5 hover:shadow-md select-none cursor-pointer  rounded-md flex flex-1 items-center px-4 py-3">
                                      <div className="flex flex-col items-center justify-center w-10 h-10 mr-4 border-2 border-black rounded-full">
                                        <div className="rounded-full p-2 bg-black border-2 border-red-800 mx-2">
                                          <BsArrowUp className="text-3xl text-red-800" />
                                        </div>
                                      </div>
                                      <div className="flex-1 md:pl-1 md:mr-16  ml-4">
                                        <div className="font-medium text-lg text-white">
                                          <div>From :&nbsp; {tx.From}</div>
                                          <div>To : &nbsp;{tx.To}</div>
                                        </div>
                                        <div className="text-sm  text-gray-400">
                                          {tx.Type}
                                        </div>
                                      </div>
                                      <div className="text-xl text-[#5a9868]">
                                        Rs.&nbsp;{tx.Amount}
                                      </div>
                                      <button
                                        onClick={() => {
                                          router.push({
                                            pathname:
                                              "/user/admin/transaction/record",
                                            query: {
                                              id: tx.id,
                                              To: tx.To,
                                              Amount: tx.Amount,
                                              TimeStamp: tx.TimeStamp,
                                              type: tx.Type,
                                            },
                                          });
                                        }}
                                        className="flex justify-end ml-5 pl-4 py-5 text-right text-white hover:text-gray-800  dark:hover:text-white dark:text-gray-200"
                                      >
                                        <svg
                                          width="18"
                                          fill="currentColor"
                                          height="18"
                                          className="hover:text-[#A1C084] text-[#518a5e]"
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
                            } else if (tx.Type === "TRANSFER") {
                              return (
                                <>
                                  <li
                                    className="flex flex-row mb-2 rounded-md border-2 border-transparent text-white hover:border-[#2f2f2f] hover:bg-[#2f2f2fb3] hover:border"
                                    onClick={() => {
                                      router.push({
                                        pathname:
                                          "/user/admin/transaction/record",
                                        query: {
                                          id: tx.id,
                                          To: tx.To,
                                          TimeStamp: tx.TimeStamp,
                                          date: tx.date,
                                          type: tx.Type,
                                        },
                                      });
                                    }}
                                  >
                                    <div className="transition duration-500 bg-[#1e1e1eab] ease-in-out transform hover:translate-x-0.5 hover:shadow-md select-none cursor-pointer  rounded-md flex flex-1 items-center px-4 py-3">
                                      <div className="flex flex-col items-center justify-center w-10 h-10 mr-4 border-2 border-black rounded-full">
                                        <div className="rounded-full p-2 bg-black border-2 border-[#69A2B0] mx-2">
                                          <BiTransferAlt className="text-3xl text-[#69A2B0]" />
                                        </div>
                                      </div>
                                      <div className="flex-1 md:pl-1 md:mr-16  ml-4">
                                        <div className="font-medium text-lg text-white">
                                          <div>From :&nbsp; {tx.From}</div>
                                          <div>To :&nbsp; {tx.To}</div>
                                        </div>
                                        <div className="text-sm  text-gray-400">
                                          {tx.Type}
                                        </div>
                                      </div>
                                      <div className="text-xl text-[#5a9868]">
                                        Rs.&nbsp;{tx.Amount}
                                      </div>
                                      <button
                                        onClick={() => {
                                          router.push({
                                            pathname:
                                              "/user/admin/transaction/record",
                                            query: {
                                              id: tx.id,
                                              To: tx.To,
                                              TimeStamp: tx.TimeStamp,
                                              date: tx.date,
                                              type: tx.Type,
                                            },
                                          });
                                        }}
                                        className="flex justify-end ml-5 pl-4 py-5 text-right text-white hover:text-gray-800  dark:hover:text-white dark:text-gray-200"
                                      >
                                        <svg
                                          width="18"
                                          fill="currentColor"
                                          height="18"
                                          className="hover:text-[#A1C084] text-[#518a5e]"
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
                className={`h-[60vh] ${
                  loader ? "hidden" : ""
                } relative flex items-center justify-center top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 `}
              >
                <div className="fixed w-full bg-transparent flex items-center justify-center">
                  <p className="text-2xl font-medium text-white">
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
        className={`bg-[#000000a2] fixed flex items-center justify-center  top-0 left-0 right-0 z-50  w-[100vw] p-4 ${
          !loader ? "hidden" : ""
        } overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div className="absolute w-[5vw] bg-transparent  flex items-center justify-center">
          <ThreeDots
            height="120"
            width="120"
            radius="9"
            color="#508d5d"
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
