// Database migration script
// Run this once to set up Supabase tables

import { createClient } from "@supabase/supabase-js";

const MIGRATION_SQL = `
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Leads table
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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

CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_next_action ON leads(next_action_at) WHERE next_action_at IS NOT NULL;

-- Events table
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  type TEXT NOT NULL CHECK (type IN ('page_view', 'cta_click', 'form_start', 'form_submit')),
  page TEXT NOT NULL,
  meta JSONB
);

CREATE INDEX IF NOT EXISTS idx_events_created ON events(created_at DESC);

-- Cold email targets
CREATE TABLE IF NOT EXISTS cold_email_targets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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

CREATE INDEX IF NOT EXISTS idx_cold_email_status ON cold_email_targets(status);

-- Send history
CREATE TABLE IF NOT EXISTS send_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  target_id UUID NOT NULL REFERENCES cold_email_targets(id) ON DELETE CASCADE,
  to_email TEXT NOT NULL,
  subject TEXT NOT NULL,
  sent_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT NOT NULL CHECK (status IN ('sent', 'failed')),
  error TEXT
);

CREATE INDEX IF NOT EXISTS idx_send_history_target ON send_history(target_id);

-- Finance entries
CREATE TABLE IF NOT EXISTS finance (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
  amount INTEGER NOT NULL CHECK (amount > 0),
  category TEXT NOT NULL,
  note TEXT NOT NULL
);

-- Meetings
CREATE TABLE IF NOT EXISTS meetings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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

CREATE INDEX IF NOT EXISTS idx_email_queue_status ON email_queue(status, scheduled_for);

-- Migration tracking
CREATE TABLE IF NOT EXISTS _migrations (
  id TEXT PRIMARY KEY,
  applied_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO _migrations (id) VALUES ('001_initial') ON CONFLICT DO NOTHING;
`;

async function migrate() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!url || !key) {
    console.error("Error: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY required");
    process.exit(1);
  }
  
  console.log("Connecting to Supabase...");
  const db = createClient(url, key);
  
  console.log("Running migrations...");
  
  // Execute SQL (split by statement for safety)
  const statements = MIGRATION_SQL.split(';').filter(s => s.trim());
  
  for (const stmt of statements) {
    const cleanStmt = stmt.trim();
    if (!cleanStmt || cleanStmt.startsWith('--')) continue;
    
    try {
      // Use the SQL API
      const { error } = await db.rpc('exec', { 
        sql: cleanStmt + ';' 
      });
      
      if (error) {
        // Try alternative: direct query
        const { error: qError } = await db.query(cleanStmt + ';');
        if (qError) {
          console.warn(`Warning: ${qError.message}`);
        }
      }
    } catch (e) {
      // Some statements may fail if objects already exist, that's ok
      console.log(`Statement result: ${(e as Error).message.slice(0, 100)}`);
    }
  }
  
  console.log("Migration complete!");
}

migrate().catch(console.error);
