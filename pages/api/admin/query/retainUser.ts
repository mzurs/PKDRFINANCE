import { API, Amplify } from "aws-amplify";
import awsExports from "../../../../src/aws-exports";
import { RetainVerificationMutationVariables, RetainVerificationResult } from "../../../../src/API";
import { retainVerification } from "../../../../src/graphql/mutations";

Amplify.configure(awsExports);

const retainUserAPI = async function (
  authTokens: string[],
  username:string
): Promise<RetainVerificationResult|any> {
  console.log("🚀 ~ file: retainUser.ts:12 ~ username:", username)

  const authToken = authTokens[1];
  const variables = {
    userName: username,
  };
  try {
    const res = (await API.graphql({
      query: retainVerification,
      variables,
      authToken,
    })) as { data: RetainVerificationResult };

    console.log("🚀 ~ file: retainUser.ts:33 ~ res.data:", res.data);
    return res;
  } catch (error) {
    return error as RetainVerificationResult;
  }
    
};

export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    const authTokens = JSON.parse(req.headers["x-custom-header"]);
    // console.log(req.body.username);
    const username :string= req.body.userName;
    console.log("🚀 ~ file: retainUser.ts:39 ~ handler ~ username:", username)
    const  result = await retainUserAPI(
        authTokens,
        username
      );
      res.status(200).json(result);
  } else {
    // Handle any other HTTP method
  }
}
