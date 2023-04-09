import React, { useEffect, useState } from "react";
import MultilineChart from "../../../components/users/MultilineChart";
import { userBalance, userInfoAtom, web3authAtom } from "../../../state/jotai";
import { useAtom, useAtomValue } from "jotai";
import Cards from "../../../components/users/Cards";
import Recent from "../../../components/users/Recent";


const Home = () => {
  const info = useAtomValue(userInfoAtom);
  const [ShowMoney, setShowMoney] = useState<boolean>(true);
  const [Money, setMoney] = useAtom<number>(userBalance);
  const [timer, setTimer] = useState(9000);
  const [web3auth] = useAtom(web3authAtom);
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);

  const getPKDRTotalSupply = async () => {
    const headers = new Headers();
    headers.append("content-type", "application/json");
    headers.append(
      "x-custom-header",
      JSON.stringify([
        (userInfo as unknown as any).email,
        (web3auth as unknown as any).idToken,
        (userInfo as unknown as any).oAuthIdToken,
      ])
    );
    const response = await fetch("/api/user/query/getUserBalance", {
      method: "GET",
      headers: headers,
    });
    console.log(
      "🚀 ~ file: Dashboard.tsx:55 ~ getPKDRTotalSupply ~ response:",
      response
    );

    const data = await response.json();
    //@ts-ignore
    setMoney(data.getETHBalance);
    console.log(
      "🚀 ~ file: Dashboard.tsx:47 ~ getPKDRTotalSupply ~ data:",
      data
    );
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      // your effect code here
      getPKDRTotalSupply();
      // getUsersCount();
      console.log(timer);
    }, timer);

    // cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);
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
      <div className="flex pt-[4.6rem] w-[100vw] overflow-x-hidden">
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
              money={`PKDR ${Rupee(Money)}`}
            />
          </div>
        </div>

        <div className="w-9/12 h-full">
          <div className="h-[43vh] flex justify-center">
            <MultilineChart />
          </div>
          <div className="flex justify-between">
            <Recent
              title={"Recent Transactions"}
              sub={"Details and informations about recent transactions."}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
