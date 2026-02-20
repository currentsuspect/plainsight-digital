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
        <p className="text-cyan-400 font-medium mb-4">PlainSight Digital</p>
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight mb-5 sm:mb-6 max-w-5xl">
          We build software and websites that
          <span className="text-cyan-400"> drive real business growth.</span>
        </h1>
        <p className="text-slate-300 max-w-3xl text-base sm:text-lg mb-7 sm:mb-8">
          We help service businesses and founders launch conversion-focused digital systems — from lead generation websites to custom platforms that automate operations.
        </p>

        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4">
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
        className="fixed bottom-5 right-5 z-50 h-14 w-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center text-2xl shadow-lg shadow-emerald-500/30"
      >
        💬
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
