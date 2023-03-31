/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateUser = {
  id: string,
  cnic: string,
  PHONE_NUMBER: string,
  ETH_ADDRESS: string,
  FULL_NAME?: string | null,
  DOB?: string | null,
  FATHER_OR_HUSBAND_NAME?: string | null,
  CITY?: string | null,
  COUNTRY?: string | null,
  POSTAL_CODE?: string | null,
  ADDRESS?: string | null,
};

export type createUserResult = UserInfo | UserExists | Error


export type UserInfo = {
  __typename: "UserInfo",
  userInfo?: string | null,
};

export type UserExists = {
  __typename: "UserExists",
  message?: string | null,
};

export type Error = {
  __typename: "Error",
  errorMessage?: string | null,
};

export type UpdateUser = {
  id: string,
  attributeName?: string | null,
  attributeValue?: string | null,
};

export type updateUserResult = UpdatedResult | UserNotExists | Error


export type UpdatedResult = {
  __typename: "UpdatedResult",
  id: string,
  message?: string | null,
};

export type UserNotExists = {
  __typename: "UserNotExists",
  message?: string | null,
};

export type deleteUserResult = DeletedResult | UserNotExists | Error


export type DeletedResult = {
  __typename: "DeletedResult",
  id: string,
  message?: string | null,
};

export type ZKUserInfo = {
  cnic?: string | null,
  privateKey?: string | null,
  publicAddress?: string | null,
  publicAddressAdmin?: string | null,
  optionalParams?: string | null,
  bit?: boolean | null,
};

export type SetUserName = {
  id: string,
  userName: string,
};

export type UpdateContactList = {
  id: string,
  attributeValue?: string | null,
};

export type zkParams = {
  cnic?: string | null,
  privateKey?: string | null,
  publicAddress?: string | null,
  publicAddressAdmin?: string | null,
  optionalParams?: string | null,
};

export type Create_ETH_Profile_Result = {
  __typename: "Create_ETH_Profile_Result",
  message?: string | null,
  result?: boolean | null,
};

export type TopUpAddressResult = {
  __typename: "TopUpAddressResult",
  hash?: string | null,
  message?: string | null,
  result?: string | null,
};

export type mintInfo = {
  address: string,
  amount: string,
};

export type mintResult = {
  __typename: "mintResult",
  message?: string | null,
  result: boolean,
};

export type approveResult = {
  __typename: "approveResult",
  message?: string | null,
  result?: boolean | null,
};

export type SetPlatFormFeeResult = {
  __typename: "SetPlatFormFeeResult",
  message?: string | null,
  result?: boolean | null,
};

export type TransferParams = {
  to?: string | null,
  amount?: string | null,
};

export type TransferResult = {
  __typename: "TransferResult",
  from?: string | null,
  to?: string | null,
  amount?: string | null,
  message?: string | null,
  result?: boolean | null,
  hash?: string | null,
};

export type TransferFromParams = {
  from?: string | null,
  to?: string | null,
  amount?: string | null,
};

export type TransferFromResult = {
  __typename: "TransferFromResult",
  from?: string | null,
  to?: string | null,
  amount?: string | null,
  message?: string | null,
  result?: boolean | null,
  hash?: string | null,
};

export type BurnResult = {
  __typename: "BurnResult",
  hash?: string | null,
  amount?: string | null,
  result?: boolean | null,
  message?: string | null,
};

export type BurnFromParams = {
  address: string,
  amount?: string | null,
};

export type BurnFromResult = {
  __typename: "BurnFromResult",
  hash?: string | null,
  from?: string | null,
  amount?: string | null,
  result?: boolean | null,
  message?: string | null,
};

export type WithdrawParams = {
  IBAN?: string | null,
  accountHolderName?: string | null,
  amount?: number | null,
  id?: string | null,
  address?: string | null,
  userName?: string | null,
};

export type WithdrawParamsResult = {
  __typename: "WithdrawParamsResult",
  burnResult?: BurnFromResult | null,
  withdrawResult?: WithdrawParam | null,
  result?: boolean | null,
  message?: string | null,
  errorMessage?: string | null,
};

export type WithdrawParam = {
  __typename: "WithdrawParam",
  IBAN?: string | null,
  accountHolderName?: string | null,
  amount?: number | null,
  id?: string | null,
  address?: string | null,
  userName?: string | null,
};

export type getUserResult = UserInfo | UserNotExists | Error


