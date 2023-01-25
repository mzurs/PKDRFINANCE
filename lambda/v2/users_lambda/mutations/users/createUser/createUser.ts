const AWS = require("aws-sdk");
const docClinet = new AWS.DynamoDB.DocumentClient();
import { User } from "../../../data_types/types/t_arguments/t_user";
import {
  UserExists,
  UserNotExists,
  UserInfo,
} from "../../../data_types/types/t_return/t_user";
import { Error } from "../../../data_types/types/t_return/t_e_user";
import { IUSER, ICHECKBYEMAIL } from "../../../data_types/interfaces/i_user";
import getUserByEmail from "../../../query/users/getUserByEmail/getUserByEmail";
import { TABLENAME } from "../../../../constants";


const userExists: UserExists = {
  __typename: "UserExists",
  message: "User Already Exist",
};
const userNotExists: UserNotExists = {
  __typename: "UserNotExists",
  message: "",
};

async function createUser(user: User): Promise<UserInfo | UserExists | Error> {
  if (user.id != "" || typeof user.id != null || typeof user != "undefined") {
    const params = {
      TableName: TABLENAME,//process.env.PKDR_FINANCE_USER_TABLE,
      Item: user,
    };
    const emailParams: ICHECKBYEMAIL = {
      TableName: TABLENAME,//process.env.PKDR_FINANCE_USER_TABLE,
      Key: {
        id: user.id,
      },
    };
    if (user) {
      const { Item } = await docClinet.get(emailParams).promise();
      if (typeof Item == "undefined") {
        try {
          await docClinet.put(params).promise();
          const userInfo: UserInfo = {
            __typename: "UserInfo",
            userInfo: user.id,
          };
          
          return userInfo;
        } catch (error) {
          const ERROR: Error = {
            __typename: "Error",
            message: error as string,
          };
          return ERROR;
        }
      } else {
        const userExists: UserExists = {
          __typename: "UserExists",
          message: "User Already Exist",
        };
        return userExists;
      }
    } else {
      const argsError: Error = {
        __typename: "Error",
        message: "Arguments are invalid",
      };
      return argsError;
    }
  } else {
    const ERROR: Error = {
      __typename: "Error",
      message: "Error while creating user",
    };
    return ERROR;
  }
}
export default createUser;
