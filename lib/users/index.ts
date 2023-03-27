import { JWTVerifyResult, ResolvedKey } from "jose"

async function userIdenity(params:JWTVerifyResult & ResolvedKey |null):Promise<string |null> {
    if(typeof(params)==null){
    return null
    }
    else{
        console.log(`JWT Decoded from lib/auth/user/ : ${params}`)
        return "users"
    }
}


export default userIdenity