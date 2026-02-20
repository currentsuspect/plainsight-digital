import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const username = String(body?.username || "");
  const password = String(body?.password || "");

  const expectedUser = process.env.ADMIN_BASIC_USER || "admin";
  const expectedPass = process.env.ADMIN_BASIC_PASS || "JoTeahephUOVnJpR";
  const sessionToken = process.env.ADMIN_SESSION_TOKEN || "plainsight-admin-session-v1";

  if (username !== expectedUser || password !== expectedPass) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin_session", sessionToken, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return res;
}
