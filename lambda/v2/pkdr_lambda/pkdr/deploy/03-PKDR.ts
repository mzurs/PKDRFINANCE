import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { networkConfig, developmentChains } from "../helper-hardhat-config";
import { readFileSync, write, writeFileSync } from "fs";
import { resolve, join } from "path";
const { ethers, upgrades } = require("hardhat");
async function deployProfile(hre: HardhatRuntimeEnvironment) {
  //configs
  const { network, deployments, getNamedAccounts } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId: number | undefined = network.config.chainId;
  // console.log(chainId);
  log("Deploying ..........");

  const pkdrDeploy = await deploy("PKDR", {
    contract: "PKDR",
    from: deployer,
    args: [],
    proxy: {
      proxyContract: "ERC1967Proxy",
      proxyArgs: ["{implementation}", "{data}"],
      execute: {
        init: {
          methodName: "initialize",
          args: [],
        },
      },
    },
    log: true,
  });

  // log(`PKDR Address at ${pkdrDeploy.address}`);

  const pkdrDeployAddress = JSON.stringify(pkdrDeploy.address);
  const pkdrAddressPath = join(
    __dirname,
    "..",
    "config",
    "pkdr",
    "pkdr_address.json"
  );
  // console.log(pkdrAddressPath);
  writeFileSync(pkdrAddressPath, pkdrDeployAddress, { encoding: "utf-8" });

  // log("PKDR ABI: ", pkdrDeploy.abi);
  const pkdrDeployABI = JSON.stringify(pkdrDeploy.abi);
  const pkdrAbiPath = join(__dirname, "..", "config", "pkdr", "pkdr_ABI.json");
  // console.log(pkdrAbiPath);
  writeFileSync(pkdrAbiPath, pkdrDeployABI, { encoding: "utf-8" });
}

export default deployProfile;

deployProfile.tags = ["pkdr", "all"];
