import jose from "jose";
type web3AuthVerify = {
  idToken: string;
  pub_key: string;
};

type web3AuthVerifyResult = {
  result: boolean;
  decodedJWT: jose.JWTVerifyResult & jose.ResolvedKey |null;
};

export type { web3AuthVerify, web3AuthVerifyResult };
