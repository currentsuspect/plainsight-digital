import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plainsight Digital | Free Website Audit",
  description: "Find out why your website isn't converting traffic into revenue. Get a free, actionable audit in 60 seconds.",
  keywords: ["website audit", "web development Kenya", "lead generation agency", "conversion optimization Kenya", "B2B lead generation"],
  openGraph: {
    title: "Plainsight Digital | Free Website Audit",
    description: "Find out why your website isn't converting traffic into revenue. Get a free, actionable audit in 60 seconds.",
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
    <main className="min-h-screen bg-[#09090b] text-[#f5f3ef] flex flex-col items-center justify-center p-5 sm:p-8">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(245,158,11,0.15),transparent_50%),linear-gradient(to_bottom,rgba(9,9,11,0.9),rgba(9,9,11,1))]" />

      <div className="w-full max-w-3xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.24em] text-amber-300 font-medium">Plainsight Digital</p>
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl leading-[1.1] text-white">
            Is your website making you <span className="text-amber-400">money</span> or costing you leads?
          </h1>
          <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Most websites are just digital brochures. We build lead-generation systems that actually drive revenue. Find out exactly where your current site is leaking money in 60 seconds.
          </p>
        </div>

        <div className="pt-4">
          <a
            href="/audit"
            className="inline-flex items-center justify-center rounded-lg bg-amber-400 px-8 py-4 text-base font-bold tracking-wide text-zinc-950 transition-all hover:bg-amber-300 hover:scale-105 shadow-[0_0_40px_rgba(251,191,36,0.3)]"
          >
            Get Your Free Website Audit
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
          <p className="mt-4 text-sm text-zinc-500">Takes 60 seconds. Completely free.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-16 text-left border-t border-zinc-800/50 pt-12">
           <div className="bg-zinc-900/40 p-6 rounded-xl border border-zinc-800/50">
             <h3 className="font-display text-xl text-white mb-2">Need a new site?</h3>
             <p className="text-zinc-400 text-sm">We build high-converting, custom digital assets for a flat rate, and partner with you on a commission basis for the leads we generate.</p>
           </div>
           <div className="bg-zinc-900/40 p-6 rounded-xl border border-zinc-800/50">
             <h3 className="font-display text-xl text-white mb-2">Already have a site?</h3>
             <p className="text-zinc-400 text-sm">If your site is solid, we deploy our cold email and outreach systems to drive your target clients directly to it, strictly on commission.</p>
           </div>
        </div>
      </div>

      <footer className="fixed bottom-6 text-center w-full text-zinc-600 text-sm">
        © {new Date().getFullYear()} Plainsight Digital. Nairobi, Kenya.
      </footer>
    </main>
  );
}
