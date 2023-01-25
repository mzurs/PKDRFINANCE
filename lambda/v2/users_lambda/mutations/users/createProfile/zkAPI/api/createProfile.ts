import {
  CreateProfile,
  hex2decReturnParams,
  UserObject,
} from "../typesAPI/type";
import { ethers } from "ethers";
import {
  _JSON_RPC_PROVIDER_MUMBAI,
  _PKDR_PRIVATE_KEY,
} from "./constant/constant";
import { profilesABI, profilesContractAddress } from "../../zkConstant";
import listenForTransactionMine from "./tx/txConfirmations";
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

const createProfile = async (params: UserObject): Promise<string> => {
 
  const result =await connectedWallet.getVerifiedUser(params.publicAddress);
  if (!result) {
    try {
      console.log(params.publicAddress);
      const createPRofileResult: boolean = await connectedWallet.createProfile(
        params.publicAddress,
        true,
        { gasLimit: 50000 }
      );
      await listenForTransactionMine(createPRofileResult, provider);
      console.log(createPRofileResult);
      return createPRofileResult
        ? "Profile Created On-Chain"
        : "Error while creating Profile";
    } catch (error) {
      return error as unknown as string;
    }
  }
  else{
  return `User with ID ${params.publicAddress} already exists`;
  }
};
export default createProfile;
