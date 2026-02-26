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
        <div className="text-center px-5">
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-amber-300 border-t-transparent mx-auto mb-6"></div>
          <h2 className="text-2xl font-display text-zinc-100 mb-2">Analyzing your website...</h2>
          <p className="text-zinc-400">Running 15+ checks on security, speed, SEO & conversions</p>
          <p className="text-zinc-500 text-sm mt-4">This usually takes 10-15 seconds</p>
        </div>
      </main>
    );
  }

  if (step === "results" && results) {
    const scoreColor = results.score >= 80 ? "text-emerald-400" : results.score >= 60 ? "text-amber-300" : "text-red-400";
    const scoreBg = results.score >= 80 ? "bg-emerald-500/20 border-emerald-500/30" : results.score >= 60 ? "bg-amber-500/20 border-amber-500/30" : "bg-red-500/20 border-red-500/30";
    const grade = results.score >= 90 ? "A" : results.score >= 80 ? "B+" : results.score >= 70 ? "B" : results.score >= 60 ? "C" : results.score >= 50 ? "D" : "F";

    return (
      <main className="min-h-screen bg-[#09090b] text-[#f5f3ef] py-12 px-5">
        <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_15%_20%,rgba(245,158,11,0.14),transparent_30%),radial-gradient(circle_at_85%_0%,rgba(251,191,36,0.08),transparent_28%),linear-gradient(to_bottom,rgba(10,10,10,0.96),rgba(10,10,10,1))]" />
        
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-8">
            <p className="text-xs uppercase tracking-[0.18em] text-amber-300 mb-2">Website Audit Results</p>
            <h1 className="font-display text-2xl sm:text-3xl text-zinc-100">{results.businessName}</h1>
            {results.website && (
              <a href={results.website} target="_blank" rel="noopener" className="text-amber-300 hover:text-amber-200 text-sm transition">
                {results.website}
              </a>
            )}
          </div>

          {/* Score Card with Grade */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-8 mb-6">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              {/* Score Circle */}
              <div className={`inline-flex items-center justify-center w-40 h-40 rounded-full border-4 ${scoreBg}`}>
                <div className="text-center">
                  <span className={`text-6xl font-display ${scoreColor}`}>{results.score}</span>
                  <span className="text-xl text-zinc-500">/100</span>
                </div>
              </div>
              
              {/* Grade */}
              <div className="text-center md:text-left">
                <p className="text-sm text-zinc-400 mb-1">Overall Grade</p>
                <p className={`text-5xl font-display ${scoreColor}`}>{grade}</p>
                <p className="text-zinc-500 text-sm mt-2 max-w-xs">
                  {results.score >= 80 ? "Excellent! Your site is well-optimized." : 
                   results.score >= 60 ? "Good foundation, but improvements needed." : 
                   "Critical issues are hurting your business."}
                </p>
              </div>
            </div>
          </div>

          {/* Category Scores */}
          {results.categoryScores && (
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 mb-6">
              <h2 className="font-display text-lg text-zinc-100 mb-5">Category Breakdown</h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  { key: "security", label: "Security", icon: "🔒" },
                  { key: "performance", label: "Speed", icon: "⚡" },
                  { key: "seo", label: "SEO", icon: "🔍" },
                  { key: "conversion", label: "Conversion", icon: "💰" },
                  { key: "accessibility", label: "Accessibility", icon: "♿" },
                ].map((cat) => {
                  const score = results.categoryScores?.[cat.key as keyof typeof results.categoryScores] || 0;
                  const max = cat.key === "security" ? 15 : cat.key === "performance" ? 20 : cat.key === "seo" ? 29 : cat.key === "conversion" ? 20 : 16;
                  const pct = Math.round((score / max) * 100);
                  return (
                    <div key={cat.key} className="text-center p-4 rounded-lg border border-zinc-800 bg-zinc-900/50">
                      <span className="text-2xl mb-2 block">{cat.icon}</span>
                      <div className="text-2xl font-display text-zinc-100">{score}</div>
                      <div className="text-xs text-zinc-500">{cat.label}</div>
                      <div className="mt-2 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${pct >= 70 ? 'bg-emerald-400' : pct >= 40 ? 'bg-amber-300' : 'bg-red-400'}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Detailed Checks */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 mb-6">
            <h2 className="font-display text-lg text-zinc-100 mb-5">Detailed Analysis</h2>
            <div className="space-y-3">
              {results.checks.map((check, i) => (
                <div key={i} className="flex items-start gap-4 py-4 border-b border-zinc-800 last:border-0">
                  <span className={`text-xl shrink-0 ${check.passed ? "text-emerald-400" : check.severity === "critical" ? "text-red-400" : "text-amber-300"}`}>
                    {check.passed ? "✓" : check.severity === "critical" ? "✗" : "⚠"}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-zinc-200 font-medium">{check.name}</p>
                    <p className="text-zinc-500 text-sm mt-1">{check.message}</p>
                  </div>
                  <span className="text-amber-300 font-mono text-sm shrink-0">+{check.points}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Critical Issues */}
          {results.issues.length > 0 && (
            <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 mb-6">
              <h2 className="font-display text-lg text-red-400 mb-4">⚠ Critical Issues Found</h2>
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

          {/* Recommendations */}
          {results.recommendations && results.recommendations.length > 0 && (
            <div className="rounded-2xl border border-amber-300/20 bg-amber-500/5 p-6 mb-6">
              <h2 className="font-display text-lg text-amber-300 mb-4">💡 Priority Recommendations</h2>
              <ul className="space-y-3">
                {results.recommendations.map((rec, i) => (
                  <li key={i} className="flex items-start gap-3 text-zinc-300 text-sm">
                    <span className="text-amber-300 mt-0.5">→</span>
                    {rec}
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
              We specialize in turning low-performing websites into customer-generating machines. 
              Average client sees 3x more leads within 60 days.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://cal.com/plainsightdigital/30min"
                target="_blank"
                rel="noopener"
                className="rounded-md bg-amber-300 px-7 py-3.5 text-sm font-semibold tracking-wide text-zinc-950 transition hover:bg-amber-200"
              >
                📅 Book Free Strategy Call
              </a>
              <a
                href="mailto:dylan@plainsight.digital?subject=Website Audit Follow-up - ${encodeURIComponent(results.businessName)}"
                className="rounded-md border border-zinc-700 px-7 py-3.5 text-sm text-zinc-200 transition hover:border-zinc-500 hover:bg-zinc-900"
              >
                ✉️ Email Audit Questions
              </a>
            </div>
            <p className="text-zinc-500 text-xs mt-4">
              Free 30-min call • No obligation • Actionable advice
            </p>
          </div>

          {/* Back link */}
          <div className="text-center mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/audit" className="text-zinc-500 hover:text-amber-300 text-sm transition">
              ← Grade another website
            </a>
            <a href="/" className="text-zinc-500 hover:text-amber-300 text-sm transition">
              ← Back to home
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
            Free Website Audit
          </h1>
          <p className="text-zinc-400">
            Get a comprehensive analysis of your website in 30 seconds. 
            15+ checks covering security, speed, SEO, and conversions.
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
                className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-4 py-3 text-zinc-100 placeholder-zinc-500 focus:border-amber-300 focus:outline-none"
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
                className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-4 py-3 text-zinc-100 placeholder-zinc-500 focus:border-amber-300 focus:outline-none"
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
                className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-4 py-3 text-zinc-100 placeholder-zinc-500 focus:border-amber-300 focus:outline-none"
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
                className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-4 py-3 text-zinc-100 placeholder-zinc-500 focus:border-amber-300 focus:outline-none"
                placeholder="https://yourwebsite.com"
              />
              <p className="text-zinc-500 text-xs mt-2">Leave blank if you don&apos;t have a website yet — we&apos;ll audit your digital presence.</p>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-zinc-300 mb-2">
                Phone Number <span className="text-zinc-600">(optional)</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-4 py-3 text-zinc-100 placeholder-zinc-500 focus:border-amber-300 focus:outline-none"
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
            Get My Free Audit →
          </button>

          <p className="text-zinc-500 text-xs text-center mt-4">
            Results sent to your email • No spam • Unsubscribe anytime
          </p>
        </form>

        {/* Trust signals */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
            <div className="text-2xl font-display text-amber-300">15+</div>
            <div className="text-zinc-500 text-xs">Checks run</div>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
            <div className="text-2xl font-display text-amber-300">30s</div>
            <div className="text-zinc-500 text-xs">to complete</div>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
            <div className="text-2xl font-display text-amber-300">100%</div>
            <div className="text-zinc-500 text-xs">free</div>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
            <div className="text-2xl font-display text-amber-300">3x</div>
            <div className="text-zinc-500 text-xs">avg. leads increase</div>
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

type Check = {
  name: string;
  message: string;
  passed: boolean;
  points: number;
  severity?: "critical" | "warning" | "good";
};

type AuditResult = {
  score: number;
  businessName: string;
  website: string;
  checks: Check[];
  issues: string[];
  recommendations?: string[];
  categoryScores?: {
    security: number;
    performance: number;
    seo: number;
    conversion: number;
    accessibility: number;
  };
};
