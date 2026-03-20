import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plainsight Digital | High-Converting Websites & Lead Generation",
  description: "We build digital assets that actively generate leads and revenue. View our portfolio and get a free website audit.",
  keywords: ["website audit", "web development Kenya", "lead generation agency", "conversion optimization", "B2B lead generation"],
  openGraph: {
    title: "Plainsight Digital | High-Converting Websites & Lead Generation",
    description: "We build digital assets that actively generate leads and revenue. View our portfolio and get a free website audit.",
    url: "https://www.plainsightdigital.dev",
    siteName: "Plainsight Digital",
    locale: "en_KE",
    type: "website",
  },
  alternates: {
    canonical: "https://www.plainsightdigital.dev",
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#09090b] text-[#f5f3ef] selection:bg-amber-500/30">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/40 via-[#09090b] to-[#09090b]" />

      {/* Hero Section */}
      <section className="relative px-5 pt-32 pb-20 sm:px-8 mx-auto max-w-5xl text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-medium uppercase tracking-widest mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          Accepting New Clients
        </div>
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl leading-[1.1] text-white tracking-tight mb-6">
          We build websites that <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">print money.</span>
        </h1>
        <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-10">
          Stop paying for digital brochures. We design high-end web experiences and deploy commission-based lead generation systems that actually grow your bottom line.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="/audit" className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg bg-amber-400 px-8 py-4 text-sm font-bold tracking-wide text-zinc-950 transition-all hover:bg-amber-300 hover:scale-105 shadow-[0_0_30px_rgba(251,191,36,0.15)]">
            Get a Free Website Audit
          </a>
          <a href="#work" className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/50 px-8 py-4 text-sm font-bold tracking-wide text-white transition-all hover:bg-zinc-800">
            View Our Work
          </a>
        </div>
      </section>

      {/* The Model / Pitch */}
      <section className="px-5 py-24 bg-zinc-950/50 border-y border-zinc-900/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl text-white mb-4">The Plainsight Model</h2>
            <p className="text-zinc-400">We align our success directly with your revenue.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 rounded-2xl bg-zinc-900/40 border border-zinc-800/50 transition duration-300 hover:border-amber-400/30 group">
              <div className="w-12 h-12 rounded-xl bg-zinc-800/80 border border-zinc-700 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
              </div>
              <h3 className="font-display text-2xl text-white mb-3">Starting from scratch?</h3>
              <p className="text-zinc-400 leading-relaxed text-sm">We build high-converting, custom digital assets for a flat rate. Once live, we partner with you on a commission basis to drive targeted, highly-qualified leads straight into your new funnel.</p>
            </div>
            <div className="p-8 rounded-2xl bg-zinc-900/40 border border-zinc-800/50 transition duration-300 hover:border-amber-400/30 group">
              <div className="w-12 h-12 rounded-xl bg-zinc-800/80 border border-zinc-700 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
              </div>
              <h3 className="font-display text-2xl text-white mb-3">Already have a site?</h3>
              <p className="text-zinc-400 leading-relaxed text-sm">If your current infrastructure is solid, we skip the build. We deploy our cold outreach and advanced marketing systems to force traffic to your existing site—strictly on commission.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="work" className="px-5 py-32 mx-auto max-w-5xl">
        <div className="mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-amber-400 font-medium mb-3">Selected Proof of Work</p>
          <h2 className="font-display text-4xl sm:text-5xl text-white mb-6">Built for authority.<br/>Engineered for conversion.</h2>
          <p className="text-lg text-zinc-400 max-w-2xl">We don't just make it look good. We build infrastructure that seamlessly moves a prospect from "just browsing" to "take my money."</p>
        </div>

        <div className="space-y-24">
          {/* Project 1: Construction */}
          <div className="group relative grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            <div className="md:col-span-7 relative rounded-2xl overflow-hidden bg-zinc-900 aspect-[4/3] border border-zinc-800 transition duration-500 group-hover:border-amber-400/30">
              {/* Placeholder for real image */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.1),transparent_50%)]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3/4 h-3/4 border border-zinc-800/50 bg-zinc-950/80 rounded-lg shadow-2xl flex flex-col items-center justify-center p-8 text-center group-hover:scale-[1.02] transition-transform duration-700">
                   <div className="w-12 h-12 bg-zinc-800 rounded mb-4" />
                   <div className="w-3/4 h-4 bg-zinc-800 rounded mb-2" />
                   <div className="w-1/2 h-4 bg-zinc-800 rounded" />
                </div>
              </div>
            </div>
            <div className="md:col-span-5 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-zinc-800 text-xs text-zinc-300 font-medium tracking-wide uppercase">B2B Lead Gen</span>
                <span className="text-amber-400 text-sm">2026</span>
              </div>
              <h3 className="text-3xl font-display text-white mb-4">Plainsight Construction</h3>
              <p className="text-zinc-400 mb-6 text-sm leading-relaxed">A specialized lead-capture funnel designed for high-ticket commercial contractors. Integrated with an automated booking system and SMS follow-ups to close gaps in the sales process.</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start text-sm text-zinc-300"><span className="text-amber-400 mr-3 mt-0.5">◆</span> High-intent quote calculator</li>
                <li className="flex items-start text-sm text-zinc-300"><span className="text-amber-400 mr-3 mt-0.5">◆</span> Automated CRM routing</li>
                <li className="flex items-start text-sm text-zinc-300"><span className="text-amber-400 mr-3 mt-0.5">◆</span> Conversion-optimized UI</li>
              </ul>
            </div>
          </div>

          {/* Project 2: KCH */}
          <div className="group relative grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            <div className="md:col-span-5 flex flex-col justify-center md:order-1 order-2">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-zinc-800 text-xs text-zinc-300 font-medium tracking-wide uppercase">Corporate / Medical</span>
                <span className="text-amber-400 text-sm">2026</span>
              </div>
              <h3 className="text-3xl font-display text-white mb-4">KCH Website</h3>
              <p className="text-zinc-400 mb-6 text-sm leading-relaxed">A massive overhaul of digital infrastructure for Kenyatta Children's Hospital. Streamlined patient onboarding, improved accessibility, and created a trustworthy digital footprint.</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start text-sm text-zinc-300"><span className="text-amber-400 mr-3 mt-0.5">◆</span> Authority-first design system</li>
                <li className="flex items-start text-sm text-zinc-300"><span className="text-amber-400 mr-3 mt-0.5">◆</span> Patient donation & booking flows</li>
                <li className="flex items-start text-sm text-zinc-300"><span className="text-amber-400 mr-3 mt-0.5">◆</span> Enterprise-grade performance</li>
              </ul>
            </div>
            <div className="md:col-span-7 relative rounded-2xl overflow-hidden bg-zinc-900 aspect-[4/3] border border-zinc-800 transition duration-500 group-hover:border-amber-400/30 md:order-2 order-1">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(251,191,36,0.1),transparent_50%)]" />
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-3/4 h-3/4 border border-zinc-800/50 bg-zinc-950/80 rounded-lg shadow-2xl flex flex-col group-hover:scale-[1.02] transition-transform duration-700 overflow-hidden">
                   <div className="h-10 bg-zinc-900 border-b border-zinc-800 flex items-center px-4 gap-2">
                     <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                     <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                     <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                   </div>
                   <div className="p-6 flex-1 flex flex-col gap-4">
                     <div className="w-1/3 h-6 bg-zinc-800 rounded" />
                     <div className="w-full h-32 bg-zinc-800/50 rounded mt-auto" />
                   </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking / Final CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_center,rgba(251,191,36,0.08),transparent_60%)]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />
        
        <div className="relative z-10 max-w-3xl mx-auto px-5 text-center">
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-white mb-6">Ready to scale your pipeline?</h2>
          <p className="text-lg sm:text-xl text-zinc-400 mb-10 max-w-xl mx-auto">
            Whether you need a new asset built from the ground up, or a partner to drive leads to your current site. Let's talk.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {/* If you use cal.com, plug your link here. Using mailto for now as placeholder */}
            <a href="mailto:hello@plainsight.digital?subject=Discovery%20Call" className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-sm font-bold tracking-wide text-zinc-950 transition-all hover:bg-zinc-200 hover:scale-105">
              Book a Discovery Call
            </a>
            <a href="/audit" className="inline-flex items-center justify-center rounded-lg border border-amber-400/30 bg-amber-400/5 px-8 py-4 text-sm font-bold tracking-wide text-amber-300 transition-all hover:bg-amber-400/10">
              Take the Free Audit Instead
            </a>
          </div>
        </div>
      </section>

      <footer className="py-8 text-center text-zinc-600 text-sm border-t border-zinc-900 bg-zinc-950">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between px-5">
          <p>© {new Date().getFullYear()} Plainsight Digital. Nairobi, Kenya.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="/audit" className="hover:text-amber-400 transition">Audit</a>
            <a href="mailto:hello@plainsight.digital" className="hover:text-amber-400 transition">Email</a>
            <a href="https://wa.me/254750192512" className="hover:text-amber-400 transition">WhatsApp</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
