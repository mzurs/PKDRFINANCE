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
  const [timer, setTimer] = useState(60000);
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
            {Money ? (
              <Cards
                title={"Available Balance"}
                sub={info.email}
                btn_txt={"View Statement"}
                money={` PKDR ${Rupee(Money)}`}
              />
            ) : (
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            )}
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
