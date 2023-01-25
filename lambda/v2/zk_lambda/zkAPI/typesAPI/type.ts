type CreateProfile = {
  cnic: string;
  privKeyFirst: string;
  privKeySecond: string;
  publicAddress: string;
  publicAddressAdmin: string;
  optionalParams: string;
  hashFirst?: string;
  hashSecond?: string;
  bit?: boolean;
};

type ZKHashOptionalParams = {
  publicAddress: string;
};

type ZKHashParams = {
  cnic: string;
  privKeyFirst: string;
  privKeySecond: string;
  optionalParams: string;
};
type ZKHashReturnParams = {
  hash1: string;
  hash2: string;
};
type UserObject = {
  cnic: string;
  privateKey: string;
  publicAddress: string;
  publicAddressAdmin: string;
  optionalParams: string;
  bit?: boolean;
};
type hex2decReturnParams=string[]| string;

export { hex2decReturnParams, CreateProfile, ZKHashParams, ZKHashReturnParams, UserObject };
