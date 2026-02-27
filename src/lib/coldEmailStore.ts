// Cold Email Store — Manage targets and send history
// Now uses remoteStore abstraction for Supabase compatibility + Zod validation
import { hasRemoteStore, readRemoteJson, writeRemoteJson } from "./remoteStore";
import { promises as fs } from "fs";
import path from "path";
import { DATA_DIR } from "./config";
import { ColdEmailTarget, SendHistory, safe } from "./schemas";
export type { ColdEmailTarget, SendHistory };

const TARGETS_FILE = path.join(DATA_DIR, "cold-email-targets.json");
const HISTORY_FILE = path.join(DATA_DIR, "cold-email-history.json");

async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch {
    // Ignore if exists
  }
}

async function readTargets(): Promise<ColdEmailTarget[]> {
  const key = path.basename(TARGETS_FILE);
  if (hasRemoteStore()) {
    return readRemoteJson<ColdEmailTarget>(key);
  }

  await ensureDataDir();
  try {
    const data = await fs.readFile(TARGETS_FILE, "utf-8");
    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed)) return [];
    // Validate each item, filter out invalid
    return parsed.filter((item: unknown) => {
      const result = safe.coldEmailTarget(item);
      if (!result.success) {
        console.warn(`[coldEmailStore] Invalid target:`, result.error);
        return false;
      }
      return true;
    }) as ColdEmailTarget[];
  } catch {
    return [];
  }
}

async function readHistory(): Promise<SendHistory[]> {
  const key = path.basename(HISTORY_FILE);
  if (hasRemoteStore()) {
    return readRemoteJson<SendHistory>(key);
  }

  await ensureDataDir();
  try {
    const data = await fs.readFile(HISTORY_FILE, "utf-8");
    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed)) return [];
    // Validate each item, filter out invalid
    return parsed.filter((item: unknown) => {
      const result = safe.sendHistory(item);
      if (!result.success) {
        console.warn(`[coldEmailStore] Invalid history:`, result.error);
        return false;
      }
      return true;
    }) as SendHistory[];
  } catch {
    return [];
  }
}

async function writeTargets(data: ColdEmailTarget[]) {
  const key = path.basename(TARGETS_FILE);
  if (hasRemoteStore()) {
    await writeRemoteJson(key, data);
    return;
  }
  await ensureDataDir();
  await fs.writeFile(TARGETS_FILE, JSON.stringify(data, null, 2), "utf-8");
}

async function writeHistory(data: SendHistory[]) {
  const key = path.basename(HISTORY_FILE);
  if (hasRemoteStore()) {
    await writeRemoteJson(key, data);
    return;
  }
  await ensureDataDir();
  await fs.writeFile(HISTORY_FILE, JSON.stringify(data, null, 2), "utf-8");
}

// Load targets
export async function listTargets(): Promise<ColdEmailTarget[]> {
  return readTargets();
}

// Add target
export async function addTarget(target: Omit<ColdEmailTarget, "id" | "createdAt">): Promise<ColdEmailTarget> {
  const targets = await listTargets();
  const newTarget: ColdEmailTarget = {
    ...target,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  // Validate before saving
  const validated = safe.coldEmailTarget(newTarget);
  if (!validated.success) {
    throw new Error(`Invalid target data: ${validated.error}`);
  }
  targets.push(newTarget);
  await writeTargets(targets);
  return newTarget;
}

// Update target
export async function updateTarget(id: string, updates: Partial<ColdEmailTarget>): Promise<ColdEmailTarget | null> {
  const targets = await listTargets();
  const index = targets.findIndex((t) => t.id === id);
  if (index === -1) return null;
  const updated = { ...targets[index], ...updates };
  // Validate
  const validated = safe.coldEmailTarget(updated);
  if (!validated.success) {
    throw new Error(`Invalid update data: ${validated.error}`);
  }
  targets[index] = updated;
  await writeTargets(targets);
  return targets[index];
}

// Delete target
export async function deleteTarget(id: string): Promise<boolean> {
  const targets = await listTargets();
  const filtered = targets.filter((t) => t.id !== id);
  if (filtered.length === targets.length) return false;
  await writeTargets(filtered);
  return true;
}

// Get send history
export async function listHistory(): Promise<SendHistory[]> {
  return readHistory();
}

// Add to history
export async function addHistory(entry: Omit<SendHistory, "id">): Promise<SendHistory> {
  const history = await listHistory();
  const newEntry: SendHistory = {
    ...entry,
    id: crypto.randomUUID(),
  };
  // Validate
  const validated = safe.sendHistory(newEntry);
  if (!validated.success) {
    throw new Error(`Invalid history data: ${validated.error}`);
  }
  history.push(newEntry);
  await writeHistory(history);
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
