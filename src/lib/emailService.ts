// Unified Email Service
// All emails go through Resend for consistency and deliverability

import { config } from "./config";

export type EmailResult = 
  | { sent: true; id?: string }
  | { sent: false; reason: string };

interface SendEmailParams {
  to: string;
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
}

/**
 * Send email via Resend API
 * All outbound emails use this single path for consistency
 */
export async function sendEmail({
  to,
  subject,
  text,
  html,
  replyTo,
}: SendEmailParams): Promise<EmailResult> {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.resendApiKey}`,
      },
      body: JSON.stringify({
        from: config.fromEmail,
        to: [to],
        ...(replyTo || config.replyToEmail ? { reply_to: [replyTo || config.replyToEmail!] } : {}),
        subject,
        text,
        ...(html ? { html } : {}),
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      return { sent: false, reason: `resend_error:${res.status}:${body}` };
    }

    const data = await res.json();
    return { sent: true, id: data.id };
  } catch (error) {
    return { sent: false, reason: `exception:${String(error)}` };
  }
}

/**
 * Send cold email (outbound sales)
 * Uses same Resend path but with specific tracking
 */
export async function sendColdEmail({
  to,
  subject,
  body,
}: {
  to: string;
  subject: string;
  body: string;
}): Promise<EmailResult> {
  // Cold emails are plain text for authenticity
  return sendEmail({
    to,
    subject,
    text: body,
  });
}

/**
 * Send transactional email (follow-ups, confirmations)
 */
export async function sendTransactional({
  to,
  subject,
  text,
  html,
}: {
  to: string;
  subject: string;
  text: string;
  html?: string;
}): Promise<EmailResult> {
  return sendEmail({
    to,
    subject,
    text,
    html,
  });
}
