import { useEffect, useState } from "react";
import { useAtom, useAtomValue } from "jotai";
import {
  loading,
  userRole,
  web3authAtom,
  customAuthentication,
  isVerified,
  web3authStateAtom,
} from "../state/jotai";
import Loading from "../components/shared/loading/Loading";
import Image from "next/image";
import Front from "../components/shared/Front";
import * as cookie from "cookie";
import { useRouter } from "next/router";
import auth from "./api/auth";
import { useHydrateAtoms } from "jotai/utils";
import Cookies from "js-cookie";
const Home = ({ role, isAuth, userTag }: any) => {
  const router = useRouter();

  //@ts-ignore
  useHydrateAtoms([[userRole, role]]);
  //@ts-ignore
  useHydrateAtoms([[customAuthentication, isAuth]]);

  const [isLoading, setLoading] = useAtom(loading);
  const [auth, setAuth] = useAtom(web3authAtom);
  const [isAuthenticated, setIsAuthenticated] = useAtom(customAuthentication);
  const [getUserRole, setRole] = useAtom(userRole);
  const [verified, setVerified] = useAtom(isVerified);
  const [web3authState, setWeb3authState] = useAtom(web3authStateAtom);
  const userRoleFunc = async () => {
    // console.log("🚀 ~ file: index.tsx:56 ~ userRole ~ count:", count);
    if (!role && !isAuth && !userTag) {
      if (
        Cookies.get("idToken") ||
        Cookies.get("pub_key") ||
        Cookies.get("oAuthIdToken")
      ) {
        // console.log("|Third UseEffect from Index PAge is running", role);

        // console.log(Cookies.get("idToken"));
        // console.log(Cookies.get("pub_key"));
        // console.log(Cookies.get("oAuthIdToken"));

        // const web3AuthCookie: any = Cookies.get("idToken");
        // const { idToken }: any = JSON.parse(web3AuthCookie);
        // console.log("🚀 ~ file: index.tsx:71 ~ userRole ~ idToken:", idToken);
        // const pub_key = Cookies.get("pub_key");
        // console.log("🚀 ~ file: index.tsx:73 ~ userRole ~ pub_key:", pub_key);

        // const oAuthIdTokenCookie: any = Cookies.get("oAuthIdToken");
        // const oAuthIdToken: any = JSON.parse(oAuthIdTokenCookie);
        // console.log(
        //   "🚀 ~ file: index.tsx:77 ~ userRole ~ oAuthIdToken:",
        //   oAuthIdToken
        // );
        // const data = {
        //   idToken,
        //   pub_key,
        //   oAuthIdToken,
        // };
        // console.log("API REQUEST SEND---------------------------------------");
        // const response: any = await fetch("/api/clientAuth", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify(data),
        // }); console.log(
        //   "🚀 ~ file: index.tsx:82 ~ userRole ~ response:",
        //   JSON.stringify(response)
        // );
        // setCount(response);
        window.location.href = "/";
       
      }
    }
  };
  useEffect(() => {
    if (role == null || isAuth == false) {
      setIsAuthenticated(false);
      setRole(null);
      setVerified(userTag);
    } else {
      setIsAuthenticated(isAuth);
      setRole(role);
      setVerified(userTag);
    }
  }, [isAuth, role, userTag]);

  useEffect(() => {
    console.log("|Second UseEffect from Index PAge is running", role);
    if (isAuth && role) {
      setIsAuthenticated(true);
      setRole(role);
      setVerified(userTag);
      router.push(`/user/${role}/`);
    }
  }, [isAuth, role]);

  useEffect(() => {
    console.log("Third=----",Cookies.get("idToken"))
    if (Cookies.get("idToken")) {
      if (verified!=true) {
        console.log("-----------User Role Function is Running------------");
        userRoleFunc();
        // setVerified(true);
      }
    }
  });

  if (useAtomValue(isVerified) === true) {
    return <></>;
  } else {
    return (
      <div>
        <Front />
      </div>
    );
  }
};
export default Home;

export async function getServerSideProps(context: any) {
  // Parse cookies
  try {
    const cookies = cookie.parse(context.req.headers.cookie || "");

    // Access a specific cookie
    const web3AuthCookie = cookies.idToken;
    const pub_key_Cookie = cookies.pub_key;
    const oAuthIdTokenCookie = cookies.oAuthIdToken;
    // console.log(
    //   "🚀 ~ file: index.tsx:87 ~ getServerSideProps ~ oAuthIdTokenCookie",
    //   oAuthIdTokenCookie
    // );
    if (!web3AuthCookie || !pub_key_Cookie || !oAuthIdTokenCookie) {
      return {
        props: {}, // will be passed to the page component as props
      };
    }
    const { idToken }: any = JSON.parse(web3AuthCookie);
    console.log(
      "🚀 ~ file: index.tsx:37 ~ getServerSideProps ~ idToken",
      idToken
    );
    const oAuthIdToken: any = JSON.parse(oAuthIdTokenCookie);
    console.log(
      "🚀 ~ file: index.tsx:98 ~ getServerSideProps ~ oAuthIdToken",
      oAuthIdToken
    );
    console.log(
      "🚀 ~ file: index.tsx:37 ~ getServerSideProps ~ idToken",
      idToken
    );

    const pub_key = pub_key_Cookie;
    console.log(
      "🚀 ~ file: index.tsx:40 ~ getServerSideProps ~ pub_key",
      pub_key
    );

    if (!idToken || !pub_key || !oAuthIdToken) {
      return {
        props: {
          role: null,
          isAuth: false,
          userTag: false,
        }, // will be passed to the page component as props
      };
    } else {
      const res = await auth(idToken, pub_key, oAuthIdToken);
      console.log(`res: ${JSON.stringify(res)}`);
      if (!res.result) {
        return {
          props: {
            role: null,
            isAuth: false,
            userTag: false,
          }, // will be passed to the page component as props
        };
      }
      if (res.result) {
        return {
          props: {
            role: res.userRole,
            isAuth: res.result,
            userTag: res.userTag,
          }, // will be passed to the page component as props
        };
      }
    }
    return {
      props: {
        role: null,
        isAuth: false,
        userTag: false,
      }, // will be passed to the page component as props
    };
  } catch (e) {
    console.log(e);
    return {
      props: {
        role: null,
        isAuth: false,
        userTag: false,
      }, // will be passed to the page component as props
    };
  }
}
