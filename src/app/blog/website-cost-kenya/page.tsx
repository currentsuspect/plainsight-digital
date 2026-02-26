import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How Much Does a Website Cost in Kenya? (2026 Pricing Guide)",
  description: "Complete breakdown of website costs in Kenya for 2026. From KES 15,000 DIY builders to KES 500,000+ custom enterprise sites. See what you actually need.",
  keywords: ["website cost Kenya", "web design prices Nairobi", "how much is a website in Kenya", "website design cost 2026", "Kenya web developer prices"],
  openGraph: {
    title: "How Much Does a Website Cost in Kenya? (2026 Pricing Guide)",
    description: "Complete breakdown of website costs in Kenya. From KES 15,000 to KES 500,000+ — see what you actually need.",
    type: "article",
    publishedTime: "2026-02-26",
    authors: ["Dylan Makori"],
  },
  alternates: {
    canonical: "https://www.plainsightdigital.dev/blog/website-cost-kenya",
  },
};

export default function BlogPost() {
  return (
    <main className="min-h-screen bg-[#09090b] text-[#f5f3ef]">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_15%_20%,rgba(245,158,11,0.14),transparent_30%),radial-gradient(circle_at_85%_0%,rgba(251,191,36,0.08),transparent_28%),linear-gradient(to_bottom,rgba(10,10,10,0.96),rgba(10,10,10,1))]" />

      <article className="mx-auto max-w-3xl px-5 py-16 sm:px-7">
        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-2 text-sm text-amber-300 mb-4">
            <Link href="/blog" className="hover:underline">Blog</Link>
            <span>/</span>
            <span>Pricing Guide</span>
          </div>
          
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl leading-tight mb-6">
            How Much Does a Website Cost in Kenya? (2026 Pricing Guide)
          </h1>
          
          <div className="flex items-center gap-4 text-zinc-400 text-sm">
            <span>By Dylan Makori</span>
            <span>•</span>
            <span>February 26, 2026</span>
            <span>•</span>
            <span>8 min read</span>
          </div>
        </header>

        {/* Intro */}
        <div className="prose prose-invert prose-lg max-w-none">
          <p className="lead text-xl text-zinc-300">
            If you&apos;re a business owner in Kenya researching website costs, you&apos;ve probably seen quotes ranging from <strong className="text-amber-300">KES 15,000 to KES 500,000+</strong>. 
            That&apos;s not helpful. Here&apos;s the real breakdown of what you actually need — and what you&apos;ll actually pay.
          </p>

          <div className="my-8 p-6 rounded-lg border border-amber-300/20 bg-amber-300/5">
            <p className="text-amber-300 font-semibold mb-2">⚡ TL;DR</p>
            <p className="text-zinc-300">
              Most Kenyan businesses need a <strong>KES 50,000–150,000</strong> website. 
              Anything under KES 40,000 is a template with your logo slapped on. 
              Anything over KES 300,000 better include custom features that actually make you money.
            </p>
          </div>

          <h2 className="font-display text-2xl text-zinc-100 mt-12 mb-6">The 4 Tiers of Website Pricing in Kenya</h2>

          <div className="space-y-8">
            {/* Tier 1 */}
            <div className="p-6 rounded-lg border border-zinc-800 bg-zinc-900/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-xl text-zinc-100">DIY / Template Builders</h3>
                <span className="text-amber-300 font-display text-xl">KES 15K–40K</span>
              </div>
              <p className="text-zinc-400 mb-4">
                Wix, WordPress themes, or cheap freelancers on Fiverr. You get a generic site 
                that looks like 500 other Kenyan businesses.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-emerald-400 font-semibold mb-2">✓ Good for:</p>
                  <ul className="text-zinc-400 space-y-1">
                    <li>Personal blogs</li>
                    <li>Hobby projects</li>
                    <li>Testing an idea</li>
                  </ul>
                </div>
                <div>
                  <p className="text-red-400 font-semibold mb-2">✗ Bad for:</p>
                  <ul className="text-zinc-400 space-y-1">
                    <li>Professional services</li>
                    <li>Businesses that need leads</li>
                    <li>Anyone competing seriously</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Tier 2 */}
            <div className="p-6 rounded-lg border border-amber-300/30 bg-amber-300/5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-xl text-zinc-100">Professional Business Site</h3>
                <span className="text-amber-300 font-display text-xl">KES 50K–150K</span>
              </div>
              <p className="text-zinc-400 mb-4">
                <strong>This is where most Kenyan businesses should be.</strong> Custom design, 
                mobile-optimized, fast loading, and built to convert visitors into customers.
              </p>
              <p className="text-zinc-300 mb-4">Includes:</p>
              <ul className="text-zinc-400 space-y-2 mb-4">
                <li>✓ 5-10 pages (Home, About, Services, Contact, etc.)</li>
                <li>✓ Mobile-first design (70% of your traffic)</li>
                <li>✓ Contact forms & WhatsApp integration</li>
                <li>✓ Basic SEO setup</li>
                <li>✓ Google Analytics</li>
                <li>✓ 1-2 weeks delivery</li>
              </ul>
              <p className="text-emerald-400 text-sm">
                ✓ This is our sweet spot at Plainsight Digital
              </p>
            </div>

            {/* Tier 3 */}
            <div className="p-6 rounded-lg border border-zinc-800 bg-zinc-900/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-xl text-zinc-100">High-Conversion / E-commerce</h3>
                <span className="text-amber-300 font-display text-xl">KES 150K–400K</span>
              </div>
              <p className="text-zinc-400 mb-4">
                For businesses that sell online or need advanced functionality. 
                Booking systems, patient portals, M-Pesa integration, custom dashboards.
              </p>
              <p className="text-zinc-300 mb-4">Includes:</p>
              <ul className="text-zinc-400 space-y-2">
                <li>✓ Everything in Tier 2, plus:</li>
                <li>✓ E-commerce (M-Pesa, card payments)</li>
                <li>✓ Booking/appointment systems</li>
                <li>✓ Custom functionality</li>
                <li>✓ Advanced SEO & speed optimization</li>
                <li>✓ 3-6 weeks delivery</li>
              </ul>
            </div>

            {/* Tier 4 */}
            <div className="p-6 rounded-lg border border-zinc-800 bg-zinc-900/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-xl text-zinc-100">Enterprise / Custom Platform</h3>
                <span className="text-amber-300 font-display text-xl">KES 400K+</span>
              </div>
              <p className="text-zinc-400">
                Large organizations, complex marketplaces, or businesses with unique technical requirements. 
                Think: banks, hospitals with patient portals, large e-commerce platforms.
              </p>
            </div>
          </div>

          <h2 className="font-display text-2xl text-zinc-100 mt-12 mb-6">What Drives Website Cost in Kenya?</h2>

          <table className="w-full text-sm mb-8">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="text-left py-3 text-zinc-300">Factor</th>
                <th className="text-left py-3 text-zinc-300">Low Cost</th>
                <th className="text-left py-3 text-zinc-300">High Cost</th>
              </tr>
            </thead>
            <tbody className="text-zinc-400">
              <tr className="border-b border-zinc-800/50">
                <td className="py-3">Design</td>
                <td className="py-3">Template</td>
                <td className="py-3">Custom, unique</td>
              </tr>
              <tr className="border-b border-zinc-800/50">
                <td className="py-3">Pages</td>
                <td className="py-3">1-3 pages</td>
                <td className="py-3">10+ pages</td>
              </tr>
              <tr className="border-b border-zinc-800/50">
                <td className="py-3">Functionality</td>
                <td className="py-3">Static info</td>
                <td className="py-3">Booking, payments, dashboards</td>
              </tr>
              <tr className="border-b border-zinc-800/50">
                <td className="py-3">Content</td>
                <td className="py-3">You provide all</td>
                <td className="py-3">Copywriting included</td>
              </tr>
              <tr className="border-b border-zinc-800/50">
                <td className="py-3">SEO</td>
                <td className="py-3">Basic setup</td>
                <td className="py-3">Full optimization & strategy</td>
              </tr>
              <tr>
                <td className="py-3">Timeline</td>
                <td className="py-3">2-4 weeks</td>
                <td className="py-3">1-3 months</td>
              </tr>
            </tbody>
          </table>

          <h2 className="font-display text-2xl text-zinc-100 mt-12 mb-6">Hidden Costs Most People Forget</h2>

          <ul className="space-y-4 text-zinc-400">
            <li>
              <strong className="text-zinc-200">Domain name:</strong> KES 1,500–3,000/year (.co.ke cheaper, .com more expensive)
            </li>
            <li>
              <strong className="text-zinc-200">Hosting:</strong> KES 5,000–20,000/year (shared hosting is cheap, dedicated is expensive)
            </li>
            <li>
              <strong className="text-zinc-200">SSL certificate:</strong> Usually free with good hosting, but some charge KES 5,000+/year
            </li>
            <li>
              <strong className="text-zinc-200">Maintenance:</strong> KES 5,000–15,000/month for updates, security, backups
            </li>
            <li>
              <strong className="text-zinc-200">Content updates:</strong> KES 2,000–5,000 per page if you don&apos;t have a CMS
            </li>
          </ul>

          <h2 className="font-display text-2xl text-zinc-100 mt-12 mb-6">Red Flags: When a Quote is Too Good (or Bad) to Be True</h2>

          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            <div className="p-5 rounded-lg border border-red-500/30 bg-red-500/10">
              <p className="text-red-400 font-semibold mb-3">🚩 Too Cheap (Under KES 30K)</p>
              <ul className="text-zinc-400 text-sm space-y-2">
                <li>Stolen template, not custom</li>
                <li>No mobile optimization</li>
                <li>No SEO or analytics</li>
                <li>Disappears after payment</li>
                <li>Takes 6+ months (or never delivers)</li>
              </ul>
            </div>

            <div className="p-5 rounded-lg border border-red-500/30 bg-red-500/10">
              <p className="text-red-400 font-semibold mb-3">🚩 Too Expensive (Over KES 300K for basic site)</p>
              <ul className="text-zinc-400 text-sm space-y-2">
                <li>Charging for "strategy sessions" you don&apos;t need</li>
                <li>Bloated team, you&apos;re paying for overhead</li>
                <li>Features you&apos;ll never use</li>
                <li>No clear ROI justification</li>
              </ul>
            </div>
          </div>

          <h2 className="font-display text-2xl text-zinc-100 mt-12 mb-6">The Real Question: What&apos;s Your Website Worth?</h2>

          <p className="text-zinc-300 mb-4">
            A website isn&apos;t an expense — it&apos;s an investment. If your site brings you <strong>one new client per month</strong> worth KES 50,000, 
            a KES 100,000 website pays for itself in 2 months.
          </p>

          <p className="text-zinc-300 mb-4">The right question isn&apos;t <em>"how much does a website cost?"</em> It&apos;s:</p>

          <blockquote className="border-l-4 border-amber-300 pl-6 my-6 text-xl text-zinc-200 italic">
            "How much revenue am I losing without a professional website?"
          </blockquote>

          <p className="text-zinc-400">
            If you&apos;re a law firm, clinic, or consultant in Nairobi and your competitors have modern, 
            fast, mobile-optimized sites while you&apos;re relying on word-of-mouth or a 2015 Facebook page... 
            you&apos;re invisible to thousands of potential customers searching Google right now.
          </p>

          <div className="my-12 p-8 rounded-xl border border-amber-300/30 bg-gradient-to-br from-amber-500/10 to-orange-500/5 text-center">
            <h3 className="font-display text-2xl text-zinc-100 mb-3">Want a specific quote for your business?</h3>
            <p className="text-zinc-400 mb-6 max-w-lg mx-auto">
              Get a free 15-minute consultation. We&apos;ll tell you exactly what you need 
              — and what you don&apos;t — based on your industry and goals.
            </p>
            <a
              href="https://cal.com/plainsightdigital/30min"
              target="_blank"
              rel="noopener"
              className="inline-block rounded-md bg-amber-300 px-8 py-4 text-sm font-semibold tracking-wide text-zinc-950 transition hover:bg-amber-200"
            >
              📅 Book Free Call
            </a>
          </div>

          <h2 className="font-display text-2xl text-zinc-100 mt-12 mb-6">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <details className="group">
              <summary className="cursor-pointer font-semibold text-zinc-200 flex items-center justify-between">
                Why is there such a big range in website prices?
                <span className="text-amber-300">+</span>
              </summary>
              <p className="mt-3 text-zinc-400">
                It comes down to customization and functionality. A template with your logo is cheap. 
                A custom design that converts visitors into customers requires strategy, copywriting, 
                UX design, and development time. You&apos;re paying for expertise and results, not just files.
              </p>
            </details>

            <details className="group">
              <summary className="cursor-pointer font-semibold text-zinc-200 flex items-center justify-between">
                Can I pay in installments?
                <span className="text-amber-300">+</span>
              </summary>
              <p className="mt-3 text-zinc-400">
                Most professional agencies (including us) offer 50% upfront, 50% on delivery. 
                This aligns incentives — we don&apos;t get paid until you&apos;re happy with the result.
              </p>
            </details>

            <details className="group">
              <summary className="cursor-pointer font-semibold text-zinc-200 flex items-center justify-between">
                How long does it take to build a website?
                <span className="text-amber-300">+</span>
              </summary>
              <p className="mt-3 text-zinc-400">
                A professional business website typically takes 2-4 weeks. E-commerce or complex sites 
                take 6-12 weeks. Anyone promising a quality site in 48 hours is cutting corners.
              </p>
            </details>

            <details className="group">
              <summary className="cursor-pointer font-semibold text-zinc-200 flex items-center justify-between">
                Do I need a .co.ke or .com domain?
                <span className="text-amber-300">+</span>
              </summary>
              <p className="mt-3 text-zinc-400">
                For Kenyan businesses serving Kenyan customers, .co.ke is fine and often preferred. 
                If you plan to expand internationally or want maximum credibility, .com is better. 
                Both work for SEO if the site is good.
              </p>
            </details>

            <details className="group">
              <summary className="cursor-pointer font-semibold text-zinc-200 flex items-center justify-between">
                What about cheap website builders like Wix?
                <span className="text-amber-300">+</span>
              </summary>
              <p className="mt-3 text-zinc-400">
                Wix is fine for personal projects. For business? You&apos;ll look like everyone else, 
                load slowly (bad for Google), and hit limitations when you need real functionality. 
                Plus, you don&apos;t own the platform — they do.
              </p>
            </details>
          </div>

          <hr className="border-zinc-800 my-12" />

          <p className="text-zinc-500 text-sm">
            <strong>About the author:</strong> Dylan Makori is the founder of Plainsight Digital, 
            a Nairobi-based web design studio specializing in high-conversion websites for Kenyan businesses. 
            He&apos;s helped clinics, law firms, and schools across Kenya turn their websites into lead-generating machines.
          </p>
        </div>

        {/* Navigation */}
        <div className="mt-12 pt-8 border-t border-zinc-800 flex justify-between items-center">
          <Link href="/blog" className="text-amber-300 hover:underline">
            ← All posts
          </Link>
          
          <div className="flex gap-4">
            <a 
              href="https://twitter.com/intent/tweet?text=How%20much%20does%20a%20website%20cost%20in%20Kenya%3F%20Great%20breakdown%20from%20%40plainsightdigital"
              target="_blank"
              rel="noopener"
              className="text-zinc-500 hover:text-amber-300 text-sm"
            >
              Share on X
            </a>
          </div>
        </div>
      </article>
    </main>
  );
}
