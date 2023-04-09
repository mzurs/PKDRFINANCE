import { API, Amplify } from "aws-amplify";
import awsExports from "../../../../src/aws-exports";
import { getETHBalance } from "../../../../src/graphql/queries";
import getUserInfo from "./getUserInfo";
Amplify.configure(awsExports);

export default async (req: any, res: any) => {
  const authTokens = JSON.parse(req.headers["x-custom-header"]);
  console.log("🚀 ~ file: [id].ts:156 ~ authTokens:", authTokens);
  const resUserInfo = await getUserInfo(authTokens[0]);
  const variables = {
    address: resUserInfo.ETH_ADDRESS!,
  };
  const authToken = "abc";
  try {
    const response = (await API.graphql({
      query: getETHBalance,
      variables,
      authToken,
    })) as { data: string };
    console.log("🚀 ~ file: mintPKDR.ts:29 ~ res:", response.data);

    res.status(200).send(response.data);
  } catch (err) {
    res.status(500).send((err as unknown as any).message);
  }
};
