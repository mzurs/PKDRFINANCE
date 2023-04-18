import React, { useEffect, useState } from "react";
import MultilineChart from "./MultilineChart";
import { userBalance, userInfoAtom, userName, web3authAtom } from "../../state/jotai";
import { useAtom, useAtomValue } from "jotai";
import Cards from "./Cards";
import Recent from "./Recent";


const Home = () => {
  const info = useAtomValue(userInfoAtom);
  const [ShowMoney, setShowMoney] = useState<boolean>(true);
  const [Money, setMoney] = useAtom<number>(userBalance);
  const [timer, setTimer] = useState(60000);
  const [web3auth] = useAtom(web3authAtom);
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);
  const [username, setUserName] = useAtom(userName);

  async function checkUser() {
    await fetchUserName();
  }

  async function fetchUserName(): Promise<boolean> {
    const headers = new Headers();
    headers.append("content-type", "application/json");
    headers.append(
      "x-custom-header",
      JSON.stringify([info.idToken, info.oAuthIdToken])
    );
    try {
      await fetch("http://localhost:3000/api/user/query/getUserAttrInfo", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ attr_name: "USERNAME" }),
      })
        .then((response) => response.json())
        .then(async (d) => {
          console.log("🚀 ~ file: transfer.tsx:100 ~ .then ~ d:", d)
          setUserName(d.data.getUserInfo.value);
          return d.data.getUserInfo.success;
        });
    } catch (error) {
      return false;
    }
    return false;
  }

  useEffect(() => {
    if(username==""){
      checkUser();
    }
  }, [])
  

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
      <div className="flex pt-20 w-[100vw] overflow-x-hidden h-[100vh]">
        <div className="w-5/12">
          <div className="flex rounded-lg pt-28 pb-[170px] justify-center items-center flex-col mr-4 ml-10 border-2 shadow-lg">
            <div className={`${username==""?"text-4xl pb-2":"text-5xl"} font-medium text-gray-80 pt-12`}>
              Hello , {username==""?info.name:username}
            </div>
            <div className="pt-3 text-lg">{new Date().toString()}</div>
          </div>
          <div className="ml-8 mr-2">
            <Cards
              title={"Available Balance"}
              sub={info.email}
              btn_txt={"View Statement"}
            />
          </div>
        </div>

        <div className="w-9/12 h-full">
          <div className="h-[43vh] flex justify-center border shadow-md -ml-0.5 mx-6 rounded-md pb-1">
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
