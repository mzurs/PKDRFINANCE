import Link from "next/link";
import React from "react";
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
function Dashboard({ users }: any) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip,
    Legend
  );
  return (
    <div>
      <div className="w-screen flex items-center justify-center">
        <div className="py-4 sm:py-6 md:py-8 bg-black shadow rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-6 xl:px-10 gap-y-8 gap-x-12 2xl:gap-x-28">
            <div className="w-full">
              <p className="text-xs md:text-sm font-medium leading-none text-white uppercase">
                Users
              </p>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-3 text-white mt-3 md:mt-5">
                89.5%
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
                    {/* <div className="w-1/2 h-1 bg-blue-500 rounded-full" /> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full">
              <p className="text-xs md:text-sm font-medium leading-none text-white uppercase">
                M.Cap ($)
              </p>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-3 text-white mt-3 md:mt-5">
                $75,000
              </p>
              <div className="flex flex-col">
                <div className="h-4" />
                <div className="md:w-64 mt-2.5">
                  <div className="w-full h-1 bg-gray-200 rounded-full">
                    {/* <div className="w-40 h-1 bg-lime-500 rounded-full" /> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full">
              <p className="text-xs md:text-sm font-medium leading-none text-white uppercase">
                M.Cap (PKR)
              </p>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-3 text-white mt-3 md:mt-5">
                3922
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
                    {/* <div className="w-44 h-1 bg-yellow-500 rounded-full" /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* chart */}
      <div className=" grid grid-cols-1 place-items-center   ">
        <div>
          <Line
            data={{
              labels: users.map((user: any) => user.items_delievered),
              datasets: [
                {
                  label: "T-Cap",
                  data: users.map((user: any) => user.items_delievered),
                  // backgroundColor: "blue",
                  borderColor: "white",
                  borderWidth: 1,
                },
              ],
            }}
          />{" "}
        </div>
    
      </div>
    </div>
  );
}

export default Dashboard;
