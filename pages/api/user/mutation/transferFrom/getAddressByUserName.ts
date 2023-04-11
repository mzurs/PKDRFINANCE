// import { API, Amplify } from "aws-amplify";
// import awsExports from "../../../../../src/aws-exports";
// import { GetAddressByUserNameQuery } from "../../../../../src/API";
// import { getAddressByUserName } from "../../../../../src/graphql/queries";
// const awsmobile = {
//   aws_project_region: "us-west-2",
//   aws_appsync_graphqlEndpoint:
//     "https://n2g6utk3u5bjhigq6k7ck2xuuq.appsync-api.us-west-2.amazonaws.com/graphql",
//   aws_appsync_region: "us-west-2",
//   aws_appsync_authenticationType: "AWS_LAMBDA",
// };
// Amplify.configure(awsExports);

// const getAddressFromUserName = async function (
//   authTokens: string[],
//   userName: string
// ): Promise<GetAddressByUserNameQuery> {
//   const authToken = "abc";
//   const variables = {
//     userName: userName,
//   };
//   try {
//     const res = (await API.graphql({
//       query: getAddressByUserName,
//       variables,
//       authToken,
//     })) as { data: GetAddressByUserNameQuery };

//     console.log(
//       "🚀 ~ file: getUsersCount.ts:16 ~ getTotalSupply ~ res:",
//       res.data
//     );
//     const data = res.data;
//     if (data.getAddressByUserName?.address) {
//       console.log("errorOCcured");
//     } else if (data.getAddressByUserName?.__typename === "AddressInfo") {
//       console.log("AddressInfo");
//     } else if (data.getAddressByUserName?.__typename === "UserNotExists") {
//       console.log("UserNotExist");
//     }
//     return res.data!;
//   } catch (error) {
//     return error as GetAddressByUserNameQuery;
//   }
// };
// export default getAddressFromUserName;
