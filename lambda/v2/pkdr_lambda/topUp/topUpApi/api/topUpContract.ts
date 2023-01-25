import { ethers } from "ethers";
import { contractAddress, contractABI } from "../../topUpConstants";
import getRateMaticToUsd from "./getRateMaticToUsd";
import {
  _JSON_RPC_PROVIDER_MUMBAI,
  _PKDR_PRIVATE_KEY,
} from "./constants/constants";

async function topUpContract(
  amountToDeposit: string
): Promise<string | number> {
  const PKDR_PRIVATE_KEY = _PKDR_PRIVATE_KEY;

  const provider = new ethers.providers.JsonRpcProvider(
    _JSON_RPC_PROVIDER_MUMBAI
  );

  const contract = new ethers.Contract(contractAddress, contractABI, provider);

  const wallet = new ethers.Wallet(PKDR_PRIVATE_KEY, provider);

  const connectedWallet = contract.connect(wallet);

  const tx = await connectedWallet.topUpContract({
    value: ethers.utils.parseEther(amountToDeposit),
  });

  tx.wait();

  return amountToDeposit;
}
export default topUpContract;
