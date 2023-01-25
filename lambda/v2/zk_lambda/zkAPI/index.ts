import { CreateProfile, UserObject } from "./typesAPI/type";
import createProfile from "./api/createProfile";
import revokeVerifiedUser from "./api/revokeVerifiedUser";
import signatures from "./signatures";
import getVerifiedUser from "./api/getVerifiedUser";
const zkAPI = async (
  apiName: string,
  params: UserObject
): Promise<string | boolean> => {
  switch (apiName) {
    case "createProfile":
      return (await getVerifiedUser(params.publicAddress))
        ? "User Already Exists"
        : (await signatures(params))
        ? await createProfile(params)
        : "Signatures not Matches";

    case "revokeVerifiedUser":
      return await revokeVerifiedUser(params.publicAddress);

    case "getVerifiedUser":
      return await getVerifiedUser(params.publicAddress);

    default:
      return "Wrong API Selection";
  }
};

export default zkAPI;
