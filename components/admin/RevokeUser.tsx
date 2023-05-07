import React, { useState } from "react";
import { Loader, userInfoAtom } from "../../state/jotai/index";
import { notify } from "../users/settingsLayout/ProfileInfo";
import { ThreeDots } from "react-loader-spinner";
import { useAtom, useAtomValue } from "jotai";
import { UserInfo } from "../users/settingsLayout/type/userTypes";

const RevokeUser = () => {
  let info: UserInfo = {
    email: "",
    name: "",
    profileImage: "",
    aggregateVerifier: "",
    verifier: "",
    verifierId: "",
    typeOfLogin: "",
    dappShare: "",
    idToken: "",
    oAuthIdToken: "",
    oAuthAccessToken: "",
  };
  info = useAtomValue(userInfoAtom);
  const [username, setUsername] = useState("");
  const [loader, setLoader] = useAtom(Loader);

  const handleSubmit = async () => {
    setLoader(true);
    try{
      const headers = new Headers();
    headers.append("content-type", "application/json");
    headers.append(
      "x-custom-header",
      JSON.stringify([info.idToken, info.oAuthIdToken])
    );
    await fetch("/api/admin/query/revokeUser", {
      method: "POST",
      body: JSON.stringify({ userName: username }),
      headers: headers,
    })
      .then((response) => response.json())
      .then(async (data) => {
        console.log("🚀 ~ file: RevokeUser.tsx:15 ~ .then ~ data:", data.data);
        if (data.data.revokeVerification.result) {
          notify(data.data.revokeVerification.message, "success");
        } else {
          notify(data.data.revokeVerification.message, "error");
        }
      });
    }catch(error){
      console.log(error);
    }
    setLoader(false);
  };

  return (
    <div>
      <div className="md:pt-20 w-[40vw] flex flex-col mx-auto">
        <h1 className="text-[#43724d] text-4xl font-light text-center mb-20">
          Revoke User Transaction
        </h1>
        <div className="pl-2 pb-4">
          <label htmlFor="username" className="text-gray-400 text-[22px]">
            Enter Username
          </label>
          <input
            type="text"
            name="username"
            className="text-gray-400 text-[22px] ml-8 bg-transparent outline-2 focus:outline-[#3c6545] ring-none outline-none shadow-md border-gray-500 focus:border-green-800 border-2 rounded-md focus:border-none px-2 py-2 w-[27vw]"
            value={username}
            onChange={(e: any) => setUsername(e.target.value)}
          />
        </div>
        <button
          onClick={handleSubmit}
          className="flex justify-center mx-auto mt-12 text-[#61946c] hover:text-gray-200 text-xl border-2 rounded-xl border-[#3c6545] hover:bg-[#45754f] px-3 py-2"
        >
          Revoke Transaction
        </button>
      </div>
    </div>
  );
};

export default RevokeUser;
