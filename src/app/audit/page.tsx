"use client";

import { useState } from "react";

export default function AuditPage() {
  const [step, setStep] = useState<"form" | "analyzing" | "results">("form");
  const [results, setResults] = useState<AuditResult | null>(null);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setStep("analyzing");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        body: data,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Analysis failed");
      }

      const result = await res.json();
      setResults(result);
      setStep("results");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setStep("form");
    }
  }

  if (step === "analyzing") {
    return (
      <main className="min-h-screen bg-[#09090b] text-[#f5f3ef] flex items-center justify-center">
        <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_15%_20%,rgba(245,158,11,0.14),transparent_30%),radial-gradient(circle_at_85%_0%,rgba(251,191,36,0.08),transparent_28%),linear-gradient(to_bottom,rgba(10,10,10,0.96),rgba(10,10,10,1))]" />
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-amber-300 border-t-transparent mx-auto mb-6"></div>
          <h2 className="text-2xl font-display text-zinc-100 mb-2">Analyzing your website...</h2>
          <p className="text-zinc-400">This usually takes 5-10 seconds</p>
        </div>
      </main>
    );
  }

  if (step === "results" && results) {
    const scoreColor = results.score >= 70 ? "text-emerald-400" : results.score >= 40 ? "text-amber-300" : "text-red-400";
    const scoreBg = results.score >= 70 ? "bg-emerald-500/20 border-emerald-500/30" : results.score >= 40 ? "bg-amber-500/20 border-amber-500/30" : "bg-red-500/20 border-red-500/30";

    return (
      <main className="min-h-screen bg-[#09090b] text-[#f5f3ef] py-12 px-5">
        <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_15%_20%,rgba(245,158,11,0.14),transparent_30%),radial-gradient(circle_at_85%_0%,rgba(251,191,36,0.08),transparent_28%),linear-gradient(to_bottom,rgba(10,10,10,0.96),rgba(10,10,10,1))]" />
        
        <div className="mx-auto max-w-3xl">
          {/* Score Card */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-8 mb-6 text-center">
            <p className="text-xs uppercase tracking-[0.18em] text-amber-300 mb-4">Website Score</p>
            
            <div className={`inline-flex items-center justify-center w-36 h-36 rounded-full border ${scoreBg} mb-6`}>
              <span className={`text-5xl font-display ${scoreColor}`}>{results.score}</span>
              <span className="text-xl text-zinc-500 ml-1">/100</span>
            </div>

            <p className="text-xl font-display text-zinc-100 mb-2">{results.businessName}</p>
            {results.website && (
              <a href={results.website} target="_blank" rel="noopener" className="text-amber-300 hover:text-amber-200 text-sm transition">
                {results.website}
              </a>
            )}
          </div>

          {/* Breakdown */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 mb-6">
            <h2 className="font-display text-xl text-zinc-100 mb-5">Score Breakdown</h2>
            <div className="space-y-4">
              {results.checks.map((check, i) => (
                <div key={i} className="flex items-start gap-4 py-3 border-b border-zinc-800 last:border-0">
                  <span className={`text-lg ${check.passed ? "text-emerald-400" : "text-red-400"}`}>
                    {check.passed ? "✓" : "✗"}
                  </span>
                  <div className="flex-1">
                    <p className="text-zinc-200 font-medium">{check.name}</p>
                    <p className="text-zinc-500 text-sm mt-1">{check.message}</p>
                  </div>
                  <span className="text-amber-300 font-mono text-sm">+{check.points}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Issues */}
          {results.issues.length > 0 && (
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 mb-6">
              <h2 className="font-display text-xl text-zinc-100 mb-5">Top Issues Found</h2>
              <ul className="space-y-3">
                {results.issues.map((issue, i) => (
                  <li key={i} className="flex items-start gap-3 text-zinc-300 text-sm">
                    <span className="text-red-400 mt-0.5">•</span>
                    {issue}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* CTA */}
          <div className="rounded-2xl border border-amber-300/30 bg-gradient-to-br from-amber-500/10 to-orange-500/5 p-8 text-center">
            <h2 className="font-display text-2xl text-zinc-100 mb-3">
              Want to fix these issues?
            </h2>
            <p className="text-zinc-400 mb-6 max-w-md mx-auto">
              We&apos;ll improve your website to convert more visitors into customers — at a competitive price.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://cal.com/plainsightdigital/30min"
                target="_blank"
                rel="noopener"
                className="rounded-md bg-amber-300 px-7 py-3.5 text-sm font-semibold tracking-wide text-zinc-950 transition hover:bg-amber-200"
              >
                📅 Book a Free Call
              </a>
              <a
                href="mailto:dylan@plainsight.digital"
                className="rounded-md border border-zinc-700 px-7 py-3.5 text-sm text-zinc-200 transition hover:border-zinc-500 hover:bg-zinc-900"
              >
                ✉️ Email Us
              </a>
            </div>
          </div>

          {/* Back link */}
          <div className="text-center mt-8">
            <a href="/audit" className="text-zinc-500 hover:text-amber-300 text-sm transition">
              ← Grade another website
            </a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#09090b] text-[#f5f3ef] py-12 px-5">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_15%_20%,rgba(245,158,11,0.14),transparent_30%),radial-gradient(circle_at_85%_0%,rgba(251,191,36,0.08),transparent_28%),linear-gradient(to_bottom,rgba(10,10,10,0.96),rgba(10,10,10,1))]" />
      
      <div className="mx-auto max-w-xl">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-[0.18em] text-amber-300 mb-4">Plainsight Digital</p>
          <h1 className="font-display text-3xl sm:text-4xl text-zinc-100 mb-4">
            Free Website Grader
          </h1>
          <p className="text-zinc-400">
            Get your website score in 30 seconds. Find out what&apos;s working and what needs improvement.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 sm:p-8">
          <div className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-2">
                Your Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="input"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="input"
                placeholder="john@company.com"
              />
            </div>

            <div>
              <label htmlFor="businessName" className="block text-sm font-medium text-zinc-300 mb-2">
                Business Name *
              </label>
              <input
                type="text"
                id="businessName"
                name="businessName"
                required
                className="input"
                placeholder="Acme Ltd"
              />
            </div>

            <div>
              <label htmlFor="website" className="block text-sm font-medium text-zinc-300 mb-2">
                Website URL
              </label>
              <input
                type="url"
                id="website"
                name="website"
                className="input"
                placeholder="https://yourwebsite.com"
              />
              <p className="text-zinc-500 text-xs mt-2">Leave blank if you don&apos;t have a website yet</p>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-zinc-300 mb-2">
                Phone Number <span className="text-zinc-600">(optional)</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="input"
                placeholder="+254 7XX XXX XXX"
              />
            </div>
          </div>

          {error && (
            <div className="mt-5 p-4 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full mt-6 rounded-md bg-amber-300 px-7 py-3.5 text-sm font-semibold tracking-wide text-zinc-950 transition hover:bg-amber-200"
          >
            Get My Free Score →
          </button>

          <p className="text-zinc-500 text-xs text-center mt-4">
            We&apos;ll send you the results via email too
          </p>
        </form>

        {/* Trust signals */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
            <div className="text-2xl font-display text-amber-300">30s</div>
            <div className="text-zinc-500 text-xs">to complete</div>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
            <div className="text-2xl font-display text-amber-300">100%</div>
            <div className="text-zinc-500 text-xs">free</div>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
            <div className="text-2xl font-display text-amber-300">No</div>
            <div className="text-zinc-500 text-xs">spam ever</div>
          </div>
        </div>

        {/* Back to main site */}
        <div className="text-center mt-8">
          <a href="/" className="text-zinc-500 hover:text-amber-300 text-sm transition">
            ← Back to Plainsight Digital
          </a>
        </div>
      </div>
    </main>
  );
}

type AuditResult = {
  score: number;
  businessName: string;
  website: string;
  checks: { name: string; message: string; passed: boolean; points: number }[];
  issues: string[];
};
