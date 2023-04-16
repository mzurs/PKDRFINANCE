import { v4 as uuidv4 } from "uuid";
const request = require("request");
import {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  QueryCommand,
} from "@aws-sdk/client-dynamodb";
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");

const region = "us-west-2";
const client = new DynamoDBClient({ region });

const PKDR_BALANCES_TABLE = "PKDR_BALANCES";

const getBalance = (): Promise<any> => {
  const URL =
    "https://api.sandbox.transferwise.tech/v4/profiles/16565240/balances?types=STANDARD ";

  return new Promise((resolve, reject) => {
    const options = {
      url: URL,
      method: "GET",
      headers: {
        Authorization: "Bearer 613161da-3f90-48a1-b179-d7aefaf70cf1",
      },
    };
    request(options, (error: any, response: unknown, body: any) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
};

const getBalancePKR = async (): Promise<number> => {
  const balances = (await getBalance()).body;
  let balancePKR = JSON.parse(balances);

  const { value, currency }: string | null | any = balancePKR[4].totalWorth;
  console.log(
    "🚀 ~ file: getBalances.ts:63 ~ getBalancePKR ~ balancePKR:",
    value,
    currency
  );
  return Number(value);
};

const addToPKDR_BALANCESTable = async (
  value: string,
  totalBalance: number
): Promise<void> => {
  const input = {
    TableName: PKDR_BALANCES_TABLE,
    Item: marshall({
      id: Date.now().toString(),
      Amount: value + totalBalance,
    }),
  };
  const command = new PutItemCommand(input);
  await client.send(command);
  //   console.log(
  //     "🚀 ~ file: txTable.ts:22 ~ addT0TransactionsTable ~ response:",
  //     response
  //   );
};
const getConversionQuote = async (amount: number) => {
  const URL_CONVERSION_QUOTES =
    "https://api.sandbox.transferwise.tech/v3/profiles/16565240/quotes";

  return new Promise((resolve, reject) => {
    const options = {
      url: URL_CONVERSION_QUOTES,
      method: "POST",
      headers: {
        Authorization: "Bearer 613161da-3f90-48a1-b179-d7aefaf70cf1",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sourceCurrency: "USD",
        targetCurrency: "PKR",
        sourceAmount: amount,
        targetAmount: null,
        payOut: "BALANCE",
        preferredPayIn: null,
      }),
    };
    request(options, (error: any, response: unknown, body: any) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
};

const convertToPKR = async (quoteConversionId: any) => {
  const URL_CONVERSION =
    "https://api.sandbox.transferwise.tech/v2/profiles/16565240/balance-movements";

  return new Promise((resolve, reject) => {
    const options = {
      url: URL_CONVERSION,
      method: "POST", // 'GET', 'PUT', 'DELETE', etc.
      // body: JSON.stringify(data), // Coordinate the body type with 'Content-Type'
      body: JSON.stringify({
        quoteId: quoteConversionId,
      }),
      headers: {
        Authorization: "Bearer 613161da-3f90-48a1-b179-d7aefaf70cf1",
        "Content-Type": "application/json",
        "X-idempotence-uuid": uuidv4(),
      },
    };
    request(options, (error: any, response: unknown, body: any) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
};

const conversion = async (amount: number) => {
  let quote: any = await getConversionQuote(amount);
  quote = quote.body;
  let quoteConversionId = JSON.parse(quote);
  quoteConversionId = quoteConversionId["id"];
  console.log(
    "🚀 ~ file: conversionToPKR.ts:108 ~ convertToPKR ~ quoteConversionId:",
    quoteConversionId
  );

  let converteResponse: any = await convertToPKR(quoteConversionId);
  converteResponse = converteResponse.body;
  let result = JSON.parse(converteResponse);
  console.log(
    "🚀 ~ file: conversionToPKR.ts:145 ~ conversion ~ result:",
    typeof result["targetAmount"].value
  );
  console.log(result["id"]);

  // console.log(await getBalancePKR());

  if (typeof result["targetAmount"].value == "number") {
    console.log(
      "----------------------------------------START -----------------------------------"
    );

    await addToPKDR_BALANCESTable(
      result["targetAmount"].value,
      await getBalancePKR()
    );

    console.log(
      "----------------------------------------END -----------------------------------"
    );
  }
};
// conversion(2);

export default conversion;
