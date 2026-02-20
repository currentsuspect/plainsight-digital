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

const services = [
  {
    title: "Software Development",
    desc: "Custom web apps, internal systems, and backend APIs built for speed, scale, and clean operations.",
    bullets: ["Next.js + React", "FastAPI + Node", "Automation-ready architecture"],
  },
  {
    title: "Lead Generation Websites",
    desc: "Conversion-first sites that turn traffic into inquiries through messaging funnels, CTAs, and trust signals.",
    bullets: ["Conversion UX", "WhatsApp + form funnels", "SEO + analytics"],
  },
  {
    title: "Growth & Optimization",
    desc: "From first launch to ongoing iteration, we track behavior and improve conversion rates with real data.",
    bullets: ["Event tracking", "Landing page optimization", "Lead scoring workflows"],
  },
];

const proof = [
  { label: "Delivery speed", value: "7-day" },
  { label: "Primary focus", value: "Leads" },
  { label: "Build approach", value: "Custom" },
  { label: "Communication", value: "Direct" },
];

const caseStudies = [
  {
    title: "Service Business Funnel",
    result: "+2.3x inquiry rate",
    detail: "Rebuilt the site with clearer offers, WhatsApp CTA, and trust-focused layout.",
  },
  {
    title: "Founder Landing System",
    result: "37% lower drop-off",
    detail: "Simplified copy hierarchy and tightened mobile-first conversion flow.",
  },
  {
    title: "Lead Ops Dashboard",
    result: "Faster follow-up",
    detail: "Implemented lead scoring, priority tiers, and one-click outreach actions.",
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
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20 md:py-24">
        <p className="text-cyan-400 font-medium mb-4 reveal">PlainSight Digital</p>
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-5 sm:mb-6 max-w-5xl reveal reveal-delay-1">
          We build software and websites that
          <span className="text-cyan-400"> drive real business growth.</span>
        </h1>
        <p className="text-slate-300 max-w-3xl text-base sm:text-lg mb-7 sm:mb-8 reveal reveal-delay-2">
          We help service businesses and founders launch conversion-focused digital systems — from lead generation websites to custom platforms that automate operations.
        </p>

        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4 reveal reveal-delay-3">
          <a
            href={ctaHref}
            className="w-full sm:w-auto text-center px-6 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold"
            onClick={() => {
              void track("cta_click", window.location.pathname, { cta: "hero_free_audit" });
            }}
          >
            Get Free 2-Minute Audit
          </a>
          <a href="#services" className="w-full sm:w-auto text-center px-6 py-3 rounded-lg border border-slate-700 hover:bg-slate-900">
            Explore Services
          </a>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {proof.map((item) => (
            <div key={item.label} className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
              <div className="text-lg sm:text-2xl font-semibold text-cyan-300">{item.value}</div>
              <div className="text-xs sm:text-sm text-slate-400">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="services" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">What we do</h2>
        <p className="text-slate-300 mb-8 max-w-2xl">Built for one thing: helping your business win more clients, close faster, and operate smoother.</p>

        <div className="grid md:grid-cols-3 gap-4">
          {services.map((service) => (
            <article key={service.title} className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
              <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
              <p className="text-slate-300 text-sm mb-4">{service.desc}</p>
              <ul className="space-y-2 text-sm text-slate-400">
                {service.bullets.map((b) => (
                  <li key={b}>• {b}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>


      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">Recent outcomes</h2>
        <p className="text-slate-300 mb-8 max-w-2xl">Real execution energy — clear positioning, stronger conversion paths, and systems that help you close faster.</p>
        <div className="grid md:grid-cols-3 gap-4">
          {caseStudies.map((item) => (
            <article key={item.title} className="rounded-xl border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 p-5">
              <p className="text-xs uppercase tracking-wider text-cyan-300 mb-2">{item.result}</p>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-slate-300">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 sm:p-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">About PlainSight</h2>
          <p className="text-slate-300 mb-4">
            We are a boutique digital studio focused on practical outcomes — not bloated projects. Every build is designed around performance, conversion, and clarity.
          </p>
          <p className="text-slate-400">
            If your current site is not converting, your process is manual, or your digital presence doesn&apos;t match your ambition, we can fix that.
          </p>
        </div>
      </section>

      <section id="audit" className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 sm:p-6 md:p-8">
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

      <a
        href="https://wa.me/254750192512?text=Hi%20PlainSight%20Digital%2C%20I%20want%20a%20website%20that%20brings%20more%20clients."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with PlainSight Digital on WhatsApp"
        className="fixed bottom-5 right-5 z-50 h-14 w-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30"
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
      <span className="text-sm text-slate-300">{label}</span>
      {children}
    </label>
  );
}
