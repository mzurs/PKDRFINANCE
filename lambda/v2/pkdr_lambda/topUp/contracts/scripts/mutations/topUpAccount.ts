import { ethers, getNamedAccounts, deployments } from "hardhat";

async function main() {
  const { deployer } = await getNamedAccounts();
  const { log, get } = deployments;

  const topUpDeployed = await ethers.getContract("topUp", deployer);


  const amountDeposited=await topUpDeployed.topUpAddress("0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc","568182000000000",{"gasLimit":40000});
  console.log(`Amount Deposited To Address: ${amountDeposited.toString()}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
