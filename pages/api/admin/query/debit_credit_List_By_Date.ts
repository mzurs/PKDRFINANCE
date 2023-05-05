import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");

const region = "us-west-2";
const client = new DynamoDBClient({ region });

const TABLE_NAME_CREDIT: string = "CREDIT";
const TABLE_NAME_DEBIT: string = "DEBIT";

interface Transactions {
  TimeStamp: number;
  Amount: number;
}

function groupTransactionsByDate(transactions: Transactions[]) {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const filteredTransactions = transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.TimeStamp);
    return transactionDate >= oneWeekAgo;
  });

  const groupedTransactions: { [date: string]: number } = {};
  filteredTransactions.forEach((transaction) => {
    const date = new Date(transaction.TimeStamp).toLocaleDateString();
    if (groupedTransactions[date]) {
      groupedTransactions[date] += transaction.Amount;
    } else {
      groupedTransactions[date] = transaction.Amount;
    }
  });

  const sortedTransactions = Object.entries(groupedTransactions)
    .sort(([date1], [date2]) => {
      const time1 = new Date(date1).getTime();
      const time2 = new Date(date2).getTime();
      return time1 - time2;
    })
    .reduce((sorted: any, [date, total]) => {
      sorted[date] = total;
      return sorted;
    }, {});

  return sortedTransactions;
}

const debits = async (): Promise<object | null> => {
  const input = {
    TableName: TABLE_NAME_DEBIT,
    AttributesToGet: ["TimeStamp", "Amount"],
    ScanIndexForward: false, // To sort the items in descending order
    Limit: 100,
  };
  try {
    const command = new ScanCommand(input);
    const { Items }: any = await client.send(command);

    let item: Transactions[] = new Array(Items.length);
    item.sort((a, b) => b.TimeStamp - a.TimeStamp);
    //   console.log(Items);

    console.log(Items.length);
    for (let i = 0; i < Items.length; i++) {
      item[i] = {
        Amount: unmarshall(Items[i]).Amount,
        TimeStamp: parseInt(unmarshall(Items[i]).TimeStamp),
      };
    }
    //   console.log(item);
    return groupTransactionsByDate(item);
  } catch (err) {
    console.log(err as string);
    return null;
  }
};
const credits = async (): Promise<any | null> => {
  const input = {
    TableName: TABLE_NAME_CREDIT,
    AttributesToGet: ["TimeStamp", "Amount"],
    ScanIndexForward: false, // To sort the items in descending order
    Limit: 100,
  };
  try {
    const command = new ScanCommand(input);
    const { Items }: any = await client.send(command);

    let item: Transactions[] = new Array(Items.length);
    item.sort((a, b) => b.TimeStamp - a.TimeStamp);
    //   console.log(Items);

    console.log(Items.length);
    for (let i = 0; i < Items.length; i++) {
      item[i] = {
        Amount: unmarshall(Items[i]).Amount,
        TimeStamp: parseInt(unmarshall(Items[i]).TimeStamp),
      };
    }
    //   console.log(item);
    return groupTransactionsByDate(item);
  } catch (err) {
    console.log(err as string);
    return null;
  }
};

// const getTotalList = async () => {
//   const debitList = await debits();
//   const creditList = await credits();
//   console.log(debitList, "\n", creditList);

// };

// getTotalList();

/// handler for lists--------------------
export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    const debitList = await debits();
    const creditList = await credits();
    let result: any[] = [];
    if (creditList != null && debitList != null) {
      result.push(creditList);
      result.push(debitList);
    }
    else if(debitList===null){
      result.push("credit",creditList)
    }
    else if(creditList===null){
      result.push("debit",debitList)
    }

    res.status(200).json(result);
  } else {
    // Handle any other HTTP method
  }
}
