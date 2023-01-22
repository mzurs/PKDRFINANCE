import { API, Amplify } from "aws-amplify";
import type { CreateUser, createUserResult } from "../../../src/API";
import awsExports from "../../../src/aws-exports";
import { createUser } from "../../../src/graphql/mutations";
import { NextRequest, NextResponse } from "next/server";
Amplify.configure(awsExports);
const formData = {
  ADDRESS: "v11",
  CITY: "a11",
  COUNTRY: "a11",
  DOB: "a11",
  ETH_ADDRESS: "0xfB7dbE4c3d3841409B48F7ae92A7fb7Cbb02f11B",
  FATHER_OR_HUSBAND_NAME: "a11",
  FULL_NAME: "a11",
  cnic: "v3211",
  id: "v113212",
  POSTAL_CODE: "v11",
  PHONE_NUMBER: "v1231",
};
async function createUserAPI(userData: any) {
  const formData = {
    ADDRESS: userData.ADDRESS,
    CITY: userData.CITY,
    COUNTRY: userData.COUNTRY,
    DOB: userData.DOB,
    ETH_ADDRESS: userData.ETH_ADDRESS,
    FATHER_OR_HUSBAND_NAME: userData.FATHER_OR_HUSBAND_NAME,
    FULL_NAME: userData.FULL_NAME,
    cnic:userData.cnic,
    id: userData.id,
    POSTAL_CODE: userData.POSTAL_CODE,
    PHONE_NUMBER: userData.PHONE_NUMBER,
  };
  console.log("🚀 ~ file: createUser.ts:34 ~ createUserAPI ~ formData", formData)
  console.log("🚀 ~ file: createUser.ts:21 ~ createUserAPI ~ userData", userData)
  const variables = {
    user: formData,
  };
  const authToken = "abc";

  const res: any = await API.graphql({
    query: createUser,
    variables,
    authToken,
  });
  console.log(
    "------------------------------------\n ",
    res,
    "\n--------------------------------"
  );
}

export default async function handler(req: any, res: any) {
  console.log(`Body: ${JSON.stringify(req.body)}`);
  await createUserAPI(req.body);
  res.status(200).json({ message: "Form Submitted Successfully!" });
}
