import { listEvents, listLeads, Lead } from "@/lib/store";

function pct(v: number) {
  return `${(v * 100).toFixed(1)}%`;
}

function scoreLead(lead: Lead) {
  let score = 0;

  if (lead.website) score += 10;
  if (lead.phone) score += 10;
  if (lead.painPoint && lead.painPoint.length > 40) score += 15;

  if (["clinic", "law", "school", "hotel", "logistics", "dental", "real-estate"].includes(lead.niche)) score += 20;

  if (["50k-100k", "100k-250k"].includes(lead.budget)) score += 15;
  if (["250k+", "250k-500k"].includes(lead.budget)) score += 25;
  if (["500k-1m"].includes(lead.budget)) score += 35;
  if (["1m+"].includes(lead.budget)) score += 45;

  const priority = score >= 70 ? "Hot" : score >= 45 ? "Warm" : "Cold";
  const rank = priority === "Hot" ? 0 : priority === "Warm" ? 1 : 2;

  return { score, priority, rank };
}

function buildWhatsAppLink(lead: Lead) {
  const text = encodeURIComponent(
    `Hi ${lead.name}, thanks for reaching out to Plainsight Digital. We reviewed your request for ${lead.businessName} and can share quick wins + a plan. Are you available for a short call today?`
  );
  return `https://wa.me/${(lead.phone || "").replace(/\D/g, "")}?text=${text}`;
}

function buildMailtoLink(lead: Lead) {
  const subject = encodeURIComponent(`Plainsight audit for ${lead.businessName}`);
  const body = encodeURIComponent(
    `Hi ${lead.name},\n\nThanks for reaching out to Plainsight Digital. We reviewed your details and can share practical improvements for ${lead.businessName}.\n\nWould you be open to a 15-minute call this week?\n\nBest,\nDylan\nPlainsight Digital`
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

  const pipeline = {
    New: scoredLeads.filter((x) => x.lead.status === "New").length,
    Contacted: scoredLeads.filter((x) => x.lead.status === "Contacted").length,
    "Audit Sent": scoredLeads.filter((x) => x.lead.status === "Audit Sent").length,
    Proposal: scoredLeads.filter((x) => x.lead.status === "Proposal").length,
    Won: scoredLeads.filter((x) => x.lead.status === "Won").length,
    Lost: scoredLeads.filter((x) => x.lead.status === "Lost").length,
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-amber-300">Plainsight Control</p>
            <h1 className="font-display text-3xl sm:text-4xl">Lead Engine Dashboard</h1>
          </div>
          <a href="/admin/ops" className="text-amber-300 hover:text-amber-200 text-sm">Ops Engine →</a>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <Stat label="Page Views" value={String(pageViews)} />
          <Stat label="CTA Clicks" value={String(ctaClicks)} />
          <Stat label="Leads Submitted" value={String(submits)} />
          <Stat label="CTA Rate" value={pct(ctaRate)} />
          <Stat label="Visit → Lead" value={pct(submitRate)} />
        </section>

        <section className="grid gap-4 sm:grid-cols-3">
          <Stat label="🔥 Hot Leads" value={String(hot)} />
          <Stat label="🟠 Warm Leads" value={String(warm)} />
          <Stat label="🔵 Cold Leads" value={String(cold)} />
        </section>

        <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {Object.entries(pipeline).map(([k, v]) => (
            <Stat key={k} label={k} value={String(v)} compact />
          ))}
        </section>

        <section className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/70">
          <div className="border-b border-zinc-800 bg-zinc-900/90 px-4 py-3 text-sm font-medium text-zinc-200">
            Latest Leads ({leads.length})
          </div>
          <div className="overflow-auto">
            <table className="w-full min-w-[1100px] text-left text-sm">
              <thead className="bg-zinc-900/70 text-zinc-300">
                <tr>
                  <th className="p-3">Date</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Business</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Niche</th>
                  <th className="p-3">Budget</th>
                  <th className="p-3">Score</th>
                  <th className="p-3">Priority</th>
                  <th className="p-3">Pipeline</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {scoredLeads.map(({ lead, score, priority }) => (
                  <tr key={lead.id} className="border-t border-zinc-800 align-top">
                    <td className="p-3 text-zinc-400">{new Date(lead.createdAt).toLocaleString()}</td>
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
                      <form action="/api/admin/leads" method="post" className="flex items-center gap-2">
                        <input type="hidden" name="id" value={lead.id} />
                        <select name="status" defaultValue={lead.status || "New"} className="input !min-h-8 !py-1 !px-2 text-xs">
                          <option>New</option>
                          <option>Contacted</option>
                          <option>Audit Sent</option>
                          <option>Proposal</option>
                          <option>Won</option>
                          <option>Lost</option>
                        </select>
                        <button className="rounded border border-zinc-700 px-2 py-1 text-xs hover:bg-zinc-800" type="submit">Save</button>
                      </form>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <a href={buildMailtoLink(lead)} className="rounded border border-zinc-700 px-2 py-1 text-xs hover:bg-zinc-800">Email</a>
                        {lead.phone && (
                          <a href={buildWhatsAppLink(lead)} target="_blank" rel="noopener noreferrer" className="rounded bg-emerald-700/70 px-2 py-1 text-xs hover:bg-emerald-600">
                            WhatsApp
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {leads.length === 0 && (
                  <tr>
                    <td className="p-4 text-zinc-400" colSpan={10}>No leads yet. Send traffic to your audit form.</td>
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

function Stat({ label, value, compact = false }: { label: string; value: string; compact?: boolean }) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
      <div className={`text-zinc-400 ${compact ? "text-xs" : "text-sm"}`}>{label}</div>
      <div className={`mt-1 font-semibold ${compact ? "text-xl" : "text-2xl"}`}>{value}</div>
    </div>
  );
}