export type User = {
  __typename: "User",
  id: string,
  cnic?: string | null,
  PHONE_NUMBER?: string | null,
  ETH_ADDRESS?: string | null,
  FULL_NAME?: string | null,
  DOB?: string | null,
  FATHER_OR_HUSBAND_NAME?: string | null,
  CITY?: string | null,
  COUNTRY?: string | null,
  POSTAL_CODE?: string | null,
  ADDRESS?: string | null,
};

export type getAddressByUserNameResult = AddressInfo | UserNotExists | Error


export type AddressInfo = {
  __typename: "AddressInfo",
  address?: string | null,
};

export type ListContactsParams = {
  id?: string | null,
};

export type ListContactsResponse = ListContactsResult | UserNotExists | Error


export type ListContactsResult = {
  __typename: "ListContactsResult",
  contacts?: Array< string | null > | null,
};

export type UserInfoParams = {
  id?: string | null,
  attributeInfo?: string | null,
};

export type UserInfoResult = {
  __typename: "UserInfoResult",
  success?: boolean | null,
  message?: string | null,
  value?: string | null,
  errorMessage?: string | null,
};

export type CreateUserMutationVariables = {
  user: CreateUser,
};

export type CreateUserMutation = {
  createUser: ( {
      __typename: "UserInfo",
      userInfo?: string | null,
    } | {
      __typename: "UserExists",
      message?: string | null,
    } | {
      __typename: "Error",
      errorMessage?: string | null,
    }
  ) | null,
};

export type UpdateUserMutationVariables = {
  user: UpdateUser,
};

export type UpdateUserMutation = {
  updateUser: ( {
      __typename: "UpdatedResult",
      id: string,
      message?: string | null,
    } | {
      __typename: "UserNotExists",
      message?: string | null,
    } | {
      __typename: "Error",
      errorMessage?: string | null,
    }
  ) | null,
};

export type DeleteUserMutationVariables = {
  id: string,
};

export type DeleteUserMutation = {
  deleteUser: ( {
      __typename: "DeletedResult",
      id: string,
      message?: string | null,
    } | {
      __typename: "UserNotExists",
      message?: string | null,
    } | {
      __typename: "Error",
      errorMessage?: string | null,
    }
  ) | null,
};

export type ZkProfileMutationVariables = {
  zkuser?: ZKUserInfo | null,
};

export type ZkProfileMutation = {
  zkProfile?: string | null,
};

export type SetUserNameMutationVariables = {
  setname?: SetUserName | null,
};

export type SetUserNameMutation = {
  setUserName?: string | null,
};

export type AddContactsMutationVariables = {
  user: UpdateContactList,
};

export type AddContactsMutation = {
  addContacts: ( {
      __typename: "UpdatedResult",
      id: string,
      message?: string | null,
    } | {
      __typename: "UserNotExists",
      message?: string | null,
    } | {
      __typename: "Error",
      errorMessage?: string | null,
    }
  ) | null,
};

export type ZeroKnowledgeProfileMutationVariables = {
  zkp?: zkParams | null,
};

export type ZeroKnowledgeProfileMutation = {
  zeroKnowledgeProfile?: string | null,
};

export type Create_ETH_ProfileMutationVariables = {
  address?: string | null,
};

export type Create_ETH_ProfileMutation = {
  create_ETH_Profile?:  {
    __typename: "Create_ETH_Profile_Result",
    message?: string | null,
    result?: boolean | null,
  } | null,
};

export type TopUpAddressMutationVariables = {
  address?: string | null,
};

export type TopUpAddressMutation = {
  topUpAddress?:  {
    __typename: "TopUpAddressResult",
    hash?: string | null,
    message?: string | null,
    result?: string | null,
  } | null,
};

export type SetProfileAddressMutation = {
  setProfileAddress?: boolean | null,
};

export type MintPKDRMutationVariables = {
  mint?: mintInfo | null,
};

export type MintPKDRMutation = {
  mintPKDR?:  {
    __typename: "mintResult",
    message?: string | null,
    result: boolean,
  } | null,
};

export type ApproveMutationVariables = {
  privateKey?: string | null,
};

export type ApproveMutation = {
  approve?:  {
    __typename: "approveResult",
    message?: string | null,
    result?: boolean | null,
  } | null,
};

export type SetPlatFormFeeMutationVariables = {
  fee?: string | null,
};

export type SetPlatFormFeeMutation = {
  setPlatFormFee?:  {
    __typename: "SetPlatFormFeeResult",
    message?: string | null,
    result?: boolean | null,
  } | null,
};

export type TransferMutationVariables = {
  transferParams?: TransferParams | null,
};

