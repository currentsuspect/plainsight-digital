import { NextResponse } from "next/server";
import { createSession, setSessionCookie } from "@/lib/auth";
import { reportError } from "@/lib/errorHandler";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const username = String(body?.username || "").trim();
    const password = String(body?.password || "").trim();

    const expectedUser = process.env.ADMIN_BASIC_USER?.trim();
    const expectedPass = process.env.ADMIN_BASIC_PASS?.trim();

    if (!expectedUser || !expectedPass) {
      reportError("Admin credentials not configured", "critical", {
        path: "/api/admin/login",
        method: "POST",
      });
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    if (username !== expectedUser || password !== expectedPass) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Create JWT session
    const token = await createSession(
      "admin",
      "admin@plainsightdigital.dev"
    );

    // Set cookie
    await setSessionCookie(token);

    return NextResponse.json({ ok: true });
  } catch (error) {
    reportError(
      error instanceof Error ? error : "Login failed",
      "error",
      { path: "/api/admin/login", method: "POST" }
    );
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
