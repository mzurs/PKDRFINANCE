/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUserByEmail = /* GraphQL */ `
  query GetUserByEmail($id: ID!) {
    getUserByEmail(id: $id) {
      ... on UserInfo {
        userInfo
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
export const getAllUserInfo = /* GraphQL */ `
  query GetAllUserInfo {
    getAllUserInfo {
      id
      cnic
      PHONE_NUMBER
      ETH_ADDRESS
      FULL_NAME
      DOB
      FATHER_OR_HUSBAND_NAME
      CITY
      COUNTRY
      POSTAL_CODE
      ADDRESS
    }
  }
`;
export const getAddressByUserName = /* GraphQL */ `
  query GetAddressByUserName($userName: String) {
    getAddressByUserName(userName: $userName) {
      ... on AddressInfo {
        address
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
