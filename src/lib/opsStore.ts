import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { hasRemoteStore, readRemoteJson, writeRemoteJson } from "@/lib/remoteStore";
import { PAYMENT_FULL_TEXT } from "@/lib/paymentConfig";

export type FinanceEntry = {
  id: string;
  createdAt: string;
  type: "income" | "expense";
  amount: number;
  category: string;
  note: string;
};

export type MeetingEntry = {
  id: string;
  createdAt: string;
  title: string;
  when: string;
  owner: string;
  note?: string;
  // Cal.com integration fields
  calUid?: string;
  calBookingId?: string;
  calEventTypeId?: number;
  status?: "scheduled" | "completed" | "cancelled" | "no_show";
  attendeeName?: string;
  attendeeEmail?: string;
  attendeePhone?: string;
  leadId?: string;
  meetingUrl?: string;
  confirmationSent?: boolean;
  reminderSent?: boolean;
};

export type InvoiceEntry = {
  id: string;
  createdAt: string;
  updatedAt?: string;
  paidAt?: string;
  invoiceNumber: string;
  client: string;
  item: string;
  amount: number;
  status: "draft" | "sent" | "paid";
  dueDate?: string;
  paymentInstruction?: string;
  note?: string;
};

const DATA_DIR = process.env.DATA_DIR
  ? path.resolve(process.env.DATA_DIR)
  : process.env.VERCEL
    ? "/tmp/plainsight-data"
    : path.join(process.cwd(), "data");

const FINANCE_FILE = path.join(DATA_DIR, "finance.json");
const MEETINGS_FILE = path.join(DATA_DIR, "meetings.json");
const INVOICES_FILE = path.join(DATA_DIR, "invoices.json");

async function ensure(files: string[]) {
  await mkdir(DATA_DIR, { recursive: true });
  for (const file of files) {
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

  await ensure([FINANCE_FILE, MEETINGS_FILE, INVOICES_FILE]);
  const raw = await readFile(file, "utf8");
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeJson<T>(file: string, rows: T[]) {
  const key = path.basename(file);
  if (hasRemoteStore()) {
    await writeRemoteJson(key, rows);
    return;
  }

  await writeFile(file, JSON.stringify(rows, null, 2), "utf8");
}

export async function listFinance() {
  return readJson<FinanceEntry>(FINANCE_FILE);
}
export async function addFinance(entry: Omit<FinanceEntry, "id" | "createdAt">) {
  const rows = await listFinance();
  const row = { id: crypto.randomUUID(), createdAt: new Date().toISOString(), ...entry };
  rows.unshift(row);
  await writeJson(FINANCE_FILE, rows);
  return row;
}

export async function listMeetings() {
  return readJson<MeetingEntry>(MEETINGS_FILE);
}
export async function addMeeting(entry: Omit<MeetingEntry, "id" | "createdAt">) {
  const rows = await listMeetings();
  const row = { id: crypto.randomUUID(), createdAt: new Date().toISOString(), ...entry };
  rows.unshift(row);
  await writeJson(MEETINGS_FILE, rows);
  return row;
}

export async function getMeetingByCalUid(calUid: string) {
  const rows = await listMeetings();
  return rows.find((r) => r.calUid === calUid) || null;
}

export async function getMeetingsByLeadId(leadId: string) {
  const rows = await listMeetings();
  return rows.filter((r) => r.leadId === leadId);
}

export async function updateMeeting(id: string, patch: Partial<MeetingEntry>) {
  const rows = await listMeetings();
  const index = rows.findIndex((r) => r.id === id);
  if (index < 0) return null;
  rows[index] = { ...rows[index], ...patch };
  await writeJson(MEETINGS_FILE, rows);
  return rows[index];
}

export async function listInvoices() {
  const rows = await readJson<InvoiceEntry>(INVOICES_FILE);
  return rows.map((r) => ({ ...r, invoiceNumber: r.invoiceNumber || `PSD-${new Date(r.createdAt).toISOString().slice(0, 10).replace(/-/g, "")}-001` }));
}

export function generateInvoiceNumber(date = new Date(), seq = 1) {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  const d = String(date.getUTCDate()).padStart(2, "0");
  return `PSD-${y}${m}${d}-${String(seq).padStart(3, "0")}`;
}

export async function addInvoice(entry: Omit<InvoiceEntry, "id" | "createdAt" | "invoiceNumber"> & Partial<Pick<InvoiceEntry, "invoiceNumber">>) {
  const rows = await listInvoices();
  const seq = rows.length + 1;
  const row: InvoiceEntry = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    invoiceNumber: entry.invoiceNumber || generateInvoiceNumber(new Date(), seq),
    paymentInstruction: entry.paymentInstruction || PAYMENT_FULL_TEXT,
    ...entry,
  };
  rows.unshift(row);
  await writeJson(INVOICES_FILE, rows);
  return row;
}

export async function getInvoice(id: string) {
  const rows = await listInvoices();
  return rows.find((r) => r.id === id) || rows.find((r) => r.invoiceNumber === id) || null;
}

export async function updateInvoice(id: string, patch: Partial<Pick<InvoiceEntry, "status" | "dueDate" | "note" | "paymentInstruction">>) {
  const rows = await listInvoices();
  const index = rows.findIndex((r) => r.id === id || r.invoiceNumber === id);
  if (index < 0) return null;

  const prev = rows[index];
  const next: InvoiceEntry = {
    ...prev,
    ...patch,
    paymentInstruction: (patch.paymentInstruction || prev.paymentInstruction || PAYMENT_FULL_TEXT),
    updatedAt: new Date().toISOString(),
  };

  if (patch.status === "paid" && !prev.paidAt) {
    next.paidAt = new Date().toISOString();
  }

  rows[index] = next;
  await writeJson(INVOICES_FILE, rows);
  return { prev, next };
}
