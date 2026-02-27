import { LeadStatus, SourceConfidence, NextActionType } from "./store";

// Validation result type
export type ValidationResult = 
  | { valid: true; data: Record<string, unknown> }
  | { valid: false; errors: string[] };

// Allowed values for enum fields
export const ALLOWED_STATUSES: LeadStatus[] = ["New", "Contacted", "Audit Sent", "Proposal", "Won", "Lost"];
export const ALLOWED_NICHES = ["clinic", "law", "school", "hotel", "logistics"] as const;
export const ALLOWED_BUDGETS = ["<50k", "50k-100k", "100k-250k", "250k+"] as const;
export const ALLOWED_SOURCE_CONFIDENCE: SourceConfidence[] = ["high", "medium", "low", "unknown"];
export const ALLOWED_NEXT_ACTION_TYPES: NextActionType[] = ["call", "email", "whatsapp", "followup", "proposal_review", "none"];
export const ALLOWED_INVOICE_STATUSES = ["draft", "sent", "paid"] as const;
export const ALLOWED_FINANCE_TYPES = ["income", "expense"] as const;

// Input sanitization
export function sanitizeString(input: unknown, maxLength = 500): string {
  if (typeof input !== "string") return "";
  return input.trim().slice(0, maxLength);
}

export function sanitizeEmail(input: unknown): string {
  if (typeof input !== "string") return "";
  const email = input.trim().toLowerCase();
  // Basic email validation
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "";
  return email;
}

export function sanitizePhone(input: unknown): string {
  if (typeof input !== "string") return "";
  // Keep only digits and + sign
  return input.replace(/[^\d+]/g, "").slice(0, 20);
}

export function sanitizeNumber(input: unknown, min = 0, max = Number.MAX_SAFE_INTEGER): number {
  const num = Number(input);
  if (isNaN(num)) return 0;
  return Math.max(min, Math.min(max, num));
}

export function sanitizeUrl(input: unknown): string {
  if (typeof input !== "string") return "";
  try {
    const url = new URL(input);
    if (!["http:", "https:"].includes(url.protocol)) return "";
    return url.toString();
  } catch {
    return "";
  }
}

// Validate UUID format
export function isValidUUID(input: unknown): boolean {
  if (typeof input !== "string") return false;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(input);
}

// Validate lead update form
export function validateLeadUpdate(formData: FormData): ValidationResult {
  const errors: string[] = [];
  const data: Record<string, unknown> = {};

  // ID validation
  const id = sanitizeString(formData.get("id"), 100);
  if (!id) {
    errors.push("Lead ID is required");
  } else if (!isValidUUID(id)) {
    errors.push("Invalid lead ID format");
  } else {
    data.id = id;
  }

  // Status validation
  const status = sanitizeString(formData.get("status"), 50);
  if (!status) {
    errors.push("Status is required");
  } else if (!ALLOWED_STATUSES.includes(status as LeadStatus)) {
    errors.push(`Invalid status. Allowed: ${ALLOWED_STATUSES.join(", ")}`);
  } else {
    data.status = status;
  }

  // Optional fields
  const loss_reason = sanitizeString(formData.get("loss_reason"), 500);
  if (loss_reason) data.loss_reason = loss_reason;

  const won_value = sanitizeNumber(formData.get("won_value"), 0, 1000000000);
  if (won_value > 0) data.won_value = won_value;

  const source_confidence = sanitizeString(formData.get("source_confidence"), 20);
  if (source_confidence && ALLOWED_SOURCE_CONFIDENCE.includes(source_confidence as SourceConfidence)) {
    data.source_confidence = source_confidence;
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }
  return { valid: true, data };
}

// Validate finance entry
export function validateFinanceEntry(formData: FormData): ValidationResult {
  const errors: string[] = [];
  const data: Record<string, unknown> = {};

  const type = sanitizeString(formData.get("type"), 20);
  if (!type) {
    errors.push("Type is required");
  } else if (!ALLOWED_FINANCE_TYPES.includes(type as "income" | "expense")) {
    errors.push(`Invalid type. Allowed: ${ALLOWED_FINANCE_TYPES.join(", ")}`);
  } else {
    data.type = type;
  }

  const amount = sanitizeNumber(formData.get("amount"), 0, 1000000000000);
  if (amount <= 0) {
    errors.push("Amount must be greater than 0");
  } else {
    data.amount = amount;
  }

  const category = sanitizeString(formData.get("category"), 100);
  if (!category) {
    errors.push("Category is required");
  } else {
    data.category = category;
  }

  data.note = sanitizeString(formData.get("note"), 500);

  if (errors.length > 0) {
    return { valid: false, errors };
  }
  return { valid: true, data };
}

