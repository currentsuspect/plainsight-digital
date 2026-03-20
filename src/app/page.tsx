import type { Metadata } from "next";
import LeadForm from "@/components/LeadForm";
import LeadDiagnostic from "@/components/LeadDiagnostic";
import ROICalculator from "@/components/ROICalculator";

export const metadata: Metadata = {
  title: "Plainsight Digital | Web Dev & Lead Generation Agency",
  description: "High-end web development, conversion-focused websites, and commission-based lead generation systems for service-based businesses in Kenya.",
  keywords: ["web development Kenya", "lead generation agency", "website design Nairobi", "commission based marketing", "conversion optimization Kenya", "B2B lead generation"],
  openGraph: {
    title: "Plainsight Digital | Web Dev & Lead Generation Agency",
    description: "High-end web development, conversion-focused websites, and commission-based lead generation systems for service-based businesses in Kenya.",
    url: "https://www.plainsightdigital.dev",
    siteName: "Plainsight Digital",
    locale: "en_KE",
    type: "website",
  },
  alternates: {
    canonical: "https://www.plainsightdigital.dev",
  },
};

const sectors = [
  { label: "Construction & Trade", href: "/construction", description: "B2B/B2C lead generation" },
  { label: "Private Clinics", href: "/clinics", description: "Patient booking systems" },
  { label: "Law Firms", href: "/law-firms", description: "High-value consultation funnels" },
  { label: "Private Schools", href: "/schools", description: "Admissions optimization" },
  { label: "Logistics", href: "/logistics", description: "B2B client acquisition" },
];

const pillars = [
  {
    title: "Authority-first design",
    text: "Your digital presence should feel like a market leader before anyone books a call.",
    icon: "◆",
  },
  {
    title: "Revenue path engineering",
    text: "We design every page around inquiry, booking, and payment conversion paths.",
    icon: "◆",
  },
  {
    title: "Operational follow-through",
    text: "Lead routing, follow-up sequences, and dashboard visibility so opportunities don't leak.",
    icon: "◆",
  },
];

const outcomes = [
  { value: "High-ticket", label: "Client positioning" },
  { value: "Kenya-first", label: "Market strategy" },
  { value: "Global-ready", label: "Payment expansion" },
  { value: "Fast execution", label: "Delivery rhythm" },
];

const proofOfWork = [
  {
    title: "Resonance Platform",
    result: "AI product shipped",
    note: "Built a full-stack companion platform with chat, notes, music, and workflow integrations.",
  },
  {
    title: "Aestra",
    result: "Creative tech build",
    note: "Developed a distinct product experience around advanced audio tooling and brand identity.",
    href: "https://aestra.studio",
    hrefLabel: "Visit Aestra.studio",
  },
  {
    title: "Plainsight Lead Engine",
    result: "End-to-end pipeline",
    note: "Shipped capture, scoring, outreach workflows, and ops dashboard to support client growth.",
  },
];

