import { sendWonEmail, sendLostNurtureEmail as sendLostNurtureEmailCore } from "./closeEmails";
import { PAYMENT_FULL_TEXT } from "./paymentConfig";

type LeadEmailShape = {
  name: string;
  email: string;
  businessName: string;
};

const apiKey = (process.env.RESEND_API_KEY || "").trim();
const from = (process.env.FOLLOWUP_FROM_EMAIL || "").trim();
const replyTo = (process.env.REPLY_TO_EMAIL || "").trim();

async function send(to: string, subject: string, text: string, html: string) {
  if (!apiKey || !from || !to) return { sent: false as const, reason: "missing_env_or_recipient" };

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from,
      to: [to],
      ...(replyTo ? { reply_to: [replyTo] } : {}),
      subject,
      text,
      html,
    }),
  });

  if (!res.ok) return { sent: false as const, reason: await res.text() };
  return { sent: true as const };
}

export async function sendAuditSentEmail(lead: LeadEmailShape) {
  const subject = `📋 Your Plainsight Audit for ${lead.businessName}`;
  const cal = "https://cal.com/plainsightdigital/30min";
  const text = `Hi ${lead.name},\n\nThanks for your interest in Plainsight Digital.\n\nI reviewed ${lead.businessName}'s online presence and here's what I found:\n\n1. No owned website — you're relying on directories/referrals and missing Google searches\n2. No clear call-to-action flow for mobile visitors\n3. Missing WhatsApp/quick contact option prominently displayed\n4. Trust signals (testimonials, credentials) could be stronger\n\nThese are quick wins that could start bringing in more inquiries within weeks.\n\nWant to discuss how to implement these? Book a quick call:\n${cal}\n\nBest,\nDylan Makori\nPlainsight Digital`;
  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111; max-width: 600px;">
      <p>Hi ${lead.name},</p>
      <p>Thanks for your interest in <strong>Plainsight Digital</strong>.</p>
      <p>I reviewed <strong>${lead.businessName}</strong>'s online presence and here's what I found:</p>
      <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <ol style="margin: 0; padding-left: 20px;">
          <li style="margin: 8px 0;">No owned website — you're relying on directories/referrals</li>
          <li style="margin: 8px 0;">No clear call-to-action for mobile visitors</li>
          <li style="margin: 8px 0;">Missing WhatsApp/quick contact option</li>
          <li style="margin: 8px 0;">Trust signals could be stronger</li>
        </ol>
      </div>
      <p style="color: #666;">These are quick wins that could start bringing in more inquiries within weeks.</p>
      <p style="text-align: center; margin: 24px 0;">
        <a href="${cal}" style="background: #f59e0b; color: #000; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold;">
          📅 Book a Call to Discuss
        </a>
      </p>
      <p>Best,<br/><strong>Dylan Makori</strong><br/>Plainsight Digital</p>
    </div>
  `;
  return send(lead.email, subject, text, html);
}

export async function sendProposalEmail(lead: LeadEmailShape & { projectName?: string; amount?: number }) {
  const projectName = lead.projectName || `Website for ${lead.businessName}`;
  const amount = lead.amount || 50000;
  const subject = `💼 Proposal: ${projectName}`;
  const cal = "https://cal.com/plainsightdigital/30min";
  const text = `Hi ${lead.name},\n\nGreat connecting with you! Here's the proposal for ${projectName}:\n\n**Investment:** KES ${amount.toLocaleString()}\n\n**What's included:**\n• Custom website design & development\n• Mobile-responsive layout\n• Basic SEO setup\n• Contact form with email notifications\n• 1 month of support & tweaks\n\nThis is a lifetime investment — the site keeps compounding value long after launch.\n\nPayment: ${PAYMENT_FULL_TEXT}\n\nQuestions? Book a quick call: ${cal}\n\nReady when you are.\n\nBest,\nDylan Makori\nPlainsight Digital`;
  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111; max-width: 600px;">
      <p>Hi ${lead.name},</p>
      <p>Great connecting with you! Here's the proposal for <strong>${projectName}</strong>:</p>
      <div style="background: #f59e0b; color: #000; padding: 24px; border-radius: 8px; margin: 20px 0; text-align: center;">
        <div style="font-size: 14px; opacity: 0.8;">Investment</div>
        <div style="font-size: 32px; font-weight: bold;">KES ${amount.toLocaleString()}</div>
      </div>
      <div style="margin: 20px 0;">
        <div style="font-weight: bold; margin-bottom: 8px;">What's included:</div>
        <ul style="margin: 0; padding-left: 20px;">
          <li>Custom website design & development</li>
          <li>Mobile-responsive layout</li>
          <li>Basic SEO setup</li>
          <li>Contact form with email notifications</li>
          <li>1 month of support & tweaks</li>
        </ul>
      </div>
      <p style="background: #f5f5f5; padding: 12px; border-radius: 6px; font-size: 14px;">
        💡 <strong>Lifetime investment</strong> — the site keeps compounding value long after launch.
      </p>
      <p style="text-align: center; margin: 16px 0;">
        <a href="${cal}" style="color: #f59e0b; text-decoration: underline;">📅 Questions? Book a quick call</a>
      </p>
      <p>Ready when you are.</p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
      <p>Best,<br/><strong>Dylan Makori</strong><br/>Plainsight Digital</p>
    </div>
  `;
  return send(lead.email, subject, text, html);
}

export async function sendWonOnboardingEmail(lead: LeadEmailShape & { projectName?: string; amount?: number }) {
  const projectName = lead.projectName || `your new website`;
  
  return sendWonEmail({
    to: lead.email,
    name: lead.name,
    businessName: lead.businessName,
    projectName,
    amount: lead.amount || 0,
  });
}

export async function sendLostNurtureEmail(lead: LeadEmailShape) {
  return sendLostNurtureEmailCore({
    to: lead.email,
    name: lead.name,
    businessName: lead.businessName,
  });
}

// Wrapper for the close emails module
export { sendWonEmail, sendLostNurtureEmail as sendLostEmail } from "./closeEmails";
