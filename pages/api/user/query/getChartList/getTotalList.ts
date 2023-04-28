import getCreditsListOfUser from "./creditList";
import getDebitsListOfUser from "./debitList";
import { CreditReturnParams, DebitReturnParams } from "./type";

const getLists = async (
  tokens: string[],
  userName: string
): Promise<any[] | null> => {
  let transaction: any[] | null = [];

  const debitList: DebitReturnParams[] | null = await getDebitsListOfUser(
    tokens,
    userName
  );
  const creditList: CreditReturnParams[] | null = await getCreditsListOfUser(
    tokens,
    userName
  );
  transaction.push(creditList?.reverse());
  transaction.push(debitList?.reverse());

  return transaction;
};

export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    const authTokens = JSON.parse(req.headers["x-custom-header"]);

    const username: string = req.body.username;

    const result = await getLists(authTokens, username);

    res.status(200).json(result);
  } else {
    // Handle any other HTTP method
  }
}
