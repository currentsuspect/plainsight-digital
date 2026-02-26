import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | Plainsight Digital",
  description: "The page you're looking for doesn't exist. Browse our services or contact us for help.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#09090b] text-[#f5f3ef] flex items-center justify-center px-5">
      <div className="text-center max-w-lg">
        <div className="text-8xl font-display text-amber-300 mb-4">404</div>
        <h1 className="font-display text-3xl text-zinc-100 mb-4">Page Not Found</h1>
        <p className="text-zinc-400 mb-8">
          The page you're looking for doesn't exist or has been moved. 
          Let's get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="rounded-md bg-amber-300 px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-amber-200"
          >
            ← Back to Home
          </Link>
          <Link
            href="/audit"
            className="rounded-md border border-zinc-700 px-6 py-3 text-sm text-zinc-200 transition hover:border-zinc-500"
          >
            Get Free Audit
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          <Link href="/clinics" className="text-zinc-500 hover:text-amber-300 transition">Clinics</Link>
          <Link href="/law-firms" className="text-zinc-500 hover:text-amber-300 transition">Law Firms</Link>
          <Link href="/schools" className="text-zinc-500 hover:text-amber-300 transition">Schools</Link>
          <Link href="/hotels" className="text-zinc-500 hover:text-amber-300 transition">Hotels</Link>
        </div>
      </div>
    </div>
  );
}
