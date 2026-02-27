// API Route: /api/admin/cold-email/send
// Send cold emails from admin

import { NextRequest, NextResponse } from "next/server";
import { listTargets, updateTarget, addHistory } from "@/lib/coldEmailStore";
import { promises as fs } from "fs";
import path from "path";

const CONFIG_FILE = path.join(process.cwd(), ".openclaw/credentials/smtp-config.json");

// Load SMTP config
async function loadSmtpConfig() {
  try {
    const data = await fs.readFile(CONFIG_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return null;
  }
}

// Send email via SMTP
async function sendEmailSmtp({
  to,
  subject,
  body,
  fromEmail,
  password,
}: {
  to: string;
  subject: string;
  body: string;
  fromEmail: string;
  password: string;
}) {
  // Dynamic import to avoid bundling issues
  const { createTransport } = await import("nodemailer");
  
  const transporter = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: fromEmail,
      pass: password,
    },
  });

  const info = await transporter.sendMail({
    from: `"Dylan Makori" <${fromEmail}>`,
    to,
    subject,
    text: body,
  });

  return info;
}

// POST — Send email
export async function POST(request: NextRequest) {
  try {
    const { targetId, subject, body } = await request.json();
    
    // Load config
    const config = await loadSmtpConfig();
    if (!config) {
      return NextResponse.json(
        { error: "SMTP not configured. Run setup script first." },
        { status: 400 }
      );
    }

    // Get target
    const targets = await listTargets();
    const target = targets.find((t) => t.id === targetId);
    if (!target) {
      return NextResponse.json(
        { error: "Target not found" },
        { status: 404 }
      );
    }

    // Send email
    try {
      await sendEmailSmtp({
        to: target.email,
        subject,
        body,
        fromEmail: config.email,
        password: config.password,
      });

      // Update target status
      await updateTarget(targetId, {
        status: "sent",
        lastContactedAt: new Date().toISOString(),
      });

      // Add to history
      await addHistory({
        targetId,
        to: target.email,
        subject,
        sentAt: new Date().toISOString(),
        status: "sent",
      });

      return NextResponse.json({ success: true, message: "Email sent" });
    } catch (error: any) {
      // Add failed attempt to history
      await addHistory({
        targetId,
        to: target.email,
        subject,
        sentAt: new Date().toISOString(),
        status: "failed",
        error: error.message,
      });

      return NextResponse.json(
        { error: `Failed to send: ${error.message}` },
        { status: 500 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: `Request failed: ${error.message}` },
      { status: 500 }
    );
  }
}
