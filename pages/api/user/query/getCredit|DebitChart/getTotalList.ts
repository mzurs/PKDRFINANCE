import getCreditsListOfUser from "./creditList";
import getDebitsListOfUser from "./debitList";
import { CreditReturnParams, DebitReturnParams } from "./type";



const getLists = async (tokens:string[],userName:string) => {
  const debitList: DebitReturnParams[] | null = await getDebitsListOfUser(
    tokens,userName
  );
  console.log(
    "🚀 ~ file: getTransactionChart.ts:118 ~ getLists ~ debitList:",
    debitList
  );
  const creditList: CreditReturnParams[] | null = await getCreditsListOfUser(
    tokens,userName

  );
  console.log(
    "🚀 ~ file: getTransactionChart.ts:120 ~ getLists ~ creditList:",
    creditList
  );
};


//----Request Handler function -----
//-- ? ? ? ? ? ? ? ?