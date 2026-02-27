// JWT Authentication
// Replaces simple token comparison with stateless JWT sessions

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const JWT_ALGORITHM = "HS256";
const COOKIE_NAME = "admin_session";
const TOKEN_EXPIRY = "8h"; // 8 hours

function getJwtSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET?.trim();
  if (!secret) {
    throw new Error("JWT_SECRET environment variable is required");
  }
  return new TextEncoder().encode(secret);
}

export interface JWTPayload {
  sub: string; // user ID
  email: string;
  role: "admin";
  iat: number;
  exp: number;
}

/**
 * Create a new JWT session
 */
export async function createSession(
  userId: string,
  email: string
): Promise<string> {
  const secret = getJwtSecret();
  const token = await new SignJWT({
    sub: userId,
    email,
    role: "admin",
  })
    .setProtectedHeader({ alg: JWT_ALGORITHM })
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRY)
    .sign(secret);

  return token;
}

/**
 * Verify a JWT token
 */
export async function verifySession(token: string): Promise<JWTPayload | null> {
  try {
    const secret = getJwtSecret();
    const { payload } = await jwtVerify(token, secret, {
      algorithms: [JWT_ALGORITHM],
    });

    return payload as unknown as JWTPayload;
  } catch {
    return null;
  }
}

/**
 * Get session from request (for middleware)
 */
export async function getSessionFromRequest(
  req: NextRequest
): Promise<JWTPayload | null> {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySession(token);
}

/**
 * Set session cookie
 */
export async function setSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 8 * 60 * 60, // 8 hours in seconds
    path: "/",
  });
}

/**
 * Clear session cookie
 */
export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

/**
 * Check if user is authenticated
 */
export async function requireAuth(req: NextRequest): Promise<JWTPayload> {
  const session = await getSessionFromRequest(req);
  if (!session) {
    throw new Error("Unauthorized");
  }
  return session;
}
