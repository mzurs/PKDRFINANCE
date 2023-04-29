/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IProfiles,
  IProfilesInterface,
} from "../../../contracts/interfaces/IProfiles";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "createProfile",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getAdminAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "getUser",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "userPubAddress",
            type: "address",
          },
          {
            internalType: "bytes32",
            name: "multiSig",
            type: "bytes32",
          },
          {
            internalType: "bool",
            name: "verificationStatus_I",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "verificationStatus_II",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "isStatusRevoked",
            type: "bool",
          },
        ],
        internalType: "struct IProfiles.User",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getUsers",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "getVerifiedUser",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "retainVerification",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "revokeVerifiedUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class IProfiles__factory {
  static readonly abi = _abi;
  static createInterface(): IProfilesInterface {
    return new utils.Interface(_abi) as IProfilesInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IProfiles {
    return new Contract(address, _abi, signerOrProvider) as IProfiles;
  }
}