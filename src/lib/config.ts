// Centralized environment configuration
// Validates required env vars at runtime — not at build time

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

// Data directory resolution (same logic as stores)
export const DATA_DIR = process.env.DATA_DIR
  ? requireEnv("DATA_DIR")
  : process.env.VERCEL
    ? "/tmp/plainsight-data"
    : process.cwd() + "/data";

// Config object with getters for lazy evaluation
// This prevents build-time errors for vars that only exist at runtime
export const config = {
  // Auth (JWT) - lazy loaded
  get jwtSecret() { return requireEnv("JWT_SECRET"); },
  get adminUser() { return requireEnv("ADMIN_BASIC_USER"); },
  get adminPass() { return requireEnv("ADMIN_BASIC_PASS"); },
  
  // Email (Resend) - lazy loaded
  get resendApiKey() { return requireEnv("RESEND_API_KEY"); },
  get fromEmail() { return requireEnv("FOLLOWUP_FROM_EMAIL"); },
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
