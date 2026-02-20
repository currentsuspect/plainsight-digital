"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type LeadForm = {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  website: string;
  niche: "clinic" | "law" | "school" | "hotel" | "logistics";
  budget: "100k-250k" | "250k-500k" | "500k-1m" | "1m+";
  painPoint: string;
};

const sectors = [
  "Private Clinics & Medical Centers",
  "Law Firms",
  "Private Schools",
  "Hotels & Resorts",
  "Logistics Companies",
];

const pillars = [
  {
    title: "Authority-first design",
    text: "Your digital presence should feel like a market leader before anyone books a call.",
  },
  {
    title: "Revenue path engineering",
    text: "We design every page around inquiry, booking, and payment conversion paths.",
  },
  {
    title: "Operational follow-through",
    text: "Lead routing, follow-up sequences, and dashboard visibility so opportunities don’t leak.",
  },
];

const outcomes = [
  { value: "High-ticket", label: "Client positioning" },
  { value: "Kenya-first", label: "Market strategy" },
  { value: "Global-ready", label: "Payment expansion path" },
  { value: "Fast execution", label: "Delivery rhythm" },
];

const proofOfWork = [
  {
    title: "Resonance Platform",
    result: "AI product shipped",
    note: "Built a full-stack companion platform with chat, notes, music, and workflow integrations.",
  },
  {
    title: "Aestra",
    result: "Creative tech build",
    note: "Developed a distinct product experience around advanced audio tooling and brand identity.",
  },
  {
    title: "Plainsight Lead Engine",
    result: "End-to-end pipeline",
    note: "Shipped capture, scoring, outreach workflows, and ops dashboard to support client growth.",
  },
];
export default function Home() {
  const [form, setForm] = useState<LeadForm>({
    name: "",
    businessName: "",
    email: "",
    phone: "",
    website: "",
    niche: "clinic",
    budget: "250k-500k",
    painPoint: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "error">("idle");
  const ctaHref = useMemo(() => "#audit", []);

  useEffect(() => {
    void track("page_view", window.location.pathname);
  }, []);

  async function track(type: "page_view" | "cta_click" | "form_start" | "form_submit", page: string, meta?: Record<string, string>) {
    try {
      await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, page, meta }),
      });
    } catch {
      // no-op
    }
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "plainsight-site" }),
      });

      if (!res.ok) throw new Error("Failed to submit");

      await track("form_submit", window.location.pathname, { niche: form.niche, budget: form.budget });
      setStatus("sent");
      setForm({
        name: "",
        businessName: "",
        email: "",
        phone: "",
        website: "",
        niche: "clinic",
        budget: "250k-500k",
        painPoint: "",
      });
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="min-h-screen bg-[#09090b] text-[#f5f3ef]">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_15%_20%,rgba(245,158,11,0.14),transparent_30%),radial-gradient(circle_at_85%_0%,rgba(251,191,36,0.08),transparent_28%),linear-gradient(to_bottom,rgba(10,10,10,0.96),rgba(10,10,10,1))]" />

      <section className="mx-auto max-w-6xl px-5 pt-16 pb-12 sm:px-7 md:pt-24 md:pb-16">
        <p className="reveal text-sm uppercase tracking-[0.24em] text-amber-300">Plainsight Digital</p>
        <h1 className="reveal reveal-delay-1 mt-4 max-w-5xl font-display text-4xl leading-[1.05] sm:text-5xl md:text-7xl">
          Luxury-grade websites for businesses that can’t afford to look average.
        </h1>
        <p className="reveal reveal-delay-2 mt-6 max-w-3xl text-base text-zinc-300 sm:text-lg">
          We build high-conversion digital systems for clinics, law firms, schools, hotels, and logistics brands — engineered as a lifetime investment fee, not a disposable design expense.
        </p>

        <div className="reveal reveal-delay-3 mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href={ctaHref}
            onClick={() => void track("cta_click", window.location.pathname, { cta: "hero_audit" })}
            className="rounded-md bg-amber-300 px-7 py-3 text-center text-sm font-semibold tracking-wide text-zinc-950 transition hover:bg-amber-200"
          >
            Request Premium Audit
          </a>
          <a href="#work" className="rounded-md border border-zinc-700 px-7 py-3 text-center text-sm text-zinc-200 transition hover:border-zinc-500 hover:bg-zinc-900">
            See Market Fit
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-10 sm:px-7">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {outcomes.map((item) => (
            <div key={item.label} className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-4">
              <p className="font-display text-xl text-amber-200 sm:text-2xl">{item.value}</p>
              <p className="text-xs uppercase tracking-wide text-zinc-400">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="work" className="mx-auto max-w-6xl px-5 py-12 sm:px-7 md:py-16">
        <div className="grid gap-5 md:grid-cols-3">
          {pillars.map((item) => (
            <article key={item.title} className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
              <h2 className="font-display text-2xl text-zinc-100">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-zinc-300">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-8 sm:px-7 md:py-12">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 md:p-8">
          <p className="text-xs uppercase tracking-[0.18em] text-amber-300">About Plainsight</p>
          <h2 className="mt-3 font-display text-3xl text-zinc-100">We build for operators, not vanity metrics.</h2>
          <p className="mt-4 max-w-3xl text-zinc-300">
            We’re a small team that cares about business outcomes. If your site looks decent but doesn’t close, we fix the conversion path, tighten your offer, and make follow-up easier for your team.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-4 sm:px-7 md:py-8">
        <p className="text-xs uppercase tracking-[0.18em] text-amber-300">Proof of work</p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {proofOfWork.map((item) => (
            <article key={item.title} className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5">
              <p className="text-xs uppercase tracking-wide text-amber-200">{item.result}</p>
              <h3 className="mt-2 text-lg font-semibold text-zinc-100">{item.title}</h3>
              <p className="mt-2 text-sm text-zinc-300">{item.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-8 sm:px-7 md:py-12">
        <div className="rounded-2xl border border-amber-300/20 bg-gradient-to-br from-zinc-900/90 to-zinc-950 p-6 md:p-8">
          <p className="text-xs uppercase tracking-[0.18em] text-amber-300">Target sectors</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {sectors.map((sector) => (
              <div key={sector} className="rounded-lg border border-zinc-800 bg-zinc-900/60 px-4 py-3 text-sm text-zinc-200">
                {sector}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="audit" className="mx-auto max-w-4xl px-5 py-12 sm:px-7 md:py-16">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5 sm:p-7 md:p-8">
          <h2 className="font-display text-3xl text-zinc-100">Get your high-ticket website audit</h2>
          <p className="mt-3 text-zinc-300">You’ll get conversion leaks, trust gaps, and practical fixes your team can execute immediately.</p>

          <form
            className="mt-7 grid gap-4 md:grid-cols-2"
            onFocus={() => void track("form_start", window.location.pathname, { form: "premium_audit" })}
            onSubmit={onSubmit}
          >
            <Field label="Your Name">
              <input required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className="input" />
            </Field>

            <Field label="Business Name">
              <input required value={form.businessName} onChange={(e) => setForm((f) => ({ ...f, businessName: e.target.value }))} className="input" />
            </Field>

            <Field label="Email">
              <input type="email" required value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} className="input" />
            </Field>

            <Field label="Phone / WhatsApp">
              <input value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} className="input" />
            </Field>

            <Field label="Website URL">
              <input value={form.website} onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))} className="input" placeholder="https://" />
            </Field>

            <Field label="Industry">
              <select value={form.niche} onChange={(e) => setForm((f) => ({ ...f, niche: e.target.value as LeadForm["niche"] }))} className="input">
                <option value="clinic">Clinic / Medical Center</option>
                <option value="law">Law Firm</option>
                <option value="school">School</option>
                <option value="hotel">Hotel / Resort</option>
                <option value="logistics">Logistics</option>
              </select>
            </Field>

            <Field label="Budget Range" className="md:col-span-2">
              <select value={form.budget} onChange={(e) => setForm((f) => ({ ...f, budget: e.target.value as LeadForm["budget"] }))} className="input">
                <option value="100k-250k">KES 100k - 250k</option>
                <option value="250k-500k">KES 250k - 500k</option>
                <option value="500k-1m">KES 500k - 1M</option>
                <option value="1m+">KES 1M+</option>
              </select>
            </Field>

            <Field label="Biggest conversion problem right now" className="md:col-span-2">
              <textarea required rows={4} value={form.painPoint} onChange={(e) => setForm((f) => ({ ...f, painPoint: e.target.value }))} className="input" />
            </Field>

            <div className="md:col-span-2">
              <button disabled={status === "submitting"} className="w-full rounded-md bg-amber-300 py-3 text-sm font-semibold tracking-wide text-zinc-950 transition hover:bg-amber-200 disabled:opacity-60">
                {status === "submitting" ? "Submitting..." : "Send My Premium Audit"}
              </button>
            </div>

            {status === "sent" && <p className="md:col-span-2 text-emerald-400">Submitted — we’ll contact you shortly.</p>}
            {status === "error" && <p className="md:col-span-2 text-rose-400">Something went wrong. Please try again.</p>}
          </form>
        </div>
      </section>

      <a
        href="https://wa.me/254750192512?text=Hi%20Plainsight%20Digital%2C%20I%20want%20a%20premium%20website%20audit."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Plainsight Digital on WhatsApp"
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="block h-7 w-7 fill-current">
          <path d="M20.52 3.48A11.86 11.86 0 0 0 12.07 0C5.54 0 .23 5.3.23 11.83c0 2.08.54 4.1 1.57 5.88L0 24l6.45-1.7a11.8 11.8 0 0 0 5.62 1.43h.01c6.52 0 11.83-5.31 11.84-11.84a11.8 11.8 0 0 0-3.4-8.41ZM12.08 21.73h-.01a9.8 9.8 0 0 1-4.99-1.37l-.36-.21-3.83 1.01 1.02-3.74-.23-.38a9.81 9.81 0 0 1-1.5-5.21c0-5.42 4.41-9.83 9.84-9.83 2.63 0 5.1 1.02 6.95 2.88a9.78 9.78 0 0 1 2.88 6.95c0 5.42-4.42 9.83-9.77 9.9Zm5.39-7.36c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.23-.64.08-.3-.15-1.24-.45-2.36-1.44-.88-.78-1.47-1.74-1.64-2.03-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.62-.91-2.22-.24-.58-.49-.5-.67-.51-.17-.01-.38-.01-.58-.01-.2 0-.53.08-.81.38-.28.3-1.06 1.03-1.06 2.51 0 1.48 1.08 2.91 1.23 3.11.15.2 2.11 3.22 5.12 4.52.72.31 1.28.49 1.72.62.72.23 1.37.2 1.89.12.58-.09 1.77-.72 2.02-1.41.25-.69.25-1.28.17-1.41-.08-.13-.27-.2-.57-.35Z" />
        </svg>
      </a>
    </main>
  );
}

function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`flex flex-col gap-2 ${className}`}>
      <span className="text-sm text-zinc-300">{label}</span>
      {children}
    </label>
  );
}
