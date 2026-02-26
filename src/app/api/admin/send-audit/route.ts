import { NextRequest, NextResponse } from "next/server";
import { listLeads, updateLeadStatus } from "@/lib/store";
import { sendAuditEmail, sendProposalEmail, generateDefaultAudit } from "@/lib/auditProposalEmails";

/**
 * POST /api/admin/send-audit
 * 
 * Accepts JSON or form data:
 * - leadId: string
 * - auditPoints?: string[] (optional, will generate if not provided)
 */
export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") || "";
    let leadId: string;
    let auditPoints: string[] | undefined;

    if (contentType.includes("application/json")) {
      const body = await request.json();
      leadId = body.leadId;
      auditPoints = body.auditPoints;
    } else {
      // Form data
      const formData = await request.formData();
      leadId = String(formData.get("leadId"));
      // Note: form doesn't support arrays easily, so we'll use generated audit
    }

    if (!leadId) {
      return NextResponse.json({ error: "leadId required" }, { status: 400 });
    }

    const leads = await listLeads();
    const lead = leads.find(l => l.id === leadId);

    if (!lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    const points = auditPoints || generateDefaultAudit(lead);
    const calLink = "https://cal.com/plainsightdigital/30min";

    const result = await sendAuditEmail({
      to: lead.email,
      name: lead.name,
      businessName: lead.businessName,
      auditPoints: points,
      calLink,
    });

    if (result.sent) {
      // Update lead status to "Audit Sent"
      await updateLeadStatus(leadId, "Audit Sent");
      
      // Return redirect for form submissions, JSON for API calls
      if (!contentType.includes("application/json")) {
        return NextResponse.redirect(new URL("/admin?audit=sent", process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"));
      }
      
      return NextResponse.json({
        success: true,
        emailId: result.id,
        auditPoints: points,
      });
    }

    return NextResponse.json({
      success: false,
      reason: result.reason,
    }, { status: 500 });
  } catch (error) {
    console.error("[Send Audit] Error:", error);
    return NextResponse.json({ error: "Failed to send audit" }, { status: 500 });
  }
}
