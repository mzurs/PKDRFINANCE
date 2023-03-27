import React from "react";

function Transactions() {
  return (
    // <!-- component -->
    // <!-- This is an example component -->
    <div className="max-w-100 mx-auto bg-black">
      <h1 className=" mt-20	mb-20 text-4xl	 text-white  underline text-center">
        Recent Transactions
      </h1>
      <div className=" relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="p-4 ">
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative mt-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="table-search"
              className="bg-gray-50  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for items"
            />
          </div>
        </div>
        <table className="border-x-1  mx-auto	 text-left text-white">
          <thead
            className=" border-b-4

text-xl uppercase bg-black dark:bg-gray-700 text-white"
          >
            <tr>
              <th scope="col" className="p-4"></th>
              <th scope="col" className="px-6 py-3">
                Tx Hash
              </th>
              <th scope="col" className="px-6 py-3">
                From
              </th>
              <th scope="col" className="px-6 py-3">
                To
              </th>
              <th scope="col" className="px-6 py-3">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className=" border-b text-white">
              <td className="w-4 p-4"></td>
              <th
                scope="row"
                className="hover:underline px-6 py-4 font-medium text-white  whitespace-nowrap"
              >
                Apple MacBook Pro 17"
              </th>
              <td className="px-6 py-4">Sliver</td>
              <td className="px-6 py-4">Laptop</td>
              <td className="px-6 py-4">$2999</td>
            </tr>
            <tr className="bg-black border-b text-white">
              <td className="w-4 p-4"></td>
              <th
                scope="row"
                className="hover:underline px-6 py-4 font-medium text-white dark:text-white whitespace-nowrap"
              >
                Apple MacBook Pro 17"
              </th>
              <td className="px-6 py-4">White</td>
              <td className="px-6 py-4">Laptop PC</td>
              <td className="px-6 py-4">$1999</td>
            </tr>
            <tr className="bg-black border-b text-white">
              <td className="w-4 p-4"></td>
              <th
                scope="row"
                className="hover:underline px-6 py-4 font-medium text-white dark:text-white whitespace-nowrap"
              >
                Apple MacBook Pro 17"
              </th>
              <td className="px-6 py-4">Black</td>
              <td className="px-6 py-4">Accessories</td>
              <td className="px-6 py-4">$99</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Transactions;
