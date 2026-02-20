import { NextResponse } from "next/server";
import { addMeeting, listMeetings } from "@/lib/opsStore";

export async function GET() {
  return NextResponse.json({ rows: await listMeetings() });
}

export async function POST(request: Request) {
  const form = await request.formData();
  await addMeeting({
    title: String(form.get("title") || "Meeting"),
    when: String(form.get("when") || new Date().toISOString()),
    owner: String(form.get("owner") || "Dylan"),
    note: String(form.get("note") || ""),
  });
  return NextResponse.redirect(new URL("/admin/ops", request.url), 303);
}
