import { v4 as uuidv4 } from "uuid";
import {
  DynamoDBClient,
  ScanCommand,
} from "@aws-sdk/client-dynamodb";
import { Transaction } from "../../user/mutation/transferFrom/types";
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");

const region = "us-west-2";
const client = new DynamoDBClient({ region });

const TRANSACTIONS_TABLE = "TRANSACTIONS";

// //----------------------------------------------------------------SCAN---------------------------------------------

const allTransactionsList = async () :Promise<Transaction[]>=> {
    const params = {
      TableName: TRANSACTIONS_TABLE,
      ScanIndexForward: false,
  
      Limit: 30,
    };
    const command = new ScanCommand(params);
    const { Items }: any = await client.send(command);
  
    let item: Transaction[] = new Array(Items.length);
  
    for (let i = 0; i < Items.length; i++) {
      item[i] = unmarshall(Items[i]);
    }
  
    const listOfBalances = item;
  
    listOfBalances.sort((a, b) => b.TimeStamp - a.TimeStamp);

    return listOfBalances;
  };
  
//handler---------------

export default async function handler(req: any, res: any) {
  if (req.method === "POST") {

    const result = await allTransactionsList()

    res.status(200).json(result);
  } else {
    // Handle any other HTTP method
  }
}