export interface networkConfigItem {
    ethUsdPriceFeed?: string
    blockConfirmations?: number
  }
  
  export interface networkConfigInfo {
    [key: string]: networkConfigItem
  }
  
  export const networkConfig: networkConfigInfo = {
    localhost: {},
    hardhat: {},
    // Price Feed Address, values can be obtained at https://docs.chain.link/docs/reference-contracts
    // Default one is ETH/USD contract on Kovan
    kovan: {
      ethUsdPriceFeed: "0x9326BFA02ADD2366b30bacB125260Af641031331",
      blockConfirmations: 6,
    },
  }
  
  export const developmentChains = ["hardhat", "localhost"]
  export const frontEndContractsFile = "/home/abc/Documents/Project/PKDR_FRONT/pkdr_front/contractInfo/pkdrContractAddress.json";
  export const topUpABIFile = "/home/abc/Documents/Project/PKDR_FRONT/pkdr_front/contractInfo/pkdrABI.json";
