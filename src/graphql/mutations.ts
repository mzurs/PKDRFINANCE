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
