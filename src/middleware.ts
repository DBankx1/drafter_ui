import { NextRequest, NextResponse } from "next/server";

const LANDING_DOMAIN = "drafter.com";
const APP_SUBDOMAIN = "app";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const hostname = req.headers.get("host") ?? "";

  const host = hostname.replace(/:.*/, "");

  const isAppSubdomain =
    host === `${APP_SUBDOMAIN}.${LANDING_DOMAIN}` ||
    host === `${APP_SUBDOMAIN}.localhost`; // local dev

  if (isAppSubdomain) {
    url.pathname = `/app${url.pathname === "/" ? "" : url.pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
