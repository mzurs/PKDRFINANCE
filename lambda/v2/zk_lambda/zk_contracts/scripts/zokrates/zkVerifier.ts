import { ethers, getNamedAccounts, deployments } from "hardhat";
import { initialize } from "zokrates-js";
const hre = require("hardhat");
const path = require("path");
const keyPair = require("./generated/zk_setup.json");
const fs = require("fs");
const { error } = require("console");


async function main() {
  const { deployer } = await getNamedAccounts();
  const { log, get } = deployments;

  const topUpDeployed = await ethers.getContract("Verifier", deployer);
  const profiles = await ethers.getContract("Profiles", deployer);
  const zokratesProvider = await initialize();

  const program = fs.readFileSync(path.join(__dirname, "generated", "out")); //artifacts.program;
  const abi = JSON.parse(
    fs.readFileSync(path.join(__dirname, "generated", "zk_abi.json"))
  ); //artifacts.abi;
  const program_abi = {
    program,
    abi,
  };
  //   console.log(program_abi);

  const { witness, output } = zokratesProvider.computeWitness(program_abi, [
    "4210177777773",
    "249697928511749064481934707482023822598",
    "127222874392670729104785390335824196170",
    "0",
    "0",
    "0",
    "164345617366728272006170673450623848882",
    "281430901492732617543158812730993744472"
  ]);
    console.log(`Witness-> ${witness} \n Output-> ${output}`);
  const proof = zokratesProvider.generateProof(program, witness, keyPair.pk);

  // console.log("Proof", proof);
const result:boolean = await topUpDeployed.verifyTx(proof.proof, proof.inputs);
  console.log(`Result: ${result}`);

  if (result) {
    const idResult=await profiles.createProfile(
      "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc",
      result
    );
    console.log("idResult",idResult);
    //  idResult.wait(5);
    // try {
    //   const id = await profiles.getVerifiedUser(
    //     "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc"
    //   );
    //   // id.wait(2)
    //   console.log("Id", id);
    // } catch (error) {
    //   console.error("User not found", error as string);
    // }
  } else {
    console.log("User not Verified");
  }
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
