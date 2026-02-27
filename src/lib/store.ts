import { mkdir, readFile, writeFile, appendFile } from "node:fs/promises";
import path from "node:path";
import { hasRemoteStore, readRemoteJson, writeRemoteJson } from "@/lib/remoteStore";

export type LeadStatus = "New" | "Contacted" | "Audit Sent" | "Proposal" | "Won" | "Lost";

// Lead Scoring v2 types
export type SourceConfidence = "high" | "medium" | "low" | "unknown";
export type NextActionType = "call" | "email" | "whatsapp" | "followup" | "proposal_review" | "none";

export type Lead = {
  id: string;
  createdAt: string;
  name: string;
  businessName: string;
  email: string;
  phone?: string;
  website?: string;
  niche: "clinic" | "law" | "school" | "hotel" | "logistics";
  budget: "<50k" | "50k-100k" | "100k-250k" | "250k+";
  painPoint: string;
  source?: string;
  status: LeadStatus;
  updatedAt?: string;
  // Lead Scoring v2 fields (backwards compatible - optional)
  source_confidence?: SourceConfidence;
  intent_score?: number; // 0-100
  fit_score?: number; // 0-100
  overall_priority?: "Hot" | "Warm" | "Cold";
  // Follow-up automation fields
  next_action_at?: string | null;
  next_action_type?: NextActionType;
  // Win/Loss tracking
  loss_reason?: string;
  won_value?: number;
  lost_at?: string;
  // Re-engagement for lost leads
  reengage_at?: string;
  nurture_email_sent?: boolean;
};

export type SiteEvent = {
  id: string;
  type: "page_view" | "cta_click" | "form_start" | "form_submit";
  page: string;
  createdAt: string;
  meta?: Record<string, string>;
};

// Audit log entry type
export type AuditLogEntry = {
  timestamp: string;
  action: string;
  entity: string;
  entityId: string;
  userId?: string;
  changes: Record<string, unknown>;
  ip?: string;
};

const DATA_DIR = process.env.DATA_DIR
  ? path.resolve(process.env.DATA_DIR)
  : process.env.VERCEL
    ? "/tmp/plainsight-data"
    : path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");
const EVENTS_FILE = path.join(DATA_DIR, "events.json");
const AUDIT_LOG_FILE = path.join(DATA_DIR, "audit.log");

async function ensureDataFiles() {
  await mkdir(DATA_DIR, { recursive: true });

  for (const file of [LEADS_FILE, EVENTS_FILE]) {
    try {
      await readFile(file, "utf8");
    } catch {
      await writeFile(file, "[]", "utf8");
    }
  }
}

async function readJson<T>(file: string): Promise<T[]> {
  const key = path.basename(file);
  if (hasRemoteStore()) {
    return readRemoteJson<T>(key);
  }

  await ensureDataFiles();
  const raw = await readFile(file, "utf8");
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
}

async function writeJson<T>(file: string, data: T[]) {
  const key = path.basename(file);
  if (hasRemoteStore()) {
    await writeRemoteJson(key, data);
    return;
  }

  await writeFile(file, JSON.stringify(data, null, 2), "utf8");
}

// Audit logging function
export async function appendAuditLog(entry: Omit<AuditLogEntry, "timestamp">) {
  const logEntry: AuditLogEntry = {
    ...entry,
    timestamp: new Date().toISOString(),
  };

  if (hasRemoteStore()) {
    // For remote store, we'd need a separate audit log bucket
    // For now, skip remote audit logging
    return;
  }

  try {
    await mkdir(DATA_DIR, { recursive: true });
    await appendFile(AUDIT_LOG_FILE, JSON.stringify(logEntry) + "\n", "utf8");
  } catch {
    // Silently fail audit logging
  }
}

