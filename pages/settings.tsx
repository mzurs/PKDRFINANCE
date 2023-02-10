import React, { useState } from "react";
import { useAtomValue } from "jotai";
import { userInfoAtom } from "../state/jotai";
import { UserInfo } from "../Types/userTypes";
import ProfileInfo from "../components/layouts/settingsLayout/ProfileInfo";
import AccountInfo from "../components/layouts/settingsLayout/AccountInfo";

const Settings = () => {
  
  const info: UserInfo = useAtomValue(userInfoAtom);
  const [profile_info, set_profile_info] = useState<boolean>(true);
  const [account_info, set_account_info] = useState<boolean>(false);

  return (
    <>
      <div className="md:pt-16 pt-20 md:pb-8 p-6 overflow-x-hidden">
        <h1 className="md:pt-9 md:pb-6 pt-3 pb-3 md:text-4xl text-3xl font-bold pl-4">
          Settings
        </h1>
        <div>
          <ul className="flex ml-2 mr-2 border-b-2 border-gray-300 sm:text-md md:text-xl text-gray-500">
            <li id="profile" onClick={()=>{set_profile_info(true); set_account_info(false);}} className={`p-3 md:mr-6 mr-2 cursor-pointer ${profile_info ? "text-yellow-600 border-b-2 rounded-sm border-yellow-600" : ""} hover:text-yellow-600`}>
              Profile
            </li>
            <li id="profile" onClick={()=>{set_profile_info(false); set_account_info(true);}} className={`p-3 md:mr-6 ml-2 cursor-pointer ${account_info ? "text-yellow-600 border-b-2 rounded-sm border-yellow-600" : ""} hover:text-yellow-600`}>
              Account
            </li>
          </ul>
        </div>

        {profile_info ? <ProfileInfo/> : ""}
        {account_info ? <AccountInfo/> : ""}

        
      </div>
    </>
  );
};

export default Settings;
