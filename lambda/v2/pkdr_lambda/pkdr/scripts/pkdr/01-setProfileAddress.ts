import { ethers, getNamedAccounts, deployments } from "hardhat";

async function setProfileAddress() {
  const { deployer } = await getNamedAccounts();
  const { log, get } = deployments;
  const profilesDeployed = await ethers.getContract("Profiles", deployer);
  const pkdrDeployed = await ethers.getContract("PKDR", deployer);
  const profileAddress: string = profilesDeployed.address;
  console.log(
    "🚀 ~ file: 01-setProfileAddress.ts:9 ~ setProfileAddress ~ profileAddress:",
    profileAddress
  );
  await pkdrDeployed.setProfileAddress(profileAddress);
  console.log("Profile Address Set\n ---------------------------------------");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
setProfileAddress().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
