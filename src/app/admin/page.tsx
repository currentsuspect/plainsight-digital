import { listEvents, listLeads } from "@/lib/store";

function pct(v: number) {
  return `${(v * 100).toFixed(1)}%`;
}

export default async function AdminPage() {
  const [leads, events] = await Promise.all([listLeads(), listEvents()]);

  const pageViews = events.filter((e) => e.type === "page_view").length;
  const ctaClicks = events.filter((e) => e.type === "cta_click").length;
  const submits = events.filter((e) => e.type === "form_submit").length;

  const ctaRate = pageViews > 0 ? ctaClicks / pageViews : 0;
  const submitRate = pageViews > 0 ? submits / pageViews : 0;

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold">PlainSight Lead Dashboard</h1>

        <section className="grid md:grid-cols-5 gap-4">
          <Stat label="Page Views" value={String(pageViews)} />
          <Stat label="CTA Clicks" value={String(ctaClicks)} />
          <Stat label="Leads Submitted" value={String(submits)} />
          <Stat label="CTA Rate" value={pct(ctaRate)} />
          <Stat label="Visit→Lead" value={pct(submitRate)} />
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
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id} className="border-t border-slate-800">
                    <td className="p-3 text-slate-400">{new Date(lead.createdAt).toLocaleString()}</td>
                    <td className="p-3">{lead.name}</td>
                    <td className="p-3">{lead.businessName}</td>
                    <td className="p-3">{lead.email}</td>
                    <td className="p-3">{lead.niche}</td>
                    <td className="p-3">{lead.budget}</td>
                  </tr>
                ))}
                {leads.length === 0 && (
                  <tr>
                    <td className="p-4 text-slate-400" colSpan={6}>No leads yet. Send traffic to your audit form.</td>
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
