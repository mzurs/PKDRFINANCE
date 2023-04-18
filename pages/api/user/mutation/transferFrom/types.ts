type ReturnParamsForAddressByUserName = {
  message: string;
  result: boolean;
  value?:string
};

type CreditParams = {
  id: string;
  TimeStamp: number;
  From: string;
  Amount: number;
};


type DebitParams = {
  id: string;
  TimeStamp: number;
  Amount: number;
  To: string;
};
type Transaction = {
  id: string;
  From: string;
  To: string;
  Amount: number;
  TimeStamp: number;
  Type: string;
};

export type { ReturnParamsForAddressByUserName,DebitParams ,CreditParams,Transaction};
