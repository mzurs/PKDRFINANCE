import {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  QueryCommand,
} from "@aws-sdk/client-dynamodb";
import { DebitParams } from "./types";
const { marshall } = require("@aws-sdk/util-dynamodb");

const region = "us-west-2";
const client = new DynamoDBClient({ region });

const TABLE_NAME_DEBIT: string = "DEBIT";



const add_To_Debit_Table = async (item: DebitParams): Promise<void> => {
  const input = {
    TableName: TABLE_NAME_DEBIT,
    Item: marshall({
      id: item.id,
      TimeStamp: item.TimeStamp,
      To: item.To,
      Amount: item.Amount,
    }),
  };
  console.log("🚀 ~ file: addToDebitTable.ts:27 ~ constadd_To_Debit_Table= ~ input:", input)
  const command = new PutItemCommand(input);
  await client.send(command);
};


export default add_To_Debit_Table;