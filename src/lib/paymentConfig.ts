export const PAYMENT_INSTRUCTION =
  (process.env.PAYMENT_INSTRUCTION || "M-Pesa Pochi la Biashara — 0716177897 (Dylan Makori)").trim();

export const PAYMENT_TRUST_LINE =
  (process.env.PAYMENT_TRUST_LINE || "Official till/paybill coming soon; Pochi currently active for all invoices.").trim();

export const PAYMENT_FULL_TEXT = `${PAYMENT_INSTRUCTION} — ${PAYMENT_TRUST_LINE}`;
