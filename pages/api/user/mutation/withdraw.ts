//IBAN PK36SCBL0000001123456702
import { API, Amplify } from "aws-amplify";
import awsExports from "../../../../src/aws-exports";
import {
  WithdrawMutationVariables,
  WithdrawParams,
  WithdrawParamsResult,
} from "../../../../src/API";
import { withdraw as withdraw_amount } from "../../../../src/graphql/mutations";
import { getUserInfo } from "../mutation/addContacts";
import getAddressFromUserName from "./transferFrom/getAddressByUserName";
import { DebitParams } from "./transferFrom/types";
import add_To_Debit_Table from "./transferFrom/addToDebitTable";

Amplify.configure(awsExports);

const withdraw = async function (
  authTokens: string[],
  WithdrawParams: WithdrawParams
): Promise<WithdrawParamsResult | any> {
  // console.log("🚀 ~ file: withdraw.ts:26 ~ WithdrawParams:", WithdrawParams)
  const authToken = "abc";

  const variables: WithdrawMutationVariables = {
    withdrawParams: WithdrawParams,
  };
  try {
    const res = (await API.graphql({
      query: withdraw_amount,
      variables,
      authToken,
    })) as { data: WithdrawParamsResult };
    // console.log("🚀 ~ file: withdraw.ts:29 ~ res:", res.data)
    //@ts-ignore:
    // console.log("🚀 ~ file: withdraw.ts:27 ~ res:", res.data!.withdraw.result!);
    if (res.data!.withdraw.result!) {
      const timeStamp: number = Date.now();
      const debitParams: DebitParams = {
        id: WithdrawParams.userName!,
        TimeStamp: timeStamp,
        To: "PKDR_FINANCE",
        Amount: Number(WithdrawParams.amount),
      };

      await add_To_Debit_Table(debitParams);
    }

    return res.data;
  } catch (error) {
    return error as WithdrawParamsResult;
  }
};

export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    const authTokens = JSON.parse(req.headers["x-custom-header"]);
    const { email } = await getUserInfo(authTokens[0]);
    let body = req.body;
    const eth_address = await getAddressFromUserName(authTokens, body.username);

    // console.log("🚀 ~ file: withdraw.ts:46 ~ handler ~ body:", body);

    let data: WithdrawParams = {
      IBAN: body.iban,
      accountHolderName: body.acc_name,
      amount: body.amount,
      id: email,
      address: eth_address.value,
      userName: body.username,
    };

    const result = await withdraw(authTokens, data);
    res.status(200).json(result);
  } else {
    // Handle any other HTTP method
  }
}
