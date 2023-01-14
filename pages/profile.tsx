import React from "react";
import { userInfoAtom, web3authAtom,loading } from "../state/jotai";
import { useAtom, useAtomValue } from "jotai";
import Loading from '../components/loading/Loading'
function profile() {
  const [auth, setAuth] = useAtom(web3authAtom);
  const info = useAtomValue(userInfoAtom);
  console.log(useAtomValue(web3authAtom));
  <Loading state={true}/>


  if (auth) {
    if (info) {
      return <div>  {JSON.stringify(info)}</div>;
    }
  } else {
    return <div>Login</div>;
  }
}

export default profile;
