import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
// import verify from "../utils/verify"
import { networkConfig, developmentChains } from "../helper-hardhat-config";
import { readFileSync, write, writeFileSync } from "fs";
import { resolve, join } from "path";

const zkVerifier: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const { network, deployments, getNamedAccounts } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId: number | undefined = network.config.chainId;
  console.log(chainId);

  log(`Deployer: ${deployer}`);
  log("Deploying ..........");
  const zkVerifierDeploy = await deploy("Verifier", {
    from: deployer,
    log: true,
  });
  log(`Verifier contract deployed at ${zkVerifierDeploy.address}`);
  console.log(zkVerifierDeploy.abi);
  const verifierABI = JSON.stringify(zkVerifierDeploy.abi);
  const verifierABIPath = join(
    __dirname,
    "..",
    "..",
    "zkConstant",
    "verifier",
    "verifierABI.json"
  );
  console.log(verifierABIPath);
  writeFileSync(verifierABIPath, verifierABI, { encoding: "utf-8" });

  const zkVerifierContractAddress = zkVerifierDeploy.address;
  const verifierDeployedContractPath = join(
    __dirname,
    "..",
    "..",
    "zkConstant",
    "verifier",
    "verifierContractAddress.json"
  );
  console.log(verifierDeployedContractPath);
  writeFileSync(
    verifierDeployedContractPath,
    `${JSON.stringify(zkVerifierContractAddress)}`,
    { encoding: "utf-8" }
  );
};

export default zkVerifier;

zkVerifier.tags = ["all", "zkVerifier"];
