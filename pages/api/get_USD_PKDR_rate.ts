let request: any;
try {
  request = require("request");
} catch (error) {}
function invokeRequest(): Promise<any> {
  return new Promise((resolve, reject) => {
    const options = {
      url: "https://api.sandbox.transferwise.tech/v1/rates?source=USD&target=PKR",
      method: "GET",
      headers: {
        Authorization: "Bearer 613161da-3f90-48a1-b179-d7aefaf70cf1",
        "Content-Type": "application/json",
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
}

const getRateUSDPKR = async function () {
  return parseFloat(JSON.parse((await invokeRequest()).body)[0].rate);
};
export default getRateUSDPKR;
