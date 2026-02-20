import { Lead } from "@/lib/store";

export async function sendLeadFollowupEmail(lead: Lead) {
  const apiKey = (process.env.RESEND_API_KEY || "").trim();
  const from = (process.env.FOLLOWUP_FROM_EMAIL || "").trim();
  const bookingLink = (process.env.BOOKING_LINK || "https://cal.com/plainsight").trim();
  const whatsappLink = "https://wa.me/254750192512?text=Hi%20PlainSight%20Digital%2C%20I%20just%20submitted%20a%20request%20and%20want%20to%20book%20a%20call.";

  if (!apiKey || !from) {
    return { sent: false as const, reason: "missing_env:RESEND_API_KEY_or_FOLLOWUP_FROM_EMAIL" };
  }

  const subject = `We got your request, ${lead.name} — next steps`;
  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.5;color:#111">
      <p>Hi ${lead.name},</p>
      <p>Thanks for reaching out to <strong>PlainSight Digital</strong>. We received your request and we'll review your site/business context immediately.</p>
      <p>Want to move faster? Pick a time here:</p>
      <p><a href="${bookingLink}" style="display:inline-block;padding:10px 14px;background:#06b6d4;color:#fff;text-decoration:none;border-radius:8px;">Book a quick strategy call</a></p>
      <p>If booking is inconvenient, just reply to this email or message us on WhatsApp:</p>
      <p><a href="${whatsappLink}">${whatsappLink}</a></p>
      <p>— PlainSight Digital</p>
    </div>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from,
      to: [lead.email],
      subject,
      html,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    return { sent: false as const, reason: `resend_error:${res.status}:${body}` };
  }

  return { sent: true as const };
}
