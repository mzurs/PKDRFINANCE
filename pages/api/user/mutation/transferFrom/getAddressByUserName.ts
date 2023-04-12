import { API, Amplify } from "aws-amplify";
import awsExports from "../../../../../src/aws-exports";
import { GetAddressByUserNameQuery } from "../../../../../src/API";
import { getAddressByUserName } from "../../../../../src/graphql/queries";
import { ReturnParamsForAddressByUserName } from "./types";

Amplify.configure(awsExports);

const getAddressFromUserName = async function (
  authTokens: string[],
  userName: string
): Promise<ReturnParamsForAddressByUserName> {
  const returnParams: ReturnParamsForAddressByUserName = {
    result: false,
    message: "empty",
  };

  const authToken = "abc";
  const variables = {
    userName: userName,
  };
  try {
    const res = (await API.graphql({
      query: getAddressByUserName,
      variables,
      authToken,
    })) as { data: GetAddressByUserNameQuery };
    // const result: GetAddressByUserNameQuery["getAddressByUserName"] =
    //   res.data["getAddressByUserName"];

    if (res.data && res.data["getAddressByUserName"]) {
      const {
        address,
        message,
        errorMessage,
      }: string | undefined | null | any = res.data["getAddressByUserName"];

      if (typeof address === "string") {
        returnParams.message = `User ${userName} associated address found`;
        returnParams.result = true;
        returnParams.value = address;
        return returnParams;
      } else if (typeof message === "string") {
        returnParams.message = message;
        returnParams.result = false;
        return returnParams;
      } else if (typeof errorMessage === "string") {
        returnParams.message = errorMessage;
        returnParams.result = false;
        return returnParams;
      }
    } else {
      returnParams.message = "Something Went Wrong";
      returnParams.result = false;
      return returnParams;
    }
  } catch (error) {
    returnParams.message = JSON.stringify((error as unknown as any).message);
    returnParams.result = false;
    return returnParams;
  }
  return returnParams;
};
export default getAddressFromUserName;
