import * as jose from "jose";
import * as jwt from "jsonwebtoken";

type response = {
  userRole: string | null;
  result: boolean;
};

async function role(oAuthIdToken: string): Promise<string | null> {
  const decoded: any = jwt.decode(oAuthIdToken);
  // console.log(`Decoded: ${JSON.stringify(decoded)}`);
  const groups = decoded["cognito:groups"];
  // const userRole: string | null = groups.includes("Admin");
  if (groups.includes("Admin")) {
    return "admin";
  } else if (groups.includes("us-west-2_cPjOesJgg_Google")) {
    return "users";
  } else {
    return null;
  }
  // console.log("🚀 ~ file: auth.ts:14 ~ role ~ userRole", userRole);
  // console.log("🚀 ~ file: auth.ts:13 ~ role ~ groups", groups)

  return "users";
}
export default async function auth(
  idToken: string,
  pub_key: string,
  oAuthIdToken: string
): Promise<response> {
  console.log("🚀 ~ file: auth.ts:19 ~ oAuthIdToken", oAuthIdToken);
  // console.log("🚀 ~ file: auth.ts:21 ~ pub_key", pub_key);
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

      const userRole = await role(oAuthIdToken);

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
