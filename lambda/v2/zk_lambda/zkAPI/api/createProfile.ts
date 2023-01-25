import generateProof from "./createProfile/generateProof";
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
import hex2dec from "./createProfile/hex2dec";
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
  // console.log(params);
  // const privKeyDecimal: hex2decReturnParams = await hex2dec(params.privateKey);
  // const publicAddressDecimal = String(await hex2dec(params.publicAddress));
  // const publicAddressAdminDecimal = String(
  //   await hex2dec(params.publicAddressAdmin)
  // );
  // const optionalParamsDecimal = String(await hex2dec(params.optionalParams));

  // const param: CreateProfile = {
  //   cnic: params.cnic, //"4210177777773",
  //   privKeyFirst: privKeyDecimal[0], //"249697928511749064481934707482023822598",
  //   privKeySecond: privKeyDecimal[1], //"127222874392670729104785390335824196170",
  //   publicAddress: "0",
  //   publicAddressAdmin: "0",
  //   optionalParams: "0",
  //   bit: params.bit,
  // };

  // console.log(param);

  // const result: boolean = await generateProof(param);
  const result=await connectedWallet.getVerifiedUser(params.publicAddress);
  console.log("Result: ", result);
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
    return `Profile with Id ${params.publicAddress} already exists`
  }
};
export default createProfile;
