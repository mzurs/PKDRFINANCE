/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { Profiles, ProfilesInterface } from "../../contracts/Profiles";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "USER_EXISTS_AND_VERIFIED",
    type: "error",
  },
  {
    inputs: [],
    name: "USER_NOT_EXISTS",
    type: "error",
  },
  {
    inputs: [],
    name: "USER_STATUS_ALREADY_REVOKED",
    type: "error",
  },
  {
    inputs: [],
    name: "USER_STATUS_NOT_REVOKED",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "fallbackAmount",
        type: "uint256",
      },
    ],
    name: "AMOUNT_RECEIVED_THROUGH_FALLBACK",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "receiveAmount",
        type: "uint256",
      },
    ],
    name: "AMOUNT_RECEIVED_THROUGH_RECEIVE",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "previousAdmin",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "AdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "beacon",
        type: "address",
      },
    ],
    name: "BeaconUpgraded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "MULTISIG_RETAINED",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "MULTISIG_REVOKED",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "PROFILE_CREATED",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "PROFILE_RETAINED",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "PROFILE_REVOKED",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "Upgraded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "ZK_VERIFICATION_RETAINED",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "ZK_VERIFICATION_REVOKED",
    type: "event",
  },
  {
    stateMutability: "payable",
    type: "fallback",
  },
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
    name: "getMultiSig",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
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
    inputs: [],
    name: "getUsersCount",
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
    inputs: [],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
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
    inputs: [],
    name: "proxiableUUID",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
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
    name: "retainMultiSignature",
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
    name: "retainZkVerification",
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
    name: "revokeMultiSignature",
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
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "revokeZkVerification",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
    ],
    name: "upgradeTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "upgradeToAndCall",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

