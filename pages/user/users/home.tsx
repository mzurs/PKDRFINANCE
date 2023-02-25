import React, { useState } from "react";
import { userInfoAtom } from "../../../state/jotai";
import { useAtom, useAtomValue } from "jotai";
import { VscLock, VscUnlock } from "react-icons/vsc";
import { AiFillEyeInvisible } from "react-icons/ai";

const Home = () => {
  const info = useAtomValue(userInfoAtom);
  const [ShowMoney, setShowMoney] = useState<boolean>(true);
  const [Money, setMoney] = useState<number>(0);

  const noExponents = function (num: number) {
    var data = String(num).split(/[eE]/);
    if (data.length == 1) return data[0];

    var z = "",
      sign = num < 0 ? "-" : "",
      str = data[0].replace(".", ""),
      mag = Number(data[1]) + 1;

    if (mag < 0) {
      z = sign + "0.";
      while (mag++) z += "0";
      return z + str.replace(/^\-/, "");
    }
    mag -= str.length;
    while (mag--) z += "0";
    return str + z;
  };

  const Rupee = () => {
    let num = noExponents(Money);
    let arr = num.split(".");
    let len = arr.length;
    if (len == 1) {
      return num + ".00";
    }
    if (arr[1].length == 1) {
      return num + "0";
    } else {
      return num;
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] pt-20 overflow-x-hidden">
      <div className="h-20%">
        <div className="flex justify-between mx-4 py-2 border-b-2 border-gray-300">
          <p className="text-2xl font-semibold">What I Have</p>
          <div className="flex items-center ">
            <VscLock
              title="Unlock"
              className={`${
                !ShowMoney ? "block" : "hidden"
              } text-3xl mr-3 text-[#009ac9] cursor-pointer`}
              onClick={() => setShowMoney(true)}
            />
            <VscUnlock
              title="Lock"
              className={`${
                ShowMoney ? "block" : "hidden"
              } text-3xl mr-3 text-[#038fba] cursor-pointer`}
              onClick={() => setShowMoney(false)}
            />
            <p className="text-lg">PKR</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="mx-4 w-3/4 py-2">
            <p className="text-xl font-medium">Deposit Account</p>
            <div className="mx-4 py-2 text-xl text-gray-800 font-light">
              <p>
                Account Name :{" "}
                <span className="text-[#009ac9] font-normal">{info.name}</span>
              </p>
              <p>
                Account&nbsp; Email :{" "}
                <span className="text-[#009ac9] font-normal">{info.email}</span>
              </p>
            </div>
          </div>
          <div className="w-1/4 flex justify-end">
            <form action="/api/checkout/checkout_sessions" method="POST">
              <button className="mr-4 bg-[#028db7] mx-auto rounded-full text-white py-2 px-3 hover:bg-[#017699] text-xl hover:underline">
                Load Money
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="h-[55%] flex items-center justify-center ">
        <div className={`${ShowMoney ? "block" : "hidden"}`}>
          <p className="text-center text-[#009ac9] text-9xl pb-2 border-b-2 border-gray-300 font-medium">
            {Rupee()}
          </p>
          <p className="pt-2 text-center">Avialable Balance</p>
        </div>
        <div className={`${!ShowMoney ? "block" : "hidden"}`}>
          <div className="border-b-2 border-gray-300 px-2">
            <AiFillEyeInvisible className="text-[#009ac9] lg:text-[170px] inline-block pb-2" />
          </div>
          <p className="pt-2 text-center">Unlock To View Balance</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
