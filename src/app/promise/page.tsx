import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Promise | PlainSight Digital",
  description: "Our core values, satisfaction commitment, and why clients choose PlainSight Digital for web design in Kenya.",
};

const values = [
  {
    title: "Transparency First",
    description: "No hidden fees. No surprise charges. Every line item is communicated upfront. You always know what you're paying for and why.",
    icon: "◆",
  },
  {
    title: "Speed Without Compromise",
    description: "We deliver quickly because we work efficiently — not because we cut corners. Our sites are built for performance from day one.",
    icon: "◆",
  },
  {
    title: "Accessibility for All",
    description: "The web should work for everyone. We build WCAG-compliant sites that work on any device, any connection, for any user.",
    icon: "◆",
  },
  {
    title: "Data-Driven Design",
    description: "We don't guess. Every decision — from button color to page structure — is backed by conversion research and user behavior data.",
    icon: "◆",
  },
  {
    title: "Partnership, Not Transaction",
    description: "We succeed when you succeed. Our relationship doesn't end at launch. We're here for the long haul.",
    icon: "◆",
  },
];

const standards = [
  { label: "Response Time", value: "Same-day acknowledgment, 24-hour detailed response" },
  { label: "Revisions", value: "2 rounds included per project phase" },
  { label: "Timeline", value: "We hit our deadlines. If we slip, we communicate." },
  { label: "Quality", value: "Clean code, semantic HTML, accessibility-first" },
  { label: "Handoff", value: "Full documentation, training, and 30-day support" },
];

const differences = [
  { title: "No Bloat", description: "We don't sell you features you don't need" },
  { title: "Realistic Timelines", description: "We under-promise and over-deliver" },
  { title: "Kenyan Context", description: "M-Pesa integration, local hosting, Kenyan user behavior" },
  { title: "Future-Proof", description: "Your site is built to grow with you" },
];

export default function PromisePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Hero */}
      <section className="bg-slate-900 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Promise</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            How we work, what we believe, and why clients trust us with their digital presence.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value) => (
              <div key={value.title} className="p-6 border border-slate-200 rounded-xl">
                <span className="text-red-600 text-2xl mb-4 block">{value.icon}</span>
                <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                <p className="text-slate-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Satisfaction Commitment */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Satisfaction Commitment</h2>
          <p className="text-center text-slate-600 mb-12">What you can expect when you work with us</p>
          
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            {standards.map((standard, index) => (
              <div 
                key={standard.label} 
                className={`flex justify-between items-center p-6 ${index !== standards.length - 1 ? 'border-b border-slate-100' : ''}`}
              >
                <span className="font-semibold text-slate-900">{standard.label}</span>
                <span className="text-slate-600 text-sm max-w-md text-right">{standard.value}</span>
              </div>
            ))}
          </div>

          {/* Guarantee */}
          <div className="mt-12 bg-red-50 border border-red-100 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-red-900 mb-4">Our Guarantee</h3>
            <p className="text-red-800 text-lg mb-6">If you're not satisfied, we're not done.</p>
            <ul className="text-left max-w-lg mx-auto space-y-3 text-slate-700">
              <li className="flex items-start">
                <span className="text-red-600 mr-2">✓</span>
                Bugs fixed at no charge (within 30 days of launch)
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">✓</span>
                Minor tweaks included during the revision period
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">✓</span>
                Clear documentation so you're never locked in
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">✓</span>
                Source code ownership transfers to you upon final payment
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">The PlainSight Difference</h2>
          <p className="text-center text-slate-600 mb-12">Why clients choose us over the competition</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {differences.map((diff) => (
              <div key={diff.title} className="flex items-start space-x-4 p-6">
                <span className="text-red-600 text-xl">◆</span>
                <div>
                  <h3 className="font-bold mb-1">{diff.title}</h3>
                  <p className="text-slate-600 text-sm">{diff.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <blockquote className="mt-16 text-center max-w-2xl mx-auto">
            <p className="text-xl text-slate-700 italic mb-4">
              "They delivered a professional site in days, not months. The invoice was exactly what we agreed on — no surprises."
            </p>
            <cite className="text-slate-500 not-italic">— Kenya Children's Home</cite>
          </blockquote>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Process</h2>
          <div className="grid md:grid-cols-5 gap-4">
            {[
              { step: "1", title: "Discovery", desc: "Goals, audience, constraints" },
              { step: "2", title: "Design", desc: "Clean, conversion-focused" },
              { step: "3", title: "Build", desc: "Fast, accessible, SEO-ready" },
              { step: "4", title: "Launch", desc: "Analytics connected" },
              { step: "5", title: "Support", desc: "30 days post-launch" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-3">
                  {item.step}
                </div>
                <h3 className="font-bold mb-1">{item.title}</h3>
                <p className="text-slate-600 text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Investment & Payment</h2>
          <div className="bg-slate-50 rounded-xl p-8 mb-8">
            <div className="flex justify-center items-center space-x-8 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">50%</div>
                <div className="text-sm text-slate-600">Upfront to begin</div>
              </div>
              <div className="text-slate-300">+</div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">50%</div>
                <div className="text-sm text-slate-600">Upon delivery</div>
              </div>
            </div>
            <p className="text-slate-600 text-sm">
              Payment methods: M-Pesa, Bank Transfer, PayPal
            </p>
          </div>
          <p className="text-slate-600 mb-8">
            Detailed invoices with clear line items. No vague "project fees." You see exactly what you're paying for.
          </p>
          <Link 
            href="/"
            className="inline-block px-8 py-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
          >
            Start Your Project →
          </Link>
        </div>
      </section>

      {/* Footer Info */}
      <section className="py-12 px-6 bg-slate-900 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-xl font-bold mb-4">PlainSight Digital</h3>
          <p className="text-slate-400 mb-2">Web Design & Digital Solutions</p>
          <p className="text-slate-400">Nairobi, Kenya</p>
          <div className="mt-6 space-x-4">
            <Link href="/" className="text-red-400 hover:text-red-300">plainsightdigital.dev</Link>
            <span className="text-slate-600">|</span>
            <a href="mailto:hello@plainsightdigital.dev" className="text-red-400 hover:text-red-300">hello@plainsightdigital.dev</a>
          </div>
        </div>
      </section>
    </main>
  );
}
