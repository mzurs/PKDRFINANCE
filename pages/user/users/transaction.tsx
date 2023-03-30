import React from "react";
import { GoPerson } from "react-icons/go";

const transaction = () => {
  return (
    <div className="pt-[4.5rem] w-[100vw] h-[100vh] overflow-x-hidden">
      <div className="w-[94vw] mx-auto my-3">
        <div className="w-full p-4 mb-2 bg-white sm:px-6 dark:bg-gray-800">
          <h3 className="text-2xl font-semibold leading-6 text-gray-900 dark:text-white">
            Transaction Records
          </h3>
          <p className="max-w-2xl mt-1 text-lg text-gray-500 dark:text-gray-200">
            Details and informations about all transactions.
          </p>
        </div>
        <ul className="flex flex-col">
          <li className="flex flex-row mb-2 border-gray-400">
            <div className="transition duration-500 shadow-sm ease-in-out transform hover:-translate-x-1 hover:shadow-lg select-none cursor-pointer bg-white dark:bg-gray-800 rounded-md flex flex-1 items-center p-4">
              <div className="flex flex-col items-center justify-center w-10 h-10 mr-4 border-2 border-black rounded-full">
                <div className="rounded-full p-2 bg-[#0ab0e3] mx-2">
                  <GoPerson className="text-3xl text-gray-100" />
                </div>
              </div>
              <div className="flex-1 pl-1 md:mr-16">
                <div className="font-medium text-lg dark:text-white">User Name</div>
                <div className="text-md text-gray-600 dark:text-gray-200">
                  example@gmail.com
                </div>
              </div>
              <div className="text-xl text-gray-600 dark:text-gray-200">
                0.00
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
          <li className="flex flex-row mb-2 border-gray-400">
            <div className="transition duration-500 shadow-sm ease-in-out transform hover:-translate-x-1 hover:shadow-lg select-none cursor-pointer bg-white dark:bg-gray-800 rounded-md flex flex-1 items-center p-4">
              <div className="flex flex-col items-center justify-center w-10 h-10 mr-4 border-2 border-black rounded-full">
                <div className="rounded-full p-2 bg-[#0ab0e3] mx-2">
                  <GoPerson className="text-3xl text-gray-100" />
                </div>
              </div>
              <div className="flex-1 pl-1 md:mr-16">
                <div className="font-medium text-lg dark:text-white">User Name</div>
                <div className="text-md text-gray-600 dark:text-gray-200">
                  example@gmail.com
                </div>
              </div>
              <div className="text-xl text-gray-600 dark:text-gray-200">
                0.00
              </div>
            </div>
          </li>
          <li className="flex flex-row mb-2 border-gray-400">
            <div className="transition duration-500 shadow-sm ease-in-out transform hover:-translate-x-1 hover:shadow-lg select-none cursor-pointer bg-white dark:bg-gray-800 rounded-md flex flex-1 items-center p-4">
              <div className="flex flex-col items-center justify-center w-10 h-10 mr-4 border-2 border-black rounded-full">
                <div className="rounded-full p-2 bg-[#0ab0e3] mx-2">
                  <GoPerson className="text-3xl text-gray-100" />
                </div>
              </div>
              <div className="flex-1 pl-1 md:mr-16">
                <div className="font-medium text-lg dark:text-white">User Name</div>
                <div className="text-md text-gray-600 dark:text-gray-200">
                  example@gmail.com
                </div>
              </div>
              <div className="text-xl text-gray-600 dark:text-gray-200">
                0.00
              </div>
            </div>
          </li>
          <li className="flex flex-row mb-2 border-gray-400">
            <div className="transition duration-500 shadow-sm ease-in-out transform hover:-translate-x-1 hover:shadow-lg select-none cursor-pointer bg-white dark:bg-gray-800 rounded-md flex flex-1 items-center p-4">
              <div className="flex flex-col items-center justify-center w-10 h-10 mr-4 border-2 border-black rounded-full">
                <div className="rounded-full p-2 bg-[#0ab0e3] mx-2">
                  <GoPerson className="text-3xl text-gray-100" />
                </div>
              </div>
              <div className="flex-1 pl-1 md:mr-16">
                <div className="font-medium text-lg dark:text-white">User Name</div>
                <div className="text-md text-gray-600 dark:text-gray-200">
                  example@gmail.com
                </div>
              </div>
              <div className="text-xl text-gray-600 dark:text-gray-200">
                0.00
              </div>
            </div>
          </li>
          <li className="flex flex-row mb-2 border-gray-400">
            <div className="transition duration-500 shadow-sm ease-in-out transform hover:-translate-x-1 hover:shadow-lg select-none cursor-pointer bg-white dark:bg-gray-800 rounded-md flex flex-1 items-center p-4">
              <div className="flex flex-col items-center justify-center w-10 h-10 mr-4 border-2 border-black rounded-full">
                <div className="rounded-full p-2 bg-[#0ab0e3] mx-2">
                  <GoPerson className="text-3xl text-gray-100" />
                </div>
              </div>
              <div className="flex-1 pl-1 md:mr-16">
                <div className="font-medium text-lg dark:text-white">User Name</div>
                <div className="text-md text-gray-600 dark:text-gray-200">
                  example@gmail.com
                </div>
              </div>
              <div className="text-xl text-gray-600 dark:text-gray-200">
                0.00
              </div>
            </div>
          </li>
          <li className="flex flex-row mb-2 border-gray-400">
            <div className="transition duration-500 shadow-sm ease-in-out transform hover:-translate-x-1 hover:shadow-lg select-none cursor-pointer bg-white dark:bg-gray-800 rounded-md flex flex-1 items-center p-4">
              <div className="flex flex-col items-center justify-center w-10 h-10 mr-4 border-2 border-black rounded-full">
                <div className="rounded-full p-2 bg-[#0ab0e3] mx-2">
                  <GoPerson className="text-3xl text-gray-100" />
                </div>
              </div>
              <div className="flex-1 pl-1 md:mr-16">
                <div className="font-medium text-lg dark:text-white">User Name</div>
                <div className="text-md text-gray-600 dark:text-gray-200">
                  example@gmail.com
                </div>
              </div>
              <div className="text-xl text-gray-600 dark:text-gray-200">
                0.00
              </div>
            </div>
          </li>
          <li className="flex flex-row mb-2 border-gray-400">
            <div className="transition duration-500 shadow-sm ease-in-out transform hover:-translate-x-1 hover:shadow-lg select-none cursor-pointer bg-white dark:bg-gray-800 rounded-md flex flex-1 items-center p-4">
              <div className="flex flex-col items-center justify-center w-10 h-10 mr-4 border-2 border-black rounded-full">
                <div className="rounded-full p-2 bg-[#0ab0e3] mx-2">
                  <GoPerson className="text-3xl text-gray-100" />
                </div>
              </div>
              <div className="flex-1 pl-1 md:mr-16">
                <div className="font-medium text-lg dark:text-white">User Name</div>
                <div className="text-md text-gray-600 dark:text-gray-200">
                  example@gmail.com
                </div>
              </div>
              <div className="text-xl text-gray-600 dark:text-gray-200">
                0.00
              </div>
            </div>
          </li>
          <li className="flex flex-row mb-2 border-gray-400">
            <div className="transition duration-500 shadow-sm ease-in-out transform hover:-translate-x-1 hover:shadow-lg select-none cursor-pointer bg-white dark:bg-gray-800 rounded-md flex flex-1 items-center p-4">
              <div className="flex flex-col items-center justify-center w-10 h-10 mr-4 border-2 border-black rounded-full">
                <div className="rounded-full p-2 bg-[#0ab0e3] mx-2">
                  <GoPerson className="text-3xl text-gray-100" />
                </div>
              </div>
              <div className="flex-1 pl-1 md:mr-16">
                <div className="font-medium text-lg dark:text-white">User Name</div>
                <div className="text-md text-gray-600 dark:text-gray-200">
                  example@gmail.com
                </div>
              </div>
              <div className="text-xl text-gray-600 dark:text-gray-200">
                0.00
              </div>
            </div>
          </li>
          <li className="flex flex-row mb-2 border-gray-400">
            <div className="transition duration-500 shadow-sm ease-in-out transform hover:-translate-x-1 hover:shadow-lg select-none cursor-pointer bg-white dark:bg-gray-800 rounded-md flex flex-1 items-center p-4">
              <div className="flex flex-col items-center justify-center w-10 h-10 mr-4 border-2 border-black rounded-full">
                <div className="rounded-full p-2 bg-[#0ab0e3] mx-2">
                  <GoPerson className="text-3xl text-gray-100" />
                </div>
              </div>
              <div className="flex-1 pl-1 md:mr-16">
                <div className="font-medium text-lg dark:text-white">User Name</div>
                <div className="text-md text-gray-600 dark:text-gray-200">
                  example@gmail.com
                </div>
              </div>
              <div className="text-xl text-gray-600 dark:text-gray-200">
                0.00
              </div>
            </div>
          </li>
          <li className="flex flex-row mb-2 border-gray-400">
            <div className="transition duration-500 shadow-sm ease-in-out transform hover:-translate-x-1 hover:shadow-lg select-none cursor-pointer bg-white dark:bg-gray-800 rounded-md flex flex-1 items-center p-4">
              <div className="flex flex-col items-center justify-center w-10 h-10 mr-4 border-2 border-black rounded-full">
                <div className="rounded-full p-2 bg-[#0ab0e3] mx-2">
                  <GoPerson className="text-3xl text-gray-100" />
                </div>
              </div>
              <div className="flex-1 pl-1 md:mr-16">
                <div className="font-medium text-lg dark:text-white">User Name</div>
                <div className="text-md text-gray-600 dark:text-gray-200">
                  example@gmail.com
                </div>
              </div>
              <div className="text-xl text-gray-600 dark:text-gray-200">
                0.00
              </div>
            </div>
          </li>
          <li className="flex flex-row mb-2 border-gray-400">
            <div className="transition duration-500 shadow-sm ease-in-out transform hover:-translate-x-1 hover:shadow-lg select-none cursor-pointer bg-white dark:bg-gray-800 rounded-md flex flex-1 items-center p-4">
              <div className="flex flex-col items-center justify-center w-10 h-10 mr-4 border-2 border-black rounded-full">
                <div className="rounded-full p-2 bg-[#0ab0e3] mx-2">
                  <GoPerson className="text-3xl text-gray-100" />
                </div>
              </div>
              <div className="flex-1 pl-1 md:mr-16">
                <div className="font-medium text-lg dark:text-white">User Name</div>
                <div className="text-md text-gray-600 dark:text-gray-200">
                  example@gmail.com
                </div>
              </div>
              <div className="text-xl text-gray-600 dark:text-gray-200">
                0.00
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default transaction;