export type TransferMutation = {
  transfer?:  {
    __typename: "TransferResult",
    from?: string | null,
    to?: string | null,
    amount?: string | null,
    message?: string | null,
    result?: boolean | null,
    hash?: string | null,
  } | null,
};

export type TransferFromMutationVariables = {
  transferFromParams?: TransferFromParams | null,
};

export type TransferFromMutation = {
  transferFrom?:  {
    __typename: "TransferFromResult",
    from?: string | null,
    to?: string | null,
    amount?: string | null,
    message?: string | null,
    result?: boolean | null,
    hash?: string | null,
  } | null,
};

export type BurnMutationVariables = {
  amount?: string | null,
};

export type BurnMutation = {
  burn?:  {
    __typename: "BurnResult",
    hash?: string | null,
    amount?: string | null,
    result?: boolean | null,
    message?: string | null,
  } | null,
};

export type BurnFromMutationVariables = {
  burnFromParams?: BurnFromParams | null,
};

export type BurnFromMutation = {
  burnFrom?:  {
    __typename: "BurnFromResult",
    hash?: string | null,
    from?: string | null,
    amount?: string | null,
    result?: boolean | null,
    message?: string | null,
  } | null,
};

export type WithdrawMutationVariables = {
  withdrawParams?: WithdrawParams | null,
};

export type WithdrawMutation = {
  withdraw?:  {
    __typename: "WithdrawParamsResult",
    burnResult?:  {
      __typename: "BurnFromResult",
      hash?: string | null,
      from?: string | null,
      amount?: string | null,
      result?: boolean | null,
      message?: string | null,
    } | null,
    withdrawResult?:  {
      __typename: "WithdrawParam",
      IBAN?: string | null,
      accountHolderName?: string | null,
      amount?: number | null,
      id?: string | null,
      address?: string | null,
      userName?: string | null,
    } | null,
    result?: boolean | null,
    message?: string | null,
    errorMessage?: string | null,
  } | null,
};

export type GetUserByEmailQueryVariables = {
  id: string,
};

export type GetUserByEmailQuery = {
  getUserByEmail: ( {
      __typename: "UserInfo",
      userInfo?: string | null,
    } | {
      __typename: "UserNotExists",
      message?: string | null,
    } | {
      __typename: "Error",
      errorMessage?: string | null,
    }
  ) | null,
};

export type GetAllUserInfoQuery = {
  getAllUserInfo?:  Array< {
    __typename: "User",
    id: string,
    cnic?: string | null,
    PHONE_NUMBER?: string | null,
    ETH_ADDRESS?: string | null,
    FULL_NAME?: string | null,
    DOB?: string | null,
    FATHER_OR_HUSBAND_NAME?: string | null,
    CITY?: string | null,
    COUNTRY?: string | null,
    POSTAL_CODE?: string | null,
    ADDRESS?: string | null,
  } | null > | null,
};

export type GetAddressByUserNameQueryVariables = {
  userName?: string | null,
};

export type GetAddressByUserNameQuery = {
  getAddressByUserName: ( {
      __typename: "AddressInfo",
      address?: string | null,
    } | {
      __typename: "UserNotExists",
      message?: string | null,
    } | {
      __typename: "Error",
      errorMessage?: string | null,
    }
  ) | null,
};

export type GetUsersCountQuery = {
  getUsersCount?: number | null,
};

export type ListContactsQueryVariables = {
  listContactsParams?: ListContactsParams | null,
};

export type ListContactsQuery = {
  listContacts: ( {
      __typename: "ListContactsResult",
      contacts?: Array< string | null > | null,
    } | {
      __typename: "UserNotExists",
      message?: string | null,
    } | {
      __typename: "Error",
      errorMessage?: string | null,
    }
  ) | null,
};

export type GetUserInfoQueryVariables = {
  userInfoParams?: UserInfoParams | null,
};

export type GetUserInfoQuery = {
  getUserInfo?:  {
    __typename: "UserInfoResult",
    success?: boolean | null,
    message?: string | null,
    value?: string | null,
    errorMessage?: string | null,
  } | null,
};

export type GetRateUSDPKRQuery = {
  getRateUSDPKR?: string | null,
};

export type GetProfileAddressQuery = {
  getProfileAddress?: string | null,
};

export type GetPlatFormFeeQuery = {
  getPlatFormFee?: string | null,
};

export type GetETHBalanceQueryVariables = {
  address: string,
};

export type GetETHBalanceQuery = {
  getETHBalance?: string | null,
};

export type TotalSupplyQuery = {
  totalSupply?: string | null,
};
