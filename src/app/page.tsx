"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type LeadForm = {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  website: string;
  niche: "dental" | "law" | "real-estate" | "other";
  budget: "<50k" | "50k-100k" | "100k-250k" | "250k+";
  painPoint: string;
};

const nicheCards = [
  {
    title: "Dental & Aesthetic Clinics",
    pitch: "Get more booked appointments with a trust-first website and WhatsApp follow-up.",
  },
  {
    title: "Law Firms",
    pitch: "Turn legal searches into consultations with credibility-driven service pages.",
  },
  {
    title: "Real Estate Agencies",
    pitch: "Capture more buyer and seller inquiries with fast, mobile-first property funnels.",
  },
];

export default function Home() {
  const [form, setForm] = useState<LeadForm>({
    name: "",
    businessName: "",
    email: "",
    phone: "",
    website: "",
    niche: "dental",
    budget: "50k-100k",
    painPoint: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "error">("idle");

  useEffect(() => {
    void track("page_view", window.location.pathname);
  }, []);

  const ctaHref = useMemo(() => "#audit", []);

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
        niche: "dental",
        budget: "50k-100k",
        painPoint: "",
      });
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="max-w-6xl mx-auto px-6 py-20 md:py-28">
        <p className="text-cyan-400 font-medium mb-4">PlainSight Digital</p>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          We build websites that bring
          <span className="text-cyan-400"> qualified clients.</span>
        </h1>
        <p className="text-slate-300 max-w-2xl text-lg mb-8">
          7-Day Lead Engine Setup for service businesses in Kenya — conversion-focused pages, WhatsApp funnels, analytics, and a clear path from visitor to inquiry.
        </p>

        <div className="flex flex-wrap gap-4">
          <a
            href={ctaHref}
            className="px-6 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold"
            onClick={() => {
              void track("cta_click", window.location.pathname, { cta: "hero_free_audit" });
            }}
          >
            Get Free 2-Minute Audit
          </a>
          <a href="/admin" className="px-6 py-3 rounded-lg border border-slate-700 hover:bg-slate-900">
            View Lead Dashboard
          </a>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Who we help first</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {nicheCards.map((card) => (
            <article key={card.title} className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
              <h3 className="font-semibold mb-2">{card.title}</h3>
              <p className="text-slate-300 text-sm">{card.pitch}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="audit" className="max-w-4xl mx-auto px-6 py-14">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-2">Request your free website performance review</h2>
          <p className="text-slate-300 mb-6">We&apos;ll send you a short teardown with conversion leaks, trust gaps, and quick wins.</p>

          <form
            className="grid md:grid-cols-2 gap-4"
            onFocus={() => {
              void track("form_start", window.location.pathname, { form: "free_audit" });
            }}
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

            <Field label="Niche">
              <select value={form.niche} onChange={(e) => setForm((f) => ({ ...f, niche: e.target.value as LeadForm["niche"] }))} className="input">
                <option value="dental">Dental / Aesthetic</option>
                <option value="law">Law Firm</option>
                <option value="real-estate">Real Estate</option>
                <option value="other">Other</option>
              </select>
            </Field>

            <Field label="Budget" className="md:col-span-2">
              <select value={form.budget} onChange={(e) => setForm((f) => ({ ...f, budget: e.target.value as LeadForm["budget"] }))} className="input">
                <option value="<50k">Under KES 50k</option>
                <option value="50k-100k">KES 50k - 100k</option>
                <option value="100k-250k">KES 100k - 250k</option>
                <option value="250k+">KES 250k+</option>
              </select>
            </Field>

            <Field label="What is the biggest issue with your current website?" className="md:col-span-2">
              <textarea required rows={4} value={form.painPoint} onChange={(e) => setForm((f) => ({ ...f, painPoint: e.target.value }))} className="input" />
            </Field>

            <div className="md:col-span-2">
              <button disabled={status === "submitting"} className="w-full py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 disabled:opacity-60 text-slate-950 font-semibold">
                {status === "submitting" ? "Submitting..." : "Send My Free Audit"}
              </button>
            </div>

            {status === "sent" && <p className="md:col-span-2 text-emerald-400">Submitted — we&apos;ll reach out shortly.</p>}
            {status === "error" && <p className="md:col-span-2 text-rose-400">Something went wrong. Please try again.</p>}
          </form>
        </div>
      </section>
    </main>
  );
}

function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`flex flex-col gap-2 ${className}`}>
      <span className="text-sm text-slate-300">{label}</span>
      {children}
    </label>
  );
}
