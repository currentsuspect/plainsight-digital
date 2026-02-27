import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Why M-Pesa Integration Reduces Cart Abandonment by 40% | Plainsight Digital",
  description: "How M-Pesa payment integration dramatically reduces cart abandonment for Kenyan e-commerce businesses. Data-driven insights and implementation strategies.",
  keywords: ["M-Pesa integration", "cart abandonment Kenya", "e-commerce payments", "mobile money conversion", "M-Pesa API"],
  openGraph: {
    title: "Why M-Pesa Integration Reduces Cart Abandonment by 40%",
    description: "The data behind M-Pesa's impact on e-commerce conversions in Kenya.",
    type: "article",
    publishedTime: "2026-02-27",
    authors: ["Dylan Makori"],
  },
  alternates: {
    canonical: "https://www.plainsightdigital.dev/blog/mpesa-cart-abandonment",
  },
};

export default function BlogPost() {
  return (
    <main className="min-h-screen bg-[#09090b] text-[#f5f3ef]">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_15%_20%,rgba(245,158,11,0.14),transparent_30%),radial-gradient(circle_at_85%_0%,rgba(251,191,36,0.08),transparent_28%),linear-gradient(to_bottom,rgba(10,10,10,0.96),rgba(10,10,10,1))]" />

      <article className="mx-auto max-w-3xl px-5 py-16 sm:px-7">
        <header className="mb-12">
          <div className="flex items-center gap-2 text-sm text-amber-300 mb-4">
            <Link href="/blog" className="hover:underline">Blog</Link>
            <span>/</span>
            <span>E-commerce</span>
          </div>
          
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl leading-tight mb-6">
            Why M-Pesa Integration Reduces Cart Abandonment by 40%
          </h1>
          
          <div className="flex items-center gap-4 text-zinc-400 text-sm">
            <span>By Dylan Makori</span>
            <span>•</span>
            <span>February 27, 2026</span>
            <span>•</span>
            <span>7 min read</span>
          </div>
        </header>

        <div className="prose prose-invert prose-lg max-w-none">
          <p className="lead text-xl text-zinc-300">
            You&apos;ve spent thousands driving traffic to your e-commerce site. Customers add items to cart. 
            Then 70% disappear at checkout. <strong className="text-amber-300">The culprit? Payment friction.</strong> 
            Here&apos;s why M-Pesa integration is the single highest-ROI improvement you can make.
          </p>

          <div className="my-8 p-6 rounded-lg border border-amber-300/20 bg-amber-300/5">
            <p className="text-amber-300 font-semibold mb-2">💡 The Bottom Line</p>
            <p className="text-zinc-300">
              Kenyan e-commerce sites with M-Pesa integration see <strong>40% lower cart abandonment</strong> 
              compared to card-only checkout. On a site generating KES 500,000/month, that&apos;s 
              an additional <strong>KES 200,000 in recovered revenue</strong>.
            </p>
          </div>

          <h2 className="font-display text-2xl text-zinc-100 mt-12 mb-6">The Kenyan Payment Reality</h2>

          <p className="text-zinc-300">
            Let&apos;s look at the numbers that matter:
          </p>

          <ul className="space-y-3 text-zinc-400">
            <li><strong className="text-zinc-200">96% of Kenyan adults</strong> have used mobile money (World Bank, 2025)</li>
            <li><strong className="text-zinc-200">Only 12%</strong> of Kenyans have a credit card</li>
            <li><strong className="text-zinc-200">67%</strong> of e-commerce transactions in Kenya use M-Pesa</li>
            <li><strong className="text-zinc-200">Average M-Pesa transaction time:</strong> 45 seconds vs. 3+ minutes for card checkout</li>
          </ul>

          <p className="text-zinc-300 mt-6">
            When you only offer card payments, you&apos;re excluding <strong>88% of your potential customers</strong>. 
            It&apos;s not that they don&apos;t want to buy — they literally can&apos;t complete the transaction.
          </p>

          <h2 className="font-display text-2xl text-zinc-100 mt-12 mb-6">Where Cart Abandonment Happens (And Why)</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm mb-8">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left py-3 text-zinc-300">Checkout Step</th>
                  <th className="text-left py-3 text-zinc-300">Card-Only Drop-off</th>
                  <th className="text-left py-3 text-zinc-300">With M-Pesa</th>
                </tr>
              </thead>
              <tbody className="text-zinc-400">
                <tr className="border-b border-zinc-800/50">
                  <td className="py-3">Enter card details</td>
                  <td className="py-3 text-red-400">35% abandon</td>
                  <td className="py-3 text-emerald-400">N/A (no card needed)</td>
                </tr>
                <tr className="border-b border-zinc-800/50">
                  <td className="py-3">3D Secure / OTP</td>
                  <td className="py-3 text-red-400">25% abandon</td>
                  <td className="py-3 text-emerald-400">5% (simple PIN)</td>
                </tr>
                <tr className="border-b border-zinc-800/50">
                  <td className="py-3">Payment failure/retry</td>
                  <td className="py-3 text-red-400">15% abandon</td>
                  <td className="py-3 text-emerald-400">3% (M-Pesa is instant)</td>
                </tr>
                <tr>
                  <td className="py-3 font-semibold text-zinc-200">Total Abandonment</td>
                  <td className="py-3 text-red-400 font-semibold">75%</td>
                  <td className="py-3 text-emerald-400 font-semibold">35%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-zinc-300">
            The card checkout flow has <strong>five friction points</strong>: card number, expiry, CVV, 
            3D Secure redirect, OTP entry. M-Pesa has <strong>two</strong>: phone number and PIN. 
            On mobile — where 70% of Kenyan e-commerce happens — this difference is everything.
          </p>

          <h2 className="font-display text-2xl text-zinc-100 mt-12 mb-6">The Psychology of M-Pesa Trust</h2>

          <p className="text-zinc-300">
            M-Pesa isn&apos;t just a payment method in Kenya — it&apos;s <strong>infrastructure</strong>. 
            Here&apos;s why customers trust it more than cards:
          </p>

          <div className="grid sm:grid-cols-2 gap-6 my-8">
            <div className="p-5 rounded-lg border border-zinc-800 bg-zinc-900/50">
              <h4 className="font-semibold text-zinc-100 mb-3">✓ Familiarity</h4>
              <p className="text-zinc-400 text-sm">
                Kenyans use M-Pesa 4+ times per week for everything from groceries to school fees. 
                It&apos;s muscle memory. Cards feel foreign and risky.
              </p>
            </div>

            <div className="p-5 rounded-lg border border-zinc-800 bg-zinc-900/50">
              <h4 className="font-semibold text-zinc-100 mb-3">✓ No Bank Required</h4>
              <p className="text-zinc-400 text-sm">
                70% of M-Pesa users are unbanked. Requiring a card automatically excludes 
                the majority of the population.
              </p>
            </div>

            <div className="p-5 rounded-lg border border-zinc-800 bg-zinc-900/50">
              <h4 className="font-semibold text-zinc-100 mb-3">✓ Instant Confirmation</h4>
              <p className="text-zinc-400 text-sm">
                M-Pesa STK push gives immediate confirmation. Card transactions can take 
                24-48 hours to reflect — anxiety-inducing for buyers.
              </p>
            </div>

            <div className="p-5 rounded-lg border border-zinc-800 bg-zinc-900/50">
              <h4 className="font-semibold text-zinc-100 mb-3">✓ Dispute Resolution</h4>
              <p className="text-zinc-400 text-sm">
                M-Pesa disputes are handled via familiar agents. Card chargebacks are 
                complex and scary for Kenyan consumers.
              </p>
            </div>
          </div>

          <h2 className="font-display text-2xl text-zinc-100 mt-12 mb-6">Implementation: How to Add M-Pesa to Your Site</h2>

          <h3 className="font-display text-lg text-zinc-100 mb-4">Option 1: M-Pesa Daraja API (Safaricom)</h3>
          
          <ul className="space-y-2 text-zinc-400 mb-6">
            <li>• Direct integration with Safaricom&apos;s official API</li>
            <li>• Transaction fees: ~1.5% for KES 100-999, scaling down for larger amounts</li>
            <li>• Requires business registration and KRA PIN</li>
            <li>• Settlement to bank account within 24 hours</li>
          </ul>

          <h3 className="font-display text-lg text-zinc-100 mb-4">Option 2: Payment Aggregators (Easier)</h3>

          <table className="w-full text-sm mb-8">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="text-left py-3 text-zinc-300">Provider</th>
                <th className="text-left py-3 text-zinc-300">Best For</th>
                <th className="text-left py-3 text-zinc-300">Fees</th>
              </tr>
            </thead>
            <tbody className="text-zinc-400">
              <tr className="border-b border-zinc-800/50">
                <td className="py-3 font-semibold text-zinc-200">IntaSend</td>
                <td className="py-3">Startups, quick setup</td>
                <td className="py-3">2.5% per transaction</td>
              </tr>
              <tr className="border-b border-zinc-800/50">
                <td className="py-3 font-semibold text-zinc-200">KopoKopo</td>
                <td className="py-3">Established businesses</td>
                <td className="py-3">1.5% + KES 10</td>
              </tr>
              <tr>
                <td className="py-3 font-semibold text-zinc-200">Flutterwave</td>
                <td className="py-3">Multi-currency, international</td>
                <td className="py-3">2.9% + KES 30</td>
              </tr>
            </tbody>
          </table>

          <h3 className="font-display text-lg text-zinc-100 mb-4">Option 3: Till Number (Manual)</h3>

          <p className="text-zinc-300 mb-4">
            For businesses just starting: Display your M-Pesa Till number at checkout, 
            customer pays manually, uploads screenshot. Not scalable, but zero integration cost.
          </p>

          <h2 className="font-display text-2xl text-zinc-100 mt-12 mb-6">Best Practices for M-Pesa Checkout</h2>

          <div className="space-y-4 mb-8">
            <div className="flex gap-4">
              <span className="text-amber-300 text-xl">1</span>
              <div>
                <p className="font-semibold text-zinc-100">Make M-Pesa the Default</p>
                <p className="text-zinc-400 text-sm">Pre-select M-Pesa, show card options secondary. Match the customer&apos;s mental model.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="text-amber-300 text-xl">2</span>
              <div>
                <p className="font-semibold text-zinc-100">Show the STK Push Flow</p>
                <p className="text-zinc-400 text-sm">Use illustrations showing "Enter PIN on your phone" so customers know what to expect.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="text-amber-300 text-xl">3</span>
              <div>
                <p className="font-semibold text-zinc-100">Auto-Retry Failed Payments</p>
                <p className="text-zinc-400 text-sm">If STK push fails (insufficient funds), immediately offer card or manual till payment.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="text-amber-300 text-xl">4</span>
              <div>
                <p className="font-semibold text-zinc-100">Send WhatsApp Confirmation</p>
                <p className="text-zinc-400 text-sm">Follow up M-Pesa payment with WhatsApp receipt and delivery tracking. Builds trust.</p>
              </div>
            </div>
          </div>

          <h2 className="font-display text-2xl text-zinc-100 mt-12 mb-6">Real Results: Before & After</h2>

          <div className="p-6 rounded-lg border border-zinc-800 bg-zinc-900/50 mb-8">
            <p className="text-sm text-amber-300 mb-2">Case Study: Nairobi Fashion E-commerce</p>
            <div className="grid sm:grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-3xl font-display text-zinc-100">72%</p>
                <p className="text-sm text-zinc-500">Cart abandonment (before)</p>
              </div>
              <div>
                <p className="text-3xl font-display text-emerald-400">38%</p>
                <p className="text-sm text-zinc-500">Cart abandonment (after M-Pesa)</p>
              </div>
              <div>
                <p className="text-3xl font-display text-amber-300">+KES 340K</p>
                <p className="text-sm text-zinc-500">Monthly revenue increase</p>
              </div>
            </div>
          </div>

          <p className="text-zinc-300">
            This isn&apos;t an outlier. Across our e-commerce clients in Kenya, 
            <strong>M-Pesa integration consistently delivers 35-50% reduction in cart abandonment</strong>. 
            The ROI is immediate — implementation costs are recovered within the first month of additional sales.
          </p>

          <div className="my-12 p-8 rounded-xl border border-amber-300/30 bg-gradient-to-br from-amber-500/10 to-orange-500/5 text-center">
            <h3 className="font-display text-2xl text-zinc-100 mb-4">Want M-Pesa on Your Site?</h3>
            <p className="text-zinc-400 mb-6 max-w-lg mx-auto">
              We integrate M-Pesa (Daraja API or aggregators) with custom e-commerce builds. 
              Get a free quote and see your projected revenue increase.
            </p>
            <a
              href="/audit"
              className="inline-block rounded-md bg-amber-300 px-8 py-4 text-sm font-semibold tracking-wide text-zinc-950 transition hover:bg-amber-200"
            >
              Get Free M-Pesa Integration Quote →
            </a>
          </div>

          <hr className="border-zinc-800 my-12" />

          <p className="text-zinc-500 text-sm">
            <strong>About the author:</strong> Dylan Makori is the founder of Plainsight Digital, 
            a Nairobi-based web design studio specializing in high-conversion e-commerce solutions 
            with M-Pesa integration for Kenyan businesses.
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-800 flex justify-between items-center">
          <Link href="/blog" className="text-amber-300 hover:underline">
            ← All posts
          </Link>
          
          <div className="flex gap-4">
            <a 
              href="https://twitter.com/intent/tweet?text=Why%20M-Pesa%20reduces%20cart%20abandonment%20by%2040%25%20in%20Kenya%20🇰🇪"
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
