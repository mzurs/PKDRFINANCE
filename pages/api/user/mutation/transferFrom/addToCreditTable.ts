import { marshall } from "@aws-sdk/util-dynamodb";
import { CreditParams } from "./types";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const region = "us-west-2";
const client = new DynamoDBClient({ region });

const TABLE_NAME_CREDIT: string = "CREDIT";

const add_To_Credit_Table = async (item: CreditParams): Promise<void> => {
  const input = {
    TableName: TABLE_NAME_CREDIT,
    Item: marshall({
      id: item.id,
      TimeStamp: item.TimeStamp,
      From: item.From,
      Amount: item.Amount,
    }),
  };
  const command = new PutItemCommand(input);
  await client.send(command);
};

export default add_To_Credit_Table;
