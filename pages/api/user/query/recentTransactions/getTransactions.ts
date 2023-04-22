import { DebitReturnParams, getDebitsListOfUser } from "./getDebitList";
import { getCreditsListOfUser } from "./getCreditList";

const getSortedList = (
  credit: any[] | null,
  debit: DebitReturnParams[] | null
): any[] | null => {
  let transaction: any[] = [];
  if (credit != null) {
    credit.forEach(function (element: any) {
      let date = new Date(element.TimeStamp);
      element.type = "credit";
      element.time = date.toLocaleTimeString();
      element.date = date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    });
  }
  if (debit != null) {
    debit.forEach(function (element: any) {
      let date = new Date(element.TimeStamp);
      element.type = "debit";
      element.time = date.toLocaleTimeString();
      element.date = date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    });
  }
  if (credit != null && debit != null) {
    transaction = credit.concat(debit);
  } else if (credit != null) {
    transaction = credit;
  } else if (debit != null) {
    transaction = debit;
  }
  if (credit != null || debit != null) {
    transaction.sort((a: any, b: any) => b.TimeStamp - a.TimeStamp);
    return transaction;
  } else {
    return null;
  }
};

export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    const authTokens = JSON.parse(req.headers["x-custom-header"]);

    const username: string = req.body.username;

    const credit = await getCreditsListOfUser(authTokens, username);

    const debit = await getDebitsListOfUser(authTokens, username);

    let result = getSortedList(credit, debit);

    res.status(200).json(result);
  } else {
    // Handle any other HTTP method
  }
}
