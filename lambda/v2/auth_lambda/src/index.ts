// import jwt from 'jsonwebtoken';
// import { verify } from 'jsonwebtoken';

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
exports.handler = async function (event:Event) {
  console.log(event);
  let token = event.authorizationToken;
  let effect = "Deny";
  if (token == "abc321") {
   const res={
  "isAuthorized":true
  // "resolverContext": {
  //   "banana":"very yellow",
  //   "apple":"very green" 
  // }
   }
  return res;
}
   else {
      const res={
  "isAuthorized":false
  // "resolverContext": {
  //   "banana":"very yellow",
  //   "apple":"very green" 
  //
  }
  
  
  return res;
}}
