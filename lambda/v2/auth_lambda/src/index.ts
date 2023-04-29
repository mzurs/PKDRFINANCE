// import jwt from 'jsonwebtoken';
// import { verify } from 'jsonwebtoken';
import * as jose from "jose";
import * as jwt from "jsonwebtoken";

// // Replace with your own secret key
// const SECRET_KEY = 'your-secret-key';

// exports.handler = async (event) => {
//   try {
//     // Extract the JWT from the request header
//     const token = event.headers.Authorization;
//     if (!token) {
//       throw new Error('Unauthorized');
//     }
//     // Verify the JWT
//     const decoded = await verify(token, SECRET_KEY);

//     // Check the user's permissions
//     if (!decoded.permissions.includes('admin')) {
//       throw new Error('Forbidden');
//     }
//     // If the user is authenticated and has the correct permissions,
//     // return an IAM policy that allows access to the resource
//     return {
//       principalId: decoded.sub,
//       policyDocument: {
//         Version: '2012-10-17',
//         Statement: [
//           {
//             Action: 'execute-api:Invoke',
//             Effect: 'Allow',
//             Resource: '*',
//           },
//         ],
//       },
//       context: {
//         user: decoded,
//       },
//     };
//   } catch (error) {
//     // If the user is not authenticated or does not have the correct
//     // permissions, return an IAM policy that denies access to the resource
//     console.log(error);
//     return {
//       principalId: 'user',
//       policyDocument: {
//         Version: '2012-10-17',
//         Statement: [
//           {
//             Action: 'execute-api:Invoke',
//             Effect: 'Deny',
//             Resource: '*',
//           },
//         ],
//       },
//     };
//   }
// };

import { Event } from "../data_types/types/t_arguments/t_arguments";
type response = {
  userRole: string | null;
  result: boolean;
  userTag: boolean;
};
type roleResponse = {
  result: string;
  userTag: boolean;
};
async function auth(oAuthIdToken: string): Promise<boolean> {
  const decoded: any = jwt.decode(oAuthIdToken);
  console.log(`Decoded: ${JSON.stringify(decoded)}`);
  const groups = decoded["cognito:groups"];
  console.log("🚀 ~ file: index.ts:75 ~ auth ~ groups:", groups)
  // const userRole: string | null = groups.includes("Admin");
  if (groups.includes("us-west-2_cPjOesJgg_Google")) {
    return true;
  } else {
    return false;
  }
}

exports.handler = async function (event: Event) {
  console.log(event);
  const functionsArray: string[] = ["getUserByEmail", "getUserByName"];
  const adminFunctionsList = ["deleteUser"];
  const token = event.authorizationToken;
  const queryName: string = event.requestContext.queryString;
  console.log(`Query Name: ${queryName}`);

  const functionName: string = String(
    functionsArray.find((s) => queryName.includes(s))
  );

  // if (token == "abc") {
  if (await auth(token)) {
    const res = {
      isAuthorized: true,
    };
    return res;
  } else {
    const res = {
      isAuthorized: false,
    };

    return res;
  }
};
