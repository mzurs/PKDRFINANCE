import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("dotenv").config();
import "@typechain/hardhat";
// import "@nomiclabs/hardhat-waffle"
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-ethers";
import "hardhat-gas-reporter";
import "dotenv/config";
import "solidity-coverage";
import "hardhat-deploy";
import "solidity-coverage";
// import { HardhatUserConfig } from "hardhat/config"
const MUMBAI_RPC_URL = process.env.MUMBAI_RPC_URL;
const MUMBAI_PRIVATE_KEY = <string>process.env.MUMBAI_PRIVATE_KEY;

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    localhost: {
      chainId: 31337,
    },
    mumbai: {
      url: MUMBAI_RPC_URL,
      accounts: [MUMBAI_PRIVATE_KEY],
      chainId: 80001,
    },
  },
  // solidity: "0.8.9",
  solidity: {
    compilers: [
      { version: "0.6.6" },
      { version: "0.5.0" },
      { version: "0.8.7" },
      { version: "0.8.8" },
      { version: "0.8.9" },
    ],
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
      1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
    },
  },
};

export default config;
