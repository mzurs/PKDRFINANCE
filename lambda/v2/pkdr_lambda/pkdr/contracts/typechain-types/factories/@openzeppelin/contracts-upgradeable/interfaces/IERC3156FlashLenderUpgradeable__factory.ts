/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IERC3156FlashLenderUpgradeable,
  IERC3156FlashLenderUpgradeableInterface,
} from "../../../../@openzeppelin/contracts-upgradeable/interfaces/IERC3156FlashLenderUpgradeable";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "flashFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IERC3156FlashBorrowerUpgradeable",
        name: "receiver",
        type: "address",
      },
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "flashLoan",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "maxFlashLoan",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export class IERC3156FlashLenderUpgradeable__factory {
  static readonly abi = _abi;
  static createInterface(): IERC3156FlashLenderUpgradeableInterface {
    return new utils.Interface(_abi) as IERC3156FlashLenderUpgradeableInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IERC3156FlashLenderUpgradeable {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as IERC3156FlashLenderUpgradeable;
  }
}
