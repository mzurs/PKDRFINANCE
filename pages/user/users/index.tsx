import React, { useEffect } from "react";
import {
  userInfoAtom,
  web3authAtom,
  loading,
  userRole,
  isVerified,
} from "../../../state/jotai";
import { useAtom, useAtomValue } from "jotai";
import * as cookie from "cookie";
import * as jose from "jose";
import { useRouter } from "next/router";
import Loading from "../../../components/shared/loading/Loading";
import Home from "./home";
function index({ isAuthenticated }: any) {
  const router = useRouter();

  // const [isAuthenticated, setIsAuthenticated] = useAtom(customAuthentication);
  const [verified, setVerified] = useAtom(isVerified);
  const [role, setRole] = useAtom(userRole);
  const [auth, setAuth] = useAtom(web3authAtom);
  const info = useAtomValue(userInfoAtom);
  // <Loading state={true} />;

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push("/");
    }
  });
  if (auth) {
    if (!verified) {
      console.log(`Register: ${verified}`);
      router.push("/user/users/register");
    } else {
      if (info) {
        return <Home />;
      }
    }
  } else {
    return <div className="h-[100vh] flex items-center justify-center w-[100vw]">Login</div>;
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
