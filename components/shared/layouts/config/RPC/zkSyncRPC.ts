import { CHAIN_NAMESPACES } from "@web3auth/base";
export const zkSyncRPC = {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0x118", // Please use 0x1 for Mainnet, 0x2 for Testnet, 0x3 for Devnet
    rpcTarget:
      "https://zksync2-testnet.zksync.dev", // This is the public RPC we have added, please pass on your own endpoint while creating an app
  };