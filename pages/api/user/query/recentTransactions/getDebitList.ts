import { DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb";
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");

const region = "us-west-2";
const client = new DynamoDBClient({ region });

const TABLE_NAME_DEBIT: string = "DEBIT";

type DebitReturnParams = {
  id: string;
  To: string;
  Amount: number;
  TimeStamp: number;
};

const getDebitsListOfUser = async (
  tokens: string[],
  userName: string
): Promise<null | DebitReturnParams[]> => {
  const time: number = Date.now();

  const params = {
    TableName: TABLE_NAME_DEBIT,
    ScanIndexForward: false,
    KeyConditionExpression: "#pk = :pk and #sk BETWEEN :start_sk AND :end_sk",
    ExpressionAttributeNames: {
      "#pk": "id",
      "#sk": "TimeStamp",
    },
    ExpressionAttributeValues: {
      ":pk": { S: userName },
      ":start_sk": { N: `${time - 7 * 24 * 60 * 60 * 1000}` },
      ":end_sk": { N: `${time}` },
    },
  };

  // Execute the query

  const command = new QueryCommand(params);
  const { Items }: any = await client.send(command);

  if (typeof Items[0] == "undefined") {
    return null;
  } else {
    let items: DebitReturnParams[] = new Array(Items.length);
    for (let i = 0; i < Items.length; i++) {
      items[i] = unmarshall(Items[i]);
    }

    return items;
  }
};

export default async function handler(req:any, res:any) {
  if (req.method === "POST") {
    const authTokens = JSON.parse(req.headers["x-custom-header"]);
    const username:string = req.body.username;
    const  result = await getDebitsListOfUser(
        authTokens,
        username
      );
      res.status(200).json(result);
  } else {
    // Handle any other HTTP method
  }
}
