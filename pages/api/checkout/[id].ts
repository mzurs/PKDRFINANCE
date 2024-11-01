import {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { CHECKOUT_TABLE, USERS_TABLE } from "../../../constants/constants";
const region = "us-west-2";
const client = new DynamoDBClient({ region });
import getRateUSDPKR from "../get_USD_PKDR_rate";
import { mintResult } from "../../../src/API";
import mintPkdr from "../mutation/mintPKDR";
import Stripe from "stripe";
import { CreditParams, Transaction } from "../user/mutation/transferFrom/types";
import add_To_Credit_Table from "../user/mutation/transferFrom/addToCreditTable";
import conversion from "./convertToPKR";
import { v4 as uuidv4 } from "uuid";
import addToTransactionTable from "../mutation/addToTransactionTable";

type ReturnResult = {
  result: boolean;
  message: string;
  ETH_ADDRESS?: string;
  userName: string;
};

const getUserInfo = async (id: string): Promise<ReturnResult> => {
  // console.log("🚀 ~ file: [id].ts:28 ~ getUserInfo ~ id:", id);
  const res: ReturnResult = {
    result: false,
    message: "",
    userName: "",
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
  res.userName = item["USERNAME"];
  return res;
};

const checkAndUpdateCheckoutTable = async (
  sessionId: string,
  amount_received: number,
  authTokens: string[],
  address: string,
  userName: string
): Promise<ReturnResult> => {
  const res: ReturnResult = {
    message: "",
    result: false,
    userName: "",
  };

  const input = {
    Key: marshall({
      id: sessionId,
    }),
    TableName: CHECKOUT_TABLE,
    // Limit:1
  };
  const command = new GetItemCommand(input);
  const data = await client.send(command);
  const Item = data?.Item;

  if (Item == undefined) {
    const num: number = amount_received;
    const floatNum: number = parseFloat((num / 100).toFixed(2));

    const rate = await getRateUSDPKR();

    const amount = floatNum * rate;

    const timeStamp = Date.now();

    const input = {
      TableName: CHECKOUT_TABLE,
      Item: marshall({
        id: sessionId,
        isClaimed: true,
        amount: amount,
        TimeStamp: timeStamp,
      }),
    };
    const command = new PutItemCommand(input);
    const response = await client.send(command);
    const mintRes: mintResult = await mintPkdr(
      authTokens,
      address,
      String(amount)
    );
    // console.log("🚀 ~ file: [id].ts:100 ~ mintRes:", mintRes);
    res.message = mintRes.message!;
    res.result = mintRes.result ? true : false;

    //----------------------------------------conversion of Amount-------------------------------

    await conversion(Number(amount_received));
    // const num: number = amount_received;
    // const floatNum: number = parseFloat((num / 100).toFixed(2));

    // const rate = await getRateUSDPKR();

    // const amount = floatNum * rate;
    const creditParams: CreditParams = {
      id: userName,
      TimeStamp: timeStamp,
      From: "PKDR_FINANCE",
      Amount: amount,
    };
    // console.log("🚀 ~ file: [id].ts:156 ~ creditParams:", creditParams);

    await add_To_Credit_Table(creditParams);
    
    console.log(
      "-------------Minting Data Tx--------------------------------"
    );

    const params: Transaction = {
      id: uuidv4(),
      From: "PKDR_FINANCE",
      To: userName,
      Amount: Number(amount),
      Type: "DEPOSIT",
      TimeStamp: Date.now(),
    };
   await  addToTransactionTable(params);

   console.log("////////////////////////////////");


  } else {
    res.message = "session already claimed";
    // console.log("🚀 ~ file: [id].ts:105 ~ res:", res);
    res.result = false;
    return res;
  }
  return res;
};

const stripe = new Stripe(String(process.env.STRIPE_SECRET_KEY), {
  //@ts-ignore
  apiVersion: "2020-03-02",
});

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: any, res: any) => {
  const authTokens = JSON.parse(req.headers["x-custom-header"]);
  // console.log("🚀 ~ file: [id].ts:156 ~ authTokens:", authTokens);
  const resUserInfo: ReturnResult = await getUserInfo(authTokens[0]);

  const { id } = req.query;

  const session = await stripe.checkout.sessions.retrieve(id, {
    expand: ["payment_intent"],
  });
  // console.log("🚀 ~ file: [id].ts:157 ~ session:", session);

  const { payment_intent } = session;

  const { amount_received }: any = payment_intent;
  console.log("🚀 ~ file: [id].ts:19 ~ amount_received:", amount_received);
  const { status }: any = payment_intent;
  if (status === "succeeded") {
    const resCheckoutTable: ReturnResult = await checkAndUpdateCheckoutTable(
      id,
      amount_received,
      authTokens,
      resUserInfo.ETH_ADDRESS!,
      resUserInfo.userName
    );
    if (resCheckoutTable.result) {
      // await conversion(Number(amount_received));
      // const num: number = amount_received;
      // const floatNum: number = parseFloat((num / 100).toFixed(2));
      // const rate = await getRateUSDPKR();
      // const amount = floatNum * rate;
      // const creditParams: CreditParams = {
      //   id: resUserInfo.userName,
      //   TimeStamp: Date.now(),
      //   From: "PKDR_FINANCE",
      //   Amount: amount,
      // };
      // // console.log("🚀 ~ file: [id].ts:156 ~ creditParams:", creditParams);
      // await add_To_Credit_Table(creditParams);
    }
    res.status(200).json({ resCheckoutTable, resUserInfo });
  } else {
    const message = "Payment Failure";
    res.status(200).json({ message });
  }

  res.status(200).json({ session, resUserInfo });
};
