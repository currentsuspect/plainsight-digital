import { NextRequest, NextResponse } from "next/server";
import { listLeads, updateLeadStatus } from "@/lib/store";
import { sendProposalEmail } from "@/lib/auditProposalEmails";
import { addInvoice, updateInvoice } from "@/lib/opsStore";
import { PAYMENT_FULL_TEXT } from "@/lib/paymentConfig";

/**
 * POST /api/admin/send-proposal
 * 
 * Accepts JSON or form data:
 * - leadId: string
 * - projectName: string
 * - amount: number
 * - includes?: string[]
 * - timeline?: string
 */
export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") || "";
    let leadId: string;
    let projectName: string;
    let amount: number;
    let includes: string[] | undefined;
    let timeline: string | undefined;

    if (contentType.includes("application/json")) {
      const body = await request.json();
      leadId = body.leadId;
      projectName = body.projectName;
      amount = body.amount;
      includes = body.includes;
      timeline = body.timeline;
    } else {
      // Form data
      const formData = await request.formData();
      leadId = String(formData.get("leadId"));
      projectName = String(formData.get("projectName"));
      amount = parseInt(String(formData.get("amount")), 10);
    }

    if (!leadId || !projectName || !amount) {
      return NextResponse.json({ error: "leadId, projectName, and amount required" }, { status: 400 });
    }

    const leads = await listLeads();
    const lead = leads.find(l => l.id === leadId);

    if (!lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    // Default includes if not provided
    const defaultIncludes = [
      "Custom website design & development",
      "Mobile-responsive layout",
      "Basic SEO setup",
      "Contact form with email notifications",
      "1 month of support & tweaks",
    ];

    const proposalIncludes = includes || defaultIncludes;
    const calLink = "https://cal.com/plainsightdigital/30min";

    // Create draft invoice
    const invoice = await addInvoice({
      client: lead.businessName,
      item: projectName,
      amount,
      status: "draft",
      paymentInstruction: PAYMENT_FULL_TEXT,
    });

    const invoiceLink = `${process.env.NEXT_PUBLIC_SITE_URL || "https://plainsight.digital"}/admin/invoice/${invoice.id}`;

    const result = await sendProposalEmail({
      to: lead.email,
      name: lead.name,
      businessName: lead.businessName,
      projectName,
      amount,
      includes: proposalIncludes,
      timeline,
      calLink,
      invoiceLink,
    });

    if (result.sent) {
      // Update lead status to "Proposal"
      await updateLeadStatus(leadId, "Proposal");
      
      // Update invoice to "sent"
      await updateInvoice(invoice.id, { status: "sent" });

      // Return redirect for form submissions, JSON for API calls
      if (!contentType.includes("application/json")) {
        return NextResponse.redirect(new URL(`/admin?proposal=sent&invoice=${invoice.id}`, process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"));
      }

      return NextResponse.json({
        success: true,
        emailId: result.id,
        invoiceId: invoice.id,
        invoiceLink,
      });
    }

    return NextResponse.json({
      success: false,
      reason: result.reason,
    }, { status: 500 });
  } catch (error) {
    console.error("[Send Proposal] Error:", error);
    return NextResponse.json({ error: "Failed to send proposal" }, { status: 500 });
  }
}
