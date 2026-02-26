"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to your error tracking service
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f5f3ef] flex items-center justify-center px-5">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">⚠️</div>
        <h1 className="font-display text-2xl text-zinc-100 mb-4">Something went wrong</h1>
        <p className="text-zinc-400 mb-8">
          We apologize for the inconvenience. Our team has been notified and is working on a fix.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="rounded-md bg-amber-300 px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-amber-200"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="rounded-md border border-zinc-700 px-6 py-3 text-sm text-zinc-200 transition hover:border-zinc-500"
          >
            Go Home
          </Link>
        </div>
        <div className="mt-8 p-4 rounded-lg border border-zinc-800 bg-zinc-900/50">
          <p className="text-xs text-zinc-500">
            Error ID: {error.digest || "unknown"}
          </p>
          <p className="text-xs text-zinc-600 mt-2">
            If this persists, contact us at hello@plainsight.digital
          </p>
        </div>
      </div>
    </div>
  );
}
