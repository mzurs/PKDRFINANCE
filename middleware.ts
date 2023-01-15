// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    console.log(JSON.stringify(request))
  return NextResponse.redirect(new URL("/about", request.url));
}

export const config = {
  matcher: "/login/:path*",
};
