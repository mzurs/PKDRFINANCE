import React, { useState } from "react";
// import Loading from '../components/loading/Loading'
import dynamic from "next/dynamic";
const Loading = dynamic(() => import("../components/loading/Loading"), {
  ssr: false,
});
function login() {
  return <div></div>
}

export default login;
