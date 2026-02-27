import { describe, it, expect } from "vitest";
import {
  LeadSchema,
  ColdEmailTargetSchema,
  FinanceEntrySchema,
  safe,
} from "./schemas";

describe("LeadSchema", () => {
  const validLead = {
    id: "550e8400-e29b-41d4-a716-446655440000",
    createdAt: "2024-01-01T00:00:00Z",
    name: "John Doe",
    businessName: "Acme Inc",
    email: "john@acme.com",
    niche: "clinic",
    budget: "100k-250k",
    painPoint: "Need more patients",
    status: "New",
  };

  it("accepts valid leads", () => {
    const result = LeadSchema.safeParse(validLead);
    expect(result.success).toBe(true);
  });

  it("rejects invalid email", () => {
    const result = LeadSchema.safeParse({
      ...validLead,
      email: "not-an-email",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid UUID", () => {
    const result = LeadSchema.safeParse({
      ...validLead,
      id: "not-a-uuid",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid niche", () => {
    const result = LeadSchema.safeParse({
      ...validLead,
      niche: "invalid-niche",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid budget", () => {
    const result = LeadSchema.safeParse({
      ...validLead,
      budget: "999k",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid status", () => {
    const result = LeadSchema.safeParse({
      ...validLead,
      status: "Unknown",
    });
    expect(result.success).toBe(false);
  });

  it("validates score ranges", () => {
    const withValidScores = LeadSchema.safeParse({
      ...validLead,
      intent_score: 75,
      fit_score: 80,
    });
    expect(withValidScores.success).toBe(true);

    const withInvalidScores = LeadSchema.safeParse({
      ...validLead,
      intent_score: 150,
    });
    expect(withInvalidScores.success).toBe(false);
  });
});

describe("ColdEmailTargetSchema", () => {
  const validTarget = {
    id: "550e8400-e29b-41d4-a716-446655440000",
    createdAt: "2024-01-01T00:00:00Z",
    company: "Test Corp",
    name: "Jane Smith",
    email: "jane@test.com",
    industry: "clinic",
    status: "pending",
  };

  it("accepts valid targets", () => {
    const result = ColdEmailTargetSchema.safeParse(validTarget);
    expect(result.success).toBe(true);
  });

  it("accepts all valid industries", () => {
    const industries = ["clinic", "law", "school", "other"];
    for (const industry of industries) {
      const result = ColdEmailTargetSchema.safeParse({
        ...validTarget,
        industry,
      });
      expect(result.success).toBe(true);
    }
  });

  it("accepts all valid statuses", () => {
    const statuses = ["pending", "sent", "replied", "meeting", "closed"];
    for (const status of statuses) {
      const result = ColdEmailTargetSchema.safeParse({
        ...validTarget,
        status,
      });
      expect(result.success).toBe(true);
    }
  });

  it("rejects invalid industry", () => {
    const result = ColdEmailTargetSchema.safeParse({
      ...validTarget,
      industry: "invalid",
    });
    expect(result.success).toBe(false);
  });
});

describe("FinanceEntrySchema", () => {
  const validEntry = {
    id: "550e8400-e29b-41d4-a716-446655440000",
    createdAt: "2024-01-01T00:00:00Z",
    type: "income",
    amount: 50000,
    category: "Web Design",
    note: "Project payment",
  };

  it("accepts valid entries", () => {
    const result = FinanceEntrySchema.safeParse(validEntry);
    expect(result.success).toBe(true);
  });

  it("accepts both income and expense", () => {
    const income = FinanceEntrySchema.safeParse(validEntry);
    expect(income.success).toBe(true);

    const expense = FinanceEntrySchema.safeParse({
      ...validEntry,
      type: "expense",
    });
    expect(expense.success).toBe(true);
  });

  it("rejects zero amount", () => {
    const result = FinanceEntrySchema.safeParse({
      ...validEntry,
      amount: 0,
    });
    expect(result.success).toBe(false);
  });

  it("rejects negative amount", () => {
    const result = FinanceEntrySchema.safeParse({
      ...validEntry,
      amount: -100,
    });
    expect(result.success).toBe(false);
  });
});

describe("safe parsers", () => {
  it("safe.lead returns success/failure without throwing", () => {
    const valid = safe.lead({
      id: "550e8400-e29b-41d4-a716-446655440000",
      createdAt: "2024-01-01T00:00:00Z",
      name: "Test",
      businessName: "Business",
      email: "test@example.com",
      niche: "clinic",
      budget: "100k-250k",
      painPoint: "Test",
      status: "New",
    });
    expect(valid.success).toBe(true);

    const invalid = safe.lead({ invalid: true });
    expect(invalid.success).toBe(false);
  });
});