// Lead scoring v2 calculation
export function calculateLeadScore(lead: Lead): {
  source_confidence: SourceConfidence;
  intent_score: number;
  fit_score: number;
  overall_priority: "Hot" | "Warm" | "Cold";
} {
  // Calculate source confidence
  let source_confidence: SourceConfidence = "unknown";
  const source = (lead.source || "").toLowerCase();
  if (["referral", "partner", "direct"].some(s => source.includes(s))) {
    source_confidence = "high";
  } else if (["google", "linkedin", "facebook", "instagram"].some(s => source.includes(s))) {
    source_confidence = "medium";
  } else if (source) {
    source_confidence = "low";
  }

  // Calculate intent score (0-100) based on engagement signals
  let intent_score = 50; // baseline
  if (lead.phone) intent_score += 15;
  if (lead.website) intent_score += 10;
  if (lead.painPoint && lead.painPoint.length > 100) intent_score += 15;
  else if (lead.painPoint && lead.painPoint.length > 40) intent_score += 8;
  if (source_confidence === "high") intent_score += 15;
  else if (source_confidence === "medium") intent_score += 5;
  // Cap at 100
  intent_score = Math.min(100, intent_score);

  // Calculate fit score (0-100) based on business alignment
  let fit_score = 30; // baseline
  const nicheScores: Record<string, number> = {
    "clinic": 25,
    "law": 25,
    "school": 20,
    "hotel": 20,
    "logistics": 15,
  };
  fit_score += nicheScores[lead.niche] || 15;

  const budgetScores: Record<string, number> = {
    "<50k": 5,
    "50k-100k": 15,
    "100k-250k": 25,
    "250k+": 35,
  };
  fit_score += budgetScores[lead.budget] || 5;

  // Pain point completeness
  if (lead.painPoint && lead.painPoint.length > 50) fit_score += 15;
  else if (lead.painPoint && lead.painPoint.length > 20) fit_score += 8;

  // Contactability
  if (lead.email && lead.phone) fit_score += 10;
  else if (lead.email) fit_score += 5;

  // Cap at 100
  fit_score = Math.min(100, fit_score);

  // Calculate overall priority (derived from niche + budget + pain_point completeness + contactability)
  const combinedScore = (intent_score * 0.4) + (fit_score * 0.6);
  let overall_priority: "Hot" | "Warm" | "Cold";
  if (combinedScore >= 70) {
    overall_priority = "Hot";
  } else if (combinedScore >= 45) {
    overall_priority = "Warm";
  } else {
    overall_priority = "Cold";
  }

  return { source_confidence, intent_score, fit_score, overall_priority };
}

// Status-driven follow-up scheduler
export function scheduleNextAction(lead: Lead): { next_action_at: string | null; next_action_type: NextActionType } {
  const now = new Date();
  const status = lead.status || "New";

  // Define follow-up delays (in hours) per status
  const followUpDelays: Record<LeadStatus, { hours: number; action: NextActionType }> = {
    "New": { hours: 24, action: "email" },
    "Contacted": { hours: 72, action: "followup" },
    "Audit Sent": { hours: 96, action: "followup" },
    "Proposal": { hours: 168, action: "proposal_review" },
    "Won": { hours: 0, action: "none" },
    // Lost leads enter a long-term nurture sequence (90 days)
    "Lost": { hours: 2160, action: "followup" },
  };

  const config = followUpDelays[status];

  // Won leads don't need follow-up
  if (config.action === "none") {
    return { next_action_at: null, next_action_type: "none" };
  }

  // Calculate next action time
  const nextActionDate = new Date(now.getTime() + config.hours * 60 * 60 * 1000);

  return {
    next_action_at: nextActionDate.toISOString(),
    next_action_type: lead.phone ? "whatsapp" : config.action,
  };
}

export async function addLead(lead: Omit<Lead, "id" | "createdAt" | "status" | "updatedAt"> & Partial<Pick<Lead, "status">>) {
  const leads = await readJson<Lead>(LEADS_FILE);

  // Calculate initial scores
  const newLead: Lead = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    status: "New",
    ...lead,
  };

  // Add scoring fields
  const scores = calculateLeadScore(newLead);
  newLead.source_confidence = scores.source_confidence;
  newLead.intent_score = scores.intent_score;
  newLead.fit_score = scores.fit_score;
  newLead.overall_priority = scores.overall_priority;

  // Add follow-up scheduling
  const followUp = scheduleNextAction(newLead);
  newLead.next_action_at = followUp.next_action_at;
  newLead.next_action_type = followUp.next_action_type;

  leads.unshift(newLead);
  await writeJson(LEADS_FILE, leads);

  // Audit log
  await appendAuditLog({
    action: "create",
    entity: "lead",
    entityId: newLead.id,
    changes: { name: newLead.name, businessName: newLead.businessName, email: newLead.email },
  });

  return newLead;
}

