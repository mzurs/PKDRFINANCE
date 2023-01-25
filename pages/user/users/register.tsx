import React, { useEffect } from "react";
import Register from "../../../components/forms/registration/Register";
import { useAtom } from "jotai";
import { isVerified, web3authAtom } from "../../../state/jotai";
import { useRouter } from "next/router";

function register() {
  const router = useRouter();
  const [verified, setVerified] = useAtom(isVerified);
  const [auth, setAuth] = useAtom(web3authAtom);
  useEffect(() => {
    if (!auth) {
      router.push("/");
    } else {
      if (verified) {
        router.push("/user/users/");
      }
    }
  });

  return (
    <div>
      {!verified}?<Register />
    </div>
  );
}

export default register;
