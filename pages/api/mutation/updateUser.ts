import { API, Amplify } from "aws-amplify";
import type { UpdateUser, updateUserResult } from "../../../src/API";
import awsExports from "../../../src/aws-exports";
import { updateUser } from "../../../src/graphql/mutations";
import {getUserInfo} from "../mutation/createUser";
Amplify.configure(awsExports);

async function updateUserAPI(userData: any, idToken: string, oAuthIdToken: string)
{
    let returnResult: boolean = false;
    const { email, eth_address } = await getUserInfo(idToken);

    let user:UpdateUser = {
        id: email,
        attributeName: userData.data.attr_name,
        attributeValue: userData.data.attr_value
    }

    let variables = {
        user : user
    }

    const authToken = oAuthIdToken;

    try {
        const res: any = await API.graphql({
            query: updateUser,
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

    const { res, returnResult } = await updateUserAPI(request.body, authTokens[0], authTokens[1]);

    response.status(200).json({ message: JSON.stringify([res,returnResult])});
}
