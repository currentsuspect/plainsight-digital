import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  // Public endpoints
  if (req.nextUrl.pathname.startsWith("/api/admin/login")) {
    return NextResponse.next();
  }
  if (req.nextUrl.pathname.startsWith("/api/admin/cal-webhook")) {
    return NextResponse.next();
  }

  const guarded =
    req.nextUrl.pathname.startsWith("/admin") ||
    req.nextUrl.pathname.startsWith("/api/admin");
  
  if (!guarded) return NextResponse.next();

  // Verify JWT session
  const session = await getSessionFromRequest(req);

  if (!session) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/admin-login";
    loginUrl.searchParams.set("next", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Add user info to headers for downstream use
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-user-id", session.sub);
  requestHeaders.set("x-user-email", session.email);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
