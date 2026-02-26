import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  // Public admin endpoints protected by their own shared-secret verification
  if (req.nextUrl.pathname.startsWith("/api/admin/login")) return NextResponse.next();
  if (req.nextUrl.pathname.startsWith("/api/admin/cal-webhook")) return NextResponse.next();

  const guarded = req.nextUrl.pathname.startsWith("/admin") || req.nextUrl.pathname.startsWith("/api/admin");
  if (!guarded) return NextResponse.next();

  const token = (req.cookies.get("admin_session")?.value || "").trim();
  const expected = (process.env.ADMIN_SESSION_TOKEN || "plainsight-admin-session-v1").trim();

  if (token === expected) return NextResponse.next();

  const loginUrl = req.nextUrl.clone();
  loginUrl.pathname = "/admin-login";
  loginUrl.searchParams.set("next", req.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
