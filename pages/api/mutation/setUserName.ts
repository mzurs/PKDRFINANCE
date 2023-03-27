import { API, Amplify } from "aws-amplify";
import {SetUserName} from "../../../src/API"
import awsExports from "../../../src/aws-exports";
import { setUserName } from "../../../src/graphql/mutations";
import {getUserInfo} from "../mutation/createUser";

Amplify.configure(awsExports);

async function setUserNameAPI(userData: any, idToken: string, oAuthIdToken: string)
{
    let returnResult: boolean = false;
    const { email, eth_address } = await getUserInfo(idToken);

    let user:SetUserName = {
        id: email,
        userName: userData.data.userName
    }

    let variables = {
        user : user
    }

    const authToken = oAuthIdToken;

    try {
        const res: any = await API.graphql({
            query: setUserName,
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

    const { res, returnResult } = await setUserNameAPI(request.body, authTokens[0], authTokens[1]);

    response.status(200).json({ message: JSON.stringify([res,returnResult])});
}
