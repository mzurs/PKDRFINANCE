import React, { useState } from 'react'
import RevokeUser from '../../../components/admin/RevokeUser';
import RetainUser from '../../../components/admin/RetainUser';

const permission = () => {
    const [revoke, set_revoke] = useState<boolean>(true);
    const [retain, set_retain] = useState<boolean>(false);
  
    return (
      <>
        <div className="md:pt-16 pt-20 md:pb-8 p-6 w-[100vw] h-[100vh] overflow-x-hidden bg-black">
          <h1 className="md:pt-9 md:pb-6 pt-3 pb-3 md:text-[35px] text-2xl font-medium pl-4 text-[#477550]">
            User Transaction Permission
          </h1>
          <div>
            <ul className="flex ml-2 mr-2 border-b-2 border-green-900 sm:text-lg md:text-[22px] text-gray-400">
              <li id="profile" onClick={()=>{set_revoke(true); set_retain(false);}} className={`p-3 md:mr-6 mr-2 cursor-pointer ${revoke ? "text-[#4e8659] border-b-2 rounded-sm border-[#3d6545]" : "hover:text-[#A3B18A]"} `}>
                Revoke User
              </li>
              <li id="profile" onClick={()=>{set_revoke(false); set_retain(true);}} className={`p-3 md:mr-6 ml-2 cursor-pointer ${retain ? "text-[#4e8659] border-b-2 rounded-sm border-[#3d6545]" : "hover:text-[#A3B18A]"} `}>
                Retain User
              </li>
            </ul>
          </div>
  
          {revoke ? <RevokeUser/> : ""}
          {retain ? <RetainUser/> : ""}
  
          
        </div>
      </>
    );
}

export default permission