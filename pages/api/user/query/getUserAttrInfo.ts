import { API, Amplify } from "aws-amplify";
import awsExports from "../../../../src/aws-exports";
import { UserInfoParams, GetUserInfoQuery } from "../../../../src/API";
import { getUserInfo } from "../../../../src/graphql/queries";
import { NextApiRequest, NextApiResponse } from "next";
import { getUserInfo as getInfo } from "../../user/mutation/addContacts";

Amplify.configure(awsExports);

const getAttrInfo = async function (
  authTokens: string[],
  id: string,
  attr_name: string
): Promise<GetUserInfoQuery|any> {
  const userInfoParams: UserInfoParams = {
    id: id,
    attributeInfo: attr_name
  };
  const authToken = authTokens[1];
  const variables = {
    userInfoParams: userInfoParams,
  };
  try {
    const res = (await API.graphql({
      query: getUserInfo,
      variables,
      authToken,
    })) as { data: GetUserInfoQuery };

    console.log(
      "🚀 ~ file: getUsersCount.ts:16 ~ getTotalSupply ~ res:",
      res.data
    );
    return res;
  } catch (error) {
    return error as GetUserInfoQuery;
  }
};

export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    const authTokens = JSON.parse(req.headers["x-custom-header"]);
    const attr_name:string = req.body.attr_name;
    const { email } = await getInfo(authTokens[0]);
    const  result = await getAttrInfo(
        authTokens,
        email,
        attr_name
      );
      res.status(200).json(result);
  } else {
    // Handle any other HTTP method
  }
}
