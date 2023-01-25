
const { createHash } = require("crypto");
var decimal = require("hexadecimal-to-decimal");

// const { createHash } = require("crypto");

function hexStringToByte(str: string) {
  if (!str) {
    return new Uint8Array();
  }

  var a = [1];
  a.pop();
  for (var i = 0, len = str.length; i < len; i += 2) {
    a.push(parseInt(str.substr(i, 2), 16));
  }

  return new Uint8Array(a);
}

const hash = async (params: any): Promise<any> => {
  var a: bigint = BigInt(params.a),
    b: bigint = BigInt(params.b),
    c: bigint = BigInt(params.c),
    d: bigint = BigInt(params.d);
  var pad = "0",
    x = "";
  var lis = [a, b, c, d];

  for (let i = 0; i < lis.length; i++) {
    var temp = lis[i].toString(16);
    temp = temp.padStart(32, "0");
    x += temp;
  }

  let hh = createHash("sha256").update(hexStringToByte(x)).digest("hex");

  // console.log(`0x${hh.substring(0, 32)}`);
  // console.log(`0x${hh.substring(32, 64)}`);

  // console.log("");

  const h1 = decimal.decimal(hh.substring(0, 32));
  const h2 = decimal.decimal(hh.substring(32, 64));
  return { h1, h2 };
};
// const params = {
//   a: "4210177777773",
//   b: "249697928511749064481934707482023822598",
//   c: "127222874392670729104785390335824196170",
//   d: "0",
// };
// console.log(hash(params));
export default hash;