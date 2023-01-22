import { API, Amplify } from "aws-amplify";
import type { CreateUser, createUserResult } from "../../../src/API";
import awsExports from "../../../src/aws-exports";
import { createUser } from "../../../src/graphql/mutations";
import { NextRequest, NextResponse } from "next/server";
import { keccak256 } from "js-sha3";
import * as jwt from "jsonwebtoken";
Amplify.configure(awsExports);

const getUserInfo = async (idToken: string) => {
  const decoded: any = await jwt.decode(idToken);
  const email = decoded.email;
  const hash = keccak256(Buffer.from(decoded.wallets[0].public_key, "hex"));
  const eth_address = "0x" + hash.slice(-40);

  return { email, eth_address };
};

async function createUserAPI(userData: any) {
  const { email, eth_address } = await getUserInfo(userData.idToken);

  const formData = {
    ADDRESS: userData.data.ADDRESS,
    CITY: userData.data.CITY,
    COUNTRY: userData.data.COUNTRY,
    DOB: userData.data.DOB,
    ETH_ADDRESS: eth_address,
    FATHER_OR_HUSBAND_NAME: userData.data.FATHER_OR_HUSBAND_NAME,
    FULL_NAME: userData.data.FULL_NAME,
    cnic: userData.data.cnic,
    id: email,
    POSTAL_CODE: userData.data.POSTAL_CODE,
    PHONE_NUMBER: userData.data.PHONE_NUMBER,
  };

  const variables = {
    user: formData,
  };
  const authToken = "abc";

  const res: any = await API.graphql({
    query: createUser,
    variables,
    authToken,
  });
  // console.log(
  //   "------------------------------------\n ",
  //   res,
  //   "\n--------------------------------"
  // );
  return res;
}

export default async function handler(req: any, res: any) {
  // console.log(`Body: ${JSON.stringify(req.body)}`);
  const response = await createUserAPI(req.body);
  console.log("🚀 ~ file: createUser.ts:57 ~ handler ~ response", response)
  res.status(200).json({ message: response });
}
