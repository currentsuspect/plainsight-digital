import { listTargets, listHistory, getColdEmailStats } from "@/lib/coldEmailStore";
import Link from "next/link";

// Icons
function IconPlus() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );
}

function IconMail() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2"></rect>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
    </svg>
  );
}

function IconHistory() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  );
}

function IconUsers() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  );
}

export default async function ColdEmailPage() {
  const [targets, history, stats] = await Promise.all([
    listTargets(),
    listHistory(),
    getColdEmailStats(),
  ]);

  const recentHistory = history.slice(-10).reverse();

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f5f3ef]">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-7">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <Link
                href="/admin"
                className="text-sm text-zinc-500 hover:text-amber-300 transition"
              >
                ← Back to Admin
              </Link>
            </div>
            <h1 className="font-display text-3xl mt-4">Cold Email Campaigns</h1>
            <p className="text-zinc-500 mt-1">
              Manage outreach targets, send emails, track responses
            </p>
          </div>
          
          <a
            href="/admin/cold-email/targets/new"
            className="inline-flex items-center gap-2 rounded-md bg-amber-300 px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-amber-200"
          >
            <IconPlus />
            Add Target
          </a>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-amber-300/10 p-2">
                <div className="text-amber-300"><IconUsers /></div>
              </div>
              <div>
                <p className="text-sm text-zinc-500">Total Targets</p>
                <p className="text-2xl font-display">{stats.totalTargets}</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-emerald-500/10 p-2">
                <div className="text-emerald-400"><IconMail /></div>
              </div>
              <div>
                <p className="text-sm text-zinc-500">Sent Today</p>
                <p className="text-2xl font-display">{stats.sentToday}</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-500/10 p-2">
                <div className="text-blue-400"><IconHistory /></div>
              </div>
              <div>
                <p className="text-sm text-zinc-500">Total Sent</p>
                <p className="text-2xl font-display">{stats.totalSent}</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-purple-500/10 p-2">
                <div className="text-purple-400"><IconUsers /></div>
              </div>
              <div>
                <p className="text-sm text-zinc-500">Replied</p>
                <p className="text-2xl font-display">{stats.byStatus.replied}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Status Breakdown */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 mb-8">
          <h2 className="font-display text-lg mb-4">Pipeline Status</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Pending", count: stats.byStatus.pending, color: "bg-zinc-600" },
              { label: "Sent", count: stats.byStatus.sent, color: "bg-blue-500" },
              { label: "Replied", count: stats.byStatus.replied, color: "bg-emerald-500" },
              { label: "Meeting", count: stats.byStatus.meeting, color: "bg-purple-500" },
              { label: "Closed", count: stats.byStatus.closed, color: "bg-amber-500" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2"
              >
                <span className={`h-2 w-2 rounded-full ${item.color}`}></span>
                <span className="text-sm text-zinc-400">{item.label}:</span>
                <span className="font-semibold">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Targets List */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
              <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4">
                <h2 className="font-display text-lg">Targets</h2>
                <span className="text-sm text-zinc-500">{targets.length} total</span>
              </div>
              
              <div className="divide-y divide-zinc-800">
                {targets.length === 0 ? (
                  <div className="px-5 py-12 text-center text-zinc-500">
                    <p>No targets yet.</p>
                    <p className="text-sm mt-1">Add your first target to start outreach.</p>
                  </div>
                ) : (
                  targets.map((target) => (
                    <div
                      key={target.id}
                      className="flex items-center justify-between px-5 py-4 hover:bg-zinc-800/50 transition"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium truncate">{target.company}</p>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            target.industry === "clinic" ? "bg-emerald-500/20 text-emerald-400" :
                            target.industry === "law" ? "bg-blue-500/20 text-blue-400" :
                            target.industry === "school" ? "bg-purple-500/20 text-purple-400" :
                            "bg-zinc-700 text-zinc-400"
                          }`}>
                            {target.industry}
                          </span>
                        </div>
                        <p className="text-sm text-zinc-500 truncate">
                          {target.name} • {target.email}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        <span className={`text-xs px-2 py-1 rounded ${
                          target.status === "pending" ? "bg-zinc-700 text-zinc-400" :
                          target.status === "sent" ? "bg-blue-500/20 text-blue-400" :
                          target.status === "replied" ? "bg-emerald-500/20 text-emerald-400" :
                          target.status === "meeting" ? "bg-purple-500/20 text-purple-400" :
                          "bg-amber-500/20 text-amber-400"
                        }`}>
                          {target.status}
                        </span>
                        <a
                          href={`/admin/cold-email/send?id=${target.id}`}
                          className="rounded-md bg-zinc-800 px-3 py-1.5 text-sm hover:bg-amber-300 hover:text-zinc-950 transition"
                        >
                          Send
                        </a>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Recent History */}
          <div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
              <div className="border-b border-zinc-800 px-5 py-4">
                <h2 className="font-display text-lg">Recent Activity</h2>
              </div>
              
              <div className="divide-y divide-zinc-800">
                {recentHistory.length === 0 ? (
                  <div className="px-5 py-8 text-center text-zinc-500">
                    <p className="text-sm">No emails sent yet.</p>
                  </div>
                ) : (
                  recentHistory.map((entry) => (
                    <div key={entry.id} className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${
                          entry.status === "sent" ? "bg-emerald-500" : "bg-red-500"
                        }`}></span>
                        <span className="text-sm truncate">{entry.subject}</span>
                      </div>
                      <p className="text-xs text-zinc-500 mt-1">
                        To: {entry.to}
                      </p>
                      <p className="text-xs text-zinc-600 mt-0.5">
                        {new Date(entry.sentAt).toLocaleString()}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
