import { listEvents, listLeads, Lead } from "@/lib/store";

function pct(v: number) {
  return `${(v * 100).toFixed(1)}%`;
}

function scoreLead(lead: Lead) {
  let score = 0;

  if (lead.website) score += 10;
  if (lead.phone) score += 10;
  if (lead.painPoint && lead.painPoint.length > 30) score += 10;

  if (lead.niche === "dental" || lead.niche === "law" || lead.niche === "real-estate") score += 20;

  if (lead.budget === "50k-100k") score += 20;
  if (lead.budget === "100k-250k") score += 30;
  if (lead.budget === "250k+") score += 40;

  const priority = score >= 70 ? "Hot" : score >= 45 ? "Warm" : "Cold";
  const rank = priority === "Hot" ? 0 : priority === "Warm" ? 1 : 2;

  return { score, priority, rank };
}

function buildWhatsAppLink(lead: Lead) {
  const text = encodeURIComponent(
    `Hi ${lead.name}, thanks for reaching out to PlainSight Digital. We reviewed your request for ${lead.businessName} and can share quick wins + a plan. Are you available for a short call today?`
  );
  return `https://wa.me/${(lead.phone || "").replace(/\D/g, "")}?text=${text}`;
}

function buildMailtoLink(lead: Lead) {
  const subject = encodeURIComponent(`PlainSight audit for ${lead.businessName}`);
  const body = encodeURIComponent(
    `Hi ${lead.name},\n\nThanks for reaching out to PlainSight Digital. We reviewed your details and can share practical improvements for ${lead.businessName}.\n\nWould you be open to a 15-minute call this week?\n\nBest,\nPlainSight Digital`
  );
  return `mailto:${lead.email}?subject=${subject}&body=${body}`;
}

export default async function AdminPage() {
  const [leads, events] = await Promise.all([listLeads(), listEvents()]);

  const pageViews = events.filter((e) => e.type === "page_view").length;
  const ctaClicks = events.filter((e) => e.type === "cta_click").length;
  const submits = events.filter((e) => e.type === "form_submit").length;

  const ctaRate = pageViews > 0 ? ctaClicks / pageViews : 0;
  const submitRate = pageViews > 0 ? submits / pageViews : 0;

  const scoredLeads = leads
    .map((lead) => ({ lead, ...scoreLead(lead) }))
    .sort((a, b) => a.rank - b.rank || b.score - a.score || +new Date(b.lead.createdAt) - +new Date(a.lead.createdAt));

  const hot = scoredLeads.filter((x) => x.priority === "Hot").length;
  const warm = scoredLeads.filter((x) => x.priority === "Warm").length;
  const cold = scoredLeads.filter((x) => x.priority === "Cold").length;

  return (
    <main className="min-h-screen bg-slate-950 text-white p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold">PlainSight Lead Dashboard</h1>

        <section className="grid md:grid-cols-5 gap-4">
          <Stat label="Page Views" value={String(pageViews)} />
          <Stat label="CTA Clicks" value={String(ctaClicks)} />
          <Stat label="Leads Submitted" value={String(submits)} />
          <Stat label="CTA Rate" value={pct(ctaRate)} />
          <Stat label="Visit→Lead" value={pct(submitRate)} />
        </section>

        <section className="grid sm:grid-cols-3 gap-4">
          <Stat label="🔥 Hot Leads" value={String(hot)} />
          <Stat label="🟠 Warm Leads" value={String(warm)} />
          <Stat label="🔵 Cold Leads" value={String(cold)} />
        </section>

        <section className="rounded-xl border border-slate-800 overflow-hidden">
          <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 font-medium">Latest Leads ({leads.length})</div>
          <div className="overflow-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-900/70 text-slate-300">
                <tr>
                  <th className="p-3">Date</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Business</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Niche</th>
                  <th className="p-3">Budget</th>
                  <th className="p-3">Score</th>
                  <th className="p-3">Priority</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {scoredLeads.map(({ lead, score, priority }) => (
                  <tr key={lead.id} className="border-t border-slate-800">
                    <td className="p-3 text-slate-400">{new Date(lead.createdAt).toLocaleString()}</td>
                    <td className="p-3">{lead.name}</td>
                    <td className="p-3">{lead.businessName}</td>
                    <td className="p-3">{lead.email}</td>
                    <td className="p-3">{lead.niche}</td>
                    <td className="p-3">{lead.budget}</td>
                    <td className="p-3">{score}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          priority === "Hot"
                            ? "bg-rose-500/20 text-rose-300"
                            : priority === "Warm"
                              ? "bg-amber-500/20 text-amber-300"
                              : "bg-sky-500/20 text-sky-300"
                        }`}
                      >
                        {priority}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <a href={buildMailtoLink(lead)} className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs">Email</a>
                        {lead.phone && (
                          <a href={buildWhatsAppLink(lead)} target="_blank" rel="noopener noreferrer" className="px-2 py-1 rounded bg-emerald-700/70 hover:bg-emerald-600 text-xs">
                            WhatsApp
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {leads.length === 0 && (
                  <tr>
                    <td className="p-4 text-slate-400" colSpan={9}>No leads yet. Send traffic to your audit form.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
      <div className="text-sm text-slate-400">{label}</div>
      <div className="text-2xl font-semibold mt-1">{value}</div>
    </div>
  );
}
