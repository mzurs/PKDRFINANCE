import { TABLENAME } from "../../../../../../constants";

const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

async function getCNIC(cnic: string): Promise<boolean> {
  const params = {
    TableName: TABLENAME,
    IndexName: "cnicIndex",
    KeyConditionExpression: "#cnic = :cnic",
    ExpressionAttributeNames: { "#cnic": "cnic" },
    ExpressionAttributeValues: { ":cnic": cnic },
  };

  try {
    const { Items } = await docClient.query(params).promise();
    if (typeof Items[0].cnic == "string") {
      return false;
    }
    return true;
  } catch (error) {
    return true;
  }
}

export default getCNIC;
