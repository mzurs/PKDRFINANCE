import { v4 as uuidv4 } from "uuid";
const request = require("request");
import {
  DynamoDBClient,
  PutItemCommand,
  QueryCommand,
  ScanCommand,
} from "@aws-sdk/client-dynamodb";
import { Transaction } from "../user/mutation/transferFrom/types";
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");

const region = "us-west-2";
const client = new DynamoDBClient({ region });

const TRANSACTIONS_TABLE = "TRANSACTIONS";



const addToTransactionTable = async (
  transaction: Transaction
): Promise<void> => {
  if (
    typeof transaction.Type == "undefined" ||
    typeof transaction.Type == null
  ) {
    return;
  } else {
    if (transaction.Type === "DEPOSIT") {
      const id = uuidv4();
      const input = {
        TableName: TRANSACTIONS_TABLE,
        Item: marshall({
          id: id,
          Amount: transaction.Amount,
          From: transaction.From,
          To: transaction.To,
          TimeStamp: transaction.TimeStamp,
          Type: transaction.Type,
        }),
      };
      const command = new PutItemCommand(input);
      await client.send(command);
    } else {
      const input = {
        TableName: TRANSACTIONS_TABLE,
        Item: marshall({
          id: transaction.id,
          Amount: transaction.Amount,
          From: transaction.From,
          To: transaction.To,
          TimeStamp: transaction.TimeStamp,
          Type: transaction.Type,
        }),
      };
      const command = new PutItemCommand(input);
      await client.send(command);
    }
  }
};


export default  addToTransactionTable;