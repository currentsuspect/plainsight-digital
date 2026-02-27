// Zod schemas for runtime validation
// Single source of truth for all data shapes

import { z } from "zod";

// ============================================
// Lead Schemas
// ============================================

export const LeadStatusSchema = z.enum([
  "New",
  "Contacted",
  "Audit Sent",
  "Proposal",
  "Won",
  "Lost",
]);

export const SourceConfidenceSchema = z.enum([
  "high",
  "medium",
  "low",
  "unknown",
]);

export const NextActionTypeSchema = z.enum([
  "call",
  "email",
  "whatsapp",
  "followup",
  "proposal_review",
  "none",
]);

export const NicheSchema = z.enum([
  "clinic",
  "law",
  "school",
  "hotel",
  "logistics",
]);

export const BudgetSchema = z.enum([
  "<50k",
  "50k-100k",
  "100k-250k",
  "250k+",
]);

export const LeadSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.string().datetime(),
  name: z.string().min(1),
  businessName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  website: z.string().url().optional(),
  niche: NicheSchema,
  budget: BudgetSchema,
  painPoint: z.string().min(1),
  source: z.string().optional(),
  status: LeadStatusSchema,
  updatedAt: z.string().datetime().optional(),
  // Lead scoring
  source_confidence: SourceConfidenceSchema.optional(),
  intent_score: z.number().int().min(0).max(100).optional(),
  fit_score: z.number().int().min(0).max(100).optional(),
  overall_priority: z.enum(["Hot", "Warm", "Cold"]).optional(),
  // Follow-up
  next_action_at: z.string().datetime().nullable().optional(),
  next_action_type: NextActionTypeSchema.optional(),
  // Win/loss
  loss_reason: z.string().optional(),
  won_value: z.number().int().optional(),
  lost_at: z.string().datetime().optional(),
  reengage_at: z.string().datetime().optional(),
  nurture_email_sent: z.boolean().optional(),
});

export type Lead = z.infer<typeof LeadSchema>;

// ============================================
// Event Schemas
// ============================================

export const SiteEventSchema = z.object({
  id: z.string().uuid(),
  type: z.enum(["page_view", "cta_click", "form_start", "form_submit"]),
  page: z.string(),
  createdAt: z.string().datetime(),
  meta: z.record(z.string(), z.string()).optional(),
});

export type SiteEvent = z.infer<typeof SiteEventSchema>;

// ============================================
// Cold Email Schemas
// ============================================

export const IndustrySchema = z.enum(["clinic", "law", "school", "other"]);

export const ColdEmailStatusSchema = z.enum([
  "pending",
  "sent",
  "replied",
  "meeting",
  "closed",
]);

export const ColdEmailTargetSchema = z.object({
  id: z.string().uuid(),
  company: z.string().min(1),
  name: z.string().min(1),
  email: z.string().email(),
  industry: IndustrySchema,
  website: z.string().url().optional(),
  status: ColdEmailStatusSchema,
  notes: z.string().optional(),
  createdAt: z.string().datetime(),
  lastContactedAt: z.string().datetime().optional(),
});

export type ColdEmailTarget = z.infer<typeof ColdEmailTargetSchema>;

export const SendHistorySchema = z.object({
  id: z.string().uuid(),
  targetId: z.string().uuid(),
  to: z.string().email(),
  subject: z.string(),
  sentAt: z.string().datetime(),
  status: z.enum(["sent", "failed"]),
  error: z.string().optional(),
});

export type SendHistory = z.infer<typeof SendHistorySchema>;

// ============================================
// Finance Schemas
// ============================================

export const FinanceEntrySchema = z.object({
  id: z.string().uuid(),
  createdAt: z.string().datetime(),
  type: z.enum(["income", "expense"]),
  amount: z.number().positive(),
  category: z.string().min(1),
  note: z.string(),
});

export type FinanceEntry = z.infer<typeof FinanceEntrySchema>;

// ============================================
// Meeting Schemas
// ============================================

export const MeetingStatusSchema = z.enum([
  "scheduled",
  "completed",
  "cancelled",
  "no_show",
]);

export const MeetingEntrySchema = z.object({
  id: z.string().uuid(),
  createdAt: z.string().datetime(),
  title: z.string().min(1),
  when: z.string().datetime(),
  owner: z.string(),
  note: z.string().optional(),
  calUid: z.string().optional(),
  calBookingId: z.string().optional(),
  calEventTypeId: z.number().optional(),
  status: MeetingStatusSchema.optional(),
  attendeeName: z.string().optional(),
  attendeeEmail: z.string().email().optional(),
  attendeePhone: z.string().optional(),
  leadId: z.string().uuid().optional(),
  meetingUrl: z.string().url().optional(),
  confirmationSent: z.boolean().optional(),
  reminderSent: z.boolean().optional(),
});

export type MeetingEntry = z.infer<typeof MeetingEntrySchema>;

// ============================================
// Invoice Schemas
// ============================================

export const InvoiceStatusSchema = z.enum(["draft", "sent", "paid"]);

export const InvoiceEntrySchema = z.object({
  id: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime().optional(),
  paidAt: z.string().datetime().optional(),
  invoiceNumber: z.string().min(1),
  client: z.string().min(1),
  item: z.string().min(1),
  amount: z.number().positive(),
  status: InvoiceStatusSchema,
  dueDate: z.string().datetime().optional(),
  paymentInstruction: z.string().optional(),
  note: z.string().optional(),
});

export type InvoiceEntry = z.infer<typeof InvoiceEntrySchema>;

// ============================================
// Validation Helpers
// ============================================

export function validateLead(data: unknown): Lead {
  return LeadSchema.parse(data);
}

export function validateColdEmailTarget(data: unknown): ColdEmailTarget {
  return ColdEmailTargetSchema.parse(data);
}

export function validateFinanceEntry(data: unknown): FinanceEntry {
  return FinanceEntrySchema.parse(data);
}

export function validateMeetingEntry(data: unknown): MeetingEntry {
  return MeetingEntrySchema.parse(data);
}

export function validateInvoiceEntry(data: unknown): InvoiceEntry {
  return InvoiceEntrySchema.parse(data);
}

// Safe parsers (return success/failure instead of throwing)
export const safe = {
  lead: LeadSchema.safeParse,
  event: SiteEventSchema.safeParse,
  coldEmailTarget: ColdEmailTargetSchema.safeParse,
  sendHistory: SendHistorySchema.safeParse,
  finance: FinanceEntrySchema.safeParse,
  meeting: MeetingEntrySchema.safeParse,
  invoice: InvoiceEntrySchema.safeParse,
};
