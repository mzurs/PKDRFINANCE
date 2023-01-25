import { ethers } from "ethers";
import {
  _JSON_RPC_PROVIDER_MUMBAI,
  _PKDR_PRIVATE_KEY,
} from "./constant/constant";
import { profilesABI, profilesContractAddress } from "../../zkConstant";
import listenForTransactionMine
 from "./tx/txConfirmations";
const provider = new ethers.providers.JsonRpcProvider(
  _JSON_RPC_PROVIDER_MUMBAI
);

const contract = new ethers.Contract(
  profilesContractAddress,
  profilesABI,
  provider
);

const wallet = new ethers.Wallet(_PKDR_PRIVATE_KEY, provider);

const connectedWallet = contract.connect(wallet);

const revokeVerifiedUser = async (addr: string): Promise<boolean> => {
  console.log(addr);

  try {
    const result: boolean = await connectedWallet.revokeVerifiedUser(addr);
    await listenForTransactionMine(result, provider);
    console.log(`Result: ${result}`);
    return result;
  } catch (error) {
    return false;
  }
};
export default revokeVerifiedUser;
