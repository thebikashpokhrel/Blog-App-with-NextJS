import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "./lib/auth";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path == "/sign-in" || path == "/sign-up";

  const authenticated = await isAuthenticated(request);
  if (isPublicPath && authenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!isPublicPath && !authenticated) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
}
export const config = {
  matcher: ["/admin/:path*", "/sign-in", "/sign-up"],
};
