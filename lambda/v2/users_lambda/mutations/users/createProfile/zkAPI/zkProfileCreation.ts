import {
  _JSON_RPC_PROVIDER_MUMBAI,
  _PKDR_PRIVATE_KEY,
} from "./api/constant/constant";
import { UserObject } from "./typesAPI/type";
import createProfile from "./api/createProfile";
import signatures from "./signatures";





async function zkProfileCreation(params: UserObject): Promise<string> {
  return  (await signatures(params))
    ? await createProfile(params)
    : "Key/Pair not Matches";
}
export default zkProfileCreation;
