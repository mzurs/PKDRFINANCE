import {
    DynamoDBClient,
    GetItemCommand,
    PutItemCommand,
  } from "@aws-sdk/client-dynamodb";
  import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { USERS_TABLE } from "../../../../constants/constants";
  const region = "us-west-2";
  const client = new DynamoDBClient({ region });

  
type ReturnResult = {
    result: boolean;
    message: string;
    ETH_ADDRESS?: string;
  };
const getUserInfo = async (id: string): Promise<ReturnResult> => {
    console.log("🚀 ~ file: [id].ts:28 ~ getUserInfo ~ id:", id);
    const res: ReturnResult = {
      result: false,
      message: "",
    };
    const input = {
      Key: marshall({
        id: id,
      }),
      TableName: USERS_TABLE,
      Limit: 1,
    };
    const command = new GetItemCommand(input);
    const data: any = await client.send(command);
    if (data.Item == undefined) {
      res.result = false;
      res.message = "User not found";
      return res;
    }
    const item = unmarshall(data.Item);
  
    res.result = true;
    res.message = "user found";
    res.ETH_ADDRESS = item["ETH_ADDRESS"];
    return res;
  };
  

  export default getUserInfo;