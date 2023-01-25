import { ethers } from "ethers";
import { contractAddress, contractABI } from "../../topUpConstants";
import getRateMaticToUsd from "./getRateMaticToUsd";
import {
  _JSON_RPC_PROVIDER_MUMBAI,
  _PKDR_PRIVATE_KEY,
} from "./constants/constants";
import getRateUSDPKR from "./getRateUSDPKR";

async function topUpAddress(address: string): Promise<string | number> {
  const PKRUSD = await getRateUSDPKR(); //220;

  const MATICUSD = await getRateMaticToUsd(); //0.8;

  const TOPUPAMOUNT = (10 / (MATICUSD * PKRUSD));

  const PKDR_PRIVATE_KEY = _PKDR_PRIVATE_KEY;

  const provider = new ethers.providers.JsonRpcProvider(
    _JSON_RPC_PROVIDER_MUMBAI
  );

  const contract = new ethers.Contract(contractAddress, contractABI, provider);

  const wallet = new ethers.Wallet(PKDR_PRIVATE_KEY, provider);

  const connectedWallet = contract.connect(wallet);

  const tx = await connectedWallet.topUpAddress(address, ethers.utils.parseEther(String(TOPUPAMOUNT)), {
    gasLimit: 500000,
  });

  tx.wait();

  return TOPUPAMOUNT;
}

export default topUpAddress;
