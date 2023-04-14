import { API, Amplify } from "aws-amplify";
import awsExports from "../../../../src/aws-exports";
import { ListContactsParams, ListContactsQuery } from "../../../../src/API";
import { listContacts } from "../../../../src/graphql/queries";
import { NextApiRequest, NextApiResponse } from "next";
import { getUserInfo } from "../mutation/addContacts";

Amplify.configure(awsExports);

const listUserContacts = async function (
  authTokens: string[],
  id: string
): Promise<ListContactsQuery|any> {
  const listContactsParams: ListContactsParams = {
    id: id,
  };
  const authToken = "abc";
  const variables = {
    listContactsParams: listContactsParams,
  };
  try {
    const res = (await API.graphql({
      query: listContacts,
      variables,
      authToken,
    })) as { data: ListContactsQuery };

    console.log(
      "🚀 ~ file: getUsersCount.ts:16 ~ getTotalSupply ~ res:",
      res.data
    );
    return res;
  } catch (error) {
    return error as ListContactsQuery;
  }
};

export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    const authTokens = JSON.parse(req.headers["x-custom-header"]);
    const { email } = await getUserInfo(authTokens[0]);
    const  result = await listUserContacts(
        authTokens,
        email
      );
      res.status(200).json(result);
  } else {
    // Handle any other HTTP method
  }
}
