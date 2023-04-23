import {
    DynamoDBClient,
    QueryCommand,
  } from "@aws-sdk/client-dynamodb";
import { CreditReturnParams } from "./type";
  const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");
  
  const region = "us-west-2";
  const client = new DynamoDBClient({ region });
  
  const TABLE_NAME_CREDIT: string = "CREDIT";
  

  

  
  const getCreditsListOfUser = async (
    tokens: string[],
    userName: string
  ): Promise<null | CreditReturnParams[]> => {
      const time: number = Date.now();
  
      const params = {
        TableName: TABLE_NAME_CREDIT,
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
        let items: CreditReturnParams[] = new Array(Items.length);
        for (let i = 0; i < Items.length; i++) {
          items[i] = {
            Amount: unmarshall(Items[i]).Amount,
            TimeStamp: unmarshall(Items[i]).TimeStamp,
          };
        }
      //   console.log(items);
    
        return items;
      }
  };
  
  
  
 
  
export default getCreditsListOfUser;