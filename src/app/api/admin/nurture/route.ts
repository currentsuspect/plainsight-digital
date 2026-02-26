import { NextResponse } from "next/server";
import { listLeads, updateLead } from "@/lib/store";
import { sendLostNurtureEmail } from "@/lib/pipelineEmails";

function isDue(iso?: string | null) {
  if (!iso) return false;
  return new Date(iso) <= new Date();
}

export async function POST() {
  try {
    const leads = await listLeads();
    const dueLostLeads = leads.filter((l) => l.status === "Lost" && isDue(l.next_action_at));

    let sent = 0;
    for (const lead of dueLostLeads) {
      const result = await sendLostNurtureEmail(lead);
      if (result.sent) {
        sent++;
        // Re-schedule next nurture touchpoint in 90 days
        const next = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString();
        await updateLead(lead.id, { next_action_at: next, next_action_type: "followup" });
      }
    }

    return NextResponse.json({ checked: dueLostLeads.length, sent });
  } catch (error) {
    console.error("nurture error", error);
    return NextResponse.json({ error: "Failed to process nurture queue" }, { status: 500 });
  }
}

export async function GET() {
  const leads = await listLeads();
  const dueLostLeads = leads.filter((l) => l.status === "Lost" && isDue(l.next_action_at));
  return NextResponse.json({ due: dueLostLeads.length, leads: dueLostLeads.map((l) => ({ id: l.id, name: l.name, email: l.email, next_action_at: l.next_action_at })) });
}
