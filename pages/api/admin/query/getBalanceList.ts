import { v4 as uuidv4 } from "uuid";
const request = require("request");
import {
  DynamoDBClient,
  QueryCommand,
  ScanCommand,
} from "@aws-sdk/client-dynamodb";
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");

const region = "us-west-2";
const client = new DynamoDBClient({ region });

const PKDR_BALANCES_TABLE = "PKDR_BALANCES";

type BalanceListReturnParams = {
  id: number;
  Amount: number;
};

const listBalances = async (): Promise<BalanceListReturnParams[]> => {
  const input = {
    TableName: PKDR_BALANCES_TABLE,
    // ScanIndexForward: false, // To sort the items in descending order
    // ProjectionExpression:"TimeStamp",
    Limit: 30,
    FilterExpression: "id BETWEEN :start AND :end",
    ExpressionAttributeValues: {
      // ":id": {
      //     "S": `${Date.now()}`
      // },
      ":start": {
        S: `${Date.now() - 7 * 24 * 60 * 60 * 1000}`,
      },
      ":end": {
        S: `${Date.now()}`,
      },
    },
  };
  const command = new ScanCommand(input);
  const { Items }: any = await client.send(command);

  let item: BalanceListReturnParams[] = new Array(Items.length);

  for (let i = 0; i < Items.length; i++) {
    item[i] = {
      Amount: unmarshall(Items[i]).Amount,
      id: parseInt(unmarshall(Items[i]).id),
    };
  }

  const listOfBalances = item;

  listOfBalances.sort((a, b) => b.id - a.id);

  console.log(listOfBalances);
  return listOfBalances;
};


//handler for chart
export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    const result = await listBalances();
    res.status(200).json(result);
  } else {
    // Handle any other HTTP method
  }
}
