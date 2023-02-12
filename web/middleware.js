import { NextResponse } from "next/server";

const privateRouter = {
  home: true,
  "/auth/google": true,
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
  matcher: [
    "/",
    "/profile/:path*",
    "/defaultsettings",
    "/auth/login",
    "/user/:path*",
    "/groups, /groups/:path*",
    "/friends/:path*",
  ],
};
