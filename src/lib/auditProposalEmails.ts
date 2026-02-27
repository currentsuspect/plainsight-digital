import { Resend } from "resend";
import { Lead } from "./store";
import { PAYMENT_FULL_TEXT } from "./paymentConfig";

const resendApiKey = (process.env.RESEND_API_KEY || "").trim();
const resend = resendApiKey ? new Resend(resendApiKey) : null;
const from = process.env.FOLLOWUP_FROM_EMAIL || "Dylan <dylan@plainsight.digital>";

type AuditEmailParams = {
  to: string;
  name: string;
  businessName: string;
  auditPoints: string[];
  recommendations?: string[];
  score?: number;
  grade?: string;
  nextStep?: string;
  calLink?: string;
};

/**
 * Send audit email to lead
 */
export async function sendAuditEmail(params: AuditEmailParams) {
  const { to, name, businessName, auditPoints, recommendations, score, grade, nextStep, calLink } = params;

  if (!resend) {
    return { sent: false as const, reason: "missing_resend_api_key" };
  }

  const subject = grade && score 
    ? `📋 Your Website Score: ${score}/100 (Grade ${grade}) - ${businessName}` 
    : `📋 Your Plainsight Audit for ${businessName}`;

  const auditList = auditPoints.map((point, i) => `${i + 1}. ${point}`).join("\n");
  const auditListHtml = auditPoints.map((point, i) => `<li style="margin: 8px 0;">${point}</li>`).join("");
  
  const recListHtml = recommendations?.slice(0, 4).map((rec) => `<li style="margin: 6px 0;">${rec}</li>`).join("") || "";

  const text = [
    `Hi ${name},`,
    "",
    `Thanks for using the Plainsight Website Grader.`,
    "",
    score && grade ? `Your Score: ${score}/100 (Grade ${grade})` : "",
    "",
    `Here's what we found for ${businessName}:`,
    "",
    auditList,
    "",
    recommendations && recommendations.length > 0 ? "Priority Recommendations:" : "",
    recommendations && recommendations.length > 0 ? recommendations.slice(0, 4).join("\n") : "",
    "",
    nextStep || "These issues are costing you customers every day. Let's fix them.",
    "",
    calLink
      ? `Want to discuss how to implement these? Book a quick call:\n${calLink}`
      : "Reply to this email if you'd like to discuss next steps.",
    "",
    "Best,",
    "Dylan Makori",
    "Plainsight Digital",
  ].filter(Boolean).join("\n");

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111; max-width: 600px;">
      <p>Hi ${name},</p>
      
      <p>Thanks for using the <strong>Plainsight Website Grader</strong>.</p>
      
      ${score && grade ? `
        <div style="background: ${score >= 70 ? '#22c55e' : score >= 50 ? '#f59e0b' : '#ef4444'}; color: #fff; padding: 24px; border-radius: 8px; margin: 20px 0; text-align: center;">
          <div style="font-size: 14px; opacity: 0.9;">Your Website Score</div>
          <div style="font-size: 48px; font-weight: bold;">${score}/100</div>
          <div style="font-size: 24px; font-weight: bold;">Grade ${grade}</div>
        </div>
      ` : ""}
      
      <p>Here's what we found for <strong>${businessName}</strong>:</p>
      
      <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <ol style="margin: 0; padding-left: 20px;">
          ${auditListHtml}
        </ol>
      </div>
      
      ${recListHtml ? `
        <div style="background: #fffbeb; border: 1px solid #f59e0b; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <div style="font-weight: bold; margin-bottom: 12px; color: #92400e;">💡 Priority Recommendations:</div>
          <ul style="margin: 0; padding-left: 20px; color: #78350f;">
            ${recListHtml}
          </ul>
        </div>
      ` : ""}
      
      <p style="color: #666;">${nextStep || "These issues are costing you customers every day. Let's fix them."}</p>
      
      ${calLink ? `
        <p style="text-align: center; margin: 24px 0;">
          <a href="${calLink}" style="background: #f59e0b; color: #000; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold;">
            📅 Book a Call to Discuss
          </a>
        </p>
      ` : "<p>Reply to this email if you'd like to discuss next steps.</p>"}
      
      <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
      
      <p>
        Best,<br/>
        <strong>Dylan Makori</strong><br/>
        Plainsight Digital
      </p>
    </div>
  `;

  try {
    const response = await resend.emails.send({
      from,
      to: [to],
      subject,
      text,
      html,
    });

    console.log(`[Audit Email] Sent to ${to}`, response);
    return { sent: true as const, id: response.data?.id };
  } catch (error) {
    console.error(`[Audit Email] Failed to send to ${to}:`, error);
    return { sent: false as const, reason: String(error) };
  }
}

type ProposalEmailParams = {
  to: string;
  name: string;
  businessName: string;
  projectName: string;
  amount: number;
  currency?: string;
  includes: string[];
  timeline?: string;
  calLink?: string;
  invoiceLink?: string;
};

/**
 * Send proposal email to lead
 */
export async function sendProposalEmail(params: ProposalEmailParams) {
  const { to, name, businessName, projectName, amount, currency = "KES", includes, timeline, calLink, invoiceLink } = params;

  if (!resend) {
    return { sent: false as const, reason: "missing_resend_api_key" };
  }

  const subject = `💼 Proposal: ${projectName} for ${businessName}`;

  const includesList = includes.map((item) => `• ${item}`).join("\n");
  const includesListHtml = includes.map((item) => `<li style="margin: 4px 0;">${item}</li>`).join("");

  const text = [
    `Hi ${name},`,
    "",
    `Great connecting with you! Here's the proposal for ${projectName}:`,
    "",
    `**Investment:** ${currency} ${amount.toLocaleString()}`,
    "",
    "**What's included:**",
    includesList,
    "",
    timeline ? `**Timeline:** ${timeline}` : "",
    "",
    "This is a lifetime investment — the site keeps compounding value long after launch.",
    `Payment: ${PAYMENT_FULL_TEXT}`, 
    "",
    invoiceLink ? `📄 View your invoice here: ${invoiceLink}` : "",
    calLink ? `📅 Questions? Book a quick call: ${calLink}` : "Reply if you have any questions.",
    "",
    "Ready when you are.",
    "",
    "Best,",
    "Dylan Makori",
    "Plainsight Digital",
  ].filter(Boolean).join("\n");

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111; max-width: 600px;">
      <p>Hi ${name},</p>
      
      <p>Great connecting with you! Here's the proposal for <strong>${projectName}</strong>:</p>
      
      <div style="background: #f59e0b; color: #000; padding: 24px; border-radius: 8px; margin: 20px 0; text-align: center;">
        <div style="font-size: 14px; opacity: 0.8;">Investment</div>
        <div style="font-size: 32px; font-weight: bold;">${currency} ${amount.toLocaleString()}</div>
        ${timeline ? `<div style="font-size: 14px; margin-top: 8px;">Timeline: ${timeline}</div>` : ""}
      </div>
      
      <div style="margin: 20px 0;">
        <div style="font-weight: bold; margin-bottom: 8px;">What's included:</div>
        <ul style="margin: 0; padding-left: 20px;">
          ${includesListHtml}
        </ul>
      </div>
      
      <p style="background: #f5f5f5; padding: 12px; border-radius: 6px; font-size: 14px;">
        💡 <strong>Lifetime investment</strong> — the site keeps compounding value long after launch.
      </p>
      
      ${invoiceLink ? `
        <p style="text-align: center; margin: 24px 0;">
          <a href="${invoiceLink}" style="background: #22c55e; color: #fff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold;">
            📄 View Invoice
          </a>
        </p>
      ` : ""}
      
      ${calLink ? `
        <p style="text-align: center; margin: 16px 0;">
          <a href="${calLink}" style="color: #f59e0b; text-decoration: underline;">
            📅 Questions? Book a quick call
          </a>
        </p>
      ` : "<p>Reply if you have any questions.</p>"}
      
      <p style="margin-top: 24px;">Ready when you are.</p>
      
      <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
      
      <p>
        Best,<br/>
        <strong>Dylan Makori</strong><br/>
        Plainsight Digital
      </p>
    </div>
  `;

  try {
    const response = await resend.emails.send({
      from,
      to: [to],
      subject,
      text,
      html,
    });

    console.log(`[Proposal Email] Sent to ${to}`, response);
    return { sent: true as const, id: response.data?.id };
  } catch (error) {
    console.error(`[Proposal Email] Failed to send to ${to}:`, error);
    return { sent: false as const, reason: String(error) };
  }
}

// Helper to build audit from lead info
export function generateDefaultAudit(lead: Lead): string[] {
  const audits: string[] = [];

  if (!lead.website) {
    audits.push("No owned website — you're relying on directories/referrals and missing Google searches");
    audits.push("A simple 1-page site could capture 3-5 new inquiries/month");
  } else {
    audits.push("Website exists but could be optimized for mobile conversions");
    audits.push("Page speed and trust signals could be improved");
  }

  audits.push("No clear call-to-action flow for mobile visitors");
  audits.push("Missing WhatsApp/quick contact option prominently displayed");

  if (lead.niche === "law" || lead.niche === "clinic") {
    audits.push(`${lead.niche === "law" ? "Legal" : "Medical"} services need strong trust signals (testimonials, credentials)`);
  }

  return audits;
}
