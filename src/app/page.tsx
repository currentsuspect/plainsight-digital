import type { Metadata } from "next";
import LeadForm from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Plainsight Digital | High-Ticket Websites & Conversion Systems for Kenya",
  description: "Luxury-grade, conversion-focused websites for clinics, law firms, schools, hotels, and logistics companies in Kenya. We build digital systems that generate leads, not just pageviews.",
  keywords: ["website design Kenya", "high-ticket website Nairobi", "conversion optimization Kenya", "law firm website", "clinic website", "school website design"],
  openGraph: {
    title: "Plainsight Digital | High-Ticket Websites & Conversion Systems",
    description: "Luxury-grade, conversion-focused websites for clinics, law firms, schools, hotels, and logistics companies in Kenya.",
    url: "https://plainsight.digital",
    siteName: "Plainsight Digital",
    locale: "en_KE",
    type: "website",
  },
  alternates: {
    canonical: "https://plainsight.digital",
  },
};

const sectors = [
  { label: "Private Clinics & Medical Centers", href: "/clinics", description: "Patient booking systems" },
  { label: "Law Firms", href: "/law-firms", description: "Consultation funnels" },
  { label: "Private Schools", href: "/schools", description: "Admissions optimization" },
  { label: "Hotels & Resorts", href: "/hotels", description: "Direct booking engines" },
  { label: "Logistics Companies", href: "/logistics", description: "B2B lead generation" },
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
          Luxury-grade websites for businesses that can&apos;t afford to look average.
        </h1>
        <p className="reveal reveal-delay-2 mt-6 max-w-3xl text-base text-zinc-300 sm:text-lg">
          We build high-conversion digital systems for clinics, law firms, schools, hotels, and logistics brands — engineered as a lifetime investment, not a disposable design expense.
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
          <p className="text-xs uppercase tracking-[0.18em] text-amber-300">About Plainsight</p>
          <h2 className="mt-3 font-display text-3xl text-zinc-100">We build for operators, not vanity metrics.</h2>
          <p className="mt-4 max-w-3xl text-zinc-300">
            We&apos;re a small team that cares about business outcomes. If your site looks decent but doesn&apos;t close, we fix the conversion path, tighten your offer, and make follow-up easier for your team.
          </p>
          <a 
            href="/promise" 
            className="mt-4 inline-block text-sm text-amber-300 hover:text-amber-200 transition"
          >
            Our Promise →
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
