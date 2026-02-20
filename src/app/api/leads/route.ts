import { NextResponse } from "next/server";
import { addLead, listLeads } from "@/lib/store";
import { notifyTelegramFollowupStatus, notifyTelegramLead } from "@/lib/notify";
import { sendLeadFollowupEmail } from "@/lib/followup";

export async function GET(request: Request) {
  const apiKey = request.headers.get("x-admin-key");
  const expected = process.env.ADMIN_API_KEY;

  if (!expected || apiKey !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const leads = await listLeads();
  return NextResponse.json({ leads });
}

export async function POST(request: Request) {
  const body = await request.json();

  if (!body?.name || !body?.businessName || !body?.email || !body?.painPoint || !body?.budget || !body?.niche) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const lead = await addLead({
    name: String(body.name),
    businessName: String(body.businessName),
    email: String(body.email),
    phone: body.phone ? String(body.phone) : undefined,
    website: body.website ? String(body.website) : undefined,
    niche: body.niche,
    budget: body.budget,
    painPoint: String(body.painPoint),
    source: body.source ? String(body.source) : "website",
  });

  const notification = await notifyTelegramLead(lead);
  const followup = await sendLeadFollowupEmail(lead);
  const followupNotification = await notifyTelegramFollowupStatus(lead, followup);

  return NextResponse.json({ ok: true, lead, notification, followup, followupNotification });
}
