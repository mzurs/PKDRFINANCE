import { API, Amplify } from "aws-amplify";
import awsExports from "../../../../src/aws-exports";
import { UpdateContactList, AddContactsMutation } from "../../../../src/API";
import { addContacts } from "../../../../src/graphql/mutations";
import * as jwt from "jsonwebtoken";


Amplify.configure(awsExports);

export const getUserInfo = async (idToken: string) => {
  const decoded: any = await jwt.decode(idToken);
  const email = decoded.email;
 
  return { email };
}; 

const addContactsAPI = async function (
  authTokens: string[],
  id: string,
  attr: string
): Promise<AddContactsMutation|any> {
  const AddContactsMutationVariables: UpdateContactList = {
    id: id,
    attributeValue: attr
  };
  const authToken = "abc";
  const variables = {
    user: AddContactsMutationVariables,
  };
  try {
    const res = (await API.graphql({
      query: addContacts,
      variables,
      authToken,
    })) as { data: AddContactsMutation };

    console.log(
      "🚀 ~ file: getUsersCount.ts:16 ~ getTotalSupply ~ res:",
      res.data
    );
    return res;
  } catch (error) {
    return error as AddContactsMutation;
  }
};

export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    const authTokens = JSON.parse(req.headers["x-custom-header"]);
    const { email } = await getUserInfo(authTokens[0]);
    const  result = await addContactsAPI(
        authTokens,
        email,
        authTokens[2]
      );
      res.status(200).json(result);
  } else {
    // Handle any other HTTP method
  }
}
