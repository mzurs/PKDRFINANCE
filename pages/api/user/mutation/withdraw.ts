//IBAN PK36SCBL0000001123456702
import { API, Amplify } from "aws-amplify";
import awsExports from "../../../../src/aws-exports";
import { WithdrawParams, WithdrawParamsResult } from "../../../../src/API";
import { withdraw as withdraw_amount } from "../../../../src/graphql/mutations";
import { NextApiRequest, NextApiResponse } from "next";
import { getUserInfo } from "../mutation/addContacts";
import { userName } from "../../../../state/jotai";
import getAddressFromUserName from "./transferFrom/getAddressByUserName";
import { useAtom } from "jotai";

Amplify.configure(awsExports);

const withdraw = async function (
  authTokens: string[],
  WithdrawParams: WithdrawParams
): Promise<WithdrawParamsResult | any> {
  
  console.log("🚀 ~ file: withdraw.ts:26 ~ WithdrawParams:", WithdrawParams)
  const authToken = "abc";

  const variables = {
    WithdrawParams: WithdrawParams,
  };
  try {
    const res = (await API.graphql({
      query: withdraw_amount,
      variables,
      authToken,
    })) as { data: WithdrawParamsResult };
    console.log("🚀 ~ file: withdraw.ts:27 ~ res:", res.data);

    return res.data;
  } catch (error) {
    return error as WithdrawParamsResult;
  }
};

export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    // const [username, setUserName] = useAtom(userName);

    const authTokens = JSON.parse(req.headers["x-custom-header"]);
    // const { email } = await getUserInfo(authTokens[0]);
    // const eth_address = await getAddressFromUserName(authTokens, "Syed Ammar");
    let body = req.body;
    console.log("🚀 ~ file: withdraw.ts:46 ~ handler ~ body:", body);

    let data: WithdrawParams = {
      IBAN: body.iban,
      accountHolderName: body.acc_name,
      amount: body.amount,
      id: body.id,
      address: body.address,
      userName: body.username, //username,
    };

    const result = await withdraw(authTokens, data);
    res.status(200).json(result);
  } else {
    // Handle any other HTTP method
  }
}
