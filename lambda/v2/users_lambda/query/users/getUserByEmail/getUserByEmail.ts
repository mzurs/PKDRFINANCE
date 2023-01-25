const AWS = require("aws-sdk");
const docClinet = new AWS.DynamoDB.DocumentClient();
import { type } from "os";
import { User } from "../../../data_types/types/t_arguments/t_user";
import { UserNotExists, UserInfo } from "../../../data_types/types/t_return/t_user";
import { Error } from "../../../data_types/types/t_return/t_e_user";
import { TABLENAME } from "../../../../constants";



async function getUserByEmail(
  id: string
): Promise<UserInfo | UserNotExists | Error> {
  const params = {
    TableName: TABLENAME,//process.env.PKDR_FINANCE_USER_TABLE,
    Key: {
      id: id,
    },
  };

  try {
    const { Item } = await docClinet.get(params).promise();
    if (typeof Item == "undefined") {
      const userNotExists: UserNotExists = {
        __typename: "UserNotExists",
        message: `User with id: ${id} not exists`,
      };
      return userNotExists;
    } else {
      const userInfo: UserInfo = {
        __typename: "UserInfo",
        userInfo: `${Item.id}`,
      };
      return userInfo;
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
    message: "Error while fetching through Email",
  };
  return ERROR;
}

export default getUserByEmail;
