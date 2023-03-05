import React from "react";
import { userInfoAtom, web3authAtom, loading } from "../../../state/jotai";
import { useAtom, useAtomValue } from "jotai";
import Loading from "../../../components/loading/Loading";
function index() {
  const [auth, setAuth] = useAtom(web3authAtom);
  const info = useAtomValue(userInfoAtom);
  <Loading state={true} />;

  if (auth) {
    if (info) {
      return <div> Admin: {JSON.stringify(info)}</div>;
    }
  } else {
    return <div>Login </div>;
  }
}

export default index;
