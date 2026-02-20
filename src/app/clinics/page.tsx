import type { Metadata } from "next";
import { SegmentPage } from "@/lib/segmentPage";

export const metadata: Metadata = {
  title: "Website Design for Private Clinics & Medical Centers in Kenya | Plainsight Digital",
  description: "Conversion-focused websites for private clinics and medical centers in Kenya. Get more patient bookings with mobile-first design, appointment scheduling, and trust-building pages.",
  keywords: ["clinic website design Kenya", "medical center website", "hospital website Nairobi", "healthcare web design"],
  openGraph: {
    title: "Website Design for Private Clinics in Kenya | Plainsight Digital",
    description: "Conversion-focused websites for private clinics and medical centers in Kenya. Get more patient bookings with mobile-first design.",
    url: "https://plainsight.digital/clinics",
    siteName: "Plainsight Digital",
    locale: "en_KE",
    type: "website",
  },
  alternates: {
    canonical: "https://plainsight.digital/clinics",
  },
};

export default function ClinicsPage() {
  return (
    <SegmentPage
      badge="Clinics"
      sector="clinics"
      h1="Websites for clinics that need trust and booked appointments."
      intro="For private clinics, your site is often the first consultation. We make it clear, fast, and confidence-building so more visitors become real patients."
      title="What we build for clinics"
      points={[
        "Mobile-first pages for services, doctors, and FAQs optimized for patient discovery",
        "Clear appointment and WhatsApp contact flow that reduces booking friction",
        "Trust stack: credentials, testimonials, location, and hours that build patient confidence",
        "SEO-optimized service pages that rank for local healthcare searches",
      ]}
    />
  );
}
