import React, { useEffect } from "react";
import {
  userInfoAtom,
  web3authAtom,
  loading,
  userRole,
} from "../../../state/jotai";
import { useAtom, useAtomValue } from "jotai";
import * as cookie from "cookie";
import * as jose from "jose";
import { useRouter } from "next/router";
import Loading from "../../../components/loading/Loading";
function index({ isAuthenticated }: any) {
  const [role, setRole] = useAtom(userRole);
  const [auth, setAuth] = useAtom(web3authAtom);
  const info = useAtomValue(userInfoAtom);
  // <Loading state={true} />;
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated === false) {
      router.replace("/");
    }
  });
  if (auth) {
    if (info) {
      return <div> User: {JSON.stringify(info)}</div>;
    }
  } else {
    return <div>Login</div>;
  }
}

export default index;

export async function getServerSideProps(context: any) {
  const cookies = cookie.parse(context.req.headers.cookie || "");

  const web3AuthCookie = cookies.idToken;
  const pub_key_Cookie = cookies.pub_key;
  if (!web3AuthCookie || !pub_key_Cookie) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else {
    const { idToken }: any = JSON.parse(web3AuthCookie);
    const pub_key = pub_key_Cookie;
    const jwks = await jose.createRemoteJWKSet(
      new URL("https://api.openlogin.com/jwks")
    );
    try {
      const jwtDecoded: any = await jose.jwtVerify(idToken, jwks, {
        algorithms: ["ES256"],
      });

      const wallet: any = JSON.stringify(
        jwtDecoded.payload.wallets[0].public_key
      );

      if (wallet === pub_key) {
        return {
          props: {
            isAuthenticated: true,
          }, // will be passed to the page component as props
        };
      } else {
        return {
          redirect: {
            destination: "/",
            permanent: false,
          },
        };
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: index.tsx:40 ~ getServerSideProps ~ error",
        error
      );
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
  }
}
