import { NextRequest, NextResponse } from "next/server";
import { listLeads, updateLead } from "@/lib/store";
import { sendLostNurtureEmail } from "@/lib/pipelineEmails";

/**
 * GET /api/admin/nurture-lost?key=CRON_SECRET
 * 
 * Called by cron job to send nurture emails to lost leads
 * whose re-engagement date has arrived.
 * 
 * Set up a daily cron to call this endpoint.
 */
export async function GET(request: NextRequest) {
  const authKey = request.nextUrl.searchParams.get("key");
  const cronSecret = process.env.CRON_SECRET || "";

  // Auth check
  if (cronSecret && authKey !== cronSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const leads = await listLeads();
    const now = new Date();

    // Find lost leads ready for re-engagement
    const leadsToNurture = leads.filter((lead) => {
      if (lead.status !== "Lost") return false;
      if (!lead.reengage_at) return false;
      if (lead.nurture_email_sent) return false;

      const reengageDate = new Date(lead.reengage_at);
      return reengageDate <= now;
    });

    let sent = 0;
    let failed = 0;

    for (const lead of leadsToNurture) {
      if (!lead.email) {
        failed++;
        continue;
      }

      const result = await sendLostNurtureEmail({
        name: lead.name,
        email: lead.email,
        businessName: lead.businessName,
      });

      if (result.sent) {
        // Mark as sent
        await updateLead(lead.id, { nurture_email_sent: true });
        sent++;
      } else {
        console.error(`[Nurture] Failed for ${lead.email}:`, result.reason);
        failed++;
      }
    }

    return NextResponse.json({
      success: true,
      checked: leadsToNurture.length,
      sent,
      failed,
      nextUp: leads
        .filter((l) => l.status === "Lost" && l.reengage_at && !l.nurture_email_sent)
        .slice(0, 5)
        .map((l) => ({
          name: l.name,
          businessName: l.businessName,
          reengage_at: l.reengage_at,
        })),
    });
  } catch (error) {
    console.error("[Nurture] Error:", error);
    return NextResponse.json({ error: "Failed to process nurture queue" }, { status: 500 });
  }
}
