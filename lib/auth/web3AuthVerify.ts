import {
  web3AuthVerify as web3AuthVerifyType,
  web3AuthVerifyResult,
} from "../types/types";
import * as jose from "jose";

export const web3AuthVerify = async (
  params: web3AuthVerifyType
): Promise<web3AuthVerifyResult> => {
  const idToken: string = params.idToken;
  const pub_key: string = params.pub_key;
  // Get the JWK set used to sign the JWT issued by Web3Auth
  const jwks = await jose.createRemoteJWKSet(
    new URL("https://api.openlogin.com/jwks")
  );
  console.log(`JWKS: ${jwks}`);
  try {
    // Verify the JWT using Web3Auth's JWKS
    const jwtDecoded = await jose.jwtVerify(idToken, jwks, {
      algorithms: ["ES256"],
    });
    // console.log("🚀 ~ file: web3AuthVerify.ts:19 ~ jwtDecoded", jwtDecoded);
    // Checking `app_pub_key` against the decoded JWT wallet's public_key
    if ((jwtDecoded.payload as any).wallets[0].public_key === pub_key) {
      // Verified
      return {
        result: true,
        decodedJWT: jwtDecoded,
      };
    } else {
      return {
        result: false,
        decodedJWT: null,
      };
    }
  } catch (error: any) {
    // console.log(
    //   "🚀 ~ file: web3AuthVerify.ts:25 ~ error",
    //   JSON.stringify(error)
    // );

    return {
      result: true,
      decodedJWT: null,
    };
  }
  return {
    result: false,
    decodedJWT: null,
  };
};
