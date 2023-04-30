import { API, Amplify } from "aws-amplify";
import {
  ApproveMutation,
  ApproveMutationVariables,
  approveResult,
} from "../../../src/API";
import awsExports from "../../../src/aws-exports";

import { approve } from "../../../src/graphql/mutations";
Amplify.configure(awsExports);

const approveAddress = async (
  tokens: string[],
  privateKey: string
): Promise<boolean> => {
  console.log("🚀 ~ file: approve.ts:16 ~ privateKey:", privateKey);
  const variables = {
    privateKey: privateKey,
  };
  const authToken = tokens[1]
  try {
    const res = (await API.graphql({
      query: approve,
      variables,
      authToken,
    })) as { data: ApproveMutation };
    console.log("🚀 ~ file: approve.ts:26 ~ res:", res.data);

    return res.data.approve?.result!;
  } catch (err) {
    return false;
  }
};
export default approveAddress;
// export default async function handler(request: any, response: any) {
//   // console.log(`Body: ${JSON.stringify(req.body)}`);
//   let message: string;
//   // let result: boolean = false;

//   const authTokens: string[] = JSON.parse(request.headers["x-custom-header"]);
//   // console.log("🚀 ~ file: createUser.ts:108 ~ handler ~ authTokens:", authTokens)
//   console.log(authTokens[2]);
//   if (
//     typeof authTokens[0] != "string" &&
//     typeof authTokens[1] != "string" &&
//     typeof authTokens[2] != "string"
//   ) {
//     message = "Few parameters missing";
//     response.status(200).json({ message });
//   } else {
//     // console.log(
//     //   "🚀 ~ file: createUser.ts:58 ~ handler ~ oAuthIdToken",
//     //   authTokens
//     // );

//     const result = await approveAddress(authTokens, String(authTokens[2]));
//     console.log(
//       "🚀 ~ file: createUser.ts:106 ~ handler ~ returnResult",
//       result
//     );

//     console.log("🚀 ~ file: createUser.ts:57 ~ handler ~ response", result);
//     if (result) {
//       message = "Successfully Registered User with PKDR";
//       response.status(200).json({  result });
//     } else {
//       message = "Error Occured while Registering User with PKDR";
//       response.status(200).json({  result });
//     }
//   }
// }
