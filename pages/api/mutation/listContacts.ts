import { API, Amplify } from "aws-amplify";
import type { ListContactsParams, ListContactsResponse } from "../../../src/API";
import awsExports from "../../../src/aws-exports";
import { listContacts } from "../../../src/graphql/queries";
// import {getUserInfo} from "../mutation/createUser";
Amplify.configure(awsExports);

async function listContactAPI(userData: any, idToken: string, oAuthIdToken: string)
{
    let returnResult: boolean = false;
    // const { email, eth_address } = await getUserInfo(idToken);

    let user:ListContactsParams = {
        id: "k190155@nu.edu.pk"//userData.data.id
    }

    let variables = {
        user : user
    }

    const authToken = "abc";

    try {
        const res: any = await API.graphql({
            query: listContacts,
            variables,
            authToken,
        });
        returnResult = true;
        return { res, returnResult };
    
    } catch (error) {
        const res=error;
        return { res, returnResult };
    }
}

export default async function handler(request: any, response: any){
    const authTokens = JSON.parse(request.headers["x-custom-header"]);

    const { res, returnResult } = await listContactAPI(request.body, authTokens[0], authTokens[1]);

    response.status(200).json({ message: JSON.stringify([res,returnResult])});
}