import { TABLENAME } from "../../../../../../constants";

const AWS = require("aws-sdk");
const docClinet = new AWS.DynamoDB.DocumentClient();

async function getID(id:string):Promise< boolean>{
    const params = {
        TableName: TABLENAME,//process.env.PKDR_FINANCE_USER_TABLE,
        Key: {
          id: id,
        },
      };

      try {
        const {Item}=await docClinet.get(params).promise();
        return (typeof Item=="undefined")?true:false
      } catch (error) {
        return false
      }
    return false
}

export default getID;