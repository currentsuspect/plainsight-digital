import { NextResponse } from "next/server";
import { processFollowUpQueue, getFollowUpSchedule } from "@/lib/followupScheduler";

/**
 * GET /api/admin/followup - Get follow-up schedule overview
 */
export async function GET() {
  try {
    const schedule = await getFollowUpSchedule();
    
    return NextResponse.json({
      schedule: {
        overdue: schedule.overdue.map(l => ({
          id: l.id,
          name: l.name,
          businessName: l.businessName,
          next_action_at: l.next_action_at,
          next_action_type: l.next_action_type,
          status: l.status,
          priority: l.overall_priority,
        })),
        upcoming24h: schedule.upcoming24h.map(l => ({
          id: l.id,
          name: l.name,
          businessName: l.businessName,
          next_action_at: l.next_action_at,
          next_action_type: l.next_action_type,
        })),
        upcoming7d: schedule.upcoming7d.map(l => ({
          id: l.id,
          name: l.name,
          businessName: l.businessName,
          next_action_at: l.next_action_at,
          next_action_type: l.next_action_type,
        })),
      },
      counts: {
        overdue: schedule.overdue.length,
        upcoming24h: schedule.upcoming24h.length,
        upcoming7d: schedule.upcoming7d.length,
      },
      autoFollowupEnabled: process.env.ENABLE_AUTO_FOLLOWUP === "true",
    });
  } catch (error) {
    console.error("Error fetching follow-up schedule:", error);
    return NextResponse.json({ error: "Failed to fetch follow-up schedule" }, { status: 500 });
  }
}

/**
 * POST /api/admin/followup - Process follow-up queue
 * Only sends emails if ENABLE_AUTO_FOLLOWUP=true
 */
export async function POST() {
  try {
    // Check for authorization (simple API key check)
    const apiKey = process.env.ADMIN_API_KEY;
    // Note: In production, you'd check Authorization header here

    const result = await processFollowUpQueue();

    return NextResponse.json({
      success: true,
      autoFollowupEnabled: result.autoFollowupEnabled,
      processed: result.processed,
      skipped: result.skipped.map(l => ({
        id: l.id,
        name: l.name,
        businessName: l.businessName,
        next_action_at: l.next_action_at,
        next_action_type: l.next_action_type,
      })),
      summary: {
        executed: result.processed.filter(r => r.executed).length,
        failed: result.processed.filter(r => !r.executed).length,
        skipped: result.skipped.length,
      },
    });
  } catch (error) {
    console.error("Error processing follow-up queue:", error);
    return NextResponse.json({ error: "Failed to process follow-up queue" }, { status: 500 });
  }
}