const processSteps = [
  { step: "01", title: "Discovery Call", desc: "We understand your business, audience, and revenue goals." },
  { step: "02", title: "Audit & Strategy", desc: "You get a conversion gap analysis and prioritized roadmap." },
  { step: "03", title: "Build & Launch", desc: "We ship your site with lead capture and automation ready." },
  { step: "04", title: "Optimize", desc: "Post-launch testing and iteration to maximize results." },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#09090b] text-[#f5f3ef]">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_15%_20%,rgba(245,158,11,0.14),transparent_30%),radial-gradient(circle_at_85%_0%,rgba(251,191,36,0.08),transparent_28%),linear-gradient(to_bottom,rgba(10,10,10,0.96),rgba(10,10,10,1))]" />

      {/* Hero Section */}
      <section className="mx-auto max-w-6xl px-5 pt-14 pb-10 sm:px-7 md:pt-24 md:pb-16">
        <p className="reveal text-sm uppercase tracking-[0.24em] text-amber-300">Plainsight Digital</p>
        <h1 className="reveal reveal-delay-1 mt-4 max-w-5xl font-display text-3xl leading-[1.08] sm:text-5xl md:text-7xl">
          We build digital assets that actively generate leads and revenue.
        </h1>
        <p className="reveal reveal-delay-2 mt-6 max-w-3xl text-base text-zinc-300 sm:text-lg">
          Web development and commission-based lead generation for service businesses. Stop paying for traffic that doesn't convert. We build the system, drive the leads, and grow with you.
        </p>

        <div className="reveal reveal-delay-3 mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href="#audit"
            className="rounded-md bg-amber-300 px-7 py-3.5 text-center text-sm font-semibold tracking-wide text-zinc-950 transition hover:bg-amber-200"
          >
            Request Premium Audit
          </a>
          <a
            href="/audit"
            className="rounded-md border border-amber-300/50 px-7 py-3.5 text-center text-sm font-semibold tracking-wide text-amber-300 transition hover:bg-amber-300/10"
          >
            🔍 Free Website Grader (30s)
          </a>
          <a href="#work" className="rounded-md border border-zinc-700 px-7 py-3.5 text-center text-sm text-zinc-200 transition hover:border-zinc-500 hover:bg-zinc-900">
            See Our Work
          </a>
        </div>
      </section>

      {/* Outcomes Grid */}
      <section className="mx-auto max-w-6xl px-5 pb-10 sm:px-7">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {outcomes.map((item) => (
            <div key={item.label} className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-4 transition hover:border-zinc-700">
              <p className="font-display text-xl text-amber-200 sm:text-2xl">{item.value}</p>
              <p className="text-xs uppercase tracking-wide text-zinc-400">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pillars Section */}
      <section id="work" className="mx-auto max-w-6xl px-5 py-12 sm:px-7 md:py-16">
        <p className="text-xs uppercase tracking-[0.18em] text-amber-300">How we work</p>
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {pillars.map((item) => (
            <article key={item.title} className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 transition hover:border-zinc-700">
              <span className="text-2xl text-amber-400">{item.icon}</span>
              <h2 className="mt-3 font-display text-2xl text-zinc-100">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-zinc-300">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="mx-auto max-w-6xl px-5 py-8 sm:px-7 md:py-12">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 md:p-8">
          <p className="text-xs uppercase tracking-[0.18em] text-amber-300">The PlainSight Model</p>
          <h2 className="mt-3 font-display text-3xl text-zinc-100">We don't charge for the site. We charge for the leads.</h2>
          <p className="mt-4 max-w-3xl text-zinc-300">
            We operate on a pure performance model. We build you a $5,000+ luxury-grade digital ecosystem entirely for free. We pay for the hosting, the development, the SEO, and the maintenance. You only pay a commission when we deliver a qualified, paying client directly to your business. If we don't perform, you don't pay. It's that simple.
          </p>
          <a 
            href="/promise" 
            className="mt-4 inline-block text-sm text-amber-300 hover:text-amber-200 transition"
          >
            How our commission model works →
          </a>
        </div>
      </section>

      {/* Proof of Work */}
      <section className="mx-auto max-w-6xl px-5 py-8 sm:px-7 md:py-12">
        <p className="text-xs uppercase tracking-[0.18em] text-amber-300">Proof of work</p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {proofOfWork.map((item) => (
            <article key={item.title} className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 transition hover:border-zinc-700">
              <p className="text-xs uppercase tracking-wide text-amber-200">{item.result}</p>
              <h3 className="mt-2 text-lg font-semibold text-zinc-100">{item.title}</h3>
              <p className="mt-2 text-sm text-zinc-300">{item.note}</p>
              {item.href && (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-sm text-amber-300 hover:text-amber-200 transition"
                >
                  {item.hrefLabel || "View project"} →
                </a>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* Process Steps */}
      <section className="mx-auto max-w-6xl px-5 py-8 sm:px-7 md:py-12">
        <p className="text-xs uppercase tracking-[0.18em] text-amber-300">Our process</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {processSteps.map((item) => (
            <div key={item.step} className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5">
              <span className="text-3xl font-display text-amber-400">{item.step}</span>
              <h3 className="mt-2 font-semibold text-zinc-100">{item.title}</h3>
              <p className="mt-1 text-sm text-zinc-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Target Sectors */}
      <section className="mx-auto max-w-6xl px-5 py-8 sm:px-7 md:py-12">
        <div className="rounded-2xl border border-amber-300/20 bg-gradient-to-br from-zinc-900/90 to-zinc-950 p-6 md:p-8">
          <p className="text-xs uppercase tracking-[0.18em] text-amber-300">Target sectors</p>
          <p className="mt-2 text-zinc-400 text-sm">Click to explore how we serve each industry</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {sectors.map((sector) => (
              <a
                key={sector.label}
                href={sector.href}
                className="group rounded-lg border border-zinc-800 bg-zinc-900/60 px-4 py-4 transition hover:border-amber-300/40 hover:bg-zinc-900/80"
              >
                <span className="block text-sm font-medium text-zinc-200 group-hover:text-amber-200 transition">
                  {sector.label} →
                </span>
                <span className="block mt-1 text-xs text-zinc-500">{sector.description}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Partners */}
      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-7">
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-[0.24em] text-zinc-500 mb-4">Trusted integrations</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60">
            {/* M-Pesa */}
            <div className="flex items-center gap-2 text-zinc-400">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
              <span className="font-semibold">M-Pesa</span>
            </div>
            {/* WhatsApp Business */}
            <div className="flex items-center gap-2 text-zinc-400">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2z"/>
              </svg>
              <span className="font-semibold">WhatsApp Business</span>
            </div>
            {/* Google Analytics */}
            <div className="flex items-center gap-2 text-zinc-400">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
              <span className="font-semibold">Google Analytics</span>
            </div>
            {/* Next.js */}
            <div className="flex items-center gap-2 text-zinc-400">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
              <span className="font-semibold">Next.js</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Blog Post */}
      <section className="mx-auto max-w-6xl px-5 py-8 sm:px-7 md:py-12">
        <p className="text-xs uppercase tracking-[0.18em] text-amber-300 mb-4">Latest from our blog</p>
        <a
          href="/blog/website-cost-kenya"
          className="group block rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 md:p-8 transition hover:border-amber-300/40 hover:bg-zinc-900/80"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="font-display text-xl text-zinc-100 group-hover:text-amber-200 transition">
                How Much Does a Website Cost in Kenya? (2026 Pricing Guide)
              </h3>
              <p className="mt-2 text-zinc-400 text-sm">
                Complete breakdown from KES 15,000 DIY builders to KES 500,000+ enterprise sites.
              </p>
              <div className="mt-3 flex items-center gap-3 text-xs text-zinc-500">
                <span>Pricing</span>
                <span>•</span>
                <span>8 min read</span>
              </div>
            </div>
            <span className="text-amber-300 text-sm font-medium group-hover:translate-x-1 transition">
              Read article →
            </span>
          </div>
        </a>
      </section>

      {/* Lead Diagnostic Tool */}
      <section className="mx-auto max-w-4xl px-5 py-12 sm:px-7 md:py-16">
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-[0.24em] text-amber-300 mb-4">Free Diagnostic</p>
          <h2 className="font-display text-3xl md:text-4xl text-zinc-100 mb-4">
            Is Your Website Leaking Leads?
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Take this 60-second diagnostic to discover your Lead Leak Score and get personalized fixes for your industry.
          </p>
        </div>
        <LeadDiagnostic />
      </section>

      {/* ROI Calculator */}
      <section className="mx-auto max-w-4xl px-5 py-12 sm:px-7 md:py-16">
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-[0.24em] text-amber-300 mb-4">Revenue Calculator</p>
          <h2 className="font-display text-3xl md:text-4xl text-zinc-100 mb-4">
            Calculate Your Revenue Potential
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            See how much additional revenue an optimized website could generate for your business.
          </p>
        </div>
        <ROICalculator />
      </section>

      {/* Audit Form Section */}
      <section id="audit" className="mx-auto max-w-4xl px-5 py-12 sm:px-7 md:py-16">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5 sm:p-7 md:p-8">
          <h2 className="font-display text-3xl text-zinc-100">Get your high-ticket website audit</h2>
          <p className="mt-3 text-zinc-300">
            You&apos;ll get conversion leaks, trust gaps, and practical fixes your team can execute immediately.
          </p>

          <LeadForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 mt-8 py-8 px-5">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-400">
          <p>© {new Date().getFullYear()} Plainsight Digital. Nairobi, Kenya.</p>
          <div className="flex gap-6">
            <a href="/blog" className="hover:text-amber-300 transition">
              Blog
            </a>
            <a href="/promise" className="hover:text-amber-300 transition">
              Our Promise
            </a>
            <a href="https://wa.me/254750192512" target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition">
              WhatsApp
            </a>
            <a href="mailto:hello@plainsight.digital" className="hover:text-amber-300 transition">
              Email
            </a>
          </div>
        </div>
      </footer>

      {/* Sticky Mobile CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-zinc-800 bg-zinc-950/95 p-3 backdrop-blur md:hidden">
        <a
          href="#audit"
          className="block w-full rounded-md bg-amber-300 py-3.5 text-center text-sm font-semibold text-zinc-950"
        >
          Request Premium Audit
        </a>
      </div>

      {/* WhatsApp Float */}
      <a
        href="https://wa.me/254750192512?text=Hi%20Plainsight%20Digital%2C%20I%20want%20a%20premium%20website%20audit."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Plainsight Digital on WhatsApp"
        className="fixed bottom-20 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400 md:bottom-6"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="block h-7 w-7 fill-current">
          <path d="M20.52 3.48A11.86 11.86 0 0 0 12.07 0C5.54 0 .23 5.3.23 11.83c0 2.08.54 4.1 1.57 5.88L0 24l6.45-1.7a11.8 11.8 0 0 0 5.62 1.43h.01c6.52 0 11.83-5.31 11.84-11.84a11.8 11.8 0 0 0-3.4-8.41ZM12.08 21.73h-.01a9.8 9.8 0 0 1-4.99-1.37l-.36-.21-3.83 1.01 1.02-3.74-.23-.38a9.81 9.81 0 0 1-1.5-5.21c0-5.42 4.41-9.83 9.84-9.83 2.63 0 5.1 1.02 6.95 2.88a9.78 9.78 0 0 1 2.88 6.95c0 5.42-4.42 9.83-9.77 9.9Zm5.39-7.36c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.23-.64.08-.3-.15-1.24-.45-2.36-1.44-.88-.78-1.47-1.74-1.64-2.03-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.62-.91-2.22-.24-.58-.49-.5-.67-.51-.17-.01-.38-.01-.58-.01-.2 0-.53.08-.81.38-.28.3-1.06 1.03-1.06 2.51 0 1.48 1.08 2.91 1.23 3.11.15.2 2.11 3.22 5.12 4.52.72.31 1.28.49 1.72.62.72.23 1.37.2 1.89.12.58-.09 1.77-.72 2.02-1.41.25-.69.25-1.28.17-1.41-.08-.13-.27-.2-.57-.35Z" />
        </svg>
      </a>
    </main>
  );
}
