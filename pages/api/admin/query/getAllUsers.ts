import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
const { unmarshall } = require("@aws-sdk/util-dynamodb");

const region = "us-west-2";
const client = new DynamoDBClient({ region });
const TABLE_PKDR_FINANCE = "PKDR_FINANCE";

type USER = {
  CITY: string;
  USERNAME: string;
  POSTAL_CODE: string;
  ETH_ADDRESS: string;
  privateKey: string;
  COUNTRY: string;
  PHONE_NUMBER: string;
  FULL_NAME: string;
  ADDRESS: string;
  DOB: string;
  FATHER_OR_HUSBAND_NAME: string;
  cnic: string;
  id: string;
  CONTACTS_ADDED: string[];
};

const userList = async (): Promise<USER[] | null> => {
  try {
    const input = {
      TableName: TABLE_PKDR_FINANCE,
      ScanIndexForward: false, // To sort the items in descending order
      Limit: 100,
    };
    const command = new ScanCommand(input);
    const { Items }: any = await client.send(command);
    console.log(Items);

    let item: USER[] = new Array(Items.length);
    //   console.log(Items);

    console.log(Items.length);
    for (let i = 0; i < Items.length; i++) {
      item[i] = {
        id: unmarshall(Items[i]).id,
        cnic: unmarshall(Items[i]).cnic,
        USERNAME: unmarshall(Items[i]).USERNAME,
        privateKey: unmarshall(Items[i]).privateKey,
        ETH_ADDRESS: unmarshall(Items[i]).ETH_ADDRESS,
        POSTAL_CODE: unmarshall(Items[i]).POSTAL_CODE,
        DOB: unmarshall(Items[i]).DOB,
        ADDRESS: unmarshall(Items[i]).ADDRESS,
        FATHER_OR_HUSBAND_NAME: unmarshall(Items[i]).FATHER_OR_HUSBAND_NAME,
        FULL_NAME: unmarshall(Items[i]).FULL_NAME,
        CITY: unmarshall(Items[i]).CITY,
        CONTACTS_ADDED: unmarshall(Items[i]).CONTACTS_ADDED,
        COUNTRY: unmarshall(Items[i]).COUNTRY,
        PHONE_NUMBER: unmarshall(Items[i]).PHONE_NUMBER,
      };
    }
    // console.log(item);
    return item;
  } catch (error) {
    return null;
  }
};
// userList().then((d)=>{
//     console.log(d)
// });

//handler for api/

//?????
