// API Route: /api/admin/email-queue/process
// Process queued emails (can be called by cron job)

import { NextRequest, NextResponse } from "next/server";
import { processEmailQueue } from "@/lib/emailQueue";
import { reportError } from "@/lib/errorHandler";

// Secret for cron job authentication
const CRON_SECRET = process.env.CRON_SECRET;

export async function POST(request: NextRequest) {
  try {
    // Verify cron secret if configured
    if (CRON_SECRET) {
      const authHeader = request.headers.get("authorization");
      if (authHeader !== `Bearer ${CRON_SECRET}`) {
        return NextResponse.json(
          { error: "Unauthorized" },
          { status: 401 }
        );
      }
    }

    const result = await processEmailQueue(10);

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error) {
    reportError(
      error instanceof Error ? error : new Error(String(error)),
      "critical",
      { path: "/api/admin/email-queue/process" }
    );

    return NextResponse.json(
      { error: "Failed to process queue" },
      { status: 500 }
    );
  }
}
