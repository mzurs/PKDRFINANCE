const AWS = require("aws-sdk");
const docClinet = new AWS.DynamoDB.DocumentClient();
import { type } from "os";
import { User } from "../../../data_types/types/t_arguments/t_user";
import { UserNotExists, UserInfo,AddressInfo } from "../../../data_types/types/t_return/t_user";
import { Error } from "../../../data_types/types/t_return/t_e_user";
import { TABLENAME } from "../../../../constants";
const docClient = new AWS.DynamoDB.DocumentClient();


async function getUserNameAddress(USERNAME: string): Promise<string |boolean> {
  const params = {
    TableName: TABLENAME,
    IndexName: "getAddressByUserNameIndex",
    KeyConditionExpression: "#USERNAME = :USERNAME",
    ExpressionAttributeNames: { "#USERNAME": "USERNAME" },
    ExpressionAttributeValues: { ":USERNAME": USERNAME },
  };

  try {
    const { Items } = await docClient.query(params).promise();
    if (typeof Items[0].USERNAME == "string") {
      return Items[0].ETH_ADDRESS
    }else{
    return false;}
  } catch (error) {
    return false;
  }
}



async function getAddressByUserName(
  userName: string
): Promise<AddressInfo | UserNotExists | Error> {
  const params = {
    TableName: TABLENAME,//process.env.PKDR_FINANCE_USER_TABLE,
    Key: {
      id: userName,
    },
  };

  try {
    const { Item } = await docClinet.get(params).promise();
    if (typeof Item == "undefined") {
      const userNotExists: UserNotExists = {
        __typename: "UserNotExists",
        message: `User with id: ${userName} not exists`,
      };
      return userNotExists;
    } else {

const address:string |boolean= await getUserNameAddress(userName);
if(typeof(address)=="string"){
const AddressInfo:AddressInfo={
  __typename:"AddressInfo",
  address:`${address}`
}
  return AddressInfo;
}else{
  const ERROR: Error = {
    __typename: "Error",
    message: "Error while fetching addresses through userName",
  };
  return ERROR

}
   
    }
  } catch (err) {
    console.log("****", err);
    const ERROR: Error = {
      __typename: "Error",
      message: err as string,
    };
    return ERROR;
  }
  const ERROR: Error = {
    __typename: "Error",
    message: "Error while fetching through UserName",
  };
  return ERROR;
}

export default getAddressByUserName;
