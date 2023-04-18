import { v4 as uuidv4 } from "uuid";
import {
  DynamoDBClient,
  PutItemCommand,
  QueryCommand,
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
  //   console.log(
  //     "🚀 ~ file: TransactionTable.ts:87 ~ allTransactionsList ~ Items:",
  //     Items
  //   );
  
    let item: Transaction[] = new Array(Items.length);
  
    for (let i = 0; i < Items.length; i++) {
      item[i] = unmarshall(Items[i]);
    }
  
    const listOfBalances = item;
  
    listOfBalances.sort((a, b) => b.TimeStamp - a.TimeStamp);
  
    console.log(listOfBalances);
    return listOfBalances;
  };
  
//handler---------------