import { API, Amplify } from "aws-amplify";

import awsExports from "../../../../src/aws-exports";
import { totalSupply } from "../../../../src/graphql/queries";
import { TotalSupplyQuery } from "../../../../src/API";

const AWS = require("aws-sdk");
Amplify.configure(awsExports);

const getTotalSupply = async (tokens:string[]): Promise<number | null> => {
  const authToken = tokens[1];
  try {
    const res = (await API.graphql({
      query: totalSupply,
      authToken,
    })) as { data: TotalSupplyQuery };
    console.log("🚀 ~ file: totalSupply.ts:16 ~ getTotalSupply ~ res:", res);

    return parseFloat(res.data.totalSupply!);
  } catch (error) {
    return null;
  }

  return null;
};

export default async function handler(request: any, response: any) {
  const authTokens = JSON.parse(request.headers["x-custom-header"]);
  console.log(
    "🚀 ~ file: createUser.ts:58 ~ handler ~ oAuthIdToken",
    authTokens
  );
  const supply = await getTotalSupply(authTokens);
  console.log("🚀 ~ file: totalSupply.ts:37 ~ handler ~ supply:", supply);
  console.log("🚀 ~ file: getTotalSupply.ts:108 ~ handler ~ supply:", supply);
  response.status(200).json(supply);
}
