import { NextRequest, NextResponse } from "next/server";

function unauthorized() {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="PlainSight Admin"',
    },
  });
}

export function middleware(req: NextRequest) {
  if (!req.nextUrl.pathname.startsWith("/admin")) return NextResponse.next();

  const auth = req.headers.get("authorization");
  if (!auth?.startsWith("Basic ")) return unauthorized();

  const base64Credentials = auth.split(" ")[1] ?? "";

  let username = "";
  let password = "";

  try {
    const credentials = atob(base64Credentials);
    const sep = credentials.indexOf(":");
    if (sep < 0) return unauthorized();
    username = credentials.slice(0, sep);
    password = credentials.slice(sep + 1);
  } catch {
    return unauthorized();
  }

  const expectedUser = process.env.ADMIN_BASIC_USER || "admin";
  const expectedPass = process.env.ADMIN_BASIC_PASS || "JoTeahephUOVnJpR";

  if (username !== expectedUser || password !== expectedPass) {
    return unauthorized();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
