// API Route: /api/admin/cold-email/send
// Send cold emails using Resend (unified email service)

import { NextRequest, NextResponse } from "next/server";
import { listTargets, updateTarget, addHistory } from "@/lib/coldEmailStore";
import { sendColdEmail } from "@/lib/emailService";

// POST — Send email via Resend
export async function POST(request: NextRequest) {
  try {
    const { targetId, subject, body } = await request.json();

    // Get target
    const targets = await listTargets();
    const target = targets.find((t) => t.id === targetId);
    if (!target) {
      return NextResponse.json(
        { error: "Target not found" },
        { status: 404 }
      );
    }

    // Send via Resend
    const result = await sendColdEmail({
      to: target.email,
      subject,
      body,
    });

    if (!result.sent) {
      // Log failure
      await addHistory({
        targetId,
        to: target.email,
        subject,
        sentAt: new Date().toISOString(),
        status: "failed",
        error: result.reason,
      });

      return NextResponse.json(
        { error: `Failed to send: ${result.reason}` },
        { status: 500 }
      );
    }

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
    return NextResponse.json(
      { error: `Request failed: ${error.message}` },
      { status: 500 }
    );
  }
}
