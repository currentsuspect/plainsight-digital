import { getLeadsRequiringFollowUp, Lead, NextActionType } from "./store";
import { sendLeadFollowupEmail } from "./followup";

// Env flag to enable automatic follow-up emails
const ENABLE_AUTO_FOLLOWUP = process.env.ENABLE_AUTO_FOLLOWUP === "true";

export type FollowUpResult = {
  leadId: string;
  leadName: string;
  actionType: NextActionType;
  executed: boolean;
  error?: string;
};

/**
 * Process leads that are due for follow-up.
 * This function is non-destructive - it only sends emails if ENABLE_AUTO_FOLLOWUP is true.
 * Otherwise, it returns the leads that need follow-up for manual processing.
 */
export async function processFollowUpQueue(): Promise<{
  processed: FollowUpResult[];
  skipped: Lead[];
  autoFollowupEnabled: boolean;
}> {
  const leadsRequiringFollowUp = await getLeadsRequiringFollowUp();
  const processed: FollowUpResult[] = [];
  const skipped: Lead[] = [];

  // If auto-followup is disabled, return leads for manual review
  if (!ENABLE_AUTO_FOLLOWUP) {
    return {
      processed: [],
      skipped: leadsRequiringFollowUp,
      autoFollowupEnabled: false,
    };
  }

  // Process each lead
  for (const lead of leadsRequiringFollowUp) {
    const result: FollowUpResult = {
      leadId: lead.id,
      leadName: lead.name,
      actionType: lead.next_action_type || "email",
      executed: false,
    };

    try {
      // Only send email for email or followup action types
      if (lead.next_action_type === "email" || lead.next_action_type === "followup") {
        const emailResult = await sendLeadFollowupEmail(lead);
        if (emailResult.sent) {
          result.executed = true;
        } else {
          result.error = emailResult.reason;
        }
      } else {
        // For other action types (call, whatsapp, proposal_review), mark as skipped
        result.executed = false;
        result.error = `Action type '${lead.next_action_type}' requires manual intervention`;
      }
    } catch (error) {
      result.error = error instanceof Error ? error.message : "Unknown error";
    }

    processed.push(result);
  }

  return {
    processed,
    skipped: [],
    autoFollowupEnabled: true,
  };
}

/**
 * Get follow-up schedule for display purposes
 */
export async function getFollowUpSchedule(): Promise<{
  overdue: Lead[];
  upcoming24h: Lead[];
  upcoming7d: Lead[];
}> {
  const leads = await getLeadsRequiringFollowUp();
  const now = new Date();
  const in24h = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const in7d = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  // Get all leads with next_action_at
  const { listLeads } = await import("./store");
  const allLeads = await listLeads();

  return {
    overdue: leads,
    upcoming24h: allLeads.filter(l => {
      if (!l.next_action_at) return false;
      const date = new Date(l.next_action_at);
      return date > now && date <= in24h;
    }),
    upcoming7d: allLeads.filter(l => {
      if (!l.next_action_at) return false;
      const date = new Date(l.next_action_at);
      return date > in24h && date <= in7d;
    }),
  };
}

/**
 * Calculate recommended next action based on lead state
 */
export function recommendNextAction(lead: Lead): {
  action: NextActionType;
  reason: string;
  priority: "high" | "medium" | "low";
} {
  const status = lead.status || "New";
  const priority = lead.overall_priority || "Cold";
  const hasPhone = Boolean(lead.phone);
  const daysSinceCreated = Math.floor(
    (Date.now() - new Date(lead.createdAt).getTime()) / (1000 * 60 * 60 * 24)
  );

  // New leads - high priority follow-up
  if (status === "New") {
    if (priority === "Hot") {
      return {
        action: hasPhone ? "call" : "email",
        reason: "Hot lead requires immediate attention",
        priority: "high",
      };
    }
    return {
      action: hasPhone ? "whatsapp" : "email",
      reason: "New lead needs initial outreach",
      priority: priority === "Warm" ? "high" : "medium",
    };
  }

  // Contacted - follow up if no response
  if (status === "Contacted") {
    if (daysSinceCreated > 3) {
      return {
        action: hasPhone ? "whatsapp" : "followup",
        reason: "No response after 3+ days, try alternative channel",
        priority: "high",
      };
    }
    return {
      action: "followup",
      reason: "Follow up on initial contact",
      priority: "medium",
    };
  }

  // Audit Sent - check for response
  if (status === "Audit Sent") {
    if (daysSinceCreated > 5) {
      return {
        action: hasPhone ? "call" : "followup",
        reason: "Audit sent 5+ days ago, follow up for feedback",
        priority: "high",
      };
    }
    return {
      action: "followup",
      reason: "Waiting for audit feedback",
      priority: "medium",
    };
  }

  // Proposal - close the deal
  if (status === "Proposal") {
    if (daysSinceCreated > 7) {
      return {
        action: "proposal_review",
        reason: "Proposal pending 7+ days, schedule review call",
        priority: "high",
      };
    }
    return {
      action: "proposal_review",
      reason: "Follow up on proposal",
      priority: "medium",
    };
  }

  // Won/Lost - no action needed
  return {
    action: "none",
    reason: "Lead is closed",
    priority: "low",
  };
}
