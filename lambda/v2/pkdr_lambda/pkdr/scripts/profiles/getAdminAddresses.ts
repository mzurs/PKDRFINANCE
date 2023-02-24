import { ethers, getNamedAccounts, deployments } from "hardhat";

async function main() {
  const { deployer, deployer_userA, deployer_userB } = await getNamedAccounts();
  const { log, get } = deployments;

  try {
    const profilesDeployed = await ethers.getContract(
      "Profiles",
      deployer_userA
    );
    console.log(`Got contract Profiles at ${profilesDeployed.address}`);

    const adminAddresses = await profilesDeployed.getAdminAddress();
    console.log(`Admin Addresses: ${adminAddresses}`);
  } catch (error: any) {
    console.log(`Error: ${error.message}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
