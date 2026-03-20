import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The PlainSight Model | PlainSight Digital",
  description: "How our commission-based web development and lead generation model works. Zero upfront costs, pay only for results.",
  alternates: {
    canonical: "https://www.plainsightdigital.dev/promise",
  },
};

const values = [
  {
    title: "Skin In The Game",
    description: "We don't charge you $5,000 for a website and disappear. We build it for free and only make money when you make money.",
  },
  {
    title: "Zero Upfront Risk",
    description: "No retainers. No design fees. No hosting costs. We take on 100% of the financial risk to build your digital infrastructure.",
  },
  {
    title: "Performance Only",
    description: "We are financially incentivized to make your phone ring. If our website doesn't generate qualified leads, we don't get paid.",
  },
  {
    title: "Data-Driven Design",
    description: "We don't guess. Every decision — from button color to page structure — is backed by conversion research and user behavior data.",
  },
  {
    title: "Partnership, Not Transaction",
    description: "We succeed when you succeed. We are your fractional Chief Marketing Officer and development team rolled into one.",
  },
];

const standards = [
  { label: "Website Build Cost", value: "$0.00" },
  { label: "Hosting & Maintenance", value: "$0.00 / month" },
  { label: "SEO & Content Updates", value: "$0.00 / month" },
  { label: "Lead Generation Commission", value: "Agreed percentage per closed deal" },
  { label: "Contract Type", value: "Performance-based Partnership" },
];

const differences = [
  { title: "No Bloat", description: "We don't sell you features you don't need" },
  { title: "Aligned Incentives", description: "Agencies want to sell you a website. We want to sell your services." },
  { title: "Kenyan Context", description: "M-Pesa integration, local hosting, Kenyan user behavior" },
  { title: "Future-Proof", description: "Your site is built to grow with you" },
];

