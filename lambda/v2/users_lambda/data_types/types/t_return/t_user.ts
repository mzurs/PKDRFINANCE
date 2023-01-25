type UserExists = {
  __typename: string;
  message: string;
};

type UserNotExists = {
  __typename: string;
  message: string;
};

type UserInfo = {
  __typename: string;
  userInfo: String;
};

type UpdatedResult = {
  __typename: string;
  id: string;
  message: string;
};

type DeletedResult = {
  __typename: string;
  id: string;
  message: string;
};
type User = {
  id: string;
  cnic?: string;
  PHONE_NUMBER?: string;
  ETH_ADDRESS?: string;
  FULL_NAME?: string;
  DOB?: string;
  FATHER_OR_HUSBAND_NAME?: string;
  CITY: string;
  COUNTRY: string;
  POSTAL_CODE: string;
  ADDRESS: string;
};

type AddressInfo = {
  __typename: string;
  address: string;
};
export {
  UserExists,
  UserNotExists,
  UserInfo,
  UpdatedResult,
  DeletedResult,
  User,
  AddressInfo
};
