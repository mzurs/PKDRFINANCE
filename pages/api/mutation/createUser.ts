import { API, Amplify } from "aws-amplify";
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
const AWS = require("aws-sdk");
Amplify.configure(awsExports);

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
const getUserInfo = async (idToken: string) => {
  const decoded: any = await jwt.decode(idToken);
  const email = decoded.email;
  const hash = keccak256(Buffer.from(decoded.wallets[0].public_key, "hex"));
  const eth_address = "0x" + hash.slice(-40);

  return { email, eth_address };
};

async function createUserAPI(
  userData: any,
  idToken: string,
  oAuthIdToken: string
) {
  let returnResult: boolean = false;
  // console.log("🚀 ~ file: createUser.ts:24 ~ oAuthIdToken", oAuthIdToken)
  // console.log("🚀 ~ file: createUser.ts:24 ~ idToken", idToken)
  // console.log("🚀 ~ file: createUser.ts:24 ~ userData", userData)
  const { email, eth_address } = await getUserInfo(idToken);

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
  try {
    const res = (await API.graphql({
      query: createUser,
      variables,
      authToken,
    })) as { data: createUserResult };
    console.log("🚀 ~ file: createUser.ts:88 ~ res:", res.data);
    const response: any = res;
    if (response.data?.createUser.userInfo) {
      await addUserToVerifiedGroup(oAuthIdToken);
      returnResult = true;
      return { res, returnResult };
    } else {
      returnResult = false;
      return { res, returnResult };
    }
  } catch (err: any) {
    const res = err as string;
    return { res, returnResult };
  }
}

export default async function handler(request: any, response: any) {
  // console.log(`Body: ${JSON.stringify(req.body)}`);

  const authTokens = JSON.parse(request.headers["x-custom-header"]);
  console.log(
    "🚀 ~ file: createUser.ts:58 ~ handler ~ oAuthIdToken",
    authTokens
  );

  const { res, returnResult } = await createUserAPI(
    request.body,
    authTokens[0],
    authTokens[1]
  );
  const contentType = request.headers["content-type"];
  console.log(
    "🚀 ~ file: createUser.ts:57 ~ handler ~ contentType",
    contentType
  );
  console.log(
    "🚀 ~ file: createUser.ts:106 ~ handler ~ returnResult",
    returnResult
  );

  console.log("🚀 ~ file: createUser.ts:57 ~ handler ~ response", res);
  response.status(200).json({ message: JSON.stringify([res, returnResult]) });
}