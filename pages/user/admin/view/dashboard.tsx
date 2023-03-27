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
      <button
        className="w-[100vw] h-[100vh] pt-20 overflow-x-hidden"
        onClick={notify}
      >
        Notify !
      </button>
      <ToastContainer />
      Dashboard
    </div>
  );
}

export default Home;
