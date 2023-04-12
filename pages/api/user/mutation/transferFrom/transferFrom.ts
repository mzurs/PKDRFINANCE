import {
  TransferFromMutation,
  TransferFromParams,
} from "../../../../../src/API";
import { transferFrom } from "../../../../../src/graphql/mutations";
import getAddressFromUserName from "./getAddressByUserName";
import { ReturnParamsForAddressByUserName } from "./types";
import { API, Amplify } from "aws-amplify";
import awsExports from "../../../../../src/aws-exports";

Amplify.configure(awsExports);

const transfer = async (
  tokens: string[],
  transferFromParams: TransferFromParams
): Promise<TransferFromMutation> => {
  const authToken = "abc";
  const variables = {
    transferFromParams: transferFromParams,
  };
  // try {
  const res = (await API.graphql({
    query: transferFrom,
    variables,
    authToken,
  })) as { data: TransferFromMutation };

  console.log(res.data);
  return res.data;
  // } catch (err) {}
};

export default async function handler(req: any, res: any) {
  //request params val's
  const tokens = ["a"];
  const fromUserName = "Sarfaraz";//req.body
  const toUserName = "Zohaib";//req.body
  const amount = "10";//req.body

  //res values
  let message: string = "";
  let result: boolean = false;

  //params obj
  const transferFromParams: TransferFromParams = {
    from: null,
    to: null,
    amount: null,
  };

  const fromAddress: ReturnParamsForAddressByUserName =
    await getAddressFromUserName(tokens, fromUserName);
  const toAddress: ReturnParamsForAddressByUserName =
    await getAddressFromUserName(tokens, toUserName);
  console.log(fromAddress);
  console.log(toAddress);
  if (fromAddress.result && toAddress.result) {
    transferFromParams.from = fromAddress.value;
    transferFromParams.to = toAddress.value;
    transferFromParams.amount = amount;
    const transferResult: TransferFromMutation = await transfer(
      tokens,
      transferFromParams
    );
    message = transferResult.transferFrom!.message!;
    result = transferResult.transferFrom!.result!;
  } else {
    if (fromAddress.result && !toAddress.result) {
      message = toAddress.message;
      result = toAddress.result;
    } else if (!fromAddress.result && toAddress.result) {
      message = fromAddress.message;
      result = fromAddress.result;
    }
  }
  return res.status(200).json({ result, message });
}
