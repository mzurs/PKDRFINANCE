const decimal = require("hexadecimal-to-decimal");
import { hex2decReturnParams } from "../../typesAPI/type";
var toHex = require('to-hex');

const hex2dec = async (hex: string): Promise<hex2decReturnParams> => {
  if (hex.length == 64) {
    const len = hex.length / 2;

    const p1 = decimal.decimal(hex.substr(0, len));
    const p2 = decimal.decimal(hex.substr(len, len * 2));
    console.log(`${p1}\n ${p2}`);
    return [p1, p2];
  } else if (hex.length == 42) {
    console.log(42)
    return decimal.decimal(toHex(hex));
  }

  return decimal.decimal(toHex(hex));
};
export default hex2dec;
