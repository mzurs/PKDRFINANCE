import React, { useState } from "react";
import { useAtomValue } from "jotai";
import { userInfoAtom } from "../../../state/jotai";
import { UserInfo } from '../../../components/users/settingsLayout/type/userTypes'
import ProfileInfo from "../../../components/users/settingsLayout/ProfileInfo";
import AccountInfo from "../../../components/users/settingsLayout/AccountInfo";

const Settings = () => {
  
  const info: UserInfo = useAtomValue(userInfoAtom);
  const [profile_info, set_profile_info] = useState<boolean>(true);
  const [account_info, set_account_info] = useState<boolean>(false);

  return (
    <>
      <div className="bg-slate-900 md:pt-16 pt-20 md:pb-8 p-6 w-[100vw] h-[100vh] overflow-x-hidden">
        <h1 className="md:pt-9 md:pb-6 pt-3 pb-3 md:text-[35px] text-2xl font-bold pl-4">
          {/* Settings */}
        </h1>
        <div>
          <ul className="flex ml-2 mr-2 border-b-2 border-gray-300 sm:text-lg md:text-xl text-gray-500">
            <li id="profile" onClick={()=>{set_profile_info(true); set_account_info(false);}} className={`p-3 md:mr-6 mr-2 cursor-pointer ${profile_info ? "text-[#009ac9] border-b-2 rounded-sm border-[#009ac9]" : ""} hover:text-[#009ac9]`}>
              Profile
            </li>
            <li id="profile" onClick={()=>{set_profile_info(false); set_account_info(true);}} className={`p-3 md:mr-6 ml-2 cursor-pointer ${account_info ? "text-[#009ac9] border-b-2 rounded-sm border-[#009ac9]" : ""} hover:text-[#009ac9]`}>
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
