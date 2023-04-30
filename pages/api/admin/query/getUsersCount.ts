//getUsersCount

import { API, Amplify } from "aws-amplify";

import awsExports from "../../../../src/aws-exports";
import { getUsersCount } from "../../../../src/graphql/queries";
import { GetUsersCountQuery } from "../../../../src/API";

const AWS = require("aws-sdk");
Amplify.configure(awsExports);

const getTotalSupply = async (tokens:string[]): Promise<number | null> => {
  const authToken = tokens[1];
  try {
    const res = (await API.graphql({
      query: getUsersCount,
      authToken,
    })) as { data: GetUsersCountQuery };

    console.log("🚀 ~ file: getUsersCount.ts:16 ~ getTotalSupply ~ res:", res);

    return res.data.getUsersCount!;

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
  const totalUsers = await getTotalSupply(authTokens);
  console.log("🚀 ~ file: getUsersCount.ts:37 ~ handler ~ totalUsers:", totalUsers);
  console.log("🚀 ~ file: getTotalSupply.ts:108 ~ handler ~ totalUsers:", totalUsers);
  response.status(200).json(totalUsers);
}
