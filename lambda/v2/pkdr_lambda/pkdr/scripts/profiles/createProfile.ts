import { ethers, getNamedAccounts, deployments } from "hardhat";

async function createProfile() {
  const { deployer, deployer_userA, deployer_userB } = await getNamedAccounts();
  const { log, get } = deployments;

  try {
    const profilesDeployed = await ethers.getContract("Profiles", deployer);
    console.log(`Got contract Profiles at ${profilesDeployed.address}`);

    const createProfile = await profilesDeployed.createProfile(
      "0xa0Ee7A142d267C1f36714E4a8F75612F20a79720",
      { gasLimit: 500000 }
    );
    console.log(`Profile Created: ${JSON.stringify(createProfile)}`);
  } catch (error: any) {
    console.log(`Error: ${error.message}`);
  }
}

createProfile().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


