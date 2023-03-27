import { NextRequest, NextResponse } from "next/server";
import {
  web3AuthVerifyResult,
  web3AuthVerify as web3AuthVerifyType,
} from "../types/types";
import { web3AuthVerify } from "./web3AuthVerify";

async function isAuthenticated(
  request: NextRequest
): Promise<web3AuthVerifyResult> {
  const cookieWeb3Auth: any = request.cookies.get("web3auth")?.value;
  // console.log("🚀 ~ file: auth.ts:7 ~ isAuthenticated ~ cookieWeb3Auth", cookieWeb3Auth)
  const parsedCookieWeb3Auth = JSON.parse(cookieWeb3Auth);
  const cookiePubKey: any = request.cookies.get("pub_key")?.value;
  const parsedCookiePubKey = JSON.parse(cookiePubKey);
  // console.log("🚀 ~ file: auth.ts:10 ~ isAuthenticated ~ parsedCookiePubKey", parsedCookiePubKey)

  const verifyParams: web3AuthVerifyType = {
    idToken: parsedCookieWeb3Auth.idToken,
    pub_key: parsedCookiePubKey,
  };
  const isAuthenticated = await web3AuthVerify(verifyParams);
  // console.log(
  //   "🚀 ~ file: auth.ts:20 ~ isAuthenticated ~ isAuthenticated",
  //   isAuthenticated
  // );
  if (isAuthenticated.result) {
    return {
      result: true,
      decodedJWT: isAuthenticated.decodedJWT,
    };
  } else {
    return {
      result: false,
      decodedJWT: null,
    };
  }
}

export default isAuthenticated;
