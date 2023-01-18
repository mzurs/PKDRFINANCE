
import * as jose from "jose";


type response = {
  userRole: string | null;
  result: boolean;
};

async function role(
  params: jose.JWTVerifyResult & jose.ResolvedKey
): Promise<string> {
  return "users";
}
export default async function auth(
  idToken: string,
  pub_key: string
): Promise<response> {
  console.log("🚀 ~ file: auth.ts:21 ~ pub_key", pub_key);
  // console.log("🚀 ~ file: auth.ts:21 ~ idToken", idToken)
  const res: response = {
    userRole: null,
    result: false,
  };

  const jwks = await jose.createRemoteJWKSet(
    new URL("https://api.openlogin.com/jwks")
  );
  try {
    const jwtDecoded: any = await jose.jwtVerify(idToken, jwks, {
      algorithms: ["ES256"],
    });

    // console.log("🚀 ~ file: auth.ts:35 ~ jwtDecoded", jwtDecoded)
    const wallet: any = JSON.stringify(
      jwtDecoded.payload.wallets[0].public_key
    );
    console.log("🚀 ~ file: auth.ts:37 ~ wallets", wallet);

    if (wallet === pub_key) {
      res.result = true;

      const userRole = await role(jwtDecoded);

      if (userRole) {
        res.userRole = userRole;
        console.log(res);
        return res;
      } else {
        return res;
      }
    }
  } catch (error) {
    // console.log("🚀 ~ file: auth.ts:48 ~ error", error)

    return res;
  }

  return res;
}