const _bytecode =
  "0x60e06040523073ffffffffffffffffffffffffffffffffffffffff1660809073ffffffffffffffffffffffffffffffffffffffff16815250600060c955600060ca556040516020016200005290620001e1565b6040516020818303038152906040528051906020012060a0908152506040516020016200007f9062000248565b6040516020818303038152906040528051906020012060c090815250348015620000a857600080fd5b50620000b9620000bf60201b60201c565b62000343565b600060019054906101000a900460ff161562000112576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016200010990620002e6565b60405180910390fd5b60ff801660008054906101000a900460ff1660ff161015620001845760ff6000806101000a81548160ff021916908360ff1602179055507f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb384740249860ff6040516200017b919062000326565b60405180910390a15b565b600081905092915050565b7f415050524f564544000000000000000000000000000000000000000000000000600082015250565b6000620001c960088362000186565b9150620001d68262000191565b600882019050919050565b6000620001ee82620001ba565b9150819050919050565b7f4e554c4c00000000000000000000000000000000000000000000000000000000600082015250565b60006200023060048362000186565b91506200023d82620001f8565b600482019050919050565b6000620002558262000221565b9150819050919050565b600082825260208201905092915050565b7f496e697469616c697a61626c653a20636f6e747261637420697320696e69746960008201527f616c697a696e6700000000000000000000000000000000000000000000000000602082015250565b6000620002ce6027836200025f565b9150620002db8262000270565b604082019050919050565b600060208201905081810360008301526200030181620002bf565b9050919050565b600060ff82169050919050565b620003208162000308565b82525050565b60006020820190506200033d600083018462000315565b92915050565b60805160a05160c0516132a6620003a46000396000818161136f015261166c0152600081816112cb0152818161171001526119f601526000818161068601528181610715015281816109bc01528181610a4b0152610afb01526132a66000f3fe6080604052600436106101225760003560e01c806387d55ff3116100a0578063b2e6b91211610064578063b2e6b91214610431578063cde553531461045c578063d117fc9914610485578063f2fde38b146104c2578063f536c520146104eb57610179565b806387d55ff3146103605780638da5cb5b14610389578063a4a1e263146103b4578063acfb7980146103df578063b2b35eb41461040857610179565b806352d1902d116100e757806352d1902d146102a157806354ef5c52146102cc5780636f77926b146102f5578063715018a6146103325780638129fc1c1461034957610179565b8062ce8e3e146101cb5780631e9f3d5e146101f65780633659cfe614610233578063391a5bf01461025c5780634f1ef2861461028557610179565b36610179573460c960008282546101399190612366565b925050819055507f42100f075a78c1dac886a43652b5c7c76cca3718758e13e7b726063cd20fe02c3460405161016f91906123cb565b60405180910390a1005b3460c9600082825461018b9190612366565b925050819055507f6cb8a67804b99a2876f9d2f903120d1607df4c6bb33315433f4f5b9284ba1588346040516101c191906123cb565b60405180910390a1005b3480156101d757600080fd5b506101e0610514565b6040516101ed91906124d6565b60405180910390f35b34801561020257600080fd5b5061021d60048036038101906102189190612538565b6105b0565b60405161022a919061257e565b60405180910390f35b34801561023f57600080fd5b5061025a60048036038101906102559190612538565b610684565b005b34801561026857600080fd5b50610283600480360381019061027e9190612538565b61080d565b005b61029f600480360381019061029a91906126df565b6109ba565b005b3480156102ad57600080fd5b506102b6610af7565b6040516102c3919061257e565b60405180910390f35b3480156102d857600080fd5b506102f360048036038101906102ee9190612538565b610bb0565b005b34801561030157600080fd5b5061031c60048036038101906103179190612538565b610d64565b60405161032991906127cd565b60405180910390f35b34801561033e57600080fd5b50610347610ef6565b005b34801561035557600080fd5b5061035e610f0a565b005b34801561036c57600080fd5b5061038760048036038101906103829190612538565b611050565b005b34801561039557600080fd5b5061039e6111fe565b6040516103ab91906127f7565b60405180910390f35b3480156103c057600080fd5b506103c9611228565b6040516103d691906123cb565b60405180910390f35b3480156103eb57600080fd5b5061040660048036038101906104019190612538565b61123a565b005b34801561041457600080fd5b5061042f600480360381019061042a9190612538565b61140f565b005b34801561043d57600080fd5b506104466115c4565b60405161045391906127f7565b60405180910390f35b34801561046857600080fd5b50610483600480360381019061047e9190612538565b6115db565b005b34801561049157600080fd5b506104ac60048036038101906104a79190612538565b611779565b6040516104b99190612821565b60405180910390f35b3480156104ce57600080fd5b506104e960048036038101906104e49190612538565b6118b9565b005b3480156104f757600080fd5b50610512600480360381019061050d9190612538565b61193d565b005b606061051e611be8565b600060cc8054806020026020016040519081016040528092919081815260200182805480156105a257602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019060010190808311610558575b505050505090508091505090565b60008160cd60008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020160009054906101000a900460ff16610639576040517f551b5fec00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60cd60008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010154915050919050565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff161415610713576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161070a906128bf565b60405180910390fd5b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16610752611c66565b73ffffffffffffffffffffffffffffffffffffffff16146107a8576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161079f90612951565b60405180910390fd5b6107b181611cbd565b61080a81600067ffffffffffffffff8111156107d0576107cf6125b4565b5b6040519080825280601f01601f1916602001820160405280156108025781602001600182028036833780820191505090505b506000611cc8565b50565b610815611be8565b8060cd60008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020160009054906101000a900460ff1661089c576040517f551b5fec00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8160cd60008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020160029054906101000a900460ff16610923576040517ffbc601ed00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600060cd60008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020160026101000a81548160ff0219169083151502179055507fdd8163d7c65d364e6e39c7e0fc2c8812d436ff8b4bc35e2f8db2b39c0662e2a4836040516109ad91906127f7565b60405180910390a1505050565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff161415610a49576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a40906128bf565b60405180910390fd5b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16610a88611c66565b73ffffffffffffffffffffffffffffffffffffffff1614610ade576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ad590612951565b60405180910390fd5b610ae782611cbd565b610af382826001611cc8565b5050565b60007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff1614610b87576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b7e906129e3565b60405180910390fd5b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60001b905090565b610bb8611be8565b8060cd60008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020160009054906101000a900460ff16610c3f576040517f551b5fec00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60cd60008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020160019054906101000a900460ff16610cce576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610cc590612a4f565b60405180910390fd5b600060cd60008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020160016101000a81548160ff0219169083151502179055507f7665796ea03d3ff112c33b16cef72d11283b08518156fd5545a4511e6832e37282604051610d5891906127f7565b60405180910390a15050565b610d6c6122df565b8160cd60008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020160009054906101000a900460ff16610df3576040517f551b5fec00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60cd60008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206040518060a00160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600182015481526020016002820160009054906101000a900460ff161515151581526020016002820160019054906101000a900460ff161515151581526020016002820160029054906101000a900460ff161515151581525050915050919050565b610efe611be8565b610f086000611e45565b565b60008060019054906101000a900460ff16159050808015610f3b5750600160008054906101000a900460ff1660ff16105b80610f685750610f4a30611f0b565b158015610f675750600160008054906101000a900460ff1660ff16145b5b610fa7576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f9e90612ae1565b60405180910390fd5b60016000806101000a81548160ff021916908360ff1602179055508015610fe4576001600060016101000a81548160ff0219169083151502179055505b610fec611f2e565b610ff4611f87565b801561104d5760008060016101000a81548160ff0219169083151502179055507f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb384740249860016040516110449190612b53565b60405180910390a15b50565b611058611be8565b8060cd60008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020160009054906101000a900460ff166110df576040517f551b5fec00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8160cd60008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020160029054906101000a900460ff1615611167576040517fe174c66c00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600160cd60008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020160026101000a81548160ff0219169083151502179055507f511d3bd421d86e995c1e2e4b179b681f67697e06c363a32945f11569520da052836040516111f191906127f7565b60405180910390a1505050565b6000603360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6000611232611be8565b60ca54905090565b611242611be8565b8060cd60008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020160009054906101000a900460ff166112c9576040517f551b5fec00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b7f000000000000000000000000000000000000000000000000000000000000000060cd60008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101541461136d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161136490612bba565b60405180910390fd5b7f000000000000000000000000000000000000000000000000000000000000000060cd60008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101819055507fc75dbd8ce00e37df747f1fe930658f85d9d198d29ccc1497d5bd5803915f10638260405161140391906127f7565b60405180910390a15050565b611417611be8565b8060cd60008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020160009054906101000a900460ff1661149e576040517f551b5fec00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60cd60008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020160019054906101000a900460ff161561152e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161152590612c26565b60405180910390fd5b600160cd60008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020160016101000a81548160ff0219169083151502179055507ff8ae011d8a06a2397c554ef5e6bb3790b25410a7926f10e37f4306aaa20ad7e5826040516115b891906127f7565b60405180910390a15050565b60006115ce611be8565b6115d66111fe565b905090565b6115e3611be8565b8060cd60008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020160009054906101000a900460ff1661166a576040517f551b5fec00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b7f000000000000000000000000000000000000000000000000000000000000000060cd60008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101541461170e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161170590612cb8565b60405180910390fd5b7f000000000000000000000000000000000000000000000000000000000000000060cd60008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101819055505050565b60008160cd60008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020160009054906101000a900460ff16611802576040517f551b5fec00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60cd60008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020160029054906101000a900460ff161561186057600091506118b3565b60cd60008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020160009054906101000a900460ff1691505b50919050565b6118c1611be8565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415611931576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161192890612d4a565b60405180910390fd5b61193a81611e45565b50565b611945611be8565b8060cd60008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020160009054906101000a900460ff16156119cd576040517f845f7cbb00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6040518060a001604052808373ffffffffffffffffffffffffffffffffffffffff1681526020017f000000000000000000000000000000000000000000000000000000000000000081526020016001151581526020016000151581526020016000151581525060cd60008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506020820151816001015560408201518160020160006101000a81548160ff02191690831515021790555060608201518160020160016101000a81548160ff02191690831515021790555060808201518160020160026101000a81548160ff02191690831515021790555090505060cc829080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060ca6000815480929190611b9c90612d6a565b91905055508173ffffffffffffffffffffffffffffffffffffffff167fafa89aec2d2fd28210e1b3f83a2862febdac7db6e14888b9913882a46fef18a560405160405180910390a25050565b611bf0611fd8565b73ffffffffffffffffffffffffffffffffffffffff16611c0e6111fe565b73ffffffffffffffffffffffffffffffffffffffff1614611c64576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611c5b90612dff565b60405180910390fd5b565b6000611c947f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60001b611fe0565b60000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b611cc5611be8565b50565b611cf47f4910fdfa16fed3260ed0e7147f7cc6da11a60208b5b9406d12a635614ffd914360001b611fea565b60000160009054906101000a900460ff1615611d1857611d1383611ff4565b611e40565b8273ffffffffffffffffffffffffffffffffffffffff166352d1902d6040518163ffffffff1660e01b815260040160206040518083038186803b158015611d5e57600080fd5b505afa925050508015611d8f57506040513d601f19601f82011682018060405250810190611d8c9190612e4b565b60015b611dce576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611dc590612eea565b60405180910390fd5b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60001b8114611e33576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611e2a90612f7c565b60405180910390fd5b50611e3f8383836120ad565b5b505050565b6000603360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081603360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b600060019054906101000a900460ff16611f7d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611f749061300e565b60405180910390fd5b611f856120d9565b565b600060019054906101000a900460ff16611fd6576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611fcd9061300e565b60405180910390fd5b565b600033905090565b6000819050919050565b6000819050919050565b611ffd81611f0b565b61203c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401612033906130a0565b60405180910390fd5b806120697f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc60001b611fe0565b60000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b6120b68361213a565b6000825111806120c35750805b156120d4576120d28383612189565b505b505050565b600060019054906101000a900460ff16612128576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161211f9061300e565b60405180910390fd5b612138612133611fd8565b611e45565b565b61214381611ff4565b8073ffffffffffffffffffffffffffffffffffffffff167fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b60405160405180910390a250565b606061219483611f0b565b6121d3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016121ca90613132565b60405180910390fd5b6000808473ffffffffffffffffffffffffffffffffffffffff16846040516121fb91906131cc565b600060405180830381855af49150503d8060008114612236576040519150601f19603f3d011682016040523d82523d6000602084013e61223b565b606091505b5091509150612263828260405180606001604052806027815260200161324a6027913961226d565b9250505092915050565b6060831561227d57829050612288565b612287838361228f565b5b9392505050565b6000825111156122a25781518083602001fd5b806040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016122d69190613227565b60405180910390fd5b6040518060a00160405280600073ffffffffffffffffffffffffffffffffffffffff168152602001600080191681526020016000151581526020016000151581526020016000151581525090565b6000819050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006123718261232d565b915061237c8361232d565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038211156123b1576123b0612337565b5b828201905092915050565b6123c58161232d565b82525050565b60006020820190506123e060008301846123bc565b92915050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061243d82612412565b9050919050565b61244d81612432565b82525050565b600061245f8383612444565b60208301905092915050565b6000602082019050919050565b6000612483826123e6565b61248d81856123f1565b935061249883612402565b8060005b838110156124c95781516124b08882612453565b97506124bb8361246b565b92505060018101905061249c565b5085935050505092915050565b600060208201905081810360008301526124f08184612478565b905092915050565b6000604051905090565b600080fd5b600080fd5b61251581612432565b811461252057600080fd5b50565b6000813590506125328161250c565b92915050565b60006020828403121561254e5761254d612502565b5b600061255c84828501612523565b91505092915050565b6000819050919050565b61257881612565565b82525050565b6000602082019050612593600083018461256f565b92915050565b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6125ec826125a3565b810181811067ffffffffffffffff8211171561260b5761260a6125b4565b5b80604052505050565b600061261e6124f8565b905061262a82826125e3565b919050565b600067ffffffffffffffff82111561264a576126496125b4565b5b612653826125a3565b9050602081019050919050565b82818337600083830152505050565b600061268261267d8461262f565b612614565b90508281526020810184848401111561269e5761269d61259e565b5b6126a9848285612660565b509392505050565b600082601f8301126126c6576126c5612599565b5b81356126d684826020860161266f565b91505092915050565b600080604083850312156126f6576126f5612502565b5b600061270485828601612523565b925050602083013567ffffffffffffffff81111561272557612724612507565b5b612731858286016126b1565b9150509250929050565b61274481612565565b82525050565b60008115159050919050565b61275f8161274a565b82525050565b60a08201600082015161277b6000850182612444565b50602082015161278e602085018261273b565b5060408201516127a16040850182612756565b5060608201516127b46060850182612756565b5060808201516127c76080850182612756565b50505050565b600060a0820190506127e26000830184612765565b92915050565b6127f181612432565b82525050565b600060208201905061280c60008301846127e8565b92915050565b61281b8161274a565b82525050565b60006020820190506128366000830184612812565b92915050565b600082825260208201905092915050565b7f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060008201527f64656c656761746563616c6c0000000000000000000000000000000000000000602082015250565b60006128a9602c8361283c565b91506128b48261284d565b604082019050919050565b600060208201905081810360008301526128d88161289c565b9050919050565b7f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060008201527f6163746976652070726f78790000000000000000000000000000000000000000602082015250565b600061293b602c8361283c565b9150612946826128df565b604082019050919050565b6000602082019050818103600083015261296a8161292e565b9050919050565b7f555550535570677261646561626c653a206d757374206e6f742062652063616c60008201527f6c6564207468726f7567682064656c656761746563616c6c0000000000000000602082015250565b60006129cd60388361283c565b91506129d882612971565b604082019050919050565b600060208201905081810360008301526129fc816129c0565b9050919050565b7f5a4b5f564552494649434154494f4e20414c5245414459205245564f4b454420600082015250565b6000612a3960208361283c565b9150612a4482612a03565b602082019050919050565b60006020820190508181036000830152612a6881612a2c565b9050919050565b7f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160008201527f647920696e697469616c697a6564000000000000000000000000000000000000602082015250565b6000612acb602e8361283c565b9150612ad682612a6f565b604082019050919050565b60006020820190508181036000830152612afa81612abe565b9050919050565b6000819050919050565b600060ff82169050919050565b6000819050919050565b6000612b3d612b38612b3384612b01565b612b18565b612b0b565b9050919050565b612b4d81612b22565b82525050565b6000602082019050612b686000830184612b44565b92915050565b7f4d554c54495f5349474e415455524520414c5245414459205245564f4b454420600082015250565b6000612ba460208361283c565b9150612baf82612b6e565b602082019050919050565b60006020820190508181036000830152612bd381612b97565b9050919050565b7f5a4b5f564552494649434154494f4e20414c52454144592052455441494e4544600082015250565b6000612c1060208361283c565b9150612c1b82612bda565b602082019050919050565b60006020820190508181036000830152612c3f81612c03565b9050919050565b7f4d554c54495f5349474e415455524520414c52454144592052455441494e454460008201527f2000000000000000000000000000000000000000000000000000000000000000602082015250565b6000612ca260218361283c565b9150612cad82612c46565b604082019050919050565b60006020820190508181036000830152612cd181612c95565b9050919050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b6000612d3460268361283c565b9150612d3f82612cd8565b604082019050919050565b60006020820190508181036000830152612d6381612d27565b9050919050565b6000612d758261232d565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821415612da857612da7612337565b5b600182019050919050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b6000612de960208361283c565b9150612df482612db3565b602082019050919050565b60006020820190508181036000830152612e1881612ddc565b9050919050565b612e2881612565565b8114612e3357600080fd5b50565b600081519050612e4581612e1f565b92915050565b600060208284031215612e6157612e60612502565b5b6000612e6f84828501612e36565b91505092915050565b7f45524331393637557067726164653a206e657720696d706c656d656e7461746960008201527f6f6e206973206e6f742055555053000000000000000000000000000000000000602082015250565b6000612ed4602e8361283c565b9150612edf82612e78565b604082019050919050565b60006020820190508181036000830152612f0381612ec7565b9050919050565b7f45524331393637557067726164653a20756e737570706f727465642070726f7860008201527f6961626c65555549440000000000000000000000000000000000000000000000602082015250565b6000612f6660298361283c565b9150612f7182612f0a565b604082019050919050565b60006020820190508181036000830152612f9581612f59565b9050919050565b7f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960008201527f6e697469616c697a696e67000000000000000000000000000000000000000000602082015250565b6000612ff8602b8361283c565b915061300382612f9c565b604082019050919050565b6000602082019050818103600083015261302781612feb565b9050919050565b7f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60008201527f6f74206120636f6e747261637400000000000000000000000000000000000000602082015250565b600061308a602d8361283c565b91506130958261302e565b604082019050919050565b600060208201905081810360008301526130b98161307d565b9050919050565b7f416464726573733a2064656c65676174652063616c6c20746f206e6f6e2d636f60008201527f6e74726163740000000000000000000000000000000000000000000000000000602082015250565b600061311c60268361283c565b9150613127826130c0565b604082019050919050565b6000602082019050818103600083015261314b8161310f565b9050919050565b600081519050919050565b600081905092915050565b60005b8381101561318657808201518184015260208101905061316b565b83811115613195576000848401525b50505050565b60006131a682613152565b6131b0818561315d565b93506131c0818560208601613168565b80840191505092915050565b60006131d8828461319b565b915081905092915050565b600081519050919050565b60006131f9826131e3565b613203818561283c565b9350613213818560208601613168565b61321c816125a3565b840191505092915050565b6000602082019050818103600083015261324181846131ee565b90509291505056fe416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a2646970667358221220128d1b2832369d15c148bcb1af73df34b882a846fbd70b8a58e162bad69a4c8b64736f6c63430008090033";

type ProfilesConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ProfilesConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Profiles__factory extends ContractFactory {
  constructor(...args: ProfilesConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Profiles> {
    return super.deploy(overrides || {}) as Promise<Profiles>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Profiles {
    return super.attach(address) as Profiles;
  }
  override connect(signer: Signer): Profiles__factory {
    return super.connect(signer) as Profiles__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ProfilesInterface {
    return new utils.Interface(_abi) as ProfilesInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Profiles {
    return new Contract(address, _abi, signerOrProvider) as Profiles;
  }
}