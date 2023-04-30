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
import { DebitParams, Transaction } from "./transferFrom/types";
import add_To_Debit_Table from "./transferFrom/addToDebitTable";

Amplify.configure(awsExports);

import { v4 as uuidv4 } from "uuid";
const request = require("request");
import {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  QueryCommand,
} from "@aws-sdk/client-dynamodb";
import addToTransactionTable from "../../mutation/addToTransactionTable";
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");

const region = "us-west-2";
const client = new DynamoDBClient({ region });

const PKDR_BALANCES_TABLE = "PKDR_BALANCES";

const getBalance = (): Promise<any> => {
  const URL =
    "https://api.sandbox.transferwise.tech/v4/profiles/16565240/balances?types=STANDARD ";

  return new Promise((resolve, reject) => {
    const options = {
      url: URL,
      method: "GET",
      headers: {
        Authorization: "Bearer 613161da-3f90-48a1-b179-d7aefaf70cf1",
      },
    };
    request(options, (error: any, response: unknown, body: any) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
};

const getBalancePKR = async (): Promise<number> => {
  const balances = (await getBalance()).body;
  let balancePKR = JSON.parse(balances);

  const { value, currency }: string | null | any = balancePKR[4].totalWorth;
  console.log(
    "🚀 ~ file: getBalances.ts:63 ~ getBalancePKR ~ balancePKR:",
    value,
    currency
  );
  return Number(value);
};

const addToPKDR_BALANCESTable = async (
  value: number,
  totalBalance: number
): Promise<void> => {
  const input = {
    TableName: PKDR_BALANCES_TABLE,
    Item: marshall({
      id: Date.now().toString(),
      Amount: totalBalance - value,
    }),
  };
  const command = new PutItemCommand(input);
  await client.send(command);
  //   console.log(
  //     "🚀 ~ file: txTable.ts:22 ~ addT0TransactionsTable ~ response:",
  //     response
  //   );
};

const withdraw = async function (
  authTokens: string[],
  WithdrawParams: WithdrawParams
): Promise<WithdrawParamsResult | any> {
  // console.log("🚀 ~ file: withdraw.ts:26 ~ WithdrawParams:", WithdrawParams)
  const authToken = authTokens[1];

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

      await addToPKDR_BALANCESTable(
        WithdrawParams.amount!,
        await getBalancePKR()
      );
      await add_To_Debit_Table(debitParams);
      console.log(
        "-------------Withdraw Data Tx--------------------------------"
      );
      //@ts-ignore
      console.log(res.data!.withdraw.burnResult!.hash!)
      const params: Transaction = {
        //@ts-ignore
        id: String(res.data!.withdraw.burnResult!.hash!),
        From: WithdrawParams.userName!,
        To: "PKDR_FINANCE",
        Amount: Number(WithdrawParams.amount),
        Type: "WITHDRAW",
        TimeStamp: Date.now(),
      };
      console.log(params);
     await  addToTransactionTable(params);
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
