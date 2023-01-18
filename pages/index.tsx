import type { NextPage } from "next";
import { useEffect } from "react";
import { useAtom, useAtomValue } from "jotai";
import {
  loading,
  userRole,
  web3authAtom,
  customAuthentication,
} from "../state/jotai";
import Loading from "../components/loading/Loading";
import Image from "next/image";
import Front from "../components/Front";
import * as cookie from "cookie";
import { useRouter } from "next/router";
import auth from "./api/auth";
const Home: NextPage = () => {
  const [isLoading, setLoading] = useAtom(loading);
  const [auth, setAuth] = useAtom(web3authAtom);
  if (!auth) {
    return <Front />;
  } else {
    return <div></div>;
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
    if (!web3AuthCookie || !pub_key_Cookie) {
      return {
        props: {}, // will be passed to the page component as props
      };
    }
    const { idToken }: any = JSON.parse(web3AuthCookie);
    console.log(
      "🚀 ~ file: index.tsx:37 ~ getServerSideProps ~ idToken",
      idToken
    );

    const pub_key = pub_key_Cookie;
    console.log(
      "🚀 ~ file: index.tsx:40 ~ getServerSideProps ~ pub_key",
      pub_key
    );

    if (!idToken || !pub_key) {
      return {
        props: {}, // will be passed to the page component as props
      };
    } else {
      const res = await auth(idToken, pub_key);
      console.log(`res: ${JSON.stringify(res)}`);
      if (!res.result) {
        return {
          props: {}, // will be passed to the page component as props
        };
      }
      if (res.result) {
        return {
          redirect: {
            destination: `/user/${res.userRole}`,
            permanent: false,
          },
        };
      }
    }
    return {
      props: {}, // will be passed to the page component as props
    };
  } catch (e) {
    console.log(e);
    return {
      props: {}, // will be passed to the page component as props
    };
  }
}
