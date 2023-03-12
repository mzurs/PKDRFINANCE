import Link from "next/link";
import React from "react";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
// minified version is also included
// import 'react-toastify/dist/ReactToastify.min.css';

function Home() {
  const notify = () => toast("Error !");

  return (
    <div className="w-[100vw] h-[100vh] pt-20 overflow-x-hidden">
      {/* <button className="w-[100vw] h-[100vh] pt-20 overflow-x-hidden" onClick={notify}>Notify !</button>
      <ToastContainer /> */}
      <br></br>
      <a
        href="/user/admin/dashboard"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Read more
      </a>
    </div>
  );
}

export default Home;
