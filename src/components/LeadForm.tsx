"use client";

import { FormEvent, useState, useCallback, memo } from "react";

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

type LeadFormProps = {
  defaultSector?: "clinic" | "law" | "school" | "hotel" | "logistics";
};

const initialFormState = (sector: LeadFormState["niche"]): LeadFormState => ({
  name: "",
  businessName: "",
  email: "",
  phone: "",
  website: "",
  niche: sector,
  budget: "250k-500k",
  painPoint: "",
});

function LeadForm({ defaultSector = "clinic" }: LeadFormProps) {
  const [form, setForm] = useState<LeadFormState>(() => initialFormState(defaultSector));
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "error">("idle");
  const [hasTrackedStart, setHasTrackedStart] = useState(false);

  const track = useCallback(async (type: "form_start" | "form_submit", meta?: Record<string, string>) => {
    try {
      await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, page: "/", meta }),
      });
    } catch {
      // Silent fail for analytics
    }
  }, []);

  const handleFocus = useCallback(() => {
    if (!hasTrackedStart) {
      setHasTrackedStart(true);
      void track("form_start", { form: "premium_audit" });
    }
  }, [hasTrackedStart, track]);

  const updateForm = useCallback((key: keyof LeadFormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  }, []);

  const onSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
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
      setForm(initialFormState(defaultSector));
    } catch {
      setStatus("error");
    }
  }, [form, track, defaultSector]);

  return (
    <form className="mt-7 grid gap-4 md:grid-cols-2" onFocus={handleFocus} onSubmit={onSubmit}>
      <Field label="Your Name" required>
        <input
          required
          value={form.name}
          onChange={(e) => updateForm("name", e.target.value)}
          className="input"
          autoComplete="name"
        />
      </Field>

      <Field label="Business Name" required>
        <input
          required
          value={form.businessName}
          onChange={(e) => updateForm("businessName", e.target.value)}
          className="input"
          autoComplete="organization"
        />
      </Field>

      <Field label="Email" required>
        <input
          type="email"
          required
          value={form.email}
          onChange={(e) => updateForm("email", e.target.value)}
          className="input"
          autoComplete="email"
        />
      </Field>

      <Field label="Phone / WhatsApp">
        <input
          value={form.phone}
          onChange={(e) => updateForm("phone", e.target.value)}
          className="input"
          type="tel"
          autoComplete="tel"
        />
      </Field>

      <Field label="Website URL">
        <input
          value={form.website}
          onChange={(e) => updateForm("website", e.target.value)}
          className="input"
          placeholder="https://"
          type="url"
          autoComplete="url"
        />
      </Field>

      <Field label="Industry">
        <select
          value={form.niche}
          onChange={(e) => updateForm("niche", e.target.value)}
          className="input"
        >
          <option value="clinic">Clinic / Medical Center</option>
          <option value="law">Law Firm</option>
          <option value="school">School</option>
          <option value="hotel">Hotel / Resort</option>
          <option value="logistics">Logistics</option>
        </select>
      </Field>

      <Field label="Budget Range" className="md:col-span-2">
        <select
          value={form.budget}
          onChange={(e) => updateForm("budget", e.target.value)}
          className="input"
        >
          <option value="100k-250k">KES 100k - 250k</option>
          <option value="250k-500k">KES 250k - 500k</option>
          <option value="500k-1m">KES 500k - 1M</option>
          <option value="1m+">KES 1M+</option>
        </select>
      </Field>

      <Field label="Biggest conversion problem right now" className="md:col-span-2" required>
        <textarea
          required
          rows={4}
          value={form.painPoint}
          onChange={(e) => updateForm("painPoint", e.target.value)}
          className="input resize-none"
        />
      </Field>

      <div className="md:col-span-2">
        <button
          disabled={status === "submitting"}
          className="w-full rounded-md bg-amber-300 py-3.5 text-sm font-semibold tracking-wide text-zinc-950 transition hover:bg-amber-200 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "submitting" ? "Submitting..." : "Send My Premium Audit"}
        </button>
      </div>

      {status === "sent" && (
        <div className="md:col-span-2 p-5 border border-emerald-500/30 bg-emerald-500/10 rounded-lg text-center space-y-3">
          <p className="text-emerald-400 font-medium text-lg">
            ✓ Request Received.
          </p>
          <p className="text-zinc-300 text-sm">
            We are analyzing your current infrastructure right now. <br className="hidden sm:block"/>
            To skip the line, book your audit review call immediately below:
          </p>
          <a href="https://cal.com/plainsightdigital/30min" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block bg-white text-zinc-950 font-bold px-6 py-3 rounded-md hover:scale-105 transition-transform">
             Schedule Review Call 📅
          </a>
        </div>
      )}
      {status === "error" && (
        <p className="md:col-span-2 text-rose-400">Something went wrong. Please try again or WhatsApp us directly.</p>
      )}
    </form>
  );
}

const Field = memo(function Field({
  label,
  children,
  className = "",
  required = false,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
  required?: boolean;
}) {
  return (
    <label className={`flex flex-col gap-2 ${className}`}>
      <span className="text-sm text-zinc-300">
        {label}
        {required && <span className="text-amber-400 ml-1">*</span>}
      </span>
      {children}
    </label>
  );
});

export default memo(LeadForm);
