import { TABLENAME } from "../../../../constants"
import {IUSER} from "../../../data_types/interfaces/i_user"
import { User } from "../../../data_types/types/t_return/t_user"
import { Error } from "../../../data_types/types/t_return/t_e_user"
const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient()

async function getAllUserInfo():Promise<User> {
    const params = {
        TableName: TABLENAME//process.env.PRODUCT_TABLE,
    }
   const error:User={
    id:"string",
    cnic :"string",
    PHONE_NUMBER: "string",
    ETH_ADDRESS: "string",
    FULL_NAME: "string",
    DOB: "string",
    FATHER_OR_HUSBAND_NAME: "string",
    CITY: "string",
    COUNTRY: "string",
    POSTAL_CODE: "string",
    ADDRESS: "string"
   }
    try {
        const data = await docClient.scan(params).promise()
        const Items:IUSER[]=data.Items;
        return data.Items;
    } catch (err) {
        console.log('DynamoDB error: ', err)
        return error;
    }
}







export default getAllUserInfo;