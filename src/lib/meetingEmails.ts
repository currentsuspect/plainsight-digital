type MeetingEmailParams = {
  to: string;
  name: string;
  meetingTime: string;
  meetingUrl?: string;
  duration: string;
  isRescheduled?: boolean;
};

const apiKey = (process.env.RESEND_API_KEY || "").trim();
const from = (process.env.FOLLOWUP_FROM_EMAIL || "").trim();
const replyTo = (process.env.REPLY_TO_EMAIL || "").trim();

async function sendEmail(params: { to: string; subject: string; text: string; html: string }) {
  if (!apiKey || !from) {
    return { sent: false as const, reason: "missing_env:RESEND_API_KEY_or_FOLLOWUP_FROM_EMAIL" };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from,
      to: [params.to],
      ...(replyTo ? { reply_to: [replyTo] } : {}),
      subject: params.subject,
      text: params.text,
      html: params.html,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    return { sent: false as const, reason: `resend_error:${res.status}:${body}` };
  }

  return { sent: true as const };
}

export async function sendMeetingConfirmationEmail(params: MeetingEmailParams) {
  const { to, name, meetingTime, meetingUrl, duration, isRescheduled } = params;

  const meetingDate = new Date(meetingTime);
  const formattedDate = meetingDate.toLocaleDateString("en-KE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = meetingDate.toLocaleTimeString("en-KE", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Africa/Nairobi",
  });

  const subject = isRescheduled
    ? `✅ Meeting rescheduled — ${formattedDate} at ${formattedTime}`
    : `✅ Meeting confirmed — ${formattedDate} at ${formattedTime}`;

  const text = [
    `Hi ${name},`,
    "",
    isRescheduled
      ? "Your meeting with Plainsight Digital has been rescheduled."
      : "Your meeting with Plainsight Digital is confirmed!",
    "",
    `Date: ${formattedDate}`,
    `Time: ${formattedTime} (Kenya Time)`,
    `Duration: ${duration}`,
    "",
    meetingUrl
      ? `Join the call here: ${meetingUrl}`
      : "We'll send you the meeting link closer to the time.",
    "",
    "Come as you are — no prep needed. Bring questions if you have them.",
    "",
    "Best,",
    "Dylan Makori",
    "Plainsight Digital",
  ].join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111;max-width:600px">
      <p>Hi ${name},</p>
      <p>${isRescheduled ? "Your meeting has been rescheduled." : "Your meeting is confirmed!"}</p>
      <p><strong>Date:</strong> ${formattedDate}<br/>
      <strong>Time:</strong> ${formattedTime} (Kenya Time)<br/>
      <strong>Duration:</strong> ${duration}</p>
      ${meetingUrl ? `<p><a href="${meetingUrl}">Join the call</a></p>` : ""}
      <p>Come as you are — no prep needed.</p>
      <p>Best,<br/>Dylan Makori<br/>Plainsight Digital</p>
    </div>
  `;

  return sendEmail({ to, subject, text, html });
}

export async function sendMeetingReminderEmail(params: MeetingEmailParams) {
  const { to, name, meetingTime, meetingUrl, duration } = params;

  const meetingDate = new Date(meetingTime);
  const formattedDate = meetingDate.toLocaleDateString("en-KE", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  const formattedTime = meetingDate.toLocaleTimeString("en-KE", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Africa/Nairobi",
  });

  const subject = `⏰ Reminder: Meeting today at ${formattedTime}`;

  const text = [
    `Hi ${name},`,
    "",
    "Quick reminder — we're meeting today.",
    `Date: ${formattedDate}`,
    `Time: ${formattedTime} (Kenya Time)`,
    `Duration: ${duration}`,
    "",
    meetingUrl ? `Join here: ${meetingUrl}` : "See your confirmation email for the meeting link.",
    "",
    "See you soon!",
    "Dylan",
  ].join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111;max-width:600px">
      <p>Hi ${name},</p>
      <p><strong>Reminder:</strong> we're meeting today.</p>
      <p><strong>Date:</strong> ${formattedDate}<br/>
      <strong>Time:</strong> ${formattedTime} (Kenya Time)<br/>
      <strong>Duration:</strong> ${duration}</p>
      ${meetingUrl ? `<p><a href="${meetingUrl}">Join now</a></p>` : ""}
      <p>See you soon!<br/>Dylan</p>
    </div>
  `;

  return sendEmail({ to, subject, text, html });
}
