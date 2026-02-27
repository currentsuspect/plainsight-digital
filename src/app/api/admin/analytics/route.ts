import { NextResponse } from "next/server";
import { listLeads, listEvents, LeadStatus } from "@/lib/store";
import { reportError } from "@/lib/errorHandler";

export async function GET() {
  try {
    const [leads, events] = await Promise.all([listLeads(), listEvents()]);

    // Funnel by segment
    const funnelBySegment = calculateFunnelBySegment(leads);

    // Response rate proxy (Contacted+ leads / total leads)
    const responseRate = calculateResponseRate(leads);

    // Win/loss breakdown with reasons
    const winLossBreakdown = calculateWinLossBreakdown(leads);

    // Pipeline velocity metrics
    const pipelineVelocity = calculatePipelineVelocity(leads);

    // Lead source performance
    const sourcePerformance = calculateSourcePerformance(leads);

    return NextResponse.json({
      funnelBySegment,
      responseRate,
      winLossBreakdown,
      pipelineVelocity,
      sourcePerformance,
      summary: {
        totalLeads: leads.length,
        hotLeads: leads.filter(l => l.overall_priority === "Hot").length,
        warmLeads: leads.filter(l => l.overall_priority === "Warm").length,
        coldLeads: leads.filter(l => l.overall_priority === "Cold").length,
      },
    });
  } catch (error) {
    reportError(error instanceof Error ? error : new Error(String(error)), "error", {
      path: "/api/admin/analytics",
      method: "GET",
    });
    return NextResponse.json({ error: "Failed to calculate analytics" }, { status: 500 });
  }
}

type FunnelSegment = {
  niche: string;
  stages: Record<LeadStatus, number>;
  conversionRates: Record<string, number>;
};

function calculateFunnelBySegment(leads: any[]): { segments: FunnelSegment[]; overall: FunnelSegment } {
  const niches = [...new Set(leads.map(l => l.niche))];
  const statuses: LeadStatus[] = ["New", "Contacted", "Audit Sent", "Proposal", "Won", "Lost"];

  const segments: FunnelSegment[] = niches.map(niche => {
    const nicheLeads = leads.filter(l => l.niche === niche);
    const stages = {} as Record<LeadStatus, number>;
    
    for (const status of statuses) {
      stages[status] = nicheLeads.filter(l => l.status === status).length;
    }

    const total = nicheLeads.length;
    const conversionRates = {
      newToContacted: total > 0 ? (stages.Contacted + stages["Audit Sent"] + stages.Proposal + stages.Won + stages.Lost) / total : 0,
      contactedToProposal: stages.Contacted > 0 ? (stages.Proposal + stages.Won) / stages.Contacted : 0,
      proposalToWon: stages.Proposal > 0 ? stages.Won / (stages.Proposal + stages.Won + stages.Lost) : 0,
    };

    return { niche, stages, conversionRates };
  });

  // Overall funnel
  const stages = {} as Record<LeadStatus, number>;
  for (const status of statuses) {
    stages[status] = leads.filter(l => l.status === status).length;
  }

  const total = leads.length;
  const overall: FunnelSegment = {
    niche: "all",
    stages,
    conversionRates: {
      newToContacted: total > 0 ? (stages.Contacted + stages["Audit Sent"] + stages.Proposal + stages.Won + stages.Lost) / total : 0,
      contactedToProposal: stages.Contacted > 0 ? (stages.Proposal + stages.Won) / stages.Contacted : 0,
      proposalToWon: stages.Proposal > 0 ? stages.Won / (stages.Proposal + stages.Won + stages.Lost) : 0,
    },
  };

  return { segments, overall };
}

function calculateResponseRate(leads: any[]): { rate: number; contactedCount: number; totalLeadCount: number } {
  const totalLeadCount = leads.length;
  const contactedStatuses: LeadStatus[] = ["Contacted", "Audit Sent", "Proposal", "Won", "Lost"];
  const contactedCount = leads.filter(l => contactedStatuses.includes(l.status)).length;

  return {
    rate: totalLeadCount > 0 ? contactedCount / totalLeadCount : 0,
    contactedCount,
    totalLeadCount,
  };
}