export default function PromisePage() {
  return (
    <main className="min-h-screen bg-[#09090b] text-[#f5f3ef]">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_15%_20%,rgba(245,158,11,0.14),transparent_30%),radial-gradient(circle_at_85%_0%,rgba(251,191,36,0.08),transparent_28%),linear-gradient(to_bottom,rgba(10,10,10,0.96),rgba(10,10,10,1))]" />

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-5 pt-14 pb-10 sm:px-7 md:pt-24 md:pb-16">
        <p className="text-sm uppercase tracking-[0.24em] text-amber-300">The PlainSight Model</p>
        <h1 className="mt-4 max-w-4xl font-display text-3xl leading-[1.08] sm:text-5xl md:text-6xl">
          We don't charge for websites. We charge for revenue.
        </h1>
        <p className="mt-6 max-w-2xl text-base text-zinc-300 sm:text-lg">
          The traditional agency model is broken. They get paid whether their website makes you money or not. We changed the rules.
        </p>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-7">
        <div className="border-t border-white/10 pt-12">
          <h2 className="text-sm uppercase tracking-[0.24em] text-amber-300 mb-8">Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value) => (
              <div key={value.title} className="rounded-lg border border-white/10 bg-white/5 p-6">
                <span className="text-amber-300 text-lg mb-4 block">◆</span>
                <h3 className="font-display text-lg mb-2">{value.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Satisfaction Commitment */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-7">
        <div className="border-t border-white/10 pt-12">
          <h2 className="text-sm uppercase tracking-[0.24em] text-amber-300 mb-8">The Deal Structure</h2>
          
          <div className="rounded-lg border border-white/10 overflow-hidden">
            {standards.map((standard, index) => (
              <div 
                key={standard.label} 
                className={`flex flex-col sm:flex-row sm:justify-between sm:items-center p-6 ${index !== standards.length - 1 ? 'border-b border-white/10' : ''}`}
              >
                <span className="font-display text-white mb-2 sm:mb-0">{standard.label}</span>
                <span className="text-zinc-400 text-sm font-semibold">{standard.value}</span>
              </div>
            ))}
          </div>

          {/* Guarantee */}
          <div className="mt-10 rounded-lg border border-amber-300/30 bg-amber-300/5 p-8">
            <h3 className="font-display text-xl text-amber-300 mb-4">Our Commitment</h3>
            <p className="text-white text-lg mb-6">We only make money when you close a deal.</p>
            <ul className="space-y-3 text-zinc-300">
              <li className="flex items-start">
                <span className="text-amber-300 mr-3">◆</span>
                We build and host the website at zero cost to you.
              </li>
              <li className="flex items-start">
                <span className="text-amber-300 mr-3">◆</span>
                We manage the SEO, speed optimization, and lead funnels.
              </li>
              <li className="flex items-start">
                <span className="text-amber-300 mr-3">◆</span>
                We qualify the leads and send them directly to your phone/email.
              </li>
              <li className="flex items-start">
                <span className="text-amber-300 mr-3">◆</span>
                You only pay us a pre-agreed commission when that lead turns into paying revenue.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-7">
        <div className="border-t border-white/10 pt-12">
          <h2 className="text-sm uppercase tracking-[0.24em] text-amber-300 mb-8">The PlainSight Difference</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {differences.map((diff) => (
              <div key={diff.title} className="flex items-start space-x-4 p-4">
                <span className="text-amber-300 text-xl">◆</span>
                <div>
                  <h3 className="font-display mb-1">{diff.title}</h3>
                  <p className="text-zinc-400 text-sm">{diff.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-7">
        <div className="border-t border-white/10 pt-12">
          <h2 className="text-sm uppercase tracking-[0.24em] text-amber-300 mb-8">Our Process</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { step: "01", title: "Discovery", desc: "Goals, audience, constraints" },
              { step: "02", title: "Design", desc: "Clean, conversion-focused" },
              { step: "03", title: "Build", desc: "Fast, accessible, SEO-ready" },
              { step: "04", title: "Launch", desc: "Analytics connected" },
              { step: "05", title: "Support", desc: "30 days post-launch" },
            ].map((item) => (
              <div key={item.step} className="text-center p-4">
                <div className="w-12 h-12 border border-amber-300 text-amber-300 rounded-full flex items-center justify-center font-display mx-auto mb-3">
                  {item.step}
                </div>
                <h3 className="font-display mb-1">{item.title}</h3>
                <p className="text-zinc-400 text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-7">
        <div className="border-t border-white/10 pt-12">
          <h2 className="text-sm uppercase tracking-[0.24em] text-amber-300 mb-8">The PlainSight Promise</h2>
          
          <div className="max-w-2xl mx-auto text-center">
            <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-8 mb-8">
              <div className="text-center mb-6">
                <div className="text-5xl font-display text-amber-300">$0</div>
                <div className="text-base text-zinc-300 mt-2 font-medium">Upfront Costs. Zero Retainers.</div>
              </div>
              <p className="text-zinc-400 text-sm">You only pay us when our leads turn into closed deals.</p>
            </div>
            
            <p className="text-zinc-400 mb-8">
              We vet our partners strictly because we invest our own capital and time to build the infrastructure. If you provide a high-ticket service and can handle more volume, we want to talk.
            </p>
            
            <Link 
              href="/#audit"
              className="inline-block rounded-md bg-amber-300 px-8 py-4 text-center text-sm font-semibold tracking-wide text-zinc-950 transition hover:bg-amber-200"
            >
              Apply for Partnership →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-7">
        <div className="rounded-lg border border-white/10 bg-white/5 p-8 md:p-12 text-center">
          <h2 className="font-display text-2xl md:text-3xl mb-4">Ready to work with us?</h2>
          <p className="text-zinc-400 mb-6 max-w-xl mx-auto">
            Let's build a digital presence that converts visitors into customers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#audit"
              className="rounded-md bg-amber-300 px-7 py-3.5 text-center text-sm font-semibold tracking-wide text-zinc-950 transition hover:bg-amber-200"
            >
              Get Your Free Audit
            </Link>
            <Link
              href="/"
              className="rounded-md border border-white/20 px-7 py-3.5 text-center text-sm font-semibold tracking-wide text-white transition hover:bg-white/10"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="mx-auto max-w-6xl px-5 sm:px-7 text-center">
          <p className="text-zinc-500 text-sm">
            © {new Date().getFullYear()} PlainSight Digital. Nairobi, Kenya.
          </p>
        </div>
      </footer>
    </main>
  );
}
