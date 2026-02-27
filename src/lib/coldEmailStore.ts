// Cold Email Store — Manage targets and send history
// Now uses remoteStore abstraction for Supabase compatibility
import { hasRemoteStore, readRemoteJson, writeRemoteJson } from "./remoteStore";
import { promises as fs } from "fs";
import path from "path";
import { DATA_DIR } from "./config";

const TARGETS_FILE = path.join(DATA_DIR, "cold-email-targets.json");
const HISTORY_FILE = path.join(DATA_DIR, "cold-email-history.json");

export interface ColdEmailTarget {
  id: string;
  company: string;
  name: string;
  email: string;
  industry: "clinic" | "law" | "school" | "other";
  website?: string;
  status: "pending" | "sent" | "replied" | "meeting" | "closed";
  notes?: string;
  createdAt: string;
  lastContactedAt?: string;
}

export interface SendHistory {
  id: string;
  targetId: string;
  to: string;
  subject: string;
  sentAt: string;
  status: "sent" | "failed";
  error?: string;
}

async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch {
    // Ignore if exists
  }
}

async function readJson<T>(file: string): Promise<T[]> {
  const key = path.basename(file);
  if (hasRemoteStore()) {
    return readRemoteJson<T>(key);
  }

  await ensureDataDir();
  try {
    const data = await fs.readFile(file, "utf-8");
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
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

  await ensureDataDir();
  await fs.writeFile(file, JSON.stringify(data, null, 2), "utf-8");
}

// Load targets
export async function listTargets(): Promise<ColdEmailTarget[]> {
  return readJson<ColdEmailTarget>(TARGETS_FILE);
}

// Add target
export async function addTarget(target: Omit<ColdEmailTarget, "id" | "createdAt">): Promise<ColdEmailTarget> {
  const targets = await listTargets();
  const newTarget: ColdEmailTarget = {
    ...target,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  targets.push(newTarget);
  await writeJson(TARGETS_FILE, targets);
  return newTarget;
}

// Update target
export async function updateTarget(id: string, updates: Partial<ColdEmailTarget>): Promise<ColdEmailTarget | null> {
  const targets = await listTargets();
  const index = targets.findIndex((t) => t.id === id);
  if (index === -1) return null;
  targets[index] = { ...targets[index], ...updates };
  await writeJson(TARGETS_FILE, targets);
  return targets[index];
}

// Delete target
export async function deleteTarget(id: string): Promise<boolean> {
  const targets = await listTargets();
  const filtered = targets.filter((t) => t.id !== id);
  if (filtered.length === targets.length) return false;
  await writeJson(TARGETS_FILE, filtered);
  return true;
}

// Get send history
export async function listHistory(): Promise<SendHistory[]> {
  return readJson<SendHistory>(HISTORY_FILE);
}

// Add to history
export async function addHistory(entry: Omit<SendHistory, "id">): Promise<SendHistory> {
  const history = await listHistory();
  const newEntry: SendHistory = {
    ...entry,
    id: crypto.randomUUID(),
  };
  history.push(newEntry);
  await writeJson(HISTORY_FILE, history);
  return newEntry;
}

// Get stats
export async function getColdEmailStats() {
  const targets = await listTargets();
  const history = await listHistory();

  const today = new Date().toISOString().split("T")[0];
  const todaySends = history.filter(h => h.sentAt.startsWith(today));

  return {
    totalTargets: targets.length,
    byStatus: {
      pending: targets.filter(t => t.status === "pending").length,
      sent: targets.filter(t => t.status === "sent").length,
      replied: targets.filter(t => t.status === "replied").length,
      meeting: targets.filter(t => t.status === "meeting").length,
      closed: targets.filter(t => t.status === "closed").length,
    },
    totalSent: history.length,
    sentToday: todaySends.length,
    failedSends: history.filter(h => h.status === "failed").length,
  };
}
