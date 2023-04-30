/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser($user: CreateUser!) {
    createUser(user: $user) {
      ... on UserInfo {
        userInfo
      }
      ... on UserExists {
        message
      }
      ... on Error {
        errorMessage
      }
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser($user: UpdateUser!) {
    updateUser(user: $user) {
      ... on UpdatedResult {
        id
        message
      }
      ... on UserNotExists {
        message
      }
      ... on Error {
        errorMessage
      }
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      ... on DeletedResult {
        id
        message
      }
      ... on UserNotExists {
        message
      }
      ... on Error {
        errorMessage
      }
    }
  }
`;
export const zkProfile = /* GraphQL */ `
  mutation ZkProfile($zkuser: ZKUserInfo) {
    zkProfile(zkuser: $zkuser)
  }
`;
export const setUserName = /* GraphQL */ `
  mutation SetUserName($setname: SetUserName) {
    setUserName(setname: $setname)
  }
`;
export const addContacts = /* GraphQL */ `
  mutation AddContacts($user: UpdateContactList!) {
    addContacts(user: $user) {
      ... on UpdatedResult {
        id
        message
      }
      ... on UserNotExists {
        message
      }
      ... on Error {
        errorMessage
      }
    }
  }
`;
export const zeroKnowledgeProfile = /* GraphQL */ `
  mutation ZeroKnowledgeProfile($zkp: zkParams) {
    zeroKnowledgeProfile(zkp: $zkp)
  }
`;
export const create_ETH_Profile = /* GraphQL */ `
  mutation Create_ETH_Profile($address: String) {
    create_ETH_Profile(address: $address) {
      message
      result
    }
  }
`;
export const topUpAddress = /* GraphQL */ `
  mutation TopUpAddress($address: String) {
    topUpAddress(address: $address) {
      hash
      message
      result
    }
  }
`;
export const setProfileAddress = /* GraphQL */ `
  mutation SetProfileAddress {
    setProfileAddress
  }
`;
export const mintPKDR = /* GraphQL */ `
  mutation MintPKDR($mint: mintInfo) {
    mintPKDR(mint: $mint) {
      message
      result
    }
  }
`;
export const approve = /* GraphQL */ `
  mutation Approve($privateKey: String) {
    approve(privateKey: $privateKey) {
      message
      result
    }
  }
`;
export const setPlatFormFee = /* GraphQL */ `
  mutation SetPlatFormFee($fee: String) {
    setPlatFormFee(fee: $fee) {
      message
      result
    }
  }
`;
export const transfer = /* GraphQL */ `
  mutation Transfer($transferParams: TransferParams) {
    transfer(transferParams: $transferParams) {
      from
      to
      amount
      message
      result
      hash
    }
  }
`;
export const transferFrom = /* GraphQL */ `
  mutation TransferFrom($transferFromParams: TransferFromParams) {
    transferFrom(transferFromParams: $transferFromParams) {
      from
      to
      amount
      message
      result
      hash
    }
  }
`;
export const burn = /* GraphQL */ `
  mutation Burn($amount: String) {
    burn(amount: $amount) {
      hash
      amount
      result
      message
    }
  }
`;
export const burnFrom = /* GraphQL */ `
  mutation BurnFrom($burnFromParams: BurnFromParams) {
    burnFrom(burnFromParams: $burnFromParams) {
      hash
      from
      amount
      result
      message
    }
  }
`;
export const withdraw = /* GraphQL */ `
  mutation Withdraw($withdrawParams: WithdrawParams) {
    withdraw(withdrawParams: $withdrawParams) {
      burnResult {
        hash
        from
        amount
        result
        message
      }
      withdrawResult {
        IBAN
        accountHolderName
        amount
        id
        address
        userName
      }
      result
      message
      errorMessage
    }
  }
`;