type WinLossData = {
  won: { count: number; totalValue: number; avgValue: number };
  lost: { count: number; reasons: Record<string, number> };
  pending: { count: number; potentialValue: number };
};

function calculateWinLossBreakdown(leads: any[]): WinLossData {
  const wonLeads = leads.filter(l => l.status === "Won");
  const lostLeads = leads.filter(l => l.status === "Lost");
  const pendingLeads = leads.filter(l => !["Won", "Lost"].includes(l.status));

  // Aggregate loss reasons
  const reasons: Record<string, number> = {};
  for (const lead of lostLeads) {
    const reason = lead.loss_reason || "Not specified";
    reasons[reason] = (reasons[reason] || 0) + 1;
  }

  const totalWonValue = wonLeads.reduce((sum, l) => sum + (l.won_value || 0), 0);

  // Estimate potential value for pending leads based on budget
  const budgetValues: Record<string, number> = {
    "<50k": 35000,
    "50k-100k": 75000,
    "100k-250k": 175000,
    "250k+": 350000,
  };
  const potentialValue = pendingLeads.reduce((sum, l) => sum + (budgetValues[l.budget] || 0), 0);

  return {
    won: {
      count: wonLeads.length,
      totalValue: totalWonValue,
      avgValue: wonLeads.length > 0 ? totalWonValue / wonLeads.length : 0,
    },
    lost: {
      count: lostLeads.length,
      reasons,
    },
    pending: {
      count: pendingLeads.length,
      potentialValue,
    },
  };
}

type PipelineVelocity = {
  avgTimeToContact: number; // hours
  avgTimeToProposal: number;
  avgTimeToWin: number;
};

function calculatePipelineVelocity(leads: any[]): PipelineVelocity {
  const calculateAvgTime = (filteredLeads: any[], compareField: string) => {
    const times = filteredLeads
      .filter(l => l.createdAt && l[compareField])
      .map(l => {
        const start = new Date(l.createdAt).getTime();
        const end = new Date(l[compareField]!).getTime();
        return (end - start) / (1000 * 60 * 60); // hours
      })
      .filter(t => t >= 0);

    return times.length > 0 ? times.reduce((a, b) => a + b, 0) / times.length : 0;
  };

  // For now, use updatedAt as proxy for stage transitions
  // In a full implementation, you'd track each stage transition separately
  const contactedLeads = leads.filter(l => ["Contacted", "Audit Sent", "Proposal", "Won"].includes(l.status));
  const proposalLeads = leads.filter(l => ["Proposal", "Won"].includes(l.status));
  const wonLeads = leads.filter(l => l.status === "Won");

  return {
    avgTimeToContact: calculateAvgTime(contactedLeads, "updatedAt"),
    avgTimeToProposal: calculateAvgTime(proposalLeads, "updatedAt"),
    avgTimeToWin: calculateAvgTime(wonLeads, "updatedAt"),
  };
}

type SourcePerformanceItem = {
  source: string;
  count: number;
  wonCount: number;
  winRate: number;
  avgPriorityScore: number;
};

function calculateSourcePerformance(leads: any[]): SourcePerformanceItem[] {
  const sourceGroups: Record<string, any[]> = {};

  for (const lead of leads) {
    const source = lead.source || "unknown";
    if (!sourceGroups[source]) sourceGroups[source] = [];
    sourceGroups[source].push(lead);
  }

  return Object.entries(sourceGroups).map(([source, sourceLeads]) => {
    const wonCount = sourceLeads.filter(l => l.status === "Won").length;
    const priorityScores = sourceLeads.map(l => {
      const p = l.overall_priority;
      return p === "Hot" ? 100 : p === "Warm" ? 50 : 25;
    });

    return {
      source,
      count: sourceLeads.length,
      wonCount,
      winRate: sourceLeads.length > 0 ? wonCount / sourceLeads.length : 0,
      avgPriorityScore: priorityScores.length > 0 
        ? priorityScores.reduce((a, b) => a + b, 0) / priorityScores.length 
        : 0,
    };
  }).sort((a, b) => b.count - a.count);
}
