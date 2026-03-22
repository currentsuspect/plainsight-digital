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

      {/* Live Audit Ticker */}
      <div className="w-full border-y border-zinc-800/50 bg-zinc-950/80 py-3 overflow-hidden flex whitespace-nowrap">
        <div className="animate-ticker inline-flex gap-8 px-4 items-center">
          <span className="text-zinc-500 text-xs font-mono tracking-wider flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> [JUST AUDITED] Commercial Law Firm — 64% Lead Leakage Found</span>
          <span className="text-zinc-500 text-xs font-mono tracking-wider flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> [JUST AUDITED] Private Clinic (Nairobi) — 3 Critical Conversion Gaps</span>
          <span className="text-zinc-500 text-xs font-mono tracking-wider flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> [NEW CLIENT] Construction Firm — Funnel Optimization Started</span>
          <span className="text-zinc-500 text-xs font-mono tracking-wider flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> [JUST AUDITED] Logistics Co (Mombasa) — Mobile Funnel Broken</span>
          <span className="text-zinc-500 text-xs font-mono tracking-wider flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> [JUST AUDITED] Real Estate Developer — Missing Quote Calculator</span>
          {/* Duplicate for infinite scroll */}
          <span className="text-zinc-500 text-xs font-mono tracking-wider flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> [JUST AUDITED] Commercial Law Firm — 64% Lead Leakage Found</span>
          <span className="text-zinc-500 text-xs font-mono tracking-wider flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> [JUST AUDITED] Private Clinic (Nairobi) — 3 Critical Conversion Gaps</span>
          <span className="text-zinc-500 text-xs font-mono tracking-wider flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> [NEW CLIENT] Construction Firm — Funnel Optimization Started</span>
        </div>
      </div>

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


      {/* The Anti-Agency Manifesto */}
      <section className="px-5 py-24 mx-auto max-w-4xl text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-rose-500 font-medium mb-6">The Industry Lie</p>
        <h2 className="font-display text-3xl sm:text-5xl text-white leading-tight mb-8">
          Traditional agencies are selling you <br/><span className="text-zinc-500 line-through decoration-rose-500 decoration-2">expensive brochures.</span>
        </h2>
        <div className="space-y-6 text-zinc-400 text-lg leading-relaxed text-left sm:text-center max-w-3xl mx-auto">
          <p>Most web agencies sell you "branding", hand you the keys, and leave you with a beautiful website that gets zero traffic.</p>
          <p>We think that's a scam.</p>
          <p className="text-white font-medium">We don't care about design awards. We care about pipeline.</p>
          <p>We build your infrastructure for a flat rate, but we actually stick around and run the lead generation systems on commission. <strong className="text-amber-400 font-normal">If our system doesn't bring you clients, we don't get paid for our ongoing work.</strong></p>
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
              <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-10 pointer-events-none">
                <div className="w-full h-full border border-zinc-800 bg-[#06080A] rounded-lg shadow-2xl overflow-hidden flex flex-col group-hover:scale-[1.02] transition-transform duration-700 relative">
                  
                  {/* Browser Bar */}
                   <div className="h-6 bg-[#0B0F14] border-b border-zinc-800 flex items-center px-3 gap-1.5 shrink-0 z-20">
                     <div className="w-2 h-2 rounded-full bg-zinc-600" />
                     <div className="w-2 h-2 rounded-full bg-zinc-600" />
                     <div className="w-2 h-2 rounded-full bg-zinc-600" />
                     <div className="ml-2 flex-1 h-3 bg-[#111823] rounded border border-zinc-800 flex items-center justify-center">
                       <div className="text-[5px] text-zinc-500 font-medium tracking-widest">TILISTHERCRM.COM</div>
                     </div>
                   </div>

                  {/* Header */}
                  <div className="h-10 border-b border-zinc-800/60 flex items-center px-4 justify-between relative z-10 bg-[#0B0F14] shadow-md">
                    <div className="flex items-center gap-2">
                       <div className="w-4 h-4 bg-gradient-to-br from-orange-500 to-amber-600 rounded flex items-center justify-center shadow-lg shadow-orange-500/20">
                         <div className="w-1.5 h-1.5 bg-white rounded-sm rotate-45" />
                       </div>
                       <div className="text-[10px] font-bold tracking-widest text-zinc-100">TILISTHER <span className="text-zinc-500 font-medium tracking-normal">CRM</span></div>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-4 h-4 rounded-full bg-zinc-800 border border-zinc-700" />
                    </div>
                  </div>
                  
                  {/* Dashboard Body */}
                  <div className="p-4 flex gap-4 h-full relative z-10 bg-[#06080A]">
                    {/* Sidebar */}
                    <div className="w-12 border-r border-zinc-800/50 hidden sm:flex flex-col gap-3 pt-2">
                       <div className="w-6 h-6 rounded bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center"><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg></div>
                       <div className="w-6 h-6 rounded bg-zinc-800/50 flex items-center justify-center opacity-50"><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg></div>
                       <div className="w-6 h-6 rounded bg-zinc-800/50 flex items-center justify-center opacity-50"><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg></div>
                    </div>
                    
                    {/* Main Content */}
                    <div className="flex-1 flex flex-col">
                       <div className="text-[12px] font-medium text-white mb-4">Pipeline Overview</div>
                       
                       <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                          <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-3">
                             <div className="text-[6px] text-zinc-500 uppercase tracking-wide mb-1">Total Leads</div>
                             <div className="text-lg font-display text-white">124</div>
                          </div>
                          <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-3">
                             <div className="text-[6px] text-zinc-500 uppercase tracking-wide mb-1">In Negotiation</div>
                             <div className="text-lg font-display text-white">18</div>
                          </div>
                          <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-3">
                             <div className="text-[6px] text-zinc-500 uppercase tracking-wide mb-1">Pipeline Value</div>
                             <div className="text-lg font-display text-emerald-400">kes 4.2M</div>
                          </div>
                          <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3">
                             <div className="text-[6px] text-orange-300 uppercase tracking-wide mb-1">Conversion</div>
                             <div className="text-lg font-display text-orange-400">14.5%</div>
                          </div>
                       </div>
                       
                       {/* Table Mockup */}
                       <div className="flex-1 bg-zinc-900/30 border border-zinc-800/50 rounded-lg p-3 overflow-hidden">
                          <div className="h-6 border-b border-zinc-800/80 flex items-center mb-2 px-1">
                             <div className="w-1/3 text-[5px] text-zinc-500 uppercase">Client</div>
                             <div className="w-1/4 text-[5px] text-zinc-500 uppercase">Status</div>
                             <div className="w-1/4 text-[5px] text-zinc-500 uppercase">Value</div>
                          </div>
                          <div className="flex flex-col gap-2">
                             <div className="h-8 bg-zinc-800/20 rounded flex items-center px-2">
                                <div className="w-1/3 flex items-center gap-2">
                                   <div className="w-4 h-4 rounded-full bg-zinc-700" />
                                   <div className="h-1.5 w-12 bg-zinc-300 rounded" />
                                </div>
                                <div className="w-1/4"><div className="px-1.5 py-0.5 rounded text-[4px] bg-emerald-500/20 text-emerald-400 w-max border border-emerald-500/20">Closed Won</div></div>
                                <div className="w-1/4 h-1.5 w-8 bg-zinc-500 rounded" />
                             </div>
                             <div className="h-8 bg-zinc-800/20 rounded flex items-center px-2">
                                <div className="w-1/3 flex items-center gap-2">
                                   <div className="w-4 h-4 rounded-full bg-zinc-700" />
                                   <div className="h-1.5 w-16 bg-zinc-400 rounded" />
                                </div>
                                <div className="w-1/4"><div className="px-1.5 py-0.5 rounded text-[4px] bg-amber-500/20 text-amber-400 w-max border border-amber-500/20">Negotiating</div></div>
                                <div className="w-1/4 h-1.5 w-10 bg-zinc-600 rounded" />
                             </div>
                          </div>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:col-span-5 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-zinc-800 text-xs text-zinc-300 font-medium tracking-wide uppercase">B2B Lead Gen</span>
                <span className="text-amber-400 text-sm">2026</span>
              </div>
              <h3 className="text-3xl font-display text-white mb-4">Tilisther Construction</h3>
              <p className="text-zinc-400 mb-6 text-sm leading-relaxed">A specialized lead-capture funnel and opportunity calculator built for the construction sector. It actively qualifies commercial prospects and captures exact project scopes before a call is even booked.</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start text-sm text-zinc-300"><span className="text-amber-400 mr-3 mt-0.5">◆</span> Dynamic project opportunity calculator</li>
                <li className="flex items-start text-sm text-zinc-300"><span className="text-amber-400 mr-3 mt-0.5">◆</span> Automated lead qualification</li>
                <li className="flex items-start text-sm text-zinc-300"><span className="text-amber-400 mr-3 mt-0.5">◆</span> Conversion-optimized UI</li>
              </ul>
            </div>
          </div>

          {/* Project 2: KCH */}
          <div className="group relative grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            <div className="md:col-span-5 flex flex-col justify-center md:order-1 order-2">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-zinc-800 text-xs text-zinc-300 font-medium tracking-wide uppercase">Non-Profit / NGO</span>
                <span className="text-amber-400 text-sm">2026</span>
              </div>
              <h3 className="text-3xl font-display text-white mb-4">KCH Website</h3>
              <p className="text-zinc-400 mb-6 text-sm leading-relaxed">A complete digital overhaul for Kenya Children's Home (KCH). We focused on building international trust, streamlining the donation pipeline, and creating a highly reliable digital footprint for global sponsors.</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start text-sm text-zinc-300"><span className="text-amber-400 mr-3 mt-0.5">◆</span> Trust & authority-first design</li>
                <li className="flex items-start text-sm text-zinc-300"><span className="text-amber-400 mr-3 mt-0.5">◆</span> Frictionless global donation flows</li>
                <li className="flex items-start text-sm text-zinc-300"><span className="text-amber-400 mr-3 mt-0.5">◆</span> Enterprise-grade performance</li>
              </ul>
            </div>
            <div className="md:col-span-7 relative rounded-2xl overflow-hidden bg-zinc-900 aspect-[4/3] border border-zinc-800 transition duration-500 group-hover:border-amber-400/30 md:order-2 order-1">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(251,191,36,0.1),transparent_50%)]" />
              <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-10 pointer-events-none">
                 <div className="w-full h-full border border-zinc-800 bg-[#F5F1EB] rounded-lg shadow-2xl flex flex-col group-hover:scale-[1.02] transition-transform duration-700 overflow-hidden">
                   
                   {/* Browser Bar */}
                   <div className="h-6 bg-[#E8E2D9] border-b border-[#D8CFC0] flex items-center px-3 gap-1.5 shrink-0 z-20">
                     <div className="w-2 h-2 rounded-full bg-[#C8BFA9]" />
                     <div className="w-2 h-2 rounded-full bg-[#C8BFA9]" />
                     <div className="w-2 h-2 rounded-full bg-[#C8BFA9]" />
                     <div className="ml-2 flex-1 h-3 bg-[#F5F1EB] rounded border border-[#D8CFC0] flex items-center justify-center">
                       <div className="text-[5px] text-[#8C8270] font-medium">kenyachildrenshome.org</div>
                     </div>
                   </div>
                   
                   {/* Nav */}
                   <div className="h-12 flex items-center justify-between px-6 shrink-0 bg-white border-b border-[#E8E2D9]">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded flex items-center justify-center overflow-hidden bg-[#DC2626]">
                           <div className="w-3 h-3 border border-white/60 rounded-full" />
                        </div>
                        <div className="flex flex-col">
                           <div className="text-[8px] font-bold text-[#DC2626] leading-none uppercase tracking-wide">Kenya Children's</div>
                           <div className="text-[8px] font-bold text-[#DC2626] leading-none uppercase tracking-wide">Homes</div>
                        </div>
                      </div>
                      <div className="flex gap-4 items-center">
                        <div className="text-[7px] text-[#5C5547] font-medium tracking-wide">WHO WE ARE</div>
                        <div className="text-[7px] text-[#5C5547] font-medium tracking-wide">WHAT WE DO</div>
                        <div className="text-[7px] text-[#5C5547] font-medium tracking-wide">GET INVOLVED</div>
                        <div className="bg-[#DC2626] text-white text-[7px] px-3 py-1.5 rounded-sm font-bold tracking-wider ml-2">DONATE</div>
                      </div>
                   </div>
                   
                   {/* Hero */}
                   <div className="bg-[#991B1B] p-6 sm:p-8 shrink-0 relative overflow-hidden flex flex-col justify-center flex-1">
                     <div className="absolute inset-0 bg-[#DC2626] mix-blend-overlay opacity-50" />
                     {/* Decorative subtle leaves pattern representation */}
                     <div className="absolute -right-10 -bottom-10 w-40 h-40 border border-white/5 rounded-full" />
                     <div className="absolute -left-10 top-10 w-20 h-20 border border-white/5 rounded-full" />
                     
                     <div className="relative z-10 max-w-[80%]">
                       <div className="inline-block border-b border-[#C1A875] pb-0.5 text-[6px] text-[#C1A875] uppercase tracking-widest mb-3 font-semibold">Transforming Lives</div>
                       <div className="text-xl sm:text-3xl font-display text-white mb-3 leading-[1.1]">Give a child<br/>a family and<br/>a future.</div>
                       <div className="flex gap-3 mt-5">
                         <div className="bg-[#C1A875] text-[#991B1B] text-[8px] px-4 py-2 rounded-sm font-bold uppercase tracking-wider">Sponsor A Child</div>
                         <div className="border border-white/30 text-white text-[8px] px-4 py-2 rounded-sm font-bold uppercase tracking-wider">Our Impact</div>
                       </div>
                     </div>
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
            <a href="https://cal.com/plainsightdigital/30min" className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-sm font-bold tracking-wide text-zinc-950 transition-all hover:bg-zinc-200 hover:scale-105">
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
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4 md:mt-0">
            <a href="/blog" className="hover:text-amber-400 transition">Blog</a>
            <a href="/promise" className="hover:text-amber-400 transition">Our Promise</a>
            <a href="/audit" className="hover:text-amber-400 transition">Audit</a>
            <a href="mailto:hello@plainsight.digital" className="hover:text-amber-400 transition">Email</a>
            <a href="https://wa.me/254750192512" className="hover:text-amber-400 transition">WhatsApp</a>
          </div>
        </div>
      </footer>

      {/* Sticky Mobile CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-zinc-800 bg-zinc-950/95 p-3 backdrop-blur md:hidden">
        <a
          href="/audit"
          className="block w-full rounded-md bg-amber-400 py-3.5 text-center text-sm font-bold text-zinc-950 shadow-[0_0_20px_rgba(251,191,36,0.2)]"
        >
          Get Free Website Audit
        </a>
      </div>

      {/* WhatsApp Float */}
      <a
        href="https://wa.me/254750192512?text=Hi%20Plainsight%20Digital.%20My%20current%20website%20is%20leaking%20leads%20and%20I%20want%20to%20fix%20it.%20Are%20you%20taking%20new%20clients?"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Plainsight Digital on WhatsApp"
        className="fixed bottom-20 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400 md:bottom-6 hover:scale-110"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="block h-7 w-7 fill-current">
          <path d="M20.52 3.48A11.86 11.86 0 0 0 12.07 0C5.54 0 .23 5.3.23 11.83c0 2.08.54 4.1 1.57 5.88L0 24l6.45-1.7a11.8 11.8 0 0 0 5.62 1.43h.01c6.52 0 11.83-5.31 11.84-11.84a11.8 11.8 0 0 0-3.4-8.41ZM12.08 21.73h-.01a9.8 9.8 0 0 1-4.99-1.37l-.36-.21-3.83 1.01 1.02-3.74-.23-.38a9.81 9.81 0 0 1-1.5-5.21c0-5.42 4.41-9.83 9.84-9.83 2.63 0 5.1 1.02 6.95 2.88a9.78 9.78 0 0 1 2.88 6.95c0 5.42-4.42 9.83-9.77 9.9Zm5.39-7.36c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.23-.64.08-.3-.15-1.24-.45-2.36-1.44-.88-.78-1.47-1.74-1.64-2.03-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.62-.91-2.22-.24-.58-.49-.5-.67-.51-.17-.01-.38-.01-.58-.01-.2 0-.53.08-.81.38-.28.3-1.06 1.03-1.06 2.51 0 1.48 1.08 2.91 1.23 3.11.15.2 2.11 3.22 5.12 4.52.72.31 1.28.49 1.72.62.72.23 1.37.2 1.89.12.58-.09 1.77-.72 2.02-1.41.25-.69.25-1.28.17-1.41-.08-.13-.27-.2-.57-.35Z" />
        </svg>
      </a>
    </main>

  );
}
