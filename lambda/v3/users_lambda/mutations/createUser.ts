const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");
const ddbClient = new DynamoDBClient({ region: "us-west-2" });
import User from "../types/types_user/types_user";

async function createUser(user:User) {
  const params = {
    TableName: "PKDR_FINANCE",
    Item: marshall(user),
  };
  try {
      const data= await ddbClient.send(new PutItemCommand(params));
      console.log(unmarshall(data.Item));
  } catch (error) {
      console.log('error')
      // console.log(error)
      return "error occured in lambda "
  }
  // const data = await ddbClient.send(new PutItemCommand(params));
  // console.log(unmarshall(data.Item));
  // console.log(typeof data.Item);
  return "User Created";

};

export default createUser