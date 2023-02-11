import React, { useEffect } from 'react'
import { useAtom } from "jotai";
import { isVerified, web3authAtom } from "../../../state/jotai";
import { useRouter } from "next/router";

function contacts() {
  const router = useRouter();
  const [verified, setVerified] = useAtom(isVerified);
  const [auth, setAuth] = useAtom(web3authAtom);

  useEffect(() => {
    if (!auth) {
      //router.push("/");
    } else {
      if (verified) {
        router.push("/user/users/");
      }
    }
  });

  return (
    <div>contacts</div>
  )
}

export default contacts;