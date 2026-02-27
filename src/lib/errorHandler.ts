// Centralized Error Handling & Alerting
// Catches errors, logs them, and sends alerts for critical issues

import { config } from "./config";

export type ErrorSeverity = "info" | "warning" | "error" | "critical";

interface ErrorContext {
  requestId?: string;
  userId?: string;
  path?: string;
  method?: string;
  metadata?: Record<string, unknown>;
}

interface ErrorReport {
  timestamp: string;
  severity: ErrorSeverity;
  message: string;
  stack?: string;
  context: ErrorContext;
}

// In-memory store for recent errors (last 100)
const recentErrors: ErrorReport[] = [];
const MAX_STORED_ERRORS = 100;

/**
 * Report an error
 * Logs to console, stores in memory, and alerts if critical
 */
export function reportError(
  error: Error | string,
  severity: ErrorSeverity = "error",
  context: ErrorContext = {}
): ErrorReport {
  const report: ErrorReport = {
    timestamp: new Date().toISOString(),
    severity,
    message: error instanceof Error ? error.message : error,
    stack: error instanceof Error ? error.stack : undefined,
    context,
  };

  // Always log to console
  const logMethod = severity === "critical" ? console.error : 
                    severity === "error" ? console.error :
                    severity === "warning" ? console.warn : console.log;
  
  logMethod(`[${severity.toUpperCase()}] ${report.message}`, {
    ...context,
    stack: report.stack,
  });

  // Store in memory
  recentErrors.unshift(report);
  if (recentErrors.length > MAX_STORED_ERRORS) {
    recentErrors.pop();
  }

  // Alert if critical
  if (severity === "critical") {
    alertCriticalError(report);
  }

  return report;
}

/**
 * Send critical error alert via Telegram
 */
async function alertCriticalError(report: ErrorReport) {
  if (!config.telegramBotToken || !config.telegramChatId) {
    console.warn("[Alert] Telegram not configured, skipping critical alert");
    return;
  }

  const text = [
    "🚨 CRITICAL ERROR",
    "",
    `Message: ${report.message.slice(0, 200)}`,
    `Path: ${report.context.path || "unknown"}`,
    `Time: ${report.timestamp}`,
    `Request ID: ${report.context.requestId || "none"}`,
  ].join("\n");

  try {
    await fetch(`https://api.telegram.org/bot${config.telegramBotToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: config.telegramChatId,
        text,
        disable_web_page_preview: true,
      }),
    });
  } catch (e) {
    console.error("[Alert] Failed to send Telegram alert:", e);
  }
}

/**
 * Get recent errors for debugging
 */
export function getRecentErrors(
  severity?: ErrorSeverity,
  limit = 10
): ErrorReport[] {
  let filtered = recentErrors;
  if (severity) {
    filtered = recentErrors.filter((e) => e.severity === severity);
  }
  return filtered.slice(0, limit);
}

/**
 * API route wrapper with automatic error handling
 */
export function withErrorHandler<T extends (...args: any[]) => Promise<Response>>(
  handler: T,
  options: { severity?: ErrorSeverity; context?: ErrorContext } = {}
): T {
  return (async (...args: any[]) => {
    const requestId = crypto.randomUUID();
    const context: ErrorContext = {
      requestId,
      ...options.context,
    };

    try {
      return await handler(...args);
    } catch (error) {
      reportError(
        error instanceof Error ? error : String(error),
        options.severity || "error",
        context
      );

      // Return generic error response
      return new Response(
        JSON.stringify({
          error: "Internal server error",
          requestId,
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }) as T;
}

/**
 * Async operation wrapper with retry logic
 */
export async function withRetry<T>(
  operation: () => Promise<T>,
  options: {
    maxRetries?: number;
    delayMs?: number;
    backoff?: number;
    onError?: (error: Error, attempt: number) => void;
  } = {}
): Promise<T> {
  const { maxRetries = 3, delayMs = 1000, backoff = 2 } = options;
  
  let lastError: Error;
  let delay = delayMs;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      
      if (options.onError) {
        options.onError(lastError, attempt);
      }

      if (attempt < maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay *= backoff;
      }
    }
  }

  throw lastError!;
}
