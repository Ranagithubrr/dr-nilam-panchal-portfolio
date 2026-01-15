import { NextResponse, type NextRequest } from "next/server";

const ADMIN_LOGIN_PATH = "/admin/login";
const ADMIN_ROOT = "/admin";
const SESSION_COOKIE = "admin_session";

export const middleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  if (!pathname.startsWith(ADMIN_ROOT)) {
    return NextResponse.next();
  }

  const hasSession = Boolean(request.cookies.get(SESSION_COOKIE)?.value);

  if (pathname.startsWith(ADMIN_LOGIN_PATH)) {
    if (hasSession) {
      const url = request.nextUrl.clone();
      url.pathname = ADMIN_ROOT;
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  if (!hasSession) {
    const url = request.nextUrl.clone();
    url.pathname = ADMIN_LOGIN_PATH;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/admin/:path*"],
};
