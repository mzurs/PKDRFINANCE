import { API, Amplify } from "aws-amplify";
import awsExports from "../../../../src/aws-exports";
import { ListContactsParams, ListContactsQuery } from "../../../../src/API";
import { listContacts } from "../../../../src/graphql/queries";

Amplify.configure(awsExports);

const listUserContacts = async function (
  authTokens: string[],
  userName: string
): Promise<ListContactsQuery> {
  const listContactsParams: ListContactsParams = {
    id: userName
  }
  const authToken = "abc";
  const variables = {
    listContactsParams: listContactsParams,
  };
  try {
    const res = (await API.graphql({
      query: listContacts,
      variables,
      authToken,
    })) as { data: ListContactsQuery };

    console.log(
      "🚀 ~ file: getUsersCount.ts:16 ~ getTotalSupply ~ res:",
      res.data
    );
    return res.data;
  } catch (error) {
    return error as ListContactsQuery;
  }
};
export default listUserContacts;
