import { Resend } from "resend";
import { Lead } from "./store";
import { PAYMENT_FULL_TEXT } from "./paymentConfig";

const resendApiKey = (process.env.RESEND_API_KEY || "").trim();
const resend = resendApiKey ? new Resend(resendApiKey) : null;
const from = process.env.FOLLOWUP_FROM_EMAIL || "Dylan <dylan@plainsight.digital>";

type WonEmailParams = {
  to: string;
  name: string;
  businessName: string;
  projectName: string;
  amount: number;
  nextSteps?: string[];
};

/**
 * Send celebration + onboarding email when lead becomes Won
 */
export async function sendWonEmail(params: WonEmailParams) {
  const { to, name, businessName, projectName, amount, nextSteps } = params;

  if (!resend) {
    return { sent: false as const, reason: "missing_resend_api_key" };
  }

  const subject = `🎉 Let's get started on ${projectName}!`;

  const defaultNextSteps = [
    "Share any brand assets (logo, colors, fonts)",
    "Send content/copy you want on the site",
    "Let me know any must-have features",
    "We'll schedule a kickoff call to align on timeline",
  ];

  const steps = nextSteps || defaultNextSteps;
  const stepsList = steps.map((s) => `• ${s}`).join("\n");
  const stepsListHtml = steps.map((s) => `<li style="margin: 8px 0;">${s}</li>`).join("");

  const text = [
    `Hi ${name},`,
    "",
    `🎉 Excited to work with you on ${projectName}!`,
    "",
    `Thank you for trusting Plainsight Digital with your online presence. We're going to build something great together.`,
    "",
    "**Next steps to get started:**",
    stepsList,
    "",
    "I'll reach out within 24 hours to schedule our kickoff call.",
    "",
    "In the meantime, if you have any questions, just reply to this email.",
    `Payment: ${PAYMENT_FULL_TEXT}`, 
    "",
    "Let's build! 🚀",
    "",
    "Best,",
    "Dylan Makori",
    "Plainsight Digital",
  ].join("\n");

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111; max-width: 600px;">
      <p>Hi ${name},</p>
      
      <p style="font-size: 24px;">🎉 <strong>Let's get started on ${projectName}!</strong></p>
      
      <p>Thank you for trusting <strong>Plainsight Digital</strong> with your online presence. We're going to build something great together.</p>
      
      <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <div style="font-weight: bold; margin-bottom: 12px;">📋 Next steps to get started:</div>
        <ul style="margin: 0; padding-left: 20px;">
          ${stepsListHtml}
        </ul>
      </div>
      
      <p>I'll reach out within <strong>24 hours</strong> to schedule our kickoff call.</p>
      
      <p style="color: #666;">In the meantime, if you have any questions, just reply to this email.</p>
      
      <p style="font-size: 18px; margin-top: 24px;">Let's build! 🚀</p>
      
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

    console.log(`[Won Email] Sent to ${to}`, response);
    return { sent: true as const, id: response.data?.id };
  } catch (error) {
    console.error(`[Won Email] Failed to send to ${to}:`, error);
    return { sent: false as const, reason: String(error) };
  }
}

type LostEmailParams = {
  to: string;
  name: string;
  businessName: string;
  reason?: string;
  reengageDays?: number;
};

/**
 * Send nurture email for lost leads (for future re-engagement)
 */
export async function sendLostNurtureEmail(params: LostEmailParams) {
  const { to, name, businessName, reason } = params;

  if (!resend) {
    return { sent: false as const, reason: "missing_resend_api_key" };
  }

  const subject = `Still thinking about ${businessName}'s online presence?`;

  const text = [
    `Hi ${name},`,
    "",
    `I wanted to circle back and see how things are going at ${businessName}.`,
    "",
    "We weren't the right fit at the time, but I know how fast things change in business. If you're ever looking to level up your online presence, I'm still here.",
    "",
    "A few things that might be useful in the meantime:",
    "",
    "• Free website audit — just reply and I'll send one over",
    "• Quick chat to explore options — https://cal.com/plainsightdigital/30min",
    "",
    "No pressure. Just wanted to keep the door open.",
    "",
    "Wishing you and the team all the best.",
    "",
    "Best,",
    "Dylan Makori",
    "Plainsight Digital",
  ].join("\n");

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111; max-width: 600px;">
      <p>Hi ${name},</p>
      
      <p>I wanted to circle back and see how things are going at <strong>${businessName}</strong>.</p>
      
      <p>We weren't the right fit at the time, but I know how fast things change in business. If you're ever looking to level up your online presence, I'm still here.</p>
      
      <p style="margin: 24px 0;">A few things that might be useful in the meantime:</p>
      
      <ul style="margin: 0; padding-left: 20px;">
        <li style="margin: 8px 0;"><strong>Free website audit</strong> — just reply and I'll send one over</li>
        <li style="margin: 8px 0;"><strong>Quick chat to explore options</strong> — <a href="https://cal.com/plainsightdigital/30min" style="color: #f59e0b;">book a call</a></li>
      </ul>
      
      <p style="color: #888; font-style: italic; margin-top: 24px;">No pressure. Just wanted to keep the door open.</p>
      
      <p>Wishing you and the team all the best.</p>
      
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

    console.log(`[Lost Nurture Email] Sent to ${to}`, response);
    return { sent: true as const, id: response.data?.id };
  } catch (error) {
    console.error(`[Lost Nurture Email] Failed to send to ${to}:`, error);
    return { sent: false as const, reason: String(error) };
  }
}

/**
 * Schedule a re-engagement task for a lost lead
 * Returns the date when the lead should be re-contacted
 */
export function scheduleLostReengagement(lead: Lead): Date {
  // Schedule re-engagement for 90 days from now
  const reengageDate = new Date();
  reengageDate.setDate(reengageDate.getDate() + 90);
  return reengageDate;
}
