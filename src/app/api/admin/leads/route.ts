import { NextResponse } from "next/server";
import { listLeads, LeadStatus, updateLeadStatus } from "@/lib/store";

const allowed: LeadStatus[] = ["New", "Contacted", "Audit Sent", "Proposal", "Won", "Lost"];

export async function GET() {
  const leads = await listLeads();
  return NextResponse.json({ leads });
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "") as LeadStatus;

  if (!id || !allowed.includes(status)) {
    return NextResponse.json({ error: "Invalid status update" }, { status: 400 });
  }

  await updateLeadStatus(id, status);
  return NextResponse.redirect(new URL("/admin", request.url), 303);
}
