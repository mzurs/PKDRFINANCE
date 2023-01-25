import { TABLENAME } from "../../../../constants";
import { SetUserName } from "../../../data_types/types/t_arguments/t_user";
const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
async function getUserName(name: string): Promise<boolean> {
  const params = {
    TableName: TABLENAME,
    IndexName: "userNameIndex",
    KeyConditionExpression: "#USERNAME = :USERNAME",
    ExpressionAttributeNames: { "#USERNAME": "USERNAME" },
    ExpressionAttributeValues: { ":USERNAME": name },
  };

  try {
    const { Items } = await docClient.query(params).promise();
    if (typeof Items[0].USERNAME == "string") {
      return true;
    }
    // return true;
  } catch (error) {
    return false;
  }
  return false;
}

async function setUserName(setname: SetUserName): Promise<string> {
  const id = setname.id;
  const name = setname.userName;
  const ifNameExists = await getUserName(name);
  if (!ifNameExists) {
    var params = {
      TableName: TABLENAME, //process.env.PKDR_FINANCE_USER_TABLE,
      Key: { id: id },
      UpdateExpression: "SET #attributeName = :attributeValue",
      ExpressionAttributeNames: {
        "#attributeName": `USERNAME`,
      },
      ExpressionAttributeValues: {
        ":attributeValue": `${name}`,
      },

      ReturnValues: "ALL_NEW",
    };

    try {
      await docClient.update(params).promise();
      return "UserName Created";
    } catch (error) {
      return "error while inserting a username";
    }
  } else {
    return "username is taken";
  }
  return "ERROR OCCURED IN FUNCTION SETUSERNAME";
}

export default setUserName;
