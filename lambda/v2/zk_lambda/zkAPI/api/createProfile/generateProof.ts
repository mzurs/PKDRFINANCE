import { ethers } from "ethers";
import { initialize } from "zokrates-js";
const path = require("path");
const keyPair = require("../../../zkConstant/generated/zk_setup.json");
const fs = require("fs");
import hash from "./generateHash";
import {
  CreateProfile,
  ZKHashParams,
  ZKHashReturnParams,
} from "../../typesAPI/type";
import {
  _JSON_RPC_PROVIDER_MUMBAI,
  _PKDR_PRIVATE_KEY,
} from "../constant/constant";
import { verifierABI, verifierContractAddress } from "../../../zkConstant";
import listenForTransactionMine from "../tx/txConfirmations";

// const program=require('../../../zkConstant/generated/out');
// const program = fs.readFileSync(
  // path.join(__dirname, "..", "..", "..", "zkConstant", "generated", "out")
// ); //artifacts.program;
const source=`import "hashes/sha256/512bitPacked" as sha256packed;

def verifyUser(field[2] hash, field hashFirst,field hashSecond,field publicAddress,field publicAddressAdmin)->field[2]{


assert(hash[0]==hashFirst);

assert(hash[1]==hashSecond);

return [hash[0],hash[1]];

}







def main( private field   cnic,private field  privKeyFirst,private field  privKeySecond, field publicAddress,private field  publicAddressAdmin,private field  optionalParams, field hashFirst,field hashSecond, bool bit)-> field[2]{


 field[2] hash =sha256packed([cnic,privKeyFirst,privKeySecond,optionalParams]);


 return if bit == false{


     [publicAddress,publicAddressAdmin]


 } else{


     verifyUser(hash,hashFirst,hashSecond,publicAddress,publicAddressAdmin)


 };
 

}




`
// const abi = JSON.parse(
//   fs.readFileSync(
//     path.join(
//       __dirname,
//       "..",
//       "..",
//       "..",
//       "zkConstant",
//       "generated",
//       "zk_abi.json"
//     )
//   )
// ); //artifacts.abi;

// const program_abi = {
//   program,
//   abi,
// };

const provider = new ethers.providers.JsonRpcProvider(
  _JSON_RPC_PROVIDER_MUMBAI
);

const contract = new ethers.Contract(
  verifierContractAddress,
  verifierABI,
  provider
);

const wallet = new ethers.Wallet(_PKDR_PRIVATE_KEY, provider);

async function generateProof(params: CreateProfile): Promise<boolean> {
  if(params.bit==false ||String(params.bit)=="false"){
    return true;
  }
  else{
  console.log('Source....',source)
  const zokratesProvider = await initialize();
  const program1=await zokratesProvider.compile(source)
//   const program_abi = {
//   program,
//   abi,
// };
  //   console.log(program_abi);
  const zkHashParams: ZKHashParams = {
    cnic: params.cnic,
    privKeyFirst: params.privKeyFirst,
    privKeySecond: params.privKeySecond,
    optionalParams: params.optionalParams,
  };

  const hashArray: ZKHashReturnParams = await hash(zkHashParams);
  console.log("Hashes: ", hashArray);
  const { witness, output } =await   zokratesProvider.computeWitness(program1, [
    params.cnic,
    params.privKeyFirst,
    params.privKeySecond,
    params.publicAddress,
    params.publicAddressAdmin,
    params.optionalParams,
    hashArray.hash1,
    hashArray.hash2,
    true,
  ]);
    console.log(`Witness->  \n Output-> ${output} `);
  const proof =  await zokratesProvider.generateProof(program1.program, witness, keyPair.pk);
  console.log("Proof: ", proof);
  const connectedWallet = contract.connect(wallet);

  const result = await connectedWallet.verifyTx(
    proof.proof,
    proof.inputs
  );
  // await listenForTransactionMine(result,provider);
  console.log("Proof Result: ", result);
  return result;
  }
}

export default generateProof;
