import zkAPI from "../zkAPI";
import { UserObject } from "../zkAPI/typesAPI/type";
exports.handler = async (event: any, context: any) => {
  switch (event.info.fieldName) {
    case "createProfile":
      const params: UserObject = {
        cnic: "4210177777773",
        privateKey:
          "bbda125eae72b48642b60b4afad205065fb63bfdbb4645be0d6626557d13724b",
        publicAddress: "0x2c5483B70D2FF43e5b7AF10435DE6Bd1303aa66b",
        publicAddressAdmin: "0x2c5483B70D2FF43e5b7AF10435DE6Bd1303aa66b",
        optionalParams: "0",
        bit: true,
      };
      return String(await zkAPI(event.info.fieldName, params));

    default:
      return null;
  }
};
