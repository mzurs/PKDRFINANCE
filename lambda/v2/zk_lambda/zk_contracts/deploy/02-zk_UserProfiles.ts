import { ethers } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
// import verify from "../utils/verify"
import { networkConfig, developmentChains } from "../helper-hardhat-config";
import { readFileSync, write, writeFileSync } from "fs";
import { resolve, join } from "path";

async function zk_UserProfiles() {
  const { network, deployments, getNamedAccounts } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  log(`Deployer: ${deployer}`);
  log("Deploying ..........");
  const zkProfilesDeploy = await deploy("Profiles", {
    from: deployer,
    log: true,
  });
  log(`Profiles contract deployed at ${zkProfilesDeploy.address}`);
  console.log(zkProfilesDeploy.abi);
  const profilesABI = JSON.stringify(zkProfilesDeploy.abi);
  const profilesABIPath = join(
    __dirname,
    "..",
    "..",
    "zkConstant",
    "profiles",
    "profilesABI.json"
  );
  console.log(profilesABIPath);
  writeFileSync(profilesABIPath, profilesABI, { encoding: "utf-8" });

  const zkVerifierContractAddress = zkProfilesDeploy.address;
  const verifierDeployedContractPath = join(
    __dirname,
    "..",
    "..",
    "zkConstant",
    "profiles",
    "profilesContractAddress.json"
  );
  console.log(verifierDeployedContractPath);
  writeFileSync(
    verifierDeployedContractPath,
    `${JSON.stringify(zkVerifierContractAddress)}`,
    { encoding: "utf-8" }
  );
}
export default zk_UserProfiles;
zk_UserProfiles.tags = ["all", "zk_profiles"];
