import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Kenyan Patient's Journey: From Google Search to Clinic Visit | Plainsight Digital",
  description: "Understanding how Kenyan patients find and choose healthcare providers online. Optimize your clinic's digital presence for every stage of the patient journey.",
  keywords: ["patient journey Kenya", "clinic marketing Nairobi", "healthcare SEO Kenya", "patient acquisition", "medical website conversion"],
  openGraph: {
    title: "The Kenyan Patient's Journey: From Google Search to Clinic Visit",
    description: "How Kenyan patients find healthcare providers online — and how to capture them at every stage.",
    type: "article",
    publishedTime: "2026-02-27",
    authors: ["Dylan Makori"],
  },
  alternates: {
    canonical: "https://www.plainsightdigital.dev/blog/patient-journey-kenya",
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
            <span>Healthcare</span>
          </div>
          
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl leading-tight mb-6">
            The Kenyan Patient's Journey: From Google Search to Clinic Visit
          </h1>
          
          <div className="flex items-center gap-4 text-zinc-400 text-sm">
            <span>By Dylan Makori</span>
            <span>•</span>
            <span>February 27, 2026</span>
            <span>•</span>
            <span>9 min read</span>
          </div>
        </header>

        <div className="prose prose-invert prose-lg max-w-none">
          <p className="lead text-xl text-zinc-300">
            Sarah wakes up with a persistent headache. It&apos;s 6:30 AM in Nairobi. 
            Before she even gets out of bed, she&apos;s reached for her phone. 
            <strong className="text-amber-300">"best migraine doctor Nairobi"</strong> — typed into Google. 
            In 48 hours, she&apos;ll be sitting in a clinic. But which one? 
            That depends entirely on what she finds in the next 10 minutes.
          </p>

          <div className="my-8 p-6 rounded-lg border border-amber-300/20 bg-amber-300/5">
            <p className="text-amber-300 font-semibold mb-2">💡 The Reality</p>
            <p className="text-zinc-300">
              <strong>74% of Kenyan patients</strong> research healthcare providers online before booking. 
              Yet <strong>68% of clinic websites</strong> lose these potential patients at the first interaction. 
              Understanding the journey is the first step to fixing the leaks.
            </p>
          </div>

          <h2 className="font-display text-2xl text-zinc-100 mt-12 mb-6">Stage 1: The Google Search (Awareness)</h2>

          <p className="text-zinc-300">
            The journey starts with pain — literal or figurative. Kenyan patients search differently 
            depending on urgency and condition:
          </p>

          <div className="overflow-x-auto my-8">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left py-3 text-zinc-300">Search Type</th>
                  <th className="text-left py-3 text-zinc-300">Example Keywords</th>
                  <th className="text-left py-3 text-zinc-300">Patient Mindset</th>
                </tr>
              </thead>
              <tbody className="text-zinc-400">
                <tr className="border-b border-zinc-800/50">
                  <td className="py-3 font-semibold text-zinc-200">Symptom-Based</td>
                  <td className="py-3">"dentist for toothache Karen", "pediatrician fever Nairobi"</td>
                  <td className="py-3">Seeking immediate relief</td>
                </tr>
                <tr className="border-b border-zinc-800/50">
                  <td className="py-3 font-semibold text-zinc-200">Specialty-Based</td>
                  <td className="py-3">"best cardiologist Nairobi", "orthopedic surgeon Kenya"</td>
                  <td className="py-3">Researching expertise</td>
                </tr>
                <tr className="border-b border-zinc-800/50">
                  <td className="py-3 font-semibold text-zinc-200">Location-Based</td>
                  <td className="py-3">"clinic near me", "hospital Westlands", "doctor Kilimani"</td>
                  <td className="py-3">Convenience-focused</td>
                </tr>
                <tr>
                  <td className="py-3 font-semibold text-zinc-200">Trust-Based</td>
                  <td className="py-3">"Dr. [Name] reviews", "clinic testimonials Nairobi"</td>
                  <td className="py-3">Validating choice</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-zinc-300">
            <strong>The Opportunity:</strong> If your clinic ranks for these searches with 
            compelling, specific content, you&apos;ve captured attention. Most clinics fail here — 
            they have generic "Services" pages instead of "Migraine Treatment in Nairobi" landing pages.
          </p>

          <h3 className="font-display text-lg text-zinc-100 mt-8 mb-4">What Patients See (And What They Need)</h3>

          <div className="grid sm:grid-cols-2 gap-6 my-8">
            <div className="p-5 rounded-lg border border-red-500/30 bg-red-500/10">
              <p className="text-red-400 font-semibold mb-3">❌ What Most Clinics Show</p>
              <ul className="text-zinc-400 text-sm space-y-2">
                <li>• Generic "Welcome to Our Clinic" homepage</li>
                <li>• List of services with medical jargon</li>
                <li>• Stock photos of smiling doctors</li>
                <li>• Hidden contact information</li>
                <li>• No prices or insurance info</li>
                <li>• Outdated content ("News from 2019")</li>
              </ul>
            </div>

            <div className="p-5 rounded-lg border border-emerald-500/30 bg-emerald-500/10">
              <p className="text-emerald-400 font-semibold mb-3">✓ What Patients Actually Need</p>
              <ul className="text-zinc-400 text-sm space-y-2">
                <li>• "We treat [specific condition] in [location]"</li>
                <li>• Doctor credentials and specializations</li>
                <li>• Real patient testimonials with photos</li>
                <li>• WhatsApp click-to-chat prominently</li>
                <li>• Clear pricing or "Insurance Accepted"</li>
                <li>• Current availability and booking</li>
              </ul>
            </div>
          </div>

          <h2 className="font-display text-2xl text-zinc-100 mt-12 mb-6">Stage 2: The Website Visit (Evaluation)</h2>

          <p className="text-zinc-300">
            Sarah clicks your link. She&apos;s on her phone — <strong>72% of Kenyan healthcare searches happen on mobile</strong>. 
            She&apos;s not browsing; she&apos;s investigating. She has 3-4 tabs open with competitor clinics. 
            You have 30 seconds to convince her you&apos;re the right choice.
          </p>

          <h3 className="font-display text-lg text-zinc-100 mt-8 mb-4">The 5-Second Test: Can Patients Answer These?</h3>

          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-4 p-4 rounded-lg border border-zinc-800 bg-zinc-900/50">
              <span className="text-amber-300 font-bold text-xl">1</span>
              <div>
                <p className="font-semibold text-zinc-100">"Do they treat my condition?"</p>
                <p className="text-zinc-400 text-sm">Your homepage should immediately signal relevant specialties. Not "Multi-specialty clinic" — "Migraine & Headache Specialists, Karen"</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-lg border border-zinc-800 bg-zinc-900/50">
              <span className="text-amber-300 font-bold text-xl">2</span>
              <div>
                <p className="font-semibold text-zinc-100">"Are the doctors qualified?"</p>
                <p className="text-zinc-400 text-sm">Real doctor photos, specific credentials (not just "MBChB"), years of experience, and patient outcomes build trust instantly.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-lg border border-zinc-800 bg-zinc-900/50">
              <span className="text-amber-300 font-bold text-xl">3</span>
              <div>
                <p className="font-semibold text-zinc-100">"Can I afford it?"</p>
                <p className="text-zinc-400 text-sm">Kenyan patients are cost-conscious. "Consultation: KES 2,500" or "NHIF Accredited" removes a major barrier.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-lg border border-zinc-800 bg-zinc-900/50">
              <span className="text-amber-300 font-bold text-xl">4</span>
              <div>
                <p className="font-semibold text-zinc-100">"How soon can I be seen?"</p>
                <p className="text-zinc-400 text-sm">"Next available: Tomorrow 2 PM" or "Same-day appointments" creates urgency and reduces search abandonment.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-lg border border-zinc-800 bg-zinc-900/50">
              <span className="text-amber-300 font-bold text-xl">5</span>
              <div>
                <p className="font-semibold text-zinc-100">"Where exactly are they?"</p>
                <p className="text-zinc-400 text-sm">Nairobi traffic is brutal. "Opposite Yaya Centre, 3rd Floor" beats "Nairobi, Kenya" every time. Embedded Google Maps essential.</p>
              </div>
            </div>
          </div>

          <h2 className="font-display text-2xl text-zinc-100 mt-12 mb-6">Stage 3: The Decision Point (Conversion)</h2>

          <p className="text-zinc-300">
            Sarah&apos;s convinced you might be the right clinic. Now she needs to act. 
            But Kenyan patients hesitate here — they&apos;re wary of:
          </p>

          <ul className="space-y-2 text-zinc-400 mb-6">
            <li>• Long hold times on phone calls</li>
            <li>• Receptionists who don&apos;t have answers</li>
            <li>• Unclear next steps after booking</li>
            <li>• Hidden costs that emerge at the clinic</li>
          </ul>

          <p className="text-zinc-300">
            <strong>The Solution: WhatsApp-First Booking</strong>
          </p>

          <p className="text-zinc-300">
            Phone calls create friction. WhatsApp removes it:
          </p>

          <div className="p-6 rounded-lg border border-emerald-500/30 bg-emerald-500/10 my-8">
            <p className="text-emerald-400 font-semibold mb-4">✓ The Ideal WhatsApp Flow</p>
            <div className="space-y-3 text-zinc-300 text-sm">
              <p><strong>Patient:</strong> [Clicks WhatsApp button] "Hi, I need to see a doctor for migraines"</p>
              <p><strong>Auto-Response:</strong> "Hello! 👋 We can help with migraines. Dr. Kimani has 15 years experience treating headaches. When would you like to come in?"</p>
              <p><strong>Patient:</strong> "Tomorrow afternoon"</p>
              <p><strong>Auto-Response:</strong> "Dr. Kimani is available tomorrow (Wed) at 2:30 PM or 4:00 PM. Which works better? Consultation is KES 2,500."</p>
              <p><strong>Patient:</strong> "2:30 PM"</p>
              <p><strong>Auto-Response:</strong> "Perfect! ✅ You're booked for Wed 2:30 PM with Dr. Kimani. Address: [Link]. Please arrive 15 mins early. Reply CONFIRM to confirm."</p>
            </div>
          </div>

          <p className="text-zinc-300">
            This entire exchange takes <strong>under 2 minutes</strong>. No hold music. No "let me check." 
            No friction. Clinics using WhatsApp booking see <strong>3x higher conversion</strong> from website visit to appointment.
          </p>

          <h2 className="font-display text-2xl text-zinc-100 mt-12 mb-6">Stage 4: The Appointment (Fulfillment)</h2>

          <p className="text-zinc-300">
            Sarah arrives. The experience must match the website promise. But the digital journey doesn&apos;t end at the door — 
            it should enhance the physical experience:
          </p>

          <ul className="space-y-3 text-zinc-400">
            <li><strong className="text-zinc-200">Pre-Visit SMS:</strong> "Reminder: Your appointment with Dr. Kimani is tomorrow at 2:30 PM. Here&apos;s what to bring: ID, insurance card, previous scan results if available."</li>
            <li><strong className="text-zinc-200">Digital Intake:</strong> Link to fill medical history on her phone before arrival — reduces waiting room time by 15 minutes.</li>
            <li><strong className="text-zinc-200">Post-Visit Follow-up:</strong> WhatsApp with prescription details, next appointment booking link, and satisfaction survey.</li>
          </ul>

          <h2 className="font-display text-2xl text-zinc-100 mt-12 mb-6">Stage 5: The Review & Referral (Advocacy)</h2>

          <p className="text-zinc-300">
            Sarah&apos;s headache is gone. She&apos;s happy. Now she becomes your marketing:
          </p>

          <div className="grid sm:grid-cols-3 gap-4 my-8">
            <div className="p-4 rounded-lg border border-zinc-800 bg-zinc-900/50 text-center">
              <p className="text-3xl mb-2">⭐⭐⭐⭐⭐</p>
              <p className="text-sm text-zinc-400">Review on Google ( boosts local SEO)</p>
            </div>
            <div className="p-4 rounded-lg border border-zinc-800 bg-zinc-900/50 text-center">
              <p className="text-3xl mb-2">📱</p>
              <p className="text-sm text-zinc-400">WhatsApp referral to friend: "Dr. Kimani is amazing!"</p>
            </div>
            <div className="p-4 rounded-lg border border-zinc-800 bg-zinc-900/50 text-center">
              <p className="text-3xl mb-2">🔄</p>
              <p className="text-sm text-zinc-400">Books follow-up appointment via website</p>
            </div>
          </div>

          <p className="text-zinc-300">
            The best clinic websites make this advocacy easy — prominent "Leave a Review" buttons, 
            referral program mentions, and simple rebooking.
          </p>

          <h2 className="font-display text-2xl text-zinc-100 mt-12 mb-6">The Complete Journey: Visualized</h2>

          <div className="p-6 rounded-lg border border-zinc-800 bg-zinc-900/50 mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div className="flex-1 text-center p-4">
                <div className="w-12 h-12 mx-auto rounded-full bg-amber-300/20 flex items-center justify-center text-amber-300 font-bold mb-2">1</div>
                <p className="font-semibold text-zinc-100">Google Search</p>
                <p className="text-xs text-zinc-500">"migraine doctor Nairobi"</p>
              </div>
              <div className="text-zinc-600 self-center">→</div>
              <div className="flex-1 text-center p-4">
                <div className="w-12 h-12 mx-auto rounded-full bg-amber-300/20 flex items-center justify-center text-amber-300 font-bold mb-2">2</div>
                <p className="font-semibold text-zinc-100">Website Visit</p>
                <p className="text-xs text-zinc-500">3-5 pages, 2 min avg</p>
              </div>
              <div className="text-zinc-600 self-center">→</div>
              <div className="flex-1 text-center p-4">
                <div className="w-12 h-12 mx-auto rounded-full bg-amber-300/20 flex items-center justify-center text-amber-300 font-bold mb-2">3</div>
                <p className="font-semibold text-zinc-100">WhatsApp Booking</p>
                <p className="text-xs text-zinc-500">&lt; 2 minutes</p>
              </div>
              <div className="text-zinc-600 self-center">→</div>
              <div className="flex-1 text-center p-4">
                <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold mb-2">✓</div>
                <p className="font-semibold text-zinc-100">Patient Visit</p>
                <p className="text-xs text-zinc-500">+ Review & Referral</p>
              </div>
            </div>
          </div>

          <h2 className="font-display text-2xl text-zinc-100 mt-12 mb-6">Your Action Plan: Optimize Every Stage</h2>

          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-lg border border-zinc-800 bg-zinc-900/50">
              <span className="text-emerald-400 font-bold">✓</span>
              <div>
                <p className="font-semibold text-zinc-100">This Week</p>
                <p className="text-zinc-400 text-sm">Add WhatsApp click-to-chat button. Make it sticky on mobile. Test the booking flow yourself.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-lg border border-zinc-800 bg-zinc-900/50">
              <span className="text-emerald-400 font-bold">✓</span>
              <div>
                <p className="font-semibold text-zinc-100">This Month</p>
                <p className="text-zinc-400 text-sm">Create 3 condition-specific landing pages: "Migraine Treatment Nairobi", "Pediatric Care Karen", "Orthopedic Surgery Nairobi"</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-lg border border-zinc-800 bg-zinc-900/50">
              <span className="text-emerald-400 font-bold">✓</span>
              <div>
                <p className="font-semibold text-zinc-100">Ongoing</p>
                <p className="text-zinc-400 text-sm">Collect 2 patient testimonials monthly. Video preferred, written acceptable. Feature on homepage.</p>
              </div>
            </div>
          </div>

          <div className="my-12 p-8 rounded-xl border border-amber-300/30 bg-gradient-to-br from-amber-500/10 to-orange-500/5 text-center">
            <h3 className="font-display text-2xl text-zinc-100 mb-4">Want a Patient Journey Audit?</h3>
            <p className="text-zinc-400 mb-6 max-w-lg mx-auto">
              We analyze how patients find and book with your clinic — then fix the leaks. 
              Get specific recommendations for your specialty and location.
            </p>
            <a
              href="/audit"
              className="inline-block rounded-md bg-amber-300 px-8 py-4 text-sm font-semibold tracking-wide text-zinc-950 transition hover:bg-amber-200"
            >
              Get Free Clinic Website Audit →
            </a>
          </div>

          <hr className="border-zinc-800 my-12" />

          <p className="text-zinc-500 text-sm">
            <strong>About the author:</strong> Dylan Makori is the founder of Plainsight Digital, 
            specializing in conversion-focused websites for healthcare providers in Kenya. 
            He&apos;s helped clinics across Nairobi increase patient bookings by an average of 150%.
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-800 flex justify-between items-center">
          <Link href="/blog" className="text-amber-300 hover:underline">
            ← All posts
          </Link>
          
          <div className="flex gap-4">
            <a 
              href="https://twitter.com/intent/tweet?text=Understanding%20the%20Kenyan%20patient%20journey%20—%20from%20Google%20to%20clinic%20visit%20🏥"
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
