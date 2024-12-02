import { NextResponse } from "next/server";

export function middleware(request) {
  const tokenLogin = request.cookies.get("tokenLogin")?.value;
  if (!tokenLogin) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
