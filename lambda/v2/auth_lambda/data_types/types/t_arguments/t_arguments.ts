type Event={
    "authorizationToken":string,
    "requestContext": {
        "apiId": string,
        "accountId": string,
        "requestId": string,
        "queryString": string,
        "operationName": string,
        "variables":any 
    }
}



export {Event};