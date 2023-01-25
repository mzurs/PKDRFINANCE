import { UserObject } from "./zkAPI/typesAPI/type";
import zkProfileCreation from "./zkAPI/zkProfileCreation";
const zkProfile=async(params:any):Promise<string>=>{
    // const params:UserObject={
    //     cnic:"4210177777773",
    //     privateKey: "bbda125eae72b48642b60b4afad205065fb63bfdbb4645be0d6626557d13724b",
    //     publicAddress: "0x2c5483B70D2FF43e5b7AF10435DE6Bd1303aa66b",
    //     publicAddressAdmin: "0x2c5483B70D2FF43e5b7AF10435DE6Bd1303aa66b" ,
    //     optionalParams: "0",
    //     bit: false
    // } 

return await zkProfileCreation(params);
    // return String(await zkAPI(name,params));
}
export default zkProfile;