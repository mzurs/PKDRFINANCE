import { ethers, getNamedAccounts, deployments } from "hardhat";
import getRateUSDPKR from "./getRateUSDPKR";

async function main() {
  const { deployer } = await getNamedAccounts();
  const { log, get } = deployments;

  const topUpDeployed = await ethers.getContract("topUp", deployer);
  
  console.log(`PKRUSD: ${await getRateUSDPKR() }`)

  let getRate = await topUpDeployed.getRate();
  getRate = (getRate * 10000000000) / 1000000000000000000;
  console.log(`MATIC/USD: $${getRate.toString()}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
