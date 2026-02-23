/** @format */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

function isProtectedRoute(pathname: string) {
  return (
    pathname === "/dashboard" ||
    pathname.startsWith("/dashboard/") ||
    pathname === "/candidates" ||
    pathname.startsWith("/candidates/")
  );
}

function isAuthRoute(pathname: string) {
  return pathname === "/login" || pathname === "/register";
}

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token && isProtectedRoute(pathname)) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  }

  if (token && (pathname === "/" || isAuthRoute(pathname))) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/register", "/dashboard/:path*", "/candidates/:path*"],
};
