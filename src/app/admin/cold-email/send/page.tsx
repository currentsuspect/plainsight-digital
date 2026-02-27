"use client";

import { Suspense } from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const templates: Record<string, { subject: string; body: string }> = {
  clinic: {
    subject: "{company} website question",
    body: `Hi {name},

I was looking at {company}'s website and noticed the appointment booking process requires patients to call during business hours.

In our research, 73% of patients prefer WhatsApp or online booking for initial consultations.

I'm Dylan, founder of Plainsight Digital. We help Nairobi healthcare providers turn websites into patient booking engines.

We recently helped a similar clinic implement one-click WhatsApp booking and saw patient inquiries increase 3x in 60 days.

Worth a 10-minute conversation to see if there's a fit?

Best,
Dylan Makori
Founder, Plainsight Digital
www.plainsightdigital.dev`,
  },
  law: {
    subject: "{company} website question",
    body: `Hi {name},

I was reviewing {company}'s website and noticed the contact process funnels all inquiries through a single generic form.

Most potential clients abandon because they're not sure if their specific case fits your expertise.

We recently helped a Nairobi law firm implement case-specific intake flow — visitors answer 3 questions and get routed to the right partner. Qualified leads increased 150%.

Worth a conversation?

Best,
Dylan Makori
Founder, Plainsight Digital
www.plainsightdigital.dev`,
  },
  school: {
    subject: "{company} enrollment inquiry question",
    body: `Hi {name},

I was looking at {company}'s website and noticed the parent inquiry process requires navigating multiple pages to find the admissions form.

During enrollment season, busy parents often abandon and move to schools with more streamlined processes.

We recently helped a similar school implement automated inquiry + tour booking. Result: 80% more tour bookings, 60% less admin time.

Worth a 10-minute conversation?

Best,
Dylan Makori
Founder, Plainsight Digital
www.plainsightdigital.dev`,
  },
  other: {
    subject: "Quick question about {company}",
    body: `Hi {name},

I came across {company} and had a quick question about your current website.

Are you happy with how many leads it generates, or is that an area you're looking to improve?

I'm Dylan, founder of Plainsight Digital. We help Kenyan businesses turn websites into lead generation systems.

Worth a brief conversation?

Best,
Dylan Makori
Founder, Plainsight Digital
www.plainsightdigital.dev`,
  },
};

function SendEmailForm() {
  const searchParams = useSearchParams();
  const targetId = searchParams.get("id");

  const [target, setTarget] = useState<any>(null);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success?: boolean; message?: string }>({});

  useEffect(() => {
    if (targetId) {
      fetch(`/api/admin/cold-email`)
        .then((r) => r.json())
        .then((targets) => {
          const t = targets.find((x: any) => x.id === targetId);
          if (t) {
            setTarget(t);
            // Load template based on industry
            const tmpl = templates[t.industry] || templates.other;
            setSubject(tmpl.subject.replace(/{company}/g, t.company));
            setBody(
              tmpl.body
                .replace(/{name}/g, t.name)
                .replace(/{company}/g, t.company)
            );
          }
        });
    }
  }, [targetId]);

  const handleSend = async () => {
    setLoading(true);
    setResult({});

    try {
      const res = await fetch("/api/admin/cold-email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetId, subject, body }),
      });

      const data = await res.json();

      if (res.ok) {
        setResult({ success: true, message: "Email sent successfully!" });
      } else {
        setResult({ success: false, message: data.error || "Failed to send" });
      }
    } catch (err: any) {
      setResult({ success: false, message: err.message });
    } finally {
      setLoading(false);
    }
  };

  if (!target) {
    return (
      <div className="min-h-screen bg-[#09090b] text-[#f5f3ef] flex items-center justify-center">
        <p className="text-zinc-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f5f3ef]">
      <div className="mx-auto max-w-3xl px-5 py-8 sm:px-7">
        <div className="mb-6">
          <Link
            href="/admin/cold-email"
            className="text-sm text-zinc-500 hover:text-amber-300 transition"
          >
            ← Back to Cold Email
          </Link>
        </div>

        <h1 className="font-display text-2xl mb-2">Send Email</h1>
        <p className="text-zinc-500 mb-6">
          To: {target.name} at {target.company} ({target.email})
        </p>

        {result.message && (
          <div
            className={`mb-6 rounded-lg border px-4 py-3 ${
              result.success
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                : "border-red-500/30 bg-red-500/10 text-red-400"
            }`}
          >
            {result.message}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-300">
              Subject
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm focus:border-amber-300 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-300">
              Body
            </label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={16}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm focus:border-amber-300 focus:outline-none font-mono"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={handleSend}
              disabled={loading}
              className="rounded-md bg-amber-300 px-6 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-amber-200 disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Email"}
            </button>

            <Link
              href="/admin/cold-email"
              className="rounded-md border border-zinc-700 bg-zinc-900 px-6 py-2.5 text-sm text-zinc-300 transition hover:bg-zinc-800"
            >
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SendEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#09090b] text-[#f5f3ef] flex items-center justify-center">
        <p className="text-zinc-500">Loading...</p>
      </div>
    }>
      <SendEmailForm />
    </Suspense>
  );
}
