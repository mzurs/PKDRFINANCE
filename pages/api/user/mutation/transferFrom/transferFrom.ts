import {
  TransferFromMutation,
  TransferFromParams,
} from "../../../../../src/API";
import { transferFrom } from "../../../../../src/graphql/mutations";
import getAddressFromUserName from "./getAddressByUserName";
import { ReturnParamsForAddressByUserName } from "./types";
import { API, Amplify } from "aws-amplify";
import awsExports from "../../../../../src/aws-exports";
import { parsedData } from "../../../../user/users/transfer";

Amplify.configure(awsExports);

const transfer = async (
  authTokens: string[],
  transferFromParams: TransferFromParams
): Promise<TransferFromMutation | any> => {
  const authToken = "abc";
  const variables = {
    transferFromParams: transferFromParams,
  };
  try {
    const res = (await API.graphql({
      query: transferFrom,
      variables,
      authToken,
    })) as { data: TransferFromMutation };

    console.log(res.data);
    return res.data;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export default async function handler(req: any, res: any) {
  const authTokens = JSON.parse(req.headers["x-custom-header"]);
  let body:parsedData = req.body;
  const fromUserName = body.from_name;
  const toUserName = body.to_name;
  const amount:string = body.amount;

  //res values
  let message: string = "";
  let result: boolean = false;

  //params obj
  const transferFromParams: TransferFromParams = {
    from: "",
    to: "",
    amount: "",
  };

  const fromAddress: ReturnParamsForAddressByUserName =
    await getAddressFromUserName(authTokens, fromUserName);
  const toAddress: ReturnParamsForAddressByUserName =
    await getAddressFromUserName(authTokens, toUserName);
    
  if (fromAddress.result && toAddress.result) {
    transferFromParams.from = fromAddress.value;
    transferFromParams.to = toAddress.value;
    transferFromParams.amount = amount;

    const transferResult: TransferFromMutation = await transfer(
      authTokens,
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
