import { useAtom, useAtomValue } from "jotai";
import React, { useEffect, useState } from "react";
import { userBalance, userInfoAtom, web3authAtom } from "../../state/jotai";

const Cards = (props: any) => {
  const info = useAtomValue(userInfoAtom);
  const [ShowMoney, setShowMoney] = useState<boolean>(true);
  const [Money, setMoney] = useAtom<number>(userBalance);
  const [timer, setTimer] = useState(6000);
  const [web3auth] = useAtom(web3authAtom);
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);

  const getETHBalance = async () => {
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
      "🚀 ~ file: Dashboard.tsx:55 ~ getETHBalance ~ response:",
      response
    );

    const data = await response.json();
    const balance = parseFloat(data.getETHBalance);
    //@ts-ignore
    setMoney(Number(balance.toFixed(2)));
    console.log("🚀 ~ file: Dashboard.tsx:47 ~ getETHBalance ~ data:", data);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      // your effect code here
      getETHBalance();
      // getUsersCount();
      console.log(timer);
    }, timer);

    // cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);
  return (
    <div>
      <div className="h-[46vh] m-2 shadow-black shadow-md mt-2.5 rounded-lg overflow-x-hidden w-auto">
        <div
          className="text-[4rem] font-mono  flex items-center justify-center  px-8 
 font-bold pt-4 "
        >
          <div className="text-3xl  text-white  underline  font-serif">
            {props.title}
          </div>
          {/* <div className="text-xl pt-2 text-[#009ac9]">{props.sub}</div> */}
        </div>
        {Money ? (
          <div
            className="text-[4rem] font-serif  text-white  
 font-medium flex items-center justify-center h-[28vh]"
          >
            Rs.&nbsp;{Money}
          </div>
        ) : (
          <div
            role="status"
            className="flex items-center justify-center h-[39vh]"
          >
            <svg
              aria-hidden="true"
              className="w-12 h-12 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-[#009ac9]"
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
        <div>
          {/* <button className="bg-[#009ac9] text-white text-lg font-medium mb-2 mx-6 px-3 py-2 rounded-xl float-right">
            {props.btn_txt}
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Cards;
