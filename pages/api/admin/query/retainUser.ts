import { API, Amplify } from "aws-amplify";
import awsExports from "../../../../src/aws-exports";
import { RetainVerificationMutationVariables, RetainVerificationResult } from "../../../../src/API";
import { retainVerification } from "../../../../src/graphql/mutations";

Amplify.configure(awsExports);

const retainUserAPI = async function (
  authTokens: string[],
  username:string
): Promise<RetainVerificationResult|any> {

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

    return res;
  } catch (error) {
    return error as RetainVerificationResult;
  }
    
};

export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    const authTokens = JSON.parse(req.headers["x-custom-header"]);
    const username :string= req.body.userName;
    const  result = await retainUserAPI(
        authTokens,
        username
      );
      res.status(200).json(result);
  } else {
    // Handle any other HTTP method
  }
}
