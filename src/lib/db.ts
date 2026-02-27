// Database layer for Supabase Postgres
// Proper SQL schema with migrations

import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { config } from "./config";

// Singleton client
let dbClient: SupabaseClient | null = null;

export function getDb(): SupabaseClient {
  if (!dbClient) {
    const url = config.supabaseUrl;
    const key = config.supabaseServiceKey;
    
    if (!url || !key) {
      throw new Error("Supabase not configured");
    }
    
    dbClient = createClient(url, key, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }
  return dbClient;
}

export function isDbConfigured(): boolean {
  return Boolean(config.supabaseUrl && config.supabaseServiceKey);
}

// Migration definitions
const MIGRATIONS = [
  {
    id: "001_initial",
    sql: `
      -- Leads table
      CREATE TABLE IF NOT EXISTS leads (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ,
        name TEXT NOT NULL,
        business_name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        website TEXT,
        niche TEXT NOT NULL CHECK (niche IN ('clinic', 'law', 'school', 'hotel', 'logistics')),
        budget TEXT NOT NULL CHECK (budget IN ('<50k', '50k-100k', '100k-250k', '250k+')),
        pain_point TEXT NOT NULL,
        source TEXT,
        status TEXT NOT NULL DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'Audit Sent', 'Proposal', 'Won', 'Lost')),
        source_confidence TEXT CHECK (source_confidence IN ('high', 'medium', 'low', 'unknown')),
        intent_score INTEGER CHECK (intent_score >= 0 AND intent_score <= 100),
        fit_score INTEGER CHECK (fit_score >= 0 AND fit_score <= 100),
        overall_priority TEXT CHECK (overall_priority IN ('Hot', 'Warm', 'Cold')),
        next_action_at TIMESTAMPTZ,
        next_action_type TEXT CHECK (next_action_type IN ('call', 'email', 'whatsapp', 'followup', 'proposal_review', 'none')),
        loss_reason TEXT,
        won_value INTEGER,
        lost_at TIMESTAMPTZ,
        reengage_at TIMESTAMPTZ,
        nurture_email_sent BOOLEAN DEFAULT FALSE
      );

      -- Events table
      CREATE TABLE IF NOT EXISTS events (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        created_at TIMESTAMPTZ DEFAULT NOW(),
        type TEXT NOT NULL CHECK (type IN ('page_view', 'cta_click', 'form_start', 'form_submit')),
        page TEXT NOT NULL,
        meta JSONB
      );

      -- Cold email targets
      CREATE TABLE IF NOT EXISTS cold_email_targets (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        created_at TIMESTAMPTZ DEFAULT NOW(),
        company TEXT NOT NULL,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        industry TEXT NOT NULL CHECK (industry IN ('clinic', 'law', 'school', 'other')),
        website TEXT,
        status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'replied', 'meeting', 'closed')),
        notes TEXT,
        last_contacted_at TIMESTAMPTZ
      );

      -- Send history
      CREATE TABLE IF NOT EXISTS send_history (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        target_id UUID NOT NULL REFERENCES cold_email_targets(id) ON DELETE CASCADE,
        to_email TEXT NOT NULL,
        subject TEXT NOT NULL,
        sent_at TIMESTAMPTZ DEFAULT NOW(),
        status TEXT NOT NULL CHECK (status IN ('sent', 'failed')),
        error TEXT
      );

      -- Finance entries
      CREATE TABLE IF NOT EXISTS finance (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        created_at TIMESTAMPTZ DEFAULT NOW(),
        type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
        amount INTEGER NOT NULL CHECK (amount > 0),
        category TEXT NOT NULL,
        note TEXT NOT NULL
      );

      -- Meetings
      CREATE TABLE IF NOT EXISTS meetings (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        created_at TIMESTAMPTZ DEFAULT NOW(),
        title TEXT NOT NULL,
        "when" TIMESTAMPTZ NOT NULL,
        owner TEXT NOT NULL,
        note TEXT,
        cal_uid TEXT UNIQUE,
        cal_booking_id TEXT,
        cal_event_type_id INTEGER,
        status TEXT CHECK (status IN ('scheduled', 'completed', 'cancelled', 'no_show')),
        attendee_name TEXT,
        attendee_email TEXT,
        attendee_phone TEXT,
        lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
        meeting_url TEXT,
        confirmation_sent BOOLEAN DEFAULT FALSE,
        reminder_sent BOOLEAN DEFAULT FALSE
      );

      -- Invoices
      CREATE TABLE IF NOT EXISTS invoices (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ,
        paid_at TIMESTAMPTZ,
        invoice_number TEXT NOT NULL UNIQUE,
        client TEXT NOT NULL,
        item TEXT NOT NULL,
        amount INTEGER NOT NULL CHECK (amount > 0),
        status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'paid')),
        due_date TIMESTAMPTZ,
        payment_instruction TEXT,
        note TEXT
      );

      -- Email queue for async sending
      CREATE TABLE IF NOT EXISTS email_queue (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        created_at TIMESTAMPTZ DEFAULT NOW(),
        scheduled_for TIMESTAMPTZ DEFAULT NOW(),
        to_email TEXT NOT NULL,
        subject TEXT NOT NULL,
        body TEXT NOT NULL,
        attempts INTEGER DEFAULT 0,
        max_attempts INTEGER DEFAULT 3,
        status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'sent', 'failed')),
        error TEXT,
        sent_at TIMESTAMPTZ
      );

      -- Indexes for performance
      CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
      CREATE INDEX IF NOT EXISTS idx_leads_next_action ON leads(next_action_at) WHERE next_action_at IS NOT NULL;
      CREATE INDEX IF NOT EXISTS idx_events_created ON events(created_at DESC);
      CREATE INDEX IF NOT EXISTS idx_cold_email_status ON cold_email_targets(status);
      CREATE INDEX IF NOT EXISTS idx_send_history_target ON send_history(target_id);
      CREATE INDEX IF NOT EXISTS idx_email_queue_status ON email_queue(status, scheduled_for);
    `,
  },
];

// Run migrations
export async function runMigrations() {
  if (!isDbConfigured()) {
    console.log("[DB] Supabase not configured, skipping migrations");
    return;
  }

  const db = getDb();

  // Create migrations tracking table
  try {
    await db.rpc("exec", {
      sql: `
        CREATE TABLE IF NOT EXISTS _migrations (
          id TEXT PRIMARY KEY,
          applied_at TIMESTAMPTZ DEFAULT NOW()
        );
      `,
    });
  } catch {
    // RPC might not exist, table will be created by first migration
    console.log("[DB] RPC exec not available, using fallback");
  }

  // Check which migrations have been applied
  const { data: applied } = await db
    .from("_migrations")
    .select("id");

  const appliedIds = new Set(applied?.map((m) => m.id) || []);

  // Apply pending migrations
  for (const migration of MIGRATIONS) {
    if (appliedIds.has(migration.id)) continue;

    console.log(`[DB] Applying migration: ${migration.id}`);
    
    // Execute migration
    const { error } = await db.rpc("exec", { sql: migration.sql });
    
    if (error) {
      console.error(`[DB] Migration ${migration.id} failed:`, error);
      throw error;
    }

    // Record migration
    await db.from("_migrations").insert({ id: migration.id });
    console.log(`[DB] Migration ${migration.id} applied`);
  }

  console.log("[DB] All migrations complete");
}

// Query helpers with proper types
export const queries = {
  leads: {
    list: async () => {
      const db = getDb();
      const { data, error } = await db
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
    
    create: async (lead: any) => {
      const db = getDb();
      const { data, error } = await db
        .from("leads")
        .insert(lead)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    
    update: async (id: string, patch: any) => {
      const db = getDb();
      const { data, error } = await db
        .from("leads")
        .update({ ...patch, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
  },

  events: {
    list: async (limit = 5000) => {
      const db = getDb();
      const { data, error } = await db
        .from("events")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(limit);
      if (error) throw error;
      return data || [];
    },
    
    create: async (event: any) => {
      const db = getDb();
      const { error } = await db.from("events").insert(event);
      if (error) throw error;
    },
  },

  coldEmailTargets: {
    list: async () => {
      const db = getDb();
      const { data, error } = await db
        .from("cold_email_targets")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
    
    create: async (target: any) => {
      const db = getDb();
      const { data, error } = await db
        .from("cold_email_targets")
        .insert(target)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    
    update: async (id: string, patch: any) => {
      const db = getDb();
      const { data, error } = await db
        .from("cold_email_targets")
        .update(patch)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    
    delete: async (id: string) => {
      const db = getDb();
      const { error } = await db
        .from("cold_email_targets")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
  },

  sendHistory: {
    list: async () => {
      const db = getDb();
      const { data, error } = await db
        .from("send_history")
        .select("*")
        .order("sent_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
    
    create: async (entry: any) => {
      const db = getDb();
      const { error } = await db.from("send_history").insert(entry);
      if (error) throw error;
    },
  },

  emailQueue: {
    pending: async (limit = 10) => {
      const db = getDb();
      const { data, error } = await db
        .from("email_queue")
        .select("*")
        .eq("status", "pending")
        .lte("scheduled_for", new Date().toISOString())
        .order("scheduled_for", { ascending: true })
        .limit(limit);
      if (error) throw error;
      return data || [];
    },
    
    create: async (email: any) => {
      const db = getDb();
      const { data, error } = await db
        .from("email_queue")
        .insert(email)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    
    markProcessing: async (id: string) => {
      const db = getDb();
      await db
        .from("email_queue")
        .update({ status: "processing", attempts: db.rpc("increment") })
        .eq("id", id);
    },
    
    markSent: async (id: string) => {
      const db = getDb();
      await db
        .from("email_queue")
        .update({ status: "sent", sent_at: new Date().toISOString() })
        .eq("id", id);
    },
    
    markFailed: async (id: string, error: string) => {
      const db = getDb();
      await db
        .from("email_queue")
        .update({ status: "failed", error })
        .eq("id", id);
    },
  },
};
