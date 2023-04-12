import { API, Amplify } from "aws-amplify";
import {SetUserName, SetUserNameMutation, SetUserNameMutationVariables} from "../../../src/API"
import awsExports from "../../../src/aws-exports";
import { setUserName } from "../../../src/graphql/mutations";
import {getUserInfo} from "../mutation/createUser";

Amplify.configure(awsExports);

async function setUserNameAPI(id:string, attrvalue:string):Promise<SetUserNameMutation|any>
{
    let username:SetUserName = {
        id: id,
        userName: attrvalue
    } 

    let variables:SetUserNameMutationVariables = {
        setname : username
    }

    const authToken = "abc";

    try {
        const res = (await API.graphql({
          query: setUserName,
          variables,
          authToken,
        })) as { data: SetUserNameMutation };
    
        console.log(
          "🚀 ~ file: getUsersCount.ts:16 ~ getTotalSupply ~ res:",
          res.data
        );
        return res;
      } catch (error) {
        return error as SetUserNameMutation;
      }
}


export default async function handler(req:any, res:any) {
    if (req.method === 'POST') {

    // console.log("Request = ",req.body);

    const authTokens = JSON.parse(req.headers["x-custom-header"]);
    const { email, eth_address } = await getUserInfo(authTokens[0]);

    const  result = await setUserNameAPI(
        email,
        authTokens[2]
      );
      res.status(200).json(result);
}}
