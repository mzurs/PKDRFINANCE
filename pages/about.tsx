import React, { useEffect,  } from "react";
import { web3authAtom, userInfoAtom} from "../state/jotai";
import { useAtom, useAtomValue } from "jotai";

function about() {
  const [provider, serProvider] = useAtom<any>(web3authAtom);
  const [userInfo, setUserInfo] = useAtom(userInfoAtom);
  console.log(`provider from about : ${useAtomValue(web3authAtom)}`);
  useEffect(()=>{
    setUserInfo(provider)
  })
  return (
    <div>
    
      
    </div>
  );
}

export default about;
