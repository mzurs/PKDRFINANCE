const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
import { TABLENAME } from "../../../../constants";
import { Error } from "../../../data_types/types/t_return/t_e_user";
import {
  DeletedResult,
  UserNotExists,
} from "../../../data_types/types/t_return/t_user";

async function deleteUser(
  id: string
): Promise<DeletedResult | UserNotExists | Error> {
  if (id != "" || typeof id != "undefined" || typeof id != null) {
    const params = {
      TableName: TABLENAME,//process.env.PKDR_FINANCE_USER_TABLE,
      Key: {
        id: id,
      },
    };
    const { Item } = await docClient.get(params).promise();
    if (typeof Item == "undefined") {
      const userNotExists: UserNotExists = {
        __typename: "UserNotExists",
        message: "User Not Exist",
      };
      return userNotExists;
    } else {
      try {
        await docClient.delete(params).promise();

        const userDeleted: DeletedResult = {
          __typename: "DeletedResult",
          id: id,
          message: `User with userId ${id} deleted`,
        };
        return userDeleted;
      } catch (error) {
        const deleteErrorMessage: Error = {
          __typename: "Error",
          message: `Error while deleting userId: ${id}`,
        };
        return deleteErrorMessage;
      }
    }
  } else {
    const argsError: Error = {
      __typename: "Error",
      message: "Arguments are invalid",
    };
    return argsError;
  }
}
export default deleteUser;
