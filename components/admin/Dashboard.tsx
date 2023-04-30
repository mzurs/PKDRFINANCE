import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Tooltip,
  PointElement,
  Legend,
} from "chart.js";
import "react-toastify/dist/ReactToastify.css";
import { useAtom } from "jotai";
import { userInfoAtom, web3authAtom } from "../../state/jotai";
import { time } from "console";
import { BarChart } from "./charts/BarChart";
function Dashboard({ users }: any) {
  const [userCount, setUserCount] = useState<number | null>(0);
  const [pkdrCapInPKR, setPkdrCapInPKR] = useState<number | null>(0);
  const [pkdrCapInUSD, setPkdrCapInUSD] = useState<number | null>(0);
  const [web3auth] = useAtom(web3authAtom);
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);
  const [timer, setTimer] = useState(3000);
  ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip,
    Legend
  );

  const getUsersCount = async (): Promise<number> => {
    const headers = new Headers();
    headers.append("content-type", "application/json");
    headers.append("x-custom-header", JSON.stringify(["abc"]));
    const response = await fetch("/api/admin/query/getUsersCount", {
      method: "GET",
      headers: headers,
    });

    const data = await response.json();
    setUserCount(data);
    console.log("🚀 ~ file: Dashboard.tsx:47 ~ userscount ~ data:", data);
    return data;
  };
  const getUSDPKRRate = async (): Promise<number> => {
    const headers = new Headers();
    headers.append("content-type", "application/json");
    headers.append("x-custom-header", JSON.stringify(["abc"]));
    const response = await fetch("/api/admin/query/getRateUSDPKR", {
      method: "GET",
      headers: headers,
    });

    const data = await response.json();
    // setPkdrCapInUSD(data);
    console.log("🚀 ~ file: Dashboard.tsx:47 ~ getUSDPKRRate ~ data:", data);
    return data;
  };
  const getPKDRTotalSupply = async () => {
    const headers = new Headers();
    headers.append("content-type", "application/json");
    headers.append("x-custom-header", JSON.stringify(["abc"]));
    const response = await fetch("/api/admin/query/totalSupply", {
      method: "GET",
      headers: headers,
    });
    console.log(
      "🚀 ~ file: Dashboard.tsx:55 ~ getPKDRTotalSupply ~ response:",
      response
    );

    const data = await response.json();
    setPkdrCapInPKR(data);
    console.log(
      "🚀 ~ file: Dashboard.tsx:47 ~ getPKDRTotalSupply ~ data:",
      data
    );
    const rate = await getUSDPKRRate();
    setPkdrCapInUSD(data / rate);
  };

  // useEffect(() => {
  //   getPKDRTotalSupply();
  // });
  useEffect(() => {
    const intervalId = setInterval(() => {
      // your effect code here
      getPKDRTotalSupply();
      getUsersCount();
      console.log(timer);
    }, timer);

    // cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);
  return (
    <div>
      <div className="w-screen flex items-center justify-center">
        <div className="py-4 sm:py-6 md:py-8 bg-black shadow rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-6 xl:px-10 gap-y-8 gap-x-12 2xl:gap-x-28">
            <div className="w-full ">
              <p className="text-xs md:text-sm font-medium leading-none text-white text-center uppercase">
                Users
              </p>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-3 text-white text-center mt-3 md:mt-5">
                {userCount}{" "}
              </p>
              <div className="flex flex-col md:w-64">
                <div className="w-full flex justify-end">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M8 3.33334V12.6667"
                        stroke="#16A34A"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 7.33334L8 3.33334"
                        stroke="#16A34A"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M4 7.33334L8 3.33334"
                        stroke="#16A34A"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="text-xs leading-none text-green-600">4.3%</p>
                  </div>
                </div>
                <div className="mt-2.5">
                  <div className="w-full h-1 bg-gray-200 rounded-full">
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full">
              <p className="text-xs md:text-sm font-medium leading-none text-white text-center uppercase">
                M.Cap ($)
              </p>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-3  text-white text-center mt-3 md:mt-5">
                {pkdrCapInUSD?.toFixed(2)} USD
              </p>

              <div className="flex flex-col">
                <div className="h-4" />
                <div className="md:w-64 mt-2.5">
                  <div className="w-full h-1 bg-gray-200 rounded-full">
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full">
              <p className="text-xs md:text-sm font-medium leading-none text-white text-center uppercase">
                M.Cap (PKR)
              </p>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-3 text-white text-center mt-3 md:mt-5">
                {pkdrCapInPKR} PKDR
              </p>
              <div className="flex flex-col md:w-64">
                <div className="w-full flex justify-end">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M8 3.33334V12.6667"
                        stroke="#16A34A"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 7.33334L8 3.33334"
                        stroke="#16A34A"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M4 7.33334L8 3.33334"
                        stroke="#16A34A"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="text-xs leading-none text-green-600">9.1%</p>
                  </div>
                </div>
                <div className="mt-2.5">
                  <div className="w-full h-1 bg-gray-200 rounded-full">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* chart */}
      <div className="flex justify-evenly pt-20">
        <div className="h-[55vh] bg-[#0e0e0e] w-[48.5vw] shadow-md rounded-xl border-2 border-[#171717]">
          <Line
            data={{
              labels: users.map((user: any) => user.items_delievered),
              datasets: [
                {
                  label: "T-Cap",
                  data: users.map((user: any) => user.items_delievered),
                  backgroundColor: "green",
                  borderColor: "green",
                  borderWidth: 2,
                },
              ],
            }}
          />
        </div>
        <div className="h-[55vh] bg-[#0e0e0e] w-[48.5vw] shadow-md rounded-xl border-2 border-[#171717]">
          <BarChart/>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
