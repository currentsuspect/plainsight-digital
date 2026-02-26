"use client";

import { useState } from "react";

export default function ROICalculator() {
  const [monthlyVisitors, setMonthlyVisitors] = useState(1000);
  const [conversionRate, setConversionRate] = useState(2);
  const [avgCustomerValue, setAvgCustomerValue] = useState(50000);
  const [showResults, setShowResults] = useState(false);

  // Current state (typical poor website)
  const currentLeads = Math.round(monthlyVisitors * (conversionRate / 100));
  const currentRevenue = currentLeads * avgCustomerValue;
  
  // With optimized website (industry benchmarks for high-ticket services)
  const optimizedRate = Math.min(conversionRate * 2.5, 12); // 2.5x improvement, cap at 12%
  const optimizedLeads = Math.round(monthlyVisitors * (optimizedRate / 100));
  const optimizedRevenue = optimizedLeads * avgCustomerValue;
  
  const additionalRevenue = optimizedRevenue - currentRevenue;
  const annualGain = additionalRevenue * 12;
  const roi = ((annualGain - 100000) / 100000) * 100; // Assuming 100K website investment

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-8">
      {!showResults ? (
        <>
          <div className="text-center mb-8">
            <h3 className="font-display text-2xl text-zinc-100 mb-2">Revenue Calculator</h3>
            <p className="text-zinc-400">See how much revenue your website could be generating</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Monthly website visitors
              </label>
              <input
                type="range"
                min="100"
                max="50000"
                step="100"
                value={monthlyVisitors}
                onChange={(e) => setMonthlyVisitors(Number(e.target.value))}
                className="w-full accent-amber-300"
              />
              <div className="flex justify-between text-sm text-zinc-500 mt-1">
                <span>100</span>
                <span className="text-amber-300 font-semibold">{monthlyVisitors.toLocaleString()}</span>
                <span>50,000</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Current conversion rate (%)
              </label>
              <input
                type="range"
                min="0.1"
                max="10"
                step="0.1"
                value={conversionRate}
                onChange={(e) => setConversionRate(Number(e.target.value))}
                className="w-full accent-amber-300"
              />
              <div className="flex justify-between text-sm text-zinc-500 mt-1">
                <span>0.1%</span>
                <span className="text-amber-300 font-semibold">{conversionRate}%</span>
                <span>10%</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Average customer value (KES)
              </label>
              <input
                type="range"
                min="5000"
                max="500000"
                step="5000"
                value={avgCustomerValue}
                onChange={(e) => setAvgCustomerValue(Number(e.target.value))}
                className="w-full accent-amber-300"
              />
              <div className="flex justify-between text-sm text-zinc-500 mt-1">
                <span>5K</span>
                <span className="text-amber-300 font-semibold">KES {avgCustomerValue.toLocaleString()}</span>
                <span>500K</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowResults(true)}
            className="w-full mt-8 rounded-md bg-amber-300 px-7 py-3.5 text-sm font-semibold text-zinc-950 transition hover:bg-amber-200"
          >
            Calculate Revenue Potential
          </button>
        </>
      ) : (
        <>
          <div className="text-center mb-8">
            <p className="text-sm text-zinc-500 mb-2">Your Website's Revenue Potential</p>
            <div className="text-5xl font-display text-amber-300 mb-2">
              KES {annualGain >= 1000000 ? `${(annualGain/1000000).toFixed(1)}M` : `${(annualGain/1000).toFixed(0)}K`}
            </div>
            <p className="text-zinc-400">additional annual revenue possible</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div className="p-4 rounded-lg border border-zinc-800 bg-zinc-900/50">
              <p className="text-sm text-zinc-500 mb-1">Current Monthly</p>
              <p className="text-2xl font-display text-zinc-300">KES {currentRevenue.toLocaleString()}</p>
              <p className="text-xs text-zinc-600">{currentLeads} leads @ {conversionRate}%</p>
            </div>

            <div className="p-4 rounded-lg border border-emerald-500/30 bg-emerald-500/10">
              <p className="text-sm text-emerald-400 mb-1">With Optimization</p>
              <p className="text-2xl font-display text-emerald-300">KES {optimizedRevenue.toLocaleString()}</p>
              <p className="text-xs text-emerald-600">{optimizedLeads} leads @ {optimizedRate.toFixed(1)}%</p>
            </div>
          </div>

          <div className="p-4 rounded-lg border border-amber-300/20 bg-amber-500/5 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-zinc-300">ROI on website investment:</span>
              <span className="text-2xl font-display text-amber-300">+{roi.toFixed(0)}%</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="https://cal.com/plainsightdigital/30min"
              target="_blank"
              rel="noopener"
              className="flex-1 text-center rounded-md bg-amber-300 px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-amber-200"
            >
              📅 Book Strategy Call
            </a>
            <button
              onClick={() => setShowResults(false)}
              className="flex-1 rounded-md border border-zinc-700 px-6 py-3 text-sm text-zinc-200 transition hover:border-zinc-500"
            >
              Recalculate
            </button>
          </div>
        </>
      )}
    </div>
  );
}
