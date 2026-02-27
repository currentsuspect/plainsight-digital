// Email Queue Processor
// Background job for sending queued emails with retries

import { sendEmail } from "./emailService";
import { queries } from "./db";
import { reportError } from "./errorHandler";

interface QueueResult {
  processed: number;
  succeeded: number;
  failed: number;
}

/**
 * Process pending emails from the queue
 */
export async function processEmailQueue(batchSize = 10): Promise<QueueResult> {
  const result: QueueResult = {
    processed: 0,
    succeeded: 0,
    failed: 0,
  };

  try {
    // Get pending emails
    const pending = await queries.emailQueue.pending(batchSize);

    for (const email of pending) {
      result.processed++;

      try {
        // Mark as processing
        await queries.emailQueue.markProcessing(email.id);

        // Attempt to send
        const sendResult = await sendEmail({
          to: email.to_email,
          subject: email.subject,
          text: email.body,
        });

        if (sendResult.sent) {
          await queries.emailQueue.markSent(email.id);
          result.succeeded++;
        } else {
          // Check if we should retry
          if (email.attempts + 1 >= email.max_attempts) {
            await queries.emailQueue.markFailed(email.id, sendResult.reason);
            result.failed++;
          }
          // Otherwise leave as pending for next run
        }
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : String(error);
        
        if (email.attempts + 1 >= email.max_attempts) {
          await queries.emailQueue.markFailed(email.id, errorMsg);
          result.failed++;
        }

        reportError(error instanceof Error ? error : new Error(errorMsg), "error", {
          metadata: { emailId: email.id, attempts: email.attempts },
        });
      }
    }
  } catch (error) {
    reportError(error instanceof Error ? error : new Error(String(error)), "critical");
  }

  return result;
}

/**
 * Schedule an email for later sending
 */
export async function queueEmail({
  to,
  subject,
  body,
  scheduledFor,
  maxAttempts = 3,
}: {
  to: string;
  subject: string;
  body: string;
  scheduledFor?: Date;
  maxAttempts?: number;
}) {
  return queries.emailQueue.create({
    to_email: to,
    subject,
    body,
    scheduled_for: (scheduledFor || new Date()).toISOString(),
    max_attempts: maxAttempts,
    attempts: 0,
    status: "pending",
  });
}

/**
 * Get queue statistics
 */
export async function getQueueStats() {
  // This would need raw SQL or additional query methods
  // For now, return basic info
  const pending = await queries.emailQueue.pending(1000);
  
  return {
    pending: pending.length,
    processing: 0, // Would need additional query
    sent: 0, // Would need additional query
    failed: 0, // Would need additional query
  };
}
