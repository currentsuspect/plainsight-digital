import { listFinance, listInvoices, listMeetings } from "@/lib/opsStore";
import { PAYMENT_INSTRUCTION } from "@/lib/paymentConfig";

function formatMeetingStatus(status?: string): { label: string; color: string } {
  switch (status) {
    case "scheduled":
      return { label: "📅 Scheduled", color: "text-amber-300" };
    case "completed":
      return { label: "✅ Completed", color: "text-emerald-400" };
    case "cancelled":
      return { label: "❌ Cancelled", color: "text-zinc-500" };
    case "no_show":
      return { label: "🚫 No Show", color: "text-rose-400" };
    default:
      return { label: "📌 Internal", color: "text-zinc-400" };
  }
}

function formatEATDateTime(value?: string) {
  if (!value) return "No meeting time in payload";
  const date = new Date(value);
  return new Intl.DateTimeFormat("en-KE", {
    timeZone: "Africa/Nairobi",
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date) + " EAT";
}

export default async function OpsPage() {
  const [finance, meetings, invoices] = await Promise.all([listFinance(), listMeetings(), listInvoices()]);
  const income = finance.filter((x) => x.type === "income").reduce((a, b) => a + b.amount, 0);
  const expense = finance.filter((x) => x.type === "expense").reduce((a, b) => a + b.amount, 0);
  const balance = income - expense;

  // Separate Cal.com bookings from internal meetings
  const calMeetings = meetings.filter(m => m.calUid);
  const internalMeetings = meetings.filter(m => !m.calUid);
  const now = new Date();
  const upcomingCalMeetings = calMeetings
    .filter(m => m.status === "scheduled" && m.when && new Date(m.when) > now)
    .sort((a, b) => new Date(a.when).getTime() - new Date(b.when).getTime());

  const recentCalMeetings = calMeetings
    .filter(m => !upcomingCalMeetings.some(u => u.id === m.id))
    .sort((a, b) => +new Date(b.when || b.createdAt) - +new Date(a.when || a.createdAt));

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-amber-300">Plainsight Control</p>
            <h1 className="font-display text-3xl sm:text-4xl">Ops Engine</h1>
          </div>
          <a href="/admin" className="text-amber-300 hover:text-amber-200 text-sm">← Back to Leads</a>
        </header>

        <section className="grid gap-4 sm:grid-cols-3">
          <Card label="Income" value={`KES ${income.toLocaleString()}`} />
          <Card label="Expenses" value={`KES ${expense.toLocaleString()}`} />
          <Card label="Net" value={`KES ${balance.toLocaleString()}`} />
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          <Panel title="Add Finance Entry">
            <form action="/api/admin/finance" method="post" className="space-y-2">
              <select name="type" className="input"><option value="income">income</option><option value="expense">expense</option></select>
              <input name="amount" type="number" placeholder="Amount" className="input" required />
              <input name="category" placeholder="Category" className="input" required />
              <input name="note" placeholder="Note" className="input" />
              <button className="w-full rounded-md bg-amber-300 py-2 font-semibold text-zinc-950 hover:bg-amber-200">Save</button>
            </form>
          </Panel>

          <Panel title="Schedule Internal Meeting">
            <form action="/api/admin/meetings" method="post" className="space-y-2">
              <input name="title" placeholder="Meeting title" className="input" required />
              <input name="when" type="datetime-local" className="input" required />
              <input name="owner" defaultValue="Dylan" className="input" required />
              <input name="note" placeholder="Note" className="input" />
              <button className="w-full rounded-md bg-amber-300 py-2 font-semibold text-zinc-950 hover:bg-amber-200">Save</button>
            </form>
          </Panel>

          <Panel title="Generate Invoice">
            <form action="/api/admin/invoices" method="post" className="space-y-2">
              <input name="client" placeholder="Client name" className="input" required />
              <input name="item" placeholder="Service/item" className="input" required />
              <input name="amount" type="number" placeholder="Amount" className="input" required />
              <select name="status" className="input"><option value="draft">draft</option><option value="sent">sent</option><option value="paid">paid</option></select>
              <input name="dueDate" type="date" className="input" />
              <input name="paymentInstruction" defaultValue={PAYMENT_INSTRUCTION} className="input" />
              <input name="note" placeholder="Optional note" className="input" />
              <button className="w-full rounded-md bg-amber-300 py-2 font-semibold text-zinc-950 hover:bg-amber-200">Save</button>
            </form>
          </Panel>
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          <Table title="Finance Log" headers={["Type", "Amount", "Category"]} rows={finance.map((x) => [x.type, `KES ${x.amount}`, x.category])} />

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
            <h2 className="font-semibold mb-3">Meetings</h2>

            <div className="mb-4">
              <div className="text-xs text-amber-300 mb-2">Upcoming Cal.com Bookings ({upcomingCalMeetings.length})</div>
              <div className="space-y-2 text-sm">
                {upcomingCalMeetings.slice(0, 5).map((m) => {
                  const status = formatMeetingStatus(m.status);
                  return (
                    <div key={m.id} className="border border-zinc-800 rounded p-2 bg-zinc-900/40">
                      <div className="flex items-center justify-between gap-2">
                        <div className="font-medium">{m.attendeeName || m.title}</div>
                        <span className={`text-xs ${status.color}`}>{status.label}</span>
                      </div>
                      <div className="text-xs text-zinc-400">{formatEATDateTime(m.when)}</div>
                      {m.attendeeEmail && <div className="text-xs text-zinc-500">{m.attendeeEmail}</div>}
                      {m.meetingUrl && (
                        <a href={m.meetingUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-amber-300 hover:text-amber-200">
                          Open meeting link →
                        </a>
                      )}
                    </div>
                  );
                })}
                {upcomingCalMeetings.length === 0 && <div className="text-xs text-zinc-500">No upcoming bookings yet.</div>}
              </div>
            </div>

            {recentCalMeetings.length > 0 && (
              <div className="mb-4">
                <div className="text-xs text-zinc-400 mb-2">Recent/Other Cal.com Bookings ({recentCalMeetings.length})</div>
                <div className="space-y-2 text-sm">
                  {recentCalMeetings.slice(0, 5).map((m) => {
                    const status = formatMeetingStatus(m.status);
                    return (
                      <div key={m.id} className="border border-zinc-800 rounded p-2 bg-zinc-900/30">
                        <div className="flex items-center justify-between gap-2">
                          <div className="font-medium">{m.attendeeName || m.title}</div>
                          <span className={`text-xs ${status.color}`}>{status.label}</span>
                        </div>
                        <div className="text-xs text-zinc-500">{formatEATDateTime(m.when)}</div>
                        {m.attendeeEmail && <div className="text-xs text-zinc-600">{m.attendeeEmail}</div>}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="text-xs text-zinc-400 mb-2">Internal Meetings ({internalMeetings.length})</div>
            <div className="space-y-2 text-sm">
              {internalMeetings.slice(0, 6).map((x) => (
                <div key={x.id} className="grid grid-cols-1 gap-1 border-t border-zinc-800 pt-2">
                  <div>{x.title}</div>
                  <div className="text-zinc-400 text-xs">{formatEATDateTime(x.when)} • {x.owner}</div>
                </div>
              ))}
              {meetings.length === 0 && <div className="text-zinc-500">No meetings yet.</div>}
            </div>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
            <h2 className="font-semibold mb-3">Invoices</h2>
            <div className="space-y-2 text-sm">
              <div className="grid grid-cols-5 gap-2 text-zinc-400"><div>Client</div><div>Amount</div><div>Status</div><div>Actions</div><div>PDF</div></div>
              {invoices.slice(0, 8).map((x) => (
                <div key={x.id} className="grid grid-cols-5 gap-2 items-start border-t border-zinc-800 pt-2">
                  <div>{x.client}</div>
                  <div>KES {x.amount}</div>
                  <div>{x.status}</div>
                  <div className="space-y-1">
                    <form action="/api/admin/invoices" method="post" className="space-y-1">
                      <input type="hidden" name="action" value="update" />
                      <input type="hidden" name="id" value={x.id} />
                      <select name="status" defaultValue={x.status} className="input !min-h-8 !py-1 !px-2 text-xs">
                        <option value="draft">draft</option>
                        <option value="sent">sent</option>
                        <option value="paid">paid</option>
                      </select>
                      <input name="dueDate" defaultValue={x.dueDate || ""} placeholder="Due date" className="input !min-h-8 !py-1 !px-2 text-xs" />
                      <button className="rounded border border-zinc-700 px-2 py-1 text-xs hover:bg-zinc-800" type="submit">Update</button>
                    </form>
                    <div className="flex gap-1">
                      <form action="/api/admin/invoices" method="post">
                        <input type="hidden" name="action" value="update" />
                        <input type="hidden" name="id" value={x.id} />
                        <input type="hidden" name="status" value="sent" />
                        <button className="rounded bg-amber-600/80 px-2 py-1 text-xs hover:bg-amber-500" type="submit">Mark Sent</button>
                      </form>
                      <form action="/api/admin/invoices" method="post">
                        <input type="hidden" name="action" value="update" />
                        <input type="hidden" name="id" value={x.id} />
                        <input type="hidden" name="status" value="paid" />
                        <button className="rounded bg-emerald-600/80 px-2 py-1 text-xs hover:bg-emerald-500" type="submit">Mark Paid</button>
                      </form>
                    </div>
                  </div>
                  <a className="text-amber-300 hover:text-amber-200" href={`/admin/invoice/${x.id}`} target="_blank" rel="noopener noreferrer">Open</a>
                </div>
              ))}
              {invoices.length === 0 && <div className="text-zinc-500">No invoices yet.</div>}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function Card({ label, value }: { label: string; value: string }) {
  return <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4"><div className="text-sm text-zinc-400">{label}</div><div className="text-2xl font-semibold">{value}</div></div>;
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4"><h2 className="mb-3 font-semibold">{title}</h2>{children}</div>;
}

function Table({ title, headers, rows }: { title: string; headers: string[]; rows: string[][] }) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
      <h2 className="mb-3 font-semibold">{title}</h2>
      <div className="space-y-2 text-sm">
        <div className="grid grid-cols-3 gap-2 text-zinc-400">{headers.map((h) => <div key={h}>{h}</div>)}</div>
        {rows.slice(0, 8).map((r, i) => <div key={i} className="grid grid-cols-3 gap-2"><div>{r[0]}</div><div>{r[1]}</div><div>{r[2]}</div></div>)}
        {rows.length === 0 && <div className="text-zinc-500">No entries yet.</div>}
      </div>
    </div>
  );
}
