import { Lead } from "@/lib/store";

export async function sendLeadFollowupEmail(lead: Lead) {
  const apiKey = (process.env.RESEND_API_KEY || "").trim();
  const from = (process.env.FOLLOWUP_FROM_EMAIL || "").trim();
  const replyTo = (process.env.REPLY_TO_EMAIL || "").trim();

  if (!apiKey || !from) {
    return { sent: false as const, reason: "missing_env:RESEND_API_KEY_or_FOLLOWUP_FROM_EMAIL" };
  }

  const subject = `Thanks ${lead.name} — we received your request`;
  const text = [
    `Hi ${lead.name},`,
    "",
    "Thanks for reaching out to Plainsight Digital.",
    "",
    "We received your request and we’re reviewing your business context now.",
    "",
    "If you want to speed things up, just reply with:",
    "- your current website (if any)",
    "- your main goal for the next 30 days",
    "- and your preferred time for a quick call",
    "",
    "If WhatsApp is easier, reply and we’ll continue there.",
    "",
    "Best,",
    "Dylan",
    "Plainsight Digital",
  ].join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.5;color:#111">
      <p>Hi ${lead.name},</p>
      <p>Thanks for reaching out to <strong>Plainsight Digital</strong>.</p>
      <p>We received your request and we’re reviewing your business context now.</p>
      <p>If you want to speed things up, just reply with:</p>
      <p>- your current website (if any)<br/>- your main goal for the next 30 days<br/>- and your preferred time for a quick call</p>
      <p>If WhatsApp is easier, reply and we’ll continue there.</p>
      <p>Best,<br/>Dylan<br/>Plainsight Digital</p>
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
      ...(replyTo ? { reply_to: [replyTo] } : {}),
      subject,
      text,
      html,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    return { sent: false as const, reason: `resend_error:${res.status}:${body}` };
  }

  return { sent: true as const };
}