// Validate meeting entry
export function validateMeetingEntry(formData: FormData): ValidationResult {
  const errors: string[] = [];
  const data: Record<string, unknown> = {};

  const title = sanitizeString(formData.get("title"), 200);
  if (!title) {
    errors.push("Title is required");
  } else {
    data.title = title;
  }

  const when = sanitizeString(formData.get("when"), 50);
  if (!when) {
    errors.push("Date/time is required");
  } else {
    const date = new Date(when);
    if (isNaN(date.getTime())) {
      errors.push("Invalid date/time format");
    } else {
      data.when = when;
    }
  }

  const owner = sanitizeString(formData.get("owner"), 100);
  if (!owner) {
    errors.push("Owner is required");
  } else {
    data.owner = owner;
  }

  data.note = sanitizeString(formData.get("note"), 500);

  if (errors.length > 0) {
    return { valid: false, errors };
  }
  return { valid: true, data };
}

// Validate invoice entry
export function validateInvoiceEntry(formData: FormData): ValidationResult {
  const errors: string[] = [];
  const data: Record<string, unknown> = {};

  const client = sanitizeString(formData.get("client"), 200);
  if (!client) {
    errors.push("Client name is required");
  } else {
    data.client = client;
  }

  const item = sanitizeString(formData.get("item"), 500);
  if (!item) {
    errors.push("Service/item is required");
  } else {
    data.item = item;
  }

  const amount = sanitizeNumber(formData.get("amount"), 0, 1000000000000);
  if (amount <= 0) {
    errors.push("Amount must be greater than 0");
  } else {
    data.amount = amount;
  }

  const status = sanitizeString(formData.get("status"), 20);
  if (!status) {
    data.status = "draft";
  } else if (!ALLOWED_INVOICE_STATUSES.includes(status as "draft" | "sent" | "paid")) {
    errors.push(`Invalid status. Allowed: ${ALLOWED_INVOICE_STATUSES.join(", ")}`);
  } else {
    data.status = status;
  }

  const dueDate = sanitizeString(formData.get("dueDate"), 20);
  if (dueDate) {
    const date = new Date(dueDate);
    if (isNaN(date.getTime())) {
      errors.push("Invalid due date format");
    } else {
      data.dueDate = dueDate;
    }
  }

  data.paymentInstruction = sanitizeString(formData.get("paymentInstruction"), 500);
  data.note = sanitizeString(formData.get("note"), 500);

  if (errors.length > 0) {
    return { valid: false, errors };
  }
  return { valid: true, data };
}

// Validate invoice update
export function validateInvoiceUpdate(formData: FormData): ValidationResult {
  const errors: string[] = [];
  const data: Record<string, unknown> = {};

  const id = sanitizeString(formData.get("id"), 100);
  if (!id) {
    errors.push("Invoice ID is required");
  } else {
    data.id = id;
  }

  const status = sanitizeString(formData.get("status"), 20);
  if (status && !ALLOWED_INVOICE_STATUSES.includes(status as "draft" | "sent" | "paid")) {
    errors.push(`Invalid status. Allowed: ${ALLOWED_INVOICE_STATUSES.join(", ")}`);
  } else if (status) {
    data.status = status;
  }

  const dueDate = sanitizeString(formData.get("dueDate"), 20);
  if (dueDate) {
    const date = new Date(dueDate);
    if (isNaN(date.getTime())) {
      errors.push("Invalid due date format");
    } else {
      data.dueDate = dueDate;
    }
  }

  data.note = sanitizeString(formData.get("note"), 500);

  if (errors.length > 0) {
    return { valid: false, errors };
  }
  return { valid: true, data };
}

// Error response helper
export function errorResponse(errors: string[], status = 400): Response {
  return new Response(JSON.stringify({ error: errors.join("; ") }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
