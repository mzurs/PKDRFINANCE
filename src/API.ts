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
  message?: string | null,
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
      message?: string | null,
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
      message?: string | null,
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
      message?: string | null,
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
      message?: string | null,
    }
  ) | null,
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
      message?: string | null,
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
      message?: string | null,
    }
  ) | null,
};
