import { NextResponse } from "next/server";
import { addEvent, listEvents } from "@/lib/store";

export async function GET(request: Request) {
  const apiKey = request.headers.get("x-admin-key");
  const expected = process.env.ADMIN_API_KEY;

  if (!expected || apiKey !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const events = await listEvents();
  return NextResponse.json({ events });
}

export async function POST(request: Request) {
  const body = await request.json();

  if (!body?.type || !body?.page) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const event = await addEvent({
    type: body.type,
    page: String(body.page),
    meta: typeof body.meta === "object" && body.meta ? body.meta : undefined,
  });

  return NextResponse.json({ ok: true, event });
}
