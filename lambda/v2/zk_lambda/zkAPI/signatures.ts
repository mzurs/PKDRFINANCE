import { UserObject } from "./typesAPI/type";

const ethers = require("ethers");

const elliptic = require("elliptic");
const sha3 = require("js-sha3");
const ec = new elliptic.ec("secp256k1");
const utils = require("ethereumjs-util");
// let keyPair = ec.genKeyPair(); // Generate random keys

const signatures = async (user: UserObject): Promise<boolean> => {
  if (user.privateKey.length == 64) {
    const keyPair = ec.keyFromPrivate(user.privateKey);
    const privKey = keyPair.getPrivate("hex");
    const pubKey = keyPair.getPublic();
    // console.log(`Private key: ${privKey}`);
    console.log("Public key :", pubKey.encode("hex"));
    // console.log("Public key (compressed):", pubKey.encodeCompressed("hex"));
    const wallet = new ethers.Wallet(privKey);
    console.log("Address: " + wallet.address);

    if (wallet.address === user.publicAddress) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export default signatures;
