// Centralized environment configuration
// Validates required env vars at startup — fails fast if anything missing

function requireEnv(key: string): string {
  const val = process.env[key]?.trim();
  if (!val) {
    throw new Error(`[Config] Missing required environment variable: ${key}`);
  }
  return val;
}

function optionalEnv(key: string): string | undefined {
  return process.env[key]?.trim() || undefined;
}

// Required for app to function
export const config = {
  // Auth
  adminSessionToken: requireEnv("ADMIN_SESSION_TOKEN"),
  
  // Email (Resend)
  resendApiKey: requireEnv("RESEND_API_KEY"),
  fromEmail: requireEnv("FOLLOWUP_FROM_EMAIL"),
  replyToEmail: optionalEnv("REPLY_TO_EMAIL"),
  
  // Notifications
  telegramBotToken: optionalEnv("TELEGRAM_BOT_TOKEN"),
  telegramChatId: optionalEnv("TELEGRAM_LEADS_CHAT_ID"),
  
  // Cal.com webhook
  calWebhookSecret: optionalEnv("CAL_WEBHOOK_SECRET"),
  
  // Remote storage (Supabase)
  supabaseUrl: optionalEnv("SUPABASE_URL"),
  supabaseServiceKey: optionalEnv("SUPABASE_SERVICE_ROLE_KEY"),
} as const;

// Data directory resolution (same logic as stores)
export const DATA_DIR = process.env.DATA_DIR
  ? requireEnv("DATA_DIR")
  : process.env.VERCEL
    ? "/tmp/plainsight-data"
    : process.cwd() + "/data";
