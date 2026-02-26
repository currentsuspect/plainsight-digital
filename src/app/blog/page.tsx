import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog | Plainsight Digital",
  description: "Insights on web design, conversion optimization, and digital strategy for Kenyan businesses.",
  alternates: {
    canonical: "https://www.plainsightdigital.dev/blog",
  },
};

const posts = [
  {
    slug: "website-cost-kenya",
    title: "How Much Does a Website Cost in Kenya? (2026 Pricing Guide)",
    excerpt: "Complete breakdown from KES 15,000 DIY builders to KES 500,000+ enterprise sites. See what you actually need.",
    date: "February 26, 2026",
    category: "Pricing",
    readTime: "8 min",
  },
  {
    slug: "mpesa-cart-abandonment",
    title: "Why M-Pesa Integration Reduces Cart Abandonment by 40%",
    excerpt: "How M-Pesa payment integration dramatically reduces cart abandonment for Kenyan e-commerce businesses.",
    date: "February 27, 2026",
    category: "E-commerce",
    readTime: "7 min",
  },
  {
    slug: "patient-journey-kenya",
    title: "The Kenyan Patient's Journey: From Google Search to Clinic Visit",
    excerpt: "Understanding how Kenyan patients find and choose healthcare providers online. Optimize every stage.",
    date: "February 27, 2026",
    category: "Healthcare",
    readTime: "9 min",
  },
];

export default function BlogIndex() {
  return (
    <main className="min-h-screen bg-[#09090b] text-[#f5f3ef]">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_15%_20%,rgba(245,158,11,0.14),transparent_30%),radial-gradient(circle_at_85%_0%,rgba(251,191,36,0.08),transparent_28%),linear-gradient(to_bottom,rgba(10,10,10,0.96),rgba(10,10,10,1))]" />

      <div className="mx-auto max-w-4xl px-5 py-16 sm:px-7">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.24em] text-amber-300 mb-4">Plainsight Blog</p>
          <h1 className="font-display text-4xl md:text-5xl text-zinc-100 mb-4">Insights for Kenyan Businesses</h1>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Web design tips, conversion strategies, and digital marketing insights 
            tailored for the Kenyan market.
          </p>
        </div>

        {/* Posts Grid */}
        <div className="space-y-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 transition hover:border-amber-300/30 hover:bg-zinc-900/70"
            >
              <div className="flex items-center gap-3 text-sm text-zinc-500 mb-4">
                <span className="text-amber-300">{post.category}</span>
                <span>•</span>
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readTime} read</span>
              </div>
              
              <Link href={`/blog/${post.slug}`}>
                <h2 className="font-display text-2xl text-zinc-100 mb-3 group-hover:text-amber-300 transition">
                  {post.title}
                </h2>
              </Link>
              
              <p className="text-zinc-400 mb-6">{post.excerpt}</p>
              
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center text-amber-300 hover:text-amber-200 transition"
              >
                Read article →
              </Link>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8">
            <h3 className="font-display text-xl text-zinc-100 mb-3">Want more insights?</h3>
            <p className="text-zinc-400 mb-6">Get a free website audit and see how you compare.</p>
            <Link
              href="/audit"
              className="inline-block rounded-md bg-amber-300 px-7 py-3.5 text-sm font-semibold tracking-wide text-zinc-950 transition hover:bg-amber-200"
            >
              Get Free Website Audit
            </Link>
          </div>
        </div>

        {/* Back */}
        <div className="mt-12 text-center">
          <Link href="/" className="text-zinc-500 hover:text-amber-300 text-sm transition">
            ← Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
