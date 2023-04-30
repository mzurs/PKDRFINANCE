import { API, Amplify } from "aws-amplify";
const { ethers } = require("ethers");

import type {
  CreateUser,
  Error,
  UserExists,
  UserInfo,
  createUserResult,
} from "../../../src/API";
import awsExports from "../../../src/aws-exports";
import { createUser } from "../../../src/graphql/mutations";
import { keccak256 } from "js-sha3";
import * as jwt from "jsonwebtoken";
import auth from "../auth";
import approveAddress from "./approve";

const AWS = require("aws-sdk");
Amplify.configure(awsExports);

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function addUserToVerifiedGroup(oAuthIdToken: string) {
  const decoded: any = jwt.decode(oAuthIdToken);
  const cognitoUserName = decoded["cognito:username"];

  const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider(
    {
      region: "us-west-2",
    }
  );

  const params = {
    GroupName: "verified",
    UserPoolId: "us-west-2_cPjOesJgg",
    Username: cognitoUserName,
  };

  await cognitoIdentityServiceProvider.adminAddUserToGroup(
    params,
    function (err: any, data: any) {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    }
  );
}
export const getUserInfo = async (idToken: string, _privateKey: string) => {
  const decoded: any = await jwt.decode(idToken);
  const email = decoded.email;
  // const hash = keccak256(Buffer.from(decoded.wallets[0].public_key, "hex"));
  // const eth_address = "0x" + hash.slice(-40);
  const privateKey = _privateKey;
  console.log(
    "🚀 ~ file: createUser.ts:55 ~ getUserInfo ~ privateKey:",
    privateKey
  );

  // Create a wallet object from the private key
  const wallet = new ethers.Wallet(privateKey);

  // Get the Ethereum address from the wallet object
  const eth_address: string = wallet.address;
  console.log(
    "🚀 ~ file: createUser.ts:62 ~ getUserInfo ~ eth_address:",
    eth_address
  );

  return { email, eth_address };
};

async function createUserAPI(
  userData: any,
  idToken: string,
  oAuthIdToken: string,
  privateKey: string
) {
  console.log("🚀 ~ file: createUser.ts:60 ~ privateKey:", privateKey);
  console.log("🚀 ~ file: createUser.ts:60 ~ userData:", userData);
  let returnResult: boolean = false;
  // console.log("🚀 ~ file: createUser.ts:24 ~ oAuthIdToken", oAuthIdToken)
  // console.log("🚀 ~ file: createUser.ts:24 ~ idToken", idToken)
  // console.log("🚀 ~ file: createUser.ts:24 ~ userData", userData)
  const { email, eth_address } = await getUserInfo(idToken, privateKey);
  console.log("🚀 ~ file: createUser.ts:67 ~ email:", email);
  console.log("🚀 ~ file: createUser.ts:65 ~ eth_address:", eth_address);

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
    privateKey: privateKey,
  };
  console.log("🚀 ~ file: createUser.ts:83 ~ formData:", formData);

  const variables = {
    user: formData,
  };
  const authToken = oAuthIdToken;
  try {
    const res = (await API.graphql({
      query: createUser,
      variables,
      authToken,
    })) as { data: createUserResult };
    console.log("🚀 ~ file: createUser.ts:88 ~ res:", res.data);
    const data = res.data;
    const response: any = res;
    if (response.data?.createUser.userInfo) {
      await addUserToVerifiedGroup(oAuthIdToken);
      console.log("Deplay starts");
      await delay(15000); // wait for 15 second before making the next API call
      console.log("Deplay end");

      const approveResponse = await approveAddress(
        [idToken, oAuthIdToken],
        privateKey
      );
      console.log(
        "🚀 ~ file: createUser.ts:97 ~ approveResponse:",
        approveResponse
      );
      returnResult = true;
      return { data, returnResult };
    } else {
      returnResult = false;
      return { data, returnResult };
    }
  } catch (err: any) {
    const data = err as createUserResult;
    return { data, returnResult };
  }
}

export default async function handler(request: any, response: any) {
  // console.log(`Body: ${JSON.stringify(req.body)}`);
  let message: string;
  let result: boolean = false;

  const authTokens: string[] = JSON.parse(request.headers["x-custom-header"]);
  // console.log("🚀 ~ file: createUser.ts:108 ~ handler ~ authTokens:", authTokens)
  // console.log(authTokens[2]);
  if (
    typeof authTokens[0] != "string" &&
    typeof authTokens[1] != "string" &&
    typeof authTokens[2] != "string"
  ) {
    message = "Few parameters missing";
    response.status(200).json({ message });
  } else {
    // console.log(
    //   "🚀 ~ file: createUser.ts:58 ~ handler ~ oAuthIdToken",
    //   authTokens
    // );

    const { data, returnResult } = await createUserAPI(
      request.body,
      authTokens[0],
      authTokens[1],
      authTokens[2]
    );
    console.log(
      "🚀 ~ file: createUser.ts:106 ~ handler ~ returnResult",
      returnResult
    );

    console.log("🚀 ~ file: createUser.ts:57 ~ handler ~ response", data);
    if (returnResult) {
      message = "Successfully Registered User with PKDR";
      result = returnResult;
      response.status(200).json({ data, result });
    } else {
      message = "Error Occured while Registering User with PKDR";
      response.status(200).json({ data, result });
    }
  }
}
