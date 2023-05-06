import { API, Amplify } from "aws-amplify";
import awsExports from "../../../../src/aws-exports";
import { RevokeVerificationMutationVariables, RevokeVerificationResult } from "../../../../src/API";
import { revokeVerification } from "../../../../src/graphql/mutations";

Amplify.configure(awsExports);

const revokeUserAPI = async function (
  authTokens: string[],
  username:any
): Promise<RevokeVerificationResult|any> {
  const userName:RevokeVerificationMutationVariables = {
    userName: username
  };
  const authToken = authTokens[1];
  const variables = {
    userName: userName,
  };
  try {
    const res = (await API.graphql({
      query: revokeVerification,
      variables,
      authToken,
    })) as { data: RevokeVerificationResult };

    console.log("🚀 ~ file: revokeUser.ts:33 ~ res.data:", res.data);
    return res;
  } catch (error) {
    return error as RevokeVerificationResult;
  }
    
};

export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    const authTokens = JSON.parse(req.headers["x-custom-header"]);
    console.log(req.body);
    const username:string = req.body.username;
    const  result = await revokeUserAPI(
        authTokens,
        username
      );
      res.status(200).json(result);
  } else {
    // Handle any other HTTP method
  }
}
