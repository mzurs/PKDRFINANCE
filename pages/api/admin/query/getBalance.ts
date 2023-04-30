import { v4 as uuidv4 } from "uuid";
const request = require("request");





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

const getBalancePKR = async () => {
  const balances = (await getBalance()).body;
  let balancePKR = JSON.parse(balances);

  const {value,currency} :string|null|any= balancePKR[4].totalWorth;
  // console.log("🚀 ~ file: getBalances.ts:63 ~ getBalancePKR ~ balancePKR:",value, currency)
return value;
};


//handler to get Value
