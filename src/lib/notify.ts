import { Lead } from "@/lib/store";

async function sendTelegramMessage(text: string) {
  const token = (process.env.TELEGRAM_BOT_TOKEN || "").trim();
  const chatId = (process.env.TELEGRAM_LEADS_CHAT_ID || "").trim();

  if (!token || !chatId) return { sent: false, reason: "missing_env" as const };

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      disable_web_page_preview: true,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    return { sent: false, reason: `telegram_error:${res.status}:${body}` as const };
  }

  return { sent: true as const };
}

export async function notifyTelegramLead(lead: Lead) {
  const text = [
    "🔥 New PlainSight lead",
    `• Name: ${lead.name}`,
    `• Business: ${lead.businessName}`,
    `• Email: ${lead.email}`,
    `• Phone: ${lead.phone || "—"}`,
    `• Website: ${lead.website || "—"}`,
    `• Niche: ${lead.niche}`,
    `• Budget: ${lead.budget}`,
    `• Pain point: ${lead.painPoint}`,
    `• Time: ${new Date(lead.createdAt).toLocaleString("en-GB", { timeZone: "UTC" })} UTC`,
  ].join("\n");

  return sendTelegramMessage(text);
}

export async function notifyTelegramFollowupStatus(lead: Lead, followup: { sent: boolean; reason?: string }) {
  const text = followup.sent
    ? `✅ Follow-up sent\n• Lead: ${lead.name} (${lead.businessName})\n• Email: ${lead.email}`
    : `⚠️ Follow-up NOT sent\n• Lead: ${lead.name} (${lead.businessName})\n• Reason: ${followup.reason || "unknown"}`;

  return sendTelegramMessage(text);
}

export async function notifyTelegramInvoiceStatus(payload: {
  invoiceNumber: string;
  client: string;
  status: "draft" | "sent" | "paid";
  dueDate?: string;
  amount: number;
}) {
  const text = [
    "🧾 Invoice updated",
    `• Invoice: ${payload.invoiceNumber}`,
    `• Client: ${payload.client}`,
    `• Status: ${payload.status}`,
    `• Amount: KES ${payload.amount.toLocaleString()}`,
    `• Due: ${payload.dueDate || "—"}`,
  ].join("\n");

  return sendTelegramMessage(text);
}
