"use client";

import { Lead } from "@/lib/store";
import { useState } from "react";

type LeadActionsProps = {
  lead: Lead;
  onStatusChange?: () => void;
};

export function LeadActions({ lead, onStatusChange }: LeadActionsProps) {
  const [sending, setSending] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const sendAudit = async () => {
    setSending("audit");
    setError(null);
    try {
      const res = await fetch("/api/admin/send-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId: lead.id }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.reason || "Failed to send audit");
      onStatusChange?.();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed");
    } finally {
      setSending(null);
    }
  };

  const sendProposal = async () => {
    const amount = prompt("Enter proposal amount (KES):");
    if (!amount) return;
    
    const projectName = prompt("Project name:", `Website for ${lead.businessName}`);
    if (!projectName) return;

    setSending("proposal");
    setError(null);
    try {
      const res = await fetch("/api/admin/send-proposal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadId: lead.id,
          projectName,
          amount: parseInt(amount, 10),
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.reason || "Failed to send proposal");
      onStatusChange?.();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed");
    } finally {
      setSending(null);
    }
  };

  const canSendAudit = ["New", "Contacted"].includes(lead.status || "New");
  const canSendProposal = ["Contacted", "Audit Sent"].includes(lead.status || "New");

  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-1 flex-wrap">
        <a
          href={`https://cal.com/plainsightdigital/30min?name=${encodeURIComponent(lead.name)}&email=${encodeURIComponent(lead.email)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded bg-amber-500/80 px-2 py-1 text-xs hover:bg-amber-400 text-black font-medium"
        >
          📅 Book
        </a>
        <a
          href={`mailto:${lead.email}?subject=${encodeURIComponent(`Plainsight audit for ${lead.businessName}`)}`}
          className="rounded border border-zinc-700 px-2 py-1 text-xs hover:bg-zinc-800"
        >
          Email
        </a>
        {lead.phone && (
          <a
            href={`https://wa.me/${lead.phone.replace(/\D/g, "")}?text=${encodeURIComponent(`Hi ${lead.name}, thanks for reaching out to Plainsight Digital. We reviewed your request for ${lead.businessName} and can share quick wins + a plan. Are you available for a short call today?`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded bg-emerald-700/70 px-2 py-1 text-xs hover:bg-emerald-600"
          >
            WhatsApp
          </a>
        )}
      </div>
      
      <div className="flex gap-1 mt-1 flex-wrap">
        <button
          onClick={sendAudit}
          disabled={!canSendAudit || sending !== null}
          className={`rounded px-2 py-1 text-xs ${
            canSendAudit && !sending
              ? "bg-sky-600/70 hover:bg-sky-500 text-white"
              : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
          }`}
        >
          {sending === "audit" ? "Sending..." : "📋 Send Audit"}
        </button>
        <button
          onClick={sendProposal}
          disabled={!canSendProposal || sending !== null}
          className={`rounded px-2 py-1 text-xs ${
            canSendProposal && !sending
              ? "bg-violet-600/70 hover:bg-violet-500 text-white"
              : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
          }`}
        >
          {sending === "proposal" ? "Sending..." : "💼 Send Proposal"}
        </button>
      </div>
      
      {error && <div className="text-xs text-rose-400 mt-1">{error}</div>}
    </div>
  );
}
