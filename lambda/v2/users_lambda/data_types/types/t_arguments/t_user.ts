type User = {
  id: string;
  cnic: string;
  PHONE_NUMBER: string;
  ETH_ADDRESS: string;
  FULL_NAME: string;
  DOB: string;
  FATHER_OR_HUSBAND_NAME: string;
  CITY: string;
  COUNTRY: string;
  POSTAL_CODE: String;
  ADDRESS: string;
};

type UpdateUser={
  id:string;
  attributeName: string;
  attributeValue: string;
}

type SetUserName={
  id:string,
  userName:string
}
type UpdateContactList={
  id:string;
  attributeValue: string;

}
export { User,UpdateUser,SetUserName,UpdateContactList};

