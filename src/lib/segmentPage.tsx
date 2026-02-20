type SegmentPageProps = {
  badge: string;
  title: string;
  intro: string;
  h1: string;
  points: string[];
};

export function SegmentPage({ badge, title, intro, h1, points }: SegmentPageProps) {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 px-5 py-14 sm:px-7 md:py-20">
      <div className="mx-auto max-w-4xl">
        <p className="text-xs uppercase tracking-[0.2em] text-amber-300">{badge}</p>
        <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">{h1}</h1>
        <p className="mt-5 max-w-3xl text-zinc-300">{intro}</p>

        <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
          <h2 className="font-display text-2xl">{title}</h2>
          <ul className="mt-4 space-y-3 text-zinc-300">
            {points.map((point) => (
              <li key={point}>• {point}</li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a href="/#audit" className="rounded-md bg-amber-300 px-6 py-3 text-sm font-semibold text-zinc-950 hover:bg-amber-200">
            Request Premium Audit
          </a>
          <a href="/" className="rounded-md border border-zinc-700 px-6 py-3 text-sm text-zinc-200 hover:bg-zinc-900">
            Back to homepage
          </a>
        </div>
      </div>
    </main>
  );
}
