import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export type LeadStatus = "New" | "Contacted" | "Audit Sent" | "Proposal" | "Won" | "Lost";

export type Lead = {
  id: string;
  createdAt: string;
  name: string;
  businessName: string;
  email: string;
  phone?: string;
  website?: string;
  niche: "dental" | "law" | "real-estate" | "other";
  budget: "<50k" | "50k-100k" | "100k-250k" | "250k+";
  painPoint: string;
  source?: string;
  status: LeadStatus;
  updatedAt?: string;
};

export type SiteEvent = {
  id: string;
  type: "page_view" | "cta_click" | "form_start" | "form_submit";
  page: string;
  createdAt: string;
  meta?: Record<string, string>;
};

const DATA_DIR = process.env.DATA_DIR
  ? path.resolve(process.env.DATA_DIR)
  : process.env.VERCEL
    ? "/tmp/plainsight-data"
    : path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");
const EVENTS_FILE = path.join(DATA_DIR, "events.json");

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
  await writeFile(file, JSON.stringify(data, null, 2), "utf8");
}

export async function addLead(lead: Omit<Lead, "id" | "createdAt" | "status" | "updatedAt"> & Partial<Pick<Lead, "status">>) {
  const leads = await readJson<Lead>(LEADS_FILE);
  const item: Lead = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    status: "New",
    ...lead,
  };
  leads.unshift(item);
  await writeJson(LEADS_FILE, leads);
  return item;
}

export async function listLeads() {
  const leads = await readJson<Lead>(LEADS_FILE);
  return leads.map((lead) => ({ ...lead, status: lead.status || "New" }));
}

export async function updateLeadStatus(id: string, status: LeadStatus) {
  const leads = await readJson<Lead>(LEADS_FILE);
  const index = leads.findIndex((l) => l.id === id);
  if (index < 0) return null;

  leads[index] = { ...leads[index], status, updatedAt: new Date().toISOString() };
  await writeJson(LEADS_FILE, leads);
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
