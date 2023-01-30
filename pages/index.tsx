import type { NextPage } from "next";
import { useEffect } from "react";
import { useAtom, useAtomValue } from "jotai";
import {
  loading,
  userRole,
  web3authAtom,
  customAuthentication,
  isVerified,
} from "../state/jotai";
import Loading from "../components/loading/Loading";
import Image from "next/image";
import Front from "../components/Front";
import * as cookie from "cookie";
import { useRouter } from "next/router";
import auth from "./api/auth";
import { useHydrateAtoms } from "jotai/utils";
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
    // window.location.href ="/"
    console.log("|Second UseEffect from Index PAge is running", role);
    if (isAuth && role) {
      setIsAuthenticated(true);
      setRole(role);
      setVerified(userTag);
      router.push(`/user/${role}/`);
    }
  }, [isAuth, role]);

  // if (!auth) {
  //   return <Front />;
  // } else {
  //   if (role == null || isAuth == false) {
  //     return (
  //       <div>
  //         <Front />
  //       </div>
  //     );
  //   } else {
  //     if (isAuth && role) {
  //       if (role == "users") {
  //         // setIsAuthenticated(true);
  //         // setRole(role);
  //         router.push("/user/users/");
  //       } else if (role == "admin") {
  //         // setIsAuthenticated(true);
  //         // setRole(role);
  //         router.push("/user/admin/");
  //       } else {
  //         return (
  //           <div>
  //             <Front />
  //           </div>
  //         );
  //       }
  //     } else {
  //       return (
  //         <div>
  //           <Front />
  //         </div>
  //       );
  //     }
  //   }

  // }
  return (
    <div>
      <title>PKDR Finance</title>
      <Front />
    </div>
  );
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
    console.log(
      "🚀 ~ file: index.tsx:87 ~ getServerSideProps ~ oAuthIdTokenCookie",
      oAuthIdTokenCookie
    );
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
