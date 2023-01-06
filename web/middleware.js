import { NextResponse } from "next/server";
import { getCookie } from "cookies-next";

const privateRouter = {
  home: true,
};

export function middleware(req) {
  const { pathname } = req.nextUrl;
  const verifyToken = req.cookies.get("token");
  const url = req.url;
  //console.log('middleware', req)
  if (!verifyToken && !pathname.includes("/auth/login")) {
    return NextResponse.redirect(new URL("/auth/login", url));
  }

  if (verifyToken) {
    if (pathname.includes("/auth/login")) {
      return NextResponse.redirect(new URL("/", url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/profile", "/auth/:path*"],
};