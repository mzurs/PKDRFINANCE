const AWS = require("aws-sdk");
const docClinet = new AWS.DynamoDB.DocumentClient();

import { TABLENAME } from "../../../../constants";
import { IPREREGISTERUSER } from "../../../data_types/interfaces/i_user";
import { User } from "../../../data_types/types/t_arguments/t_user";
import { Error } from "../../../data_types/types/t_return/t_e_user";
import {
  UserInfo,
  UserExists,
} from "../../../data_types/types/t_return/t_user";
import createUser from "../../../mutations/users/createUser/createUser";
import getCNIC from "./preRegisterUserFunctions/getCNIC/getCNIC";
import getID from "./preRegisterUserFunctions/getID/getID";
import getPHONENUMBER from "./preRegisterUserFunctions/getPHONENUMBER/getPHONENUMBER";

import topUpApi from "../../../../pkdr_lambda/topUp/topUpApi/index";
async function preRegisterUser(
  preUser: IPREREGISTERUSER
): Promise<Error | UserInfo | UserExists> {
  const ERROR: Error = {
    __typename: "Error",
    message: "",
  };

  // const rate = await topUpApi("getRateMaticToUsd");

  if ((await getID(preUser.id)) == true) {
    if ((await getCNIC(preUser.cnic)) == true) {
      if ((await getPHONENUMBER(preUser.PHONE_NUMBER)) == true) {
        // const user: User = {
        //   id: preUser.id,
        //   cnic: preUser.cnic,
        //   PHONE_NUMBER: preUser.PHONE_NUMBER,
        // };

        const params = {
          address: preUser.ETH_ADDRESS,
        };
        await topUpApi("topUpAddress", params);
        // await topUpAddress("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")
        return await createUser(preUser as User);
      } else {
        ERROR.message = `PhoneNumber => ${preUser.PHONE_NUMBER} already exists`;
        return ERROR;
      }
    } else {
      ERROR.message = `CNIC => ${preUser.cnic} already exists`;
      return ERROR;
    }
  } else {
    ERROR.message = `Id => ${preUser.id} already exists`;
    return ERROR;
  }
  return ERROR;
}

export default preRegisterUser;