export async function listLeads() {
  const leads = await readJson<Lead>(LEADS_FILE);
  return leads.map((lead) => {
    // Ensure backwards compatibility
    const status = lead.status || "New";
    const scores = calculateLeadScore(lead);
    const followUp = scheduleNextAction({ ...lead, status });

    return {
      ...lead,
      status,
      // Add computed fields if not present
      source_confidence: lead.source_confidence ?? scores.source_confidence,
      intent_score: lead.intent_score ?? scores.intent_score,
      fit_score: lead.fit_score ?? scores.fit_score,
      overall_priority: lead.overall_priority ?? scores.overall_priority,
      next_action_at: lead.next_action_at ?? followUp.next_action_at,
      next_action_type: lead.next_action_type ?? followUp.next_action_type,
    } as Lead;
  });
}

export async function updateLeadStatus(id: string, status: LeadStatus, additionalFields?: Partial<Lead>) {
  const leads = await readJson<Lead>(LEADS_FILE);
  const index = leads.findIndex((l) => l.id === id);
  if (index < 0) return null;

  const prevLead = leads[index];
  const updatedAt = new Date().toISOString();

  // Update the lead
  leads[index] = {
    ...leads[index],
    status,
    updatedAt,
    ...additionalFields,
  };

  // Recalculate scores and follow-up
  const scores = calculateLeadScore(leads[index]);
  leads[index].source_confidence = scores.source_confidence;
  leads[index].intent_score = scores.intent_score;
  leads[index].fit_score = scores.fit_score;
  leads[index].overall_priority = scores.overall_priority;

  const followUp = scheduleNextAction(leads[index]);
  leads[index].next_action_at = followUp.next_action_at;
  leads[index].next_action_type = followUp.next_action_type;

  await writeJson(LEADS_FILE, leads);

  // Audit log
  await appendAuditLog({
    action: "update_status",
    entity: "lead",
    entityId: id,
    changes: { prevStatus: prevLead.status, newStatus: status, ...additionalFields },
  });

  return leads[index];
}

export async function updateLead(id: string, patch: Partial<Lead>) {
  const leads = await readJson<Lead>(LEADS_FILE);
  const index = leads.findIndex((l) => l.id === id);
  if (index < 0) return null;

  const prevLead = leads[index];
  leads[index] = {
    ...leads[index],
    ...patch,
    updatedAt: new Date().toISOString(),
  };

  // Recalculate scores and follow-up
  const scores = calculateLeadScore(leads[index]);
  leads[index].source_confidence = scores.source_confidence;
  leads[index].intent_score = scores.intent_score;
  leads[index].fit_score = scores.fit_score;
  leads[index].overall_priority = scores.overall_priority;

  const followUp = scheduleNextAction(leads[index]);
  leads[index].next_action_at = followUp.next_action_at;
  leads[index].next_action_type = followUp.next_action_type;

  await writeJson(LEADS_FILE, leads);

  // Audit log
  await appendAuditLog({
    action: "update",
    entity: "lead",
    entityId: id,
    changes: { patch, prevValues: { ...prevLead } },
  });

  return leads[index];
}

export async function addEvent(event: Omit<SiteEvent, "id" | "createdAt">) {
  const events = await readJson<SiteEvent>(EVENTS_FILE);
  const item: SiteEvent = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...event,
  };
  events.unshift(item);
  await writeJson(EVENTS_FILE, events.slice(0, 5000));
  return item;
}

export async function listEvents() {
  return readJson<SiteEvent>(EVENTS_FILE);
}

// Get leads requiring follow-up
export async function getLeadsRequiringFollowUp() {
  const leads = await listLeads();
  const now = new Date();

  return leads.filter((lead) => {
    if (!lead.next_action_at) return false;
    const nextAction = new Date(lead.next_action_at);
    return nextAction <= now && lead.next_action_type !== "none";
  });
}
