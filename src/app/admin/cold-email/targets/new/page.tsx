"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewTargetPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    company: "",
    name: "",
    email: "",
    industry: "clinic",
    website: "",
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/admin/cold-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          status: "pending",
        }),
      });

      if (res.ok) {
        router.push("/admin/cold-email");
      } else {
        alert("Failed to add target");
      }
    } catch (err) {
      alert("Error adding target");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f5f3ef]">
      <div className="mx-auto max-w-2xl px-5 py-8 sm:px-7">
        <div className="mb-6">
          <Link
            href="/admin/cold-email"
            className="text-sm text-zinc-500 hover:text-amber-300 transition"
          >
            ← Back to Cold Email
          </Link>
        </div>

        <h1 className="font-display text-2xl mb-6">Add New Target</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-300">
              Company Name *
            </label>
            <input
              type="text"
              required
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm focus:border-amber-300 focus:outline-none"
              placeholder="e.g., Nairobi ENT Clinic"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-zinc-300">
                Contact Name *
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm focus:border-amber-300 focus:outline-none"
                placeholder="e.g., Dr. John Smith"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-zinc-300">
                Industry *
              </label>
              <select
                value={form.industry}
                onChange={(e) => setForm({ ...form, industry: e.target.value })}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm focus:border-amber-300 focus:outline-none"
              >
                <option value="clinic">Clinic / Healthcare</option>
                <option value="law">Law Firm</option>
                <option value="school">School / Education</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-300">
              Email Address *
            </label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm focus:border-amber-300 focus:outline-none"
              placeholder="info@company.com"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-300">
              Website
            </label>
            <input
              type="url"
              value={form.website}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm focus:border-amber-300 focus:outline-none"
              placeholder="https://company.com"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-300">
              Notes
            </label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              rows={3}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm focus:border-amber-300 focus:outline-none"
              placeholder="Any relevant notes about this target..."
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-amber-300 px-6 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-amber-200 disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add Target"}
            </button>

            <Link
              href="/admin/cold-email"
              className="rounded-md border border-zinc-700 bg-zinc-900 px-6 py-2.5 text-sm text-zinc-300 transition hover:bg-zinc-800"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
