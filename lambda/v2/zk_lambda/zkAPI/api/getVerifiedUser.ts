
import { ethers } from "ethers";
import {
  _JSON_RPC_PROVIDER_MUMBAI,
  _PKDR_PRIVATE_KEY,
} from "./constant/constant";
import { profilesABI, profilesContractAddress } from "../../zkConstant";

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

const getVerifiedUser=async (addr:string):Promise<boolean> => {
    
    return await connectedWallet.getVerifiedUser(addr);
}

export default getVerifiedUser;