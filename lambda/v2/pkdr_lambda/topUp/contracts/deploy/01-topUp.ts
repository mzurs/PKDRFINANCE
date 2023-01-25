import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
// import verify from "../utils/verify"
import { networkConfig, developmentChains } from "../helper-hardhat-config";
import { readFileSync, write, writeFileSync } from "fs";
import { resolve, join } from "path";

const topUp: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { network, deployments, getNamedAccounts } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId: number | undefined = network.config.chainId;
  console.log(chainId);

  let ethUsdPriceFeedAddress;
  if (chainId == 31337) {
    const ethUsdAggregator = await deployments.get("MockV3Aggregator");
    ethUsdPriceFeedAddress = ethUsdAggregator.address;
  } else {
    ethUsdPriceFeedAddress = "0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada"; //networkConfig[chainId]["ethUsdPriceFeed"]
  }
  console.log("ethUsdPriceFeedAddress:", ethUsdPriceFeedAddress); //Oracle Price Feed Address for MATIC/USD

  log(`Deployer: ${deployer}`);
  log("Deploying ..........");
  const topUpDeploy = await deploy("topUp", {
    from: deployer,
    args: [ethUsdPriceFeedAddress],
    log: true,
  });
  log(`TopUp contract deployed at ${topUpDeploy.address}`);
  console.log(topUpDeploy.abi);
  const topUpAbi = JSON.stringify(topUpDeploy.abi);
  const topAbiPath = join(
    __dirname,
    "..",
    "/",
    "..",
    "/",
    "topUpConstants",
    "/",
    "topUp.json"
  );
  console.log(topAbiPath);
  writeFileSync(topAbiPath, topUpAbi, { encoding: "utf-8" });

  const topUpContractAddress = topUpDeploy.address;
  const topUpContractAddressPath = join(
    __dirname,
    "..",
    "/",
    "..",
    "/",
    "topUpConstants",
    "/",
    "topUpAddress.json"
  );
  console.log(topUpContractAddressPath);
  writeFileSync(
    topUpContractAddressPath,
    `${JSON.stringify(topUpContractAddress)}`,
    { encoding: "utf-8" }
  );
};

export default topUp;

topUp.tags = ["all", "topUp"];
