import React from "react";
import { userInfoAtom, web3authAtom, loading } from "../state/jotai";
import { useAtom, useAtomValue } from "jotai";
import Loading from "../components/loading/Loading";
function profile() {
  const [auth, setAuth] = useAtom(web3authAtom);
  const info = useAtomValue(userInfoAtom);
  <Loading state={true} />;

  if (auth) {
    if (info) {
      return (
        <div className="flex-wrap overflow-hidden">
          {" "}
          Email = {info.email}
          <div>
            Name = {info.name} 
          </div>
          <div>
          {JSON.stringify(Object.keys(info))}
          </div>
        </div>
      );
    }
  } else {
    return <div>Login</div>;
  }
}

export default profile;
