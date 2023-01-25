import { TABLENAME } from "../../../../../../constants";

const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

async function getPHONENUMBER(PHONE_NUMBER: string): Promise<boolean> {
  const params = {
    TableName: TABLENAME, //process.env.PRODUCT_TABLE,
    IndexName: "PHONE_NUMBER_index",
    KeyConditionExpression: "#PHONE_NUMBER = :PHONE_NUMBER",
    ExpressionAttributeNames: { "#PHONE_NUMBER": "PHONE_NUMBER" },
    ExpressionAttributeValues: { ":PHONE_NUMBER": PHONE_NUMBER },
  };

  try {
    const { Items } = await docClient.query(params).promise();
    if (typeof Items[0].PHONE_NUMBER == "string") {
      return false;
    }
    return true;
  } catch (error) {
    return true;
  }
}

export default getPHONENUMBER;
