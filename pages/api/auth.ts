import * as jose from "jose";
import * as jwt from "jsonwebtoken";

type response = {
  userRole: string | null;
  result: boolean;
  userTag: boolean;
};
type roleResponse = {
  result: string;
  userTag: boolean;
};
async function role(oAuthIdToken: string): Promise<roleResponse | null> {
  const decoded: any = jwt.decode(oAuthIdToken);
  console.log(`Decoded: ${JSON.stringify(decoded)}`);
  const groups = decoded["cognito:groups"];
  console.log("🚀 ~ file: auth.ts:17 ~ role ~ groups", groups);
  // const userRole: string | null = groups.includes("Admin");
  if (groups.includes("Admin")) {
    const result = "admin";
    const userTag = true;
    return { result, userTag };
    // return "admin";
  } else if (groups.includes("verified")) {
    const result = "users";
    const userTag = true;
    return { result, userTag };
  } else if (groups.includes("us-west-2_cPjOesJgg_Google")) {
    const result = "users";
    const userTag = false;
    return { result, userTag };
  } else {
    return null;
  }
  // console.log("🚀 ~ file: auth.ts:14 ~ role ~ userRole", userRole);
  // console.log("🚀 ~ file: auth.ts:13 ~ role ~ groups", groups)

  const result = "users";
  const userTag = false;
  return { result, userTag };
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
    userTag: false,
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

      const { result, userTag }: any = await role(oAuthIdToken);

      if (result) {
        res.userRole = result;
        res.userTag = userTag;
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
