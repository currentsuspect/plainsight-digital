"use client";

import { FormEvent, useState } from "react";

type LeadFormState = {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  website: string;
  niche: "clinic" | "law" | "school" | "hotel" | "logistics";
  budget: "100k-250k" | "250k-500k" | "500k-1m" | "1m+";
  painPoint: string;
};

export default function LeadForm() {
  const [form, setForm] = useState<LeadFormState>({
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

  async function track(type: "form_start" | "form_submit", meta?: Record<string, string>) {
    try {
      await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, page: "/", meta }),
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
      await track("form_submit", { niche: form.niche, budget: form.budget });
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
    <form className="mt-7 grid gap-4 md:grid-cols-2" onFocus={() => void track("form_start", { form: "premium_audit" })} onSubmit={onSubmit}>
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
        <select value={form.niche} onChange={(e) => setForm((f) => ({ ...f, niche: e.target.value as LeadFormState["niche"] }))} className="input">
          <option value="clinic">Clinic / Medical Center</option>
          <option value="law">Law Firm</option>
          <option value="school">School</option>
          <option value="hotel">Hotel / Resort</option>
          <option value="logistics">Logistics</option>
        </select>
      </Field>

      <Field label="Budget Range" className="md:col-span-2">
        <select value={form.budget} onChange={(e) => setForm((f) => ({ ...f, budget: e.target.value as LeadFormState["budget"] }))} className="input">
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
