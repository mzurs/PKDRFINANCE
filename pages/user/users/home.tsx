import React, { useEffect, useState } from "react";
import MultilineChart from "../../../components/users/MultilineChart";
import Doughnet from "../../../components/users/Doughnut";
import { userInfoAtom } from "../../../state/jotai";
import { useAtom, useAtomValue } from "jotai";
import Cards from "../../../components/users/Cards";
import Recent from "../../../components/users/Recent";

// const [date, setDate] = useState<any>(" ");

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

  const Rupee = (Num: number) => {
    let num = noExponents(Num);
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
    <div>
      <div className="flex pt-[4.5rem] w-[100vw] overflow-x-hidden">
        <div className="w-5/12 h-full">
          <div className="flex justify-center items-center flex-col mx-8">
            <div className="font-medium text-gray-80 text-4xl pt-12">
              Hello , {info.name}
            </div>
            <div className="pt-3">{new Date().toString()}</div>
          </div>
          <div
            className="flex justify-between items-center m-16 bg-blue-100 rounded-2xl text-blue-700 px-4 py-3"
            role="alert"
          >
            <div>
              <p className="font-bold">New Messages</p>
              <p className="text-sm">Some unread messages.</p>
            </div>
            <div>
              <div className="text-blue-100 bg-blue-700 rounded-2xl w-9 p-1 text-center">
                15
              </div>
            </div>
          </div>
          <div className="md:mt-24 mx-8">
            <Cards
              title={"Available Balance"}
              sub={info.email}
              btn_txt={"View Statement"}
              money={`$${Rupee(Money)}`}
            />
          </div>
        </div>

        <div className="w-9/12 h-full">
          <div className="h-[35vh] flex justify-center">
            <MultilineChart />
          </div>
          <div className="flex justify-between mr-8">
            <div className="w-6/12 h-[27vh]">
              <Cards
                title={"Upcoming Payments"}
                sub={"AT&T Family Package Plan"}
                btn_txt={"Pay Now"}
                money={`$${Rupee(250)}`}
              />
            </div>

            <div className="w-[29vw] h-[27vh] my-2 border-2 shadow-lg">
              <div className="flex justify-between">
                <div className="pt-3 px-4">
                  <p className="text-2xl font-extrabold">Savings</p>
                  <div className="text-lg font-bold py-1">
                    Checkout our saving plans for maximum savings
                  </div>
                </div>
                <div className="h-[20vh] w-[11vw]">
                  <Doughnet />
                </div>
              </div>
              <div>
                <button className="bg-blue-700 text-blue-100 text-lg font-medium mx-6 my-3 px-2 py-1 rounded-xl float-right">
                  Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Recent title={"Recent Transactions"} sub={"Details and informations about recent transactions."}/>
      </div>
    </div>
  );
};
export default Home;
