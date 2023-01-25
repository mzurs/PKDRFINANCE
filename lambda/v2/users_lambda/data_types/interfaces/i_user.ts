interface IUSER {
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
}

interface ICHECKBYEMAIL {
  TableName?: string;
  Key: {
    id: string;
  };
}

interface IPREREGISTERUSER {
  id: string;
  cnic: string;
  PHONE_NUMBER: string;
  ETH_ADDRESS: string;
  FULL_NAME: string;
  DOB: string;
  FATHER_OR_HUSBAND_NAME: string;
  CITY: string;
  COUNTRY: string;
  POSTAL_CODE: string;
  ADDRESS: string;
}
export { IUSER, ICHECKBYEMAIL, IPREREGISTERUSER };
