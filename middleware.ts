import { NextRequest, NextResponse } from "next/server";
// import isAuthenticated from "./lib/auth/auth";
// import userIdenity from "./lib/users";
// import { web3AuthVerifyResult } from "./lib/types/types";

export default async function middleware(request: NextRequest) {
  // if (request.cookies.get("web3auth") && request.cookies.get("pub_key")) {
  //   const isAuthenticatedValue: web3AuthVerifyResult = await isAuthenticated(
  //     request
  //   );
  //   if (isAuthenticatedValue.result) {
  //     console.log(`isAuthenticatedValue: ${isAuthenticatedValue}`);

  //     const userPath = await userIdenity(isAuthenticatedValue.decodedJWT);
  //     if (!userPath) {
  //       return NextResponse.redirect(new URL("/", request.url));
  //     }
  //     if (userPath === "users") {
  //       request.cookies.set("userRole", userPath);
  //       console.log(`Path Name from users: ${request.nextUrl.pathname}`)
  //       if (
  //         request.nextUrl.pathname==="/"
  //       ) {
  //         return NextResponse.redirect(new URL("/user/users/", request.url));
  //       }
  //     }
  //     return NextResponse.next();
  //   } else {
  //     return NextResponse.redirect(new URL("/", request.url));
  //   }
  // } else {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }
}
export const config = {
  // matcher: ["/login/:path*", "/profile/:path*", "/api/:path*", ],
};
