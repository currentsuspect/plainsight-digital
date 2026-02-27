import { describe, it, expect } from "vitest";
import { calculateLeadScore, scheduleNextAction } from "./store";
import type { Lead } from "./schemas";

describe("calculateLeadScore", () => {
  const baseLead: Lead = {
    id: "test-uuid",
    createdAt: "2024-01-01T00:00:00Z",
    name: "Test Lead",
    businessName: "Test Business",
    email: "test@example.com",
    niche: "clinic",
    budget: "100k-250k",
    painPoint: "Need more patients",
    status: "New",
  };

  it("calculates source confidence correctly", () => {
    const referral = calculateLeadScore({ ...baseLead, source: "referral" });
    expect(referral.source_confidence).toBe("high");

    const google = calculateLeadScore({ ...baseLead, source: "google" });
    expect(google.source_confidence).toBe("medium");

    const unknown = calculateLeadScore({ ...baseLead, source: "random" });
    expect(unknown.source_confidence).toBe("low");

    const noSource = calculateLeadScore({ ...baseLead });
    expect(noSource.source_confidence).toBe("unknown");
  });

  it("calculates intent score based on contact info", () => {
    const minimal = calculateLeadScore(baseLead);
    expect(minimal.intent_score).toBeGreaterThanOrEqual(50);

    const withPhone = calculateLeadScore({ ...baseLead, phone: "+254712345678" });
    expect(withPhone.intent_score).toBeGreaterThan(minimal.intent_score);

    const withWebsite = calculateLeadScore({ ...baseLead, website: "https://example.com" });
    expect(withWebsite.intent_score).toBeGreaterThan(minimal.intent_score);

    const detailedPain = calculateLeadScore({
      ...baseLead,
      painPoint: "a".repeat(150),
    });
    expect(detailedPain.intent_score).toBeGreaterThan(minimal.intent_score);
  });

  it("caps intent score at 100", () => {
    const perfectLead: Lead = {
      ...baseLead,
      phone: "+254712345678",
      website: "https://example.com",
      source: "referral",
      painPoint: "a".repeat(200),
    };
    const result = calculateLeadScore(perfectLead);
    expect(result.intent_score).toBeLessThanOrEqual(100);
  });

  it("calculates fit score based on niche and budget", () => {
    const lowBudget = calculateLeadScore({ ...baseLead, budget: "<50k" });
    const highBudget = calculateLeadScore({ ...baseLead, budget: "250k+" });
    expect(highBudget.fit_score).toBeGreaterThan(lowBudget.fit_score);

    const clinic = calculateLeadScore({ ...baseLead, niche: "clinic" });
    const logistics = calculateLeadScore({ ...baseLead, niche: "logistics" });
    expect(clinic.fit_score).toBeGreaterThan(logistics.fit_score);
  });

  it("determines overall priority correctly", () => {
    const hot = calculateLeadScore({
      ...baseLead,
      budget: "250k+",
      niche: "clinic",
      phone: "+254712345678",
      source: "referral",
      painPoint: "Detailed pain point description here",
    });
    expect(hot.overall_priority).toBe("Hot");

    // Test that priority levels exist and are properly ordered
    const lowScore = calculateLeadScore({
      ...baseLead,
      budget: "<50k",
      niche: "logistics",
      painPoint: "x",
    });
    // Should be Warm or Cold depending on exact scoring
    expect(["Warm", "Cold"]).toContain(lowScore.overall_priority);
  });
});

describe("scheduleNextAction", () => {
  const baseLead: Lead = {
    id: "test-uuid",
    createdAt: new Date().toISOString(),
    name: "Test",
    businessName: "Test Business",
    email: "test@example.com",
    niche: "clinic",
    budget: "100k-250k",
    painPoint: "Test pain",
    status: "New",
  };

  it("schedules email follow-up for new leads", () => {
    const result = scheduleNextAction(baseLead);
    expect(result.next_action_type).toBe("email");
    expect(result.next_action_at).not.toBeNull();
    
    const actionDate = new Date(result.next_action_at!);
    const now = new Date();
    const hoursDiff = (actionDate.getTime() - now.getTime()) / (1000 * 60 * 60);
    expect(hoursDiff).toBeGreaterThan(20); // ~24 hours
    expect(hoursDiff).toBeLessThan(28);
  });

  it("uses whatsapp when phone is available", () => {
    const withPhone = scheduleNextAction({ ...baseLead, phone: "+254712345678" });
    expect(withPhone.next_action_type).toBe("whatsapp");
  });

  it("returns no action for won leads", () => {
    const won = scheduleNextAction({ ...baseLead, status: "Won" });
    expect(won.next_action_at).toBeNull();
    expect(won.next_action_type).toBe("none");
  });

  it("schedules longer delays for later stages", () => {
    const newLead = scheduleNextAction({ ...baseLead, status: "New" });
    const proposal = scheduleNextAction({ ...baseLead, status: "Proposal" });
    
    const newDate = new Date(newLead.next_action_at!).getTime();
    const proposalDate = new Date(proposal.next_action_at!).getTime();
    
    expect(proposalDate).toBeGreaterThan(newDate);
  });
});
