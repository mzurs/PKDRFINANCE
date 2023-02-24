import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { networkConfig, developmentChains } from "../helper-hardhat-config";
import { readFileSync, write, writeFileSync } from "fs";
import { resolve, join } from "path";
const { ethers, upgrades } = require("hardhat");
async function deployProfile(hre: HardhatRuntimeEnvironment) {
  // const V1contract = await ethers.getContractFactory("Profiles");
  // console.log("Deploying V1contract...");
  // const v1contract = await upgrades.deployProxy(V1contract, [], {
  //    gasPrice: 40000,
  //    initializer: "initialize",
  //    kind:'UUPS'
  // });
  // await v1contract.deployed();
  // console.log("V1 Contract deployed to:", v1contract.address);

  //configs
  const { network, deployments, getNamedAccounts } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId: number | undefined = network.config.chainId;
  // console.log(chainId);
  log("Deploying ..........");

  const profilesDeploy = await deploy("Profiles", {
    contract: "Profiles",
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

  // log(`Profiles Address at ${profilesDeploy.address}`);

  const profilesDeployAddress = JSON.stringify(profilesDeploy.address);
  const profilesAddressPath = join(
    __dirname,
    "..",
    "config",
    "profiles",
    "profiles_address.json"
  );
  // console.log(profilesAddressPath);
  writeFileSync(profilesAddressPath, profilesDeployAddress, {
    encoding: "utf-8",
  });

  // log("profiles ABI: ", profilesDeploy.abi);
  const profilesDeployABI = JSON.stringify(profilesDeploy.abi);
  const profilesAbiPath = join(
    __dirname,
    "..",
    "config",
    "profiles",
    "profiles_ABI.json"
  );
  // console.log(profilesAbiPath);
  writeFileSync(profilesAbiPath, profilesDeployABI, { encoding: "utf-8" });
}

export default deployProfile;

deployProfile.tags = ["Profiles", "all"];
