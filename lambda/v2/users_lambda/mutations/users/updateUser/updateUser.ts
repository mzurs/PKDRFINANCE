const AWS = require("aws-sdk");
const docClinet = new AWS.DynamoDB.DocumentClient();
import { TABLENAME } from "../../../../constants";
import { ICHECKBYEMAIL } from "../../../data_types/interfaces/i_user";
import { UpdateUser } from "../../../data_types/types/t_arguments/t_user";
import { Error } from "../../../data_types/types/t_return/t_e_user";
import {
  UpdatedResult,
  UserNotExists,
} from "../../../data_types/types/t_return/t_user";

async function updateUser(
  user: UpdateUser
): Promise<UpdatedResult | UserNotExists | Error> {
  if (user.id != "" || typeof user.id != null || typeof user == "undefined") {
    const emailParams: ICHECKBYEMAIL = {
      TableName: TABLENAME, //process.env.PKDR_FINANCE_USER_TABLE,
      Key: {
        id: user.id,
      },
    };

    if (user.id) {
      try {
        const { Item } = await docClinet.get(emailParams).promise();
        if (typeof Item == "undefined") {
          const userNotExists: UserNotExists = {
            __typename: "UserNotExists",
            message: `User with id: ${user.id} not exists`,
          };
          return userNotExists;
        } else if (typeof Item.id == "string" || typeof Item != "undefined") {
          var params = {
            TableName: TABLENAME, //process.env.PKDR_FINANCE_USER_TABLE,
            Key: { id: user.id },
            UpdateExpression: "SET #attributeName = :attributeValue",
            ExpressionAttributeNames: {
              "#attributeName": `${user.attributeName}`,
            },
            ExpressionAttributeValues: {
              ":attributeValue": `${user.attributeValue}`,
            },

            ReturnValues: "ALL_NEW",
          };

          await docClinet.update(params).promise();
          const updatedItemResult: UpdatedResult = {
            __typename: "UpdatedResult",
            id: user.id,
            message: "User updated",
          };
          return updatedItemResult;
        } else {
          const idError: Error = {
            __typename: "Error",
            message: `User with ${user.id} not found`,
          };
          return idError;
        }
      } catch (error) {
        console.log("****", error);
        const ERROR: Error = {
          __typename: "Error",
          message: error as string,
        };
        return ERROR;
      }
    } else {
      const argsError: Error = {
        __typename: "Error",
        message: "Arguments are invalid",
      };
      return argsError;
    }

    const ERROR: Error = {
      __typename: "Error",
      message: "Error while updating user",
    };
    return ERROR;
  } else {
    const argsError: Error = {
      __typename: "Error",
      message: "Arguments are invalid",
    };
    return argsError;
  }
}

export default updateUser;
