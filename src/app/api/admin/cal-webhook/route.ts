import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import { addMeeting, getMeetingByCalUid, updateMeeting, MeetingEntry } from "@/lib/opsStore";
import { listLeads, updateLeadStatus } from "@/lib/store";
import { sendMeetingConfirmationEmail, sendMeetingReminderEmail } from "@/lib/meetingEmails";

/**
 * Cal.com Webhook Endpoint
 * 
 * Set up in Cal.com: Settings → Webhooks → Add endpoint
 * URL: https://yourdomain.com/api/admin/cal-webhook
 * Events: BOOKING_CREATED, BOOKING_RESCHEDULED, BOOKING_CANCELLED
 * 
 * Required env vars:
 * - CAL_WEBHOOK_SECRET (for verification)
 * - RESEND_API_KEY (for emails)
 * - FOLLOWUP_FROM_EMAIL (sender email)
 */

function normalizeSignature(raw: string): string {
  // Accept either plain hex or prefixed values like "sha256=<hex>"
  const value = raw.trim();
  if (!value) return "";
  if (value.includes("=")) {
    const parts = value.split("=");
    return (parts[1] || "").trim();
  }
  return value;
}

function timingSafeHexEqual(aHex: string, bHex: string): boolean {
  if (!aHex || !bHex) return false;
  const a = Buffer.from(aHex, "hex");
  const b = Buffer.from(bHex, "hex");
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

function verifyCalSignature(payload: string, signature: string, secret: string): boolean {
  const incoming = normalizeSignature(signature);
  if (!incoming || !secret) return false;

  const expected = crypto.createHmac("sha256", secret).update(payload, "utf8").digest("hex");
  return timingSafeHexEqual(incoming, expected);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature =
      request.headers.get("x-cal-signature-256") ||
      request.headers.get("cal-signature-256") ||
      "";
    const secret = (process.env.CAL_WEBHOOK_SECRET || "").trim();

    // Strict verification when secret is configured
    if (secret && !verifyCalSignature(body, signature, secret)) {
      return NextResponse.json({ error: "Invalid webhook signature" }, { status: 401 });
    }

    const payload = JSON.parse(body);
    const triggerEvent = payload.triggerEvent;

    console.log(`[Cal.com] Received webhook: ${triggerEvent}`);

    // Handle different events
    switch (triggerEvent) {
      case "BOOKING_CREATED":
        return await handleBookingCreated(payload);
      case "BOOKING_RESCHEDULED":
        return await handleBookingRescheduled(payload);
      case "BOOKING_CANCELLED":
        return await handleBookingCancelled(payload);
      default:
        console.log(`[Cal.com] Unhandled event: ${triggerEvent}`);
        return NextResponse.json({ received: true, event: triggerEvent });
    }
  } catch (error) {
    console.error("[Cal.com] Webhook error:", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}

async function handleBookingCreated(payload: Record<string, unknown>) {
  const booking = payload.payload as Record<string, unknown>;
  const calUid = String(booking.uid || "");
  const title = String(booking.title || "Meeting with Plainsight Digital");
  const startTime = String(booking.startTime || "");
  
  // Get attendee info
  const attendees = (booking.attendees as Array<Record<string, unknown>>) || [];
  const primaryAttendee = attendees[0] || {};
  const attendeeName = String(primaryAttendee.name || "Guest");
  const attendeeEmail = String(primaryAttendee.email || "");
  const attendeePhone = String(primaryAttendee.phone || primaryAttendee.phoneNumber || "");

  // Get meeting URL from Cal.com response
  const location = booking.location as Record<string, unknown> || {};
  const meetingUrl = String(location.creamUrl || location.meetingUrl || "");

  // Check if meeting already exists
  const existing = await getMeetingByCalUid(calUid);
  if (existing) {
    return NextResponse.json({ received: true, message: "Meeting already exists" });
  }

  // Try to match to a lead by email
  const leads = await listLeads();
  const matchedLead = leads.find(l => l.email.toLowerCase() === attendeeEmail.toLowerCase());
  const leadId = matchedLead?.id;

  // Create meeting entry
  const meeting: Omit<MeetingEntry, "id" | "createdAt"> = {
    calUid,
    calBookingId: String(booking.id || ""),
    title: `${title} - ${attendeeName}`,
    when: startTime,
    owner: "Dylan",
    status: "scheduled",
    attendeeName,
    attendeeEmail,
    attendeePhone,
    leadId,
    meetingUrl,
    confirmationSent: false,
    reminderSent: false,
    note: leadId ? `Matched to lead: ${matchedLead?.businessName}` : undefined,
  };

  const created = await addMeeting(meeting);

  // Send confirmation email
  if (attendeeEmail) {
    const emailResult = await sendMeetingConfirmationEmail({
      to: attendeeEmail,
      name: attendeeName,
      meetingTime: startTime,
      meetingUrl,
      duration: "30 minutes",
    });
    
    if (emailResult.sent) {
      await updateMeeting(created.id, { confirmationSent: true });
      console.log(`[Cal.com] Confirmation email sent to ${attendeeEmail}`);
    }
  }

  // Update lead status to "Contacted" if matched
  if (matchedLead && matchedLead.status === "New") {
    await updateLeadStatus(leadId!, "Contacted");
    console.log(`[Cal.com] Lead ${leadId} status updated to Contacted`);
  }

  return NextResponse.json({
    received: true,
    meeting: {
      id: created.id,
      title: created.title,
      when: created.when,
      attendee: attendeeEmail,
      leadId,
    },
  });
}

async function handleBookingRescheduled(payload: Record<string, unknown>) {
  const booking = payload.payload as Record<string, unknown>;
  const calUid = String(booking.uid || "");
  const startTime = String(booking.startTime || "");

  const existing = await getMeetingByCalUid(calUid);
  if (!existing) {
    // Treat as new booking if not found
    return await handleBookingCreated(payload);
  }

  // Update meeting time
  await updateMeeting(existing.id, {
    when: startTime,
    status: "scheduled",
    reminderSent: false,
  });

  // Send updated confirmation
  const attendees = (booking.attendees as Array<Record<string, unknown>>) || [];
  const attendee = attendees[0] || {};
  
  if (attendee.email) {
    await sendMeetingConfirmationEmail({
      to: String(attendee.email),
      name: String(attendee.name || "Guest"),
      meetingTime: startTime,
      meetingUrl: existing.meetingUrl,
      duration: "30 minutes",
      isRescheduled: true,
    });
  }

  return NextResponse.json({ received: true, updated: true });
}

async function handleBookingCancelled(payload: Record<string, unknown>) {
  const booking = payload.payload as Record<string, unknown>;
  const calUid = String(booking.uid || "");

  const existing = await getMeetingByCalUid(calUid);
  if (!existing) {
    return NextResponse.json({ received: true, message: "Meeting not found" });
  }

  // Update status to cancelled
  await updateMeeting(existing.id, { status: "cancelled" });

  console.log(`[Cal.com] Meeting ${calUid} cancelled`);

  return NextResponse.json({ received: true, cancelled: true });
}

// GET endpoint for cron to send reminders
export async function GET(request: NextRequest) {
  const authKey = request.nextUrl.searchParams.get("key");
  const cronSecret = process.env.CRON_SECRET || "";
  
  if (cronSecret && authKey !== cronSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // This endpoint can be called by a cron job to send reminders
  // for meetings happening in the next 24 hours
  const { listMeetings } = await import("@/lib/opsStore");
  const meetings = await listMeetings();
  const now = new Date();
  const in24h = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  const upcomingMeetings = meetings.filter(m => {
    if (m.status !== "scheduled" || m.reminderSent) return false;
    const meetingTime = new Date(m.when);
    return meetingTime > now && meetingTime <= in24h;
  });

  let sent = 0;
  for (const meeting of upcomingMeetings) {
    if (!meeting.attendeeEmail) continue;
    
    const result = await sendMeetingReminderEmail({
      to: meeting.attendeeEmail,
      name: meeting.attendeeName || "Guest",
      meetingTime: meeting.when,
      meetingUrl: meeting.meetingUrl,
      duration: "30 minutes",
    });

    if (result.sent) {
      await updateMeeting(meeting.id, { reminderSent: true });
      sent++;
    }
  }

  return NextResponse.json({
    checked: upcomingMeetings.length,
    remindersSent: sent,
  });
}
