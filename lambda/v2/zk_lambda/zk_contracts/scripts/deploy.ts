const hre = require("hardhat");
const { initialize } = require("zokrates-js");
const path = require("path");
const keyPair = require("../../zkConstant/generated/zk_setup.json");
const fs = require("fs");
const { error } = require("console");

async function main() {
  const ZKP = await hre.ethers.getContractFactory("Verifier");
  const zkpverifier = await ZKP.deploy();
  // const Profiles = await hre.ethers.getContractFactory("Profiles");
  // const profiles = await Profiles.deploy();
  // await profiles.deployed();

  // console.log(zkpverifier.address)
  const zokratesProvider = await initialize();

  const program = fs.readFileSync(
    path.join(__dirname, "..", "..", "zkConstant", "generated", "out")
  ); //artifacts.program;
  const abi = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, "..", "..", "zkConstant", "generated", "zk_abi.json")
    )
  ); //artifacts.abi;
  const program_abi = {
    program,
    abi,
  };
  // console.log(program_abi);

  const { witness, output } = zokratesProvider.computeWitness(program_abi, [
    "4210177777773",
    "249697928511749064481934707482023822598",
    "127222874392670729104785390335824196170",
    "0",
    "0",
    "0",
    "164345617366728272006170673450623848882",
    "281430901492732617543158812730993744472",
    true,
  ]);
  // console.log(`Witness-> ${witness} \n Output-> ${output}`);
  const proof = zokratesProvider.generateProof(program, witness, keyPair.pk);

  console.log(...proof);

  const result = await zkpverifier.verifyTx(proof.proof, proof.inputs);
  console.log(`Result: ${result}`);

  if (result) {
    // await profiles.createProfile(
      // "0x71bE63f3384f5fb98995898A86B02Fb2426c5788",
      // String(result)
    // );
    try {
      // const id = await profiles.getUserId
      // (
        "0x71bE63f3384f5fb98995898A86B02Fb2426c5788"
      // );
      // console.log(id);
    } catch (error) {
      console.error("User not found", (error) as string);
    }
  } else {
    console.log("User not Verified");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
