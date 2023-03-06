import * as jose from "jose";
import * as jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";
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
export default async function handler(
  req: NextApiRequest,
  response: NextApiResponse
) {
  const idToken = req.body.idToken;
  console.log("🚀 ~ file: clientAuth.ts:54 ~ handler ~ idToken:", idToken);
  const pub_key = req.body.pub_key;
  console.log("🚀 ~ file: clientAuth.ts:56 ~ handler ~ pub_key:", pub_key);
  const oAuthIdToken = req.body.oAuthIdToken;
  console.log(
    "🚀 ~ file: clientAuth.ts:56 ~ handler ~ oAuthIdToken:",
    oAuthIdToken
  );

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
    console.log("🚀 ~ file: clientAuth.ts:78 ~ handler ~ wallet:", wallet);

    if (wallet === pub_key) {
      res.result = true;

      const { result, userTag }: any = await role(oAuthIdToken);
      console.log("🚀 ~ file: clientAuth.ts:84 ~ handler ~ userTag:", userTag);
      console.log("🚀 ~ file: clientAuth.ts:84 ~ handler ~ result:", result);

      if (result) {
        res.userRole = result;
        res.userTag = userTag;
        console.log(res);
        response.status(200).json({ message: JSON.stringify(res) });
      } else {
        response.status(200).json({ message: JSON.stringify(res) });
      }
    }
  } catch (error) {
    // console.log("🚀 ~ file: auth.ts:48 ~ error", error)

    response.status(200).json({ message: JSON.stringify(res) });
  }
  response.status(200).json({ message: JSON.stringify(res) });
}
