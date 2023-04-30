import { API, Amplify } from "aws-amplify";
import { mintInfo, mintResult } from "../../../src/API";
import awsExports from "../../../src/aws-exports";
import { v4 as uuidv4 } from "uuid";

import { mintPKDR } from "../../../src/graphql/mutations";
import { Transaction } from "../user/mutation/transferFrom/types";
import addToTransactionTable from "./addToTransactionTable";
Amplify.configure(awsExports);

const mintPkdr = async (
  authTokens: string[],
  address: string,
  amount: string
): Promise<mintResult> => {
  const mintParams: mintInfo = {
    address: address,
    amount: amount,
  };
  console.log("🚀 ~ file: mintPKDR.ts:19 ~ amount:", amount);
  console.log("🚀 ~ file: mintPKDR.ts:19 ~ address:", address);
  const variables = {
    mint: mintParams,
  };
  const authToken = authTokens[2];
  console.log("🚀 ~ file: mintPKDR.ts:26 ~ authToken:", authToken)
  try {
    const res = (await API.graphql({
      query: mintPKDR,
      variables,
      authToken,
    })) as { data: mintResult };
    console.log("🚀 ~ file: mintPKDR.ts:29 ~ res:", res.data);
 
    return res.data;
  } catch (err) {
    const resError: mintResult = {
      __typename: "mintResult",
      message: JSON.stringify((err as unknown as any).message),
      result: false,
    };
    resError.message = JSON.stringify((err as unknown as any).message);
    console.log("🚀 ~ file: mintPKDR.ts:38 ~ resError:", resError);
    resError.result = false;
    return resError;
  }
};
export default mintPkdr;
