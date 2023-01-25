import { ethers } from "ethers";
import { contractAddress, contractABI } from "../../topUpConstants";
import {
  _JSON_RPC_PROVIDER_MUMBAI,
  _PKDR_PRIVATE_KEY,
} from "./constants/constants";


async function getTopUpBalance(): Promise<number> {

  const PKDR_PRIVATE_KEY = _PKDR_PRIVATE_KEY;

  const provider = new ethers.providers.JsonRpcProvider(
    _JSON_RPC_PROVIDER_MUMBAI
  );

  const contract = new ethers.Contract(contractAddress, contractABI, provider);

  return await contract.getContractBalance();
}

export default getTopUpBalance;
