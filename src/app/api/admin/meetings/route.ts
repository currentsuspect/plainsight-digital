import { NextResponse } from "next/server";
import { addMeeting, listMeetings } from "@/lib/opsStore";
import { validateMeetingEntry, errorResponse } from "@/lib/validation";
import { appendAuditLog } from "@/lib/store";

export async function GET() {
  try {
    const rows = await listMeetings();
    return NextResponse.json({ rows });
  } catch (error) {
    console.error("Error fetching meetings:", error);
    return NextResponse.json({ error: "Failed to fetch meetings" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const validation = validateMeetingEntry(formData);

    if (!validation.valid) {
      return errorResponse(validation.errors, 400);
    }

    const { title, when, owner, note } = validation.data as {
      title: string;
      when: string;
      owner: string;
      note?: string;
    };

    const entry = await addMeeting({ title, when, owner, note });

    // Audit log
    await appendAuditLog({
      action: "create",
      entity: "meeting",
      entityId: entry.id,
      changes: { title, when, owner, note },
    });

    return NextResponse.redirect(new URL("/admin/ops", request.url), 303);
  } catch (error) {
    console.error("Error adding meeting:", error);
    return NextResponse.json({ error: "Failed to add meeting" }, { status: 500 });
  }
}
