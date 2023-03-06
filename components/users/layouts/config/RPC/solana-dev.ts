import { CHAIN_NAMESPACES } from "@web3auth/base";
export const solanaDevRPC = {
    chainNamespace: CHAIN_NAMESPACES.SOLANA,
    chainId: "0x3", // Please use 0x1 for Mainnet, 0x2 for Testnet, 0x3 for Devnet
    rpcTarget:
      "https://solana-devnet.g.alchemy.com/v2/Zw2OBVGq4vBs5Yl_p8_k3PyTwCbpbvj3", // This is the public RPC we have added, please pass on your own endpoint while creating an app
  };