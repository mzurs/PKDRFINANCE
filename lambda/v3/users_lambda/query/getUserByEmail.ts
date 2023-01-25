const { DynamoDBClient, GetItemCommand } = require("@aws-sdk/client-dynamodb");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");
const ddbClient = new DynamoDBClient({ region: "us-west-2" });

async function getUserByEmail(id: string) {
  const params = {
    TableName: "PKDR_FINANCE",
    Key: marshall({ id: id }),
  };
  try {
    const { Item } = await ddbClient.send(new GetItemCommand(params));
    console.log(unmarshall(Item));
    return Item;
  } catch (error) {
    console.log("error");
    // console.log(error)
  }

  // console.log(unmarshall(data.Item));
}

export default getUserByEmail;
