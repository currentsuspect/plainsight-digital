import { listEvents, listLeads, Lead, LeadStatus } from "@/lib/store";

function pct(v: number) {
  return `${(v * 100).toFixed(1)}%`;
}

// Lead scoring v2 - now uses pre-calculated scores from store
function getLeadScores(lead: Lead) {
  return {
    score: Math.round(((lead.intent_score || 50) + (lead.fit_score || 50)) / 2),
    priority: lead.overall_priority || "Cold",
    intent_score: lead.intent_score || 50,
    fit_score: lead.fit_score || 50,
    source_confidence: lead.source_confidence || "unknown",
  };
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

function formatNextAction(lead: Lead): string {
  if (!lead.next_action_at) return "—";
  const date = new Date(lead.next_action_at);
  const now = new Date();
  const isOverdue = date < now;
  const formatted = date.toLocaleDateString();
  return isOverdue ? `⚠️ ${formatted}` : formatted;
}

export default async function AdminPage() {
  const [leads, events] = await Promise.all([listLeads(), listEvents()]);

  const pageViews = events.filter((e) => e.type === "page_view").length;
  const ctaClicks = events.filter((e) => e.type === "cta_click").length;
  const submits = events.filter((e) => e.type === "form_submit").length;

  const ctaRate = pageViews > 0 ? ctaClicks / pageViews : 0;
  const submitRate = pageViews > 0 ? submits / pageViews : 0;

  // Score and sort leads
  const scoredLeads = leads
    .map((lead) => ({ lead, ...getLeadScores(lead) }))
    .sort((a, b) => {
      // Sort by priority first (Hot > Warm > Cold)
      const priorityOrder = { Hot: 0, Warm: 1, Cold: 2 };
      const pa = priorityOrder[a.priority as keyof typeof priorityOrder] ?? 2;
      const pb = priorityOrder[b.priority as keyof typeof priorityOrder] ?? 2;
      if (pa !== pb) return pa - pb;
      // Then by score
      if (b.score !== a.score) return b.score - a.score;
      // Then by date
      return +new Date(b.lead.createdAt) - +new Date(a.lead.createdAt);
    });

  const hot = scoredLeads.filter((x) => x.priority === "Hot").length;
  const warm = scoredLeads.filter((x) => x.priority === "Warm").length;
  const cold = scoredLeads.filter((x) => x.priority === "Cold").length;

  // Pipeline by status
  const pipeline = {
    New: scoredLeads.filter((x) => x.lead.status === "New").length,
    Contacted: scoredLeads.filter((x) => x.lead.status === "Contacted").length,
    "Audit Sent": scoredLeads.filter((x) => x.lead.status === "Audit Sent").length,
    Proposal: scoredLeads.filter((x) => x.lead.status === "Proposal").length,
    Won: scoredLeads.filter((x) => x.lead.status === "Won").length,
    Lost: scoredLeads.filter((x) => x.lead.status === "Lost").length,
  };

  // Response rate (Contacted+ leads)
  const contactedPlus = scoredLeads.filter(x => 
    ["Contacted", "Audit Sent", "Proposal", "Won", "Lost"].includes(x.lead.status)
  ).length;
  const responseRate = leads.length > 0 ? contactedPlus / leads.length : 0;

  // Win/Loss stats
  const wonLeads = leads.filter(l => l.status === "Won");
  const lostLeads = leads.filter(l => l.status === "Lost");
  const totalWonValue = wonLeads.reduce((sum, l) => sum + (l.won_value || 0), 0);
  
  // Loss reasons
  const lossReasons: Record<string, number> = {};
  for (const lead of lostLeads) {
    const reason = lead.loss_reason || "Not specified";
    lossReasons[reason] = (lossReasons[reason] || 0) + 1;
  }

  // Leads requiring follow-up
  const now = new Date();
  const followUpRequired = leads.filter(l => {
    if (!l.next_action_at) return false;
    const nextAction = new Date(l.next_action_at);
    return nextAction <= now && l.next_action_type !== "none";
  });

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-amber-300">Plainsight Control</p>
            <h1 className="font-display text-3xl sm:text-4xl">Lead Engine Dashboard</h1>
          </div>
          <div className="flex gap-4">
            <a href="/api/admin/analytics" className="text-amber-300 hover:text-amber-200 text-sm">Analytics API →</a>
            <a href="/admin/ops" className="text-amber-300 hover:text-amber-200 text-sm">Ops Engine →</a>
          </div>
        </header>

        {/* Traffic Stats */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <Stat label="Page Views" value={String(pageViews)} />
          <Stat label="CTA Clicks" value={String(ctaClicks)} />
          <Stat label="Leads Submitted" value={String(submits)} />
          <Stat label="CTA Rate" value={pct(ctaRate)} />
          <Stat label="Visit → Lead" value={pct(submitRate)} />
        </section>

        {/* Lead Priority Distribution */}
        <section className="grid gap-4 sm:grid-cols-3">
          <Stat label="🔥 Hot Leads" value={String(hot)} subtext="Score ≥ 70" />
          <Stat label="🟠 Warm Leads" value={String(warm)} subtext="Score 45-69" />
          <Stat label="🔵 Cold Leads" value={String(cold)} subtext="Score &lt; 45" />
        </section>

        {/* Pipeline & Analytics */}
        <section className="grid gap-4 lg:grid-cols-2">
          {/* Pipeline Funnel */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
            <h2 className="text-sm font-semibold text-zinc-300 mb-4">Pipeline Funnel</h2>
            <div className="grid grid-cols-6 gap-2 text-center">
              {Object.entries(pipeline).map(([k, v]) => (
                <div key={k}>
                  <div className="text-2xl font-bold">{v}</div>
                  <div className="text-xs text-zinc-400">{k}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-sm text-zinc-400">
              Response Rate (Contacted+): <span className="text-amber-300">{pct(responseRate)}</span>
            </div>
          </div>

          {/* Win/Loss Breakdown */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
            <h2 className="text-sm font-semibold text-zinc-300 mb-4">Win/Loss Breakdown</h2>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-emerald-400">{wonLeads.length}</div>
                <div className="text-xs text-zinc-400">Won</div>
                {totalWonValue > 0 && (
                  <div className="text-xs text-emerald-300">KES {totalWonValue.toLocaleString()}</div>
                )}
              </div>
              <div>
                <div className="text-2xl font-bold text-rose-400">{lostLeads.length}</div>
                <div className="text-xs text-zinc-400">Lost</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-zinc-400">{leads.length - wonLeads.length - lostLeads.length}</div>
                <div className="text-xs text-zinc-400">Pending</div>
              </div>
            </div>
            {Object.keys(lossReasons).length > 0 && (
              <div className="mt-4 text-sm">
                <div className="text-xs text-zinc-400 mb-2">Loss Reasons:</div>
                {Object.entries(lossReasons).map(([reason, count]) => (
                  <div key={reason} className="text-zinc-300 text-xs">
                    • {reason}: {count}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Follow-up Queue */}
        {followUpRequired.length > 0 && (
          <section className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">
            <h2 className="text-sm font-semibold text-amber-300 mb-2">
              ⚠️ Follow-up Required ({followUpRequired.length})
            </h2>
            <div className="text-xs text-zinc-300">
              {followUpRequired.slice(0, 5).map(l => (
                <span key={l.id} className="mr-4">
                  {l.name} ({l.businessName}) - {l.next_action_type}
                </span>
              ))}
              {followUpRequired.length > 5 && <span>...and {followUpRequired.length - 5} more</span>}
            </div>
          </section>
        )}

        {/* Leads Table */}
        <section className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/70">
          <div className="border-b border-zinc-800 bg-zinc-900/90 px-4 py-3 text-sm font-medium text-zinc-200">
            Latest Leads ({leads.length})
          </div>
          <div className="overflow-auto">
            <table className="w-full min-w-[1300px] text-left text-sm">
              <thead className="bg-zinc-900/70 text-zinc-300">
                <tr>
                  <th className="p-3">Date</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Business</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Niche</th>
                  <th className="p-3">Budget</th>
                  <th className="p-3">Intent</th>
                  <th className="p-3">Fit</th>
                  <th className="p-3">Priority</th>
                  <th className="p-3">Pipeline</th>
                  <th className="p-3">Next Action</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {scoredLeads.map(({ lead, score, priority, intent_score, fit_score, source_confidence }) => (
                  <tr key={lead.id} className="border-t border-zinc-800 align-top">
                    <td className="p-3 text-zinc-400">{new Date(lead.createdAt).toLocaleDateString()}</td>
                    <td className="p-3">{lead.name}</td>
                    <td className="p-3">{lead.businessName}</td>
                    <td className="p-3 text-xs">{lead.email}</td>
                    <td className="p-3">{lead.niche}</td>
                    <td className="p-3">{lead.budget}</td>
                    <td className="p-3 text-xs">
                      <span className={intent_score >= 70 ? "text-emerald-400" : intent_score >= 50 ? "text-amber-300" : "text-zinc-400"}>
                        {intent_score}
                      </span>
                    </td>
                    <td className="p-3 text-xs">
                      <span className={fit_score >= 70 ? "text-emerald-400" : fit_score >= 50 ? "text-amber-300" : "text-zinc-400"}>
                        {fit_score}
                      </span>
                    </td>
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
                    <td className="p-3 text-xs">
                      <div className="text-zinc-400">{formatNextAction(lead)}</div>
                      {lead.next_action_type && lead.next_action_type !== "none" && (
                        <div className="text-zinc-500">{lead.next_action_type}</div>
                      )}
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
                    <td className="p-4 text-zinc-400" colSpan={12}>No leads yet. Send traffic to your audit form.</td>
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

function Stat({ label, value, subtext }: { label: string; value: string; subtext?: string }) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
      <div className="text-zinc-400 text-sm">{label}</div>
      <div className="mt-1 font-semibold text-2xl">{value}</div>
      {subtext && <div className="text-xs text-zinc-500">{subtext}</div>}
    </div>
  );
}
