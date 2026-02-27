import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getIndustry, getRelatedIndustries, IndustrySlug } from "@/lib/industries";
import LeadForm from "@/components/LeadForm";

interface Props {
  params: Promise<{ industry: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { industry } = await params;
  const config = getIndustry(industry);
  
  if (!config) {
    return {
      title: "Industry Not Found | Plainsight Digital",
    };
  }

  return {
    title: config.meta.title,
    description: config.meta.description,
    keywords: config.meta.keywords,
    openGraph: {
      title: config.meta.title,
      description: config.meta.description,
      url: `https://www.plainsightdigital.dev/${config.slug}`,
      siteName: "Plainsight Digital",
      locale: "en_KE",
      type: "website",
    },
    alternates: {
      canonical: `https://www.plainsightdigital.dev/${config.slug}`,
    },
  };
}

export async function generateStaticParams() {
  const slugs: IndustrySlug[] = ["clinics", "law-firms", "schools", "hotels", "logistics"];
  return slugs.map((industry) => ({ industry }));
}

export default async function IndustryPage({ params }: Props) {
  const { industry } = await params;
  const config = getIndustry(industry);

  if (!config) {
    notFound();
  }

  const related = getRelatedIndustries(config.slug);

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_15%_20%,rgba(245,158,11,0.1),transparent_30%),linear-gradient(to_bottom,rgba(10,10,10,0.96),rgba(10,10,10,1))]" />
      
      {/* Hero Section */}
      <section className="px-5 py-14 sm:px-7 md:py-20">
        <div className="mx-auto max-w-4xl">
          <nav className="mb-6 flex items-center gap-2 text-sm text-zinc-400">
            <a href="/" className="transition hover:text-amber-300">Home</a>
            <span>/</span>
            <span className="text-zinc-500">{config.badge}</span>
          </nav>
          
          <p className="text-xs uppercase tracking-[0.2em] text-amber-300">{config.badge}</p>
          <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">{config.h1}</h1>
          <p className="mt-5 max-w-3xl text-zinc-300">{config.intro}</p>

          {/* Primary CTA */}
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#audit"
              className="rounded-md bg-amber-300 px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-amber-200"
            >
              Request Premium Audit
            </a>
            <a
              href="/"
              className="rounded-md border border-zinc-700 px-6 py-3 text-sm text-zinc-200 transition hover:border-zinc-500 hover:bg-zinc-900"
            >
              Back to homepage
            </a>
          </div>
        </div>
      </section>

      {/* What We Build Section */}
      <section className="px-5 pb-12 sm:px-7 md:pb-16">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 md:p-8">
            <h2 className="font-display text-2xl text-zinc-100">{config.title}</h2>
            <ul className="mt-4 space-y-3 text-zinc-300">
              {config.points.map((point) => (
                <li key={point} className="flex gap-3">
                  <span className="mt-1 flex-shrink-0 text-amber-400">✓</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Cross-link to other sectors */}
      <section className="px-5 pb-12 sm:px-7 md:pb-16">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs uppercase tracking-[0.18em] text-amber-300">Other sectors we serve</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
            {related.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="rounded-lg border border-zinc-800 bg-zinc-900/60 px-4 py-3 text-sm text-zinc-200 transition hover:border-amber-300/40 hover:text-amber-200"
              >
                {label} →
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Audit Form Section */}
      <section id="audit" className="px-5 py-12 sm:px-7 md:py-16">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-amber-300/20 bg-gradient-to-br from-zinc-900/90 to-zinc-950 p-5 sm:p-7 md:p-8">
            <h2 className="font-display text-3xl text-zinc-100">Get your premium audit</h2>
            <p className="mt-3 text-zinc-300">
              You&apos;ll receive actionable insights on conversion gaps, trust signals, and practical fixes your team can execute immediately.
            </p>
            <LeadForm defaultSector={config.niche} />
          </div>
        </div>
      </section>

      {/* Sticky Mobile CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-zinc-800 bg-zinc-950/95 p-3 backdrop-blur md:hidden">
        <a
          href="#audit"
          className="block w-full rounded-md bg-amber-300 py-3 text-center text-sm font-semibold text-zinc-950"
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
        className="fixed bottom-20 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400 md:bottom-5"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="block h-7 w-7 fill-current">
          <path d="M20.52 3.48A11.86 11.86 0 0 0 12.07 0C5.54 0 .23 5.3.23 11.83c0 2.08.54 4.1 1.57 5.88L0 24l6.45-1.7a11.8 11.8 0 0 0 5.62 1.43h.01c6.52 0 11.83-5.31 11.84-11.84a11.8 11.8 0 0 0-3.4-8.41ZM12.08 21.73h-.01a9.8 9.8 0 0 1-4.99-1.37l-.36-.21-3.83 1.01 1.02-3.74-.23-.38a9.81 9.81 0 0 1-1.5-5.21c0-5.42 4.41-9.83 9.84-9.83 2.63 0 5.1 1.02 6.95 2.88a9.78 9.78 0 0 1 2.88 6.95c0 5.42-4.42 9.83-9.77 9.9Zm5.39-7.36c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.23-.64.08-.3-.15-1.24-.45-2.36-1.44-.88-.78-1.47-1.74-1.64-2.03-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.62-.91-2.22-.24-.58-.49-.5-.67-.51-.17-.01-.38-.01-.58-.01-.2 0-.53.08-.81.38-.28.3-1.06 1.03-1.06 2.51 0 1.48 1.08 2.91 1.23 3.11.15.2 2.11 3.22 5.12 4.52.72.31 1.28.49 1.72.62.72.23 1.37.2 1.89.12.58-.09 1.77-.72 2.02-1.41.25-.69.25-1.28.17-1.41-.08-.13-.27-.2-.57-.35Z" />
        </svg>
      </a>
    </main>
  );
}
