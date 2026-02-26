"use client";

import { useState } from "react";
import Link from "next/link";

const questions = [
  {
    id: 1,
    question: "What's your industry?",
    options: ["Healthcare/Clinic", "Legal", "Education", "Hospitality", "Logistics", "Other"],
  },
  {
    id: 2,
    question: "Current monthly website visitors?",
    options: ["Under 500", "500-2,000", "2,000-10,000", "10,000+"],
  },
  {
    id: 3,
    question: "How many leads do you get per month from your website?",
    options: ["0-5", "6-20", "21-50", "50+", "Not tracking"],
  },
  {
    id: 4,
    question: "What's your average customer value?",
    options: ["Under KES 5,000", "KES 5,000-50,000", "KES 50,000-200,000", "KES 200,000+"],
  },
  {
    id: 5,
    question: "Biggest conversion challenge?",
    options: [
      "Visitors don't contact us",
      "Leads go cold quickly",
      "Can't track ROI",
      "Website looks outdated",
      "No website yet",
    ],
  },
];

export default function LeadDiagnostic() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateLeakScore = () => {
    let score = 100;
    
    // Industry risk
    if (["Healthcare/Clinic", "Legal"].includes(answers[0])) score -= 10;
    
    // Traffic without conversion
    const traffic = answers[1];
    const leads = answers[2];
    if (traffic === "10,000+" && leads === "0-5") score -= 30;
    if (traffic === "2,000-10,000" && leads === "0-5") score -= 25;
    if (traffic === "500-2,000" && leads === "0-5") score -= 20;
    
    // Not tracking = blind
    if (leads === "Not tracking") score -= 25;
    
    // High value + no website = massive leak
    if (answers[3] === "KES 200,000+" && answers[4] === "No website yet") score -= 40;
    
    return Math.max(0, score);
  };

  const getSeverity = (score: number) => {
    if (score >= 80) return { label: "Minor Leaks", color: "text-emerald-400", bg: "bg-emerald-500/20" };
    if (score >= 50) return { label: "Moderate Leaks", color: "text-amber-300", bg: "bg-amber-500/20" };
    return { label: "Critical Leaks", color: "text-red-400", bg: "bg-red-500/20" };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you'd send to your backend
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-amber-300/30 bg-gradient-to-br from-amber-500/10 to-orange-500/5 p-8 text-center">
        <div className="text-5xl mb-4">📊</div>
        <h3 className="font-display text-2xl text-zinc-100 mb-4">Your Full Audit is Being Prepared</h3>
        <p className="text-zinc-400 mb-6">
          Check your email in 5 minutes for a detailed analysis with specific fixes for your {answers[0]} business.
        </p>
        <Link
          href="https://wa.me/254750192512?text=I%20completed%20the%20diagnostic%20and%20want%20to%20discuss%20my%20results"
          className="inline-block rounded-md bg-amber-300 px-7 py-3.5 text-sm font-semibold text-zinc-950 transition hover:bg-amber-200"
        >
          💬 Discuss Results on WhatsApp
        </Link>
      </div>
    );
  }

  if (showResults) {
    const score = calculateLeakScore();
    const severity = getSeverity(score);
    const lostRevenue = answers[3]?.includes("200,000") ? "KES 500K+ monthly" : 
                       answers[3]?.includes("50,000") ? "KES 200K+ monthly" : "Significant revenue";

    return (
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-8">
        <div className="text-center mb-8">
          <p className="text-sm text-zinc-500 mb-2">Your Lead Leak Score</p>
          <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full border-4 ${severity.bg} mb-4`}>
            <span className={`text-5xl font-display ${severity.color}`}>{score}</span>
          </div>
          <p className={`text-xl font-semibold ${severity.color}`}>{severity.label}</p>
          <p className="text-zinc-400 mt-2">Potential revenue loss: {lostRevenue}</p>
        </div>

        <div className="space-y-4 mb-8">
          <h4 className="font-display text-lg text-zinc-100">Quick Fixes for Your {answers[0]} Business:</h4>
          <ul className="space-y-2 text-zinc-400">
            {answers[4] === "Visitors don't contact us" && (
              <>
                <li>• Add WhatsApp click-to-chat on every page</li>
                <li>• Exit-intent popup with lead magnet</li>
                <li>• Simplify contact forms to 3 fields max</li>
              </>
            )}
            {answers[4] === "Leads go cold quickly" && (
              <>
                <li>• Auto-responder within 5 minutes</li>
                <li>• WhatsApp follow-up sequence</li>
                <li>• CRM integration for lead scoring</li>
              </>
            )}
            {answers[4] === "Can't track ROI" && (
              <>
                <li>• Google Analytics 4 with conversion tracking</li>
                <li>• Call tracking for phone inquiries</li>
                <li>• Monthly conversion reports</li>
              </>
            )}
            {(answers[4] === "Website looks outdated" || answers[4] === "No website yet") && (
              <>
                <li>• Mobile-first responsive design</li>
                <li>• Professional photography/video</li>
                <li>• Trust signals and testimonials</li>
              </>
            )}
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-zinc-300 font-semibold">Get your detailed 10-point audit:</p>
          <input
            type="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-4 py-3 text-zinc-100 placeholder-zinc-500 focus:border-amber-300 focus:outline-none"
          />
          <button
            type="submit"
            className="w-full rounded-md bg-amber-300 px-7 py-3.5 text-sm font-semibold text-zinc-950 transition hover:bg-amber-200"
          >
            📧 Send Me The Full Audit
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-8">
      <div className="mb-6">
        <div className="flex justify-between text-sm text-zinc-500 mb-4">
          <span>Question {currentQ + 1} of {questions.length}</span>
          <span>{Math.round(((currentQ + 1) / questions.length) * 100)}%</span>
        </div>
        <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-amber-300 transition-all duration-300"
            style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <h3 className="font-display text-xl text-zinc-100 mb-6">{questions[currentQ].question}</h3>

      <div className="space-y-3">
        {questions[currentQ].options.map((option) => (
          <button
            key={option}
            onClick={() => handleAnswer(option)}
            className="w-full text-left p-4 rounded-lg border border-zinc-800 bg-zinc-900/50 text-zinc-300 transition hover:border-amber-300/40 hover:bg-zinc-900/80 hover:text-zinc-100"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
