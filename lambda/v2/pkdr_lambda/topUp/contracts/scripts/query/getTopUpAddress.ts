import { ethers, getNamedAccounts, deployments } from "hardhat";

async function main() {
  const { deployer } = await getNamedAccounts();
  const { log, get } = deployments;

  const topUpDeployed = await ethers.getContract("topUp", deployer);

  console.log(`Got contract TOPUP at ${topUpDeployed.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

export default main;
