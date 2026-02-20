import type { Metadata } from "next";
import { SegmentPage } from "@/lib/segmentPage";

export const metadata: Metadata = {
  title: "Law Firm Website Design in Kenya | Plainsight Digital",
  description: "Professional, conversion-focused websites for law firms in Kenya. Attract high-value clients with practice-area pages, consultation booking, and trust-building design.",
  keywords: ["law firm website design Kenya", "advocate website Nairobi", "legal website design", "attorney website Kenya"],
  openGraph: {
    title: "Law Firm Website Design in Kenya | Plainsight Digital",
    description: "Professional, conversion-focused websites for law firms that want better client acquisition.",
    url: "https://plainsight.digital/law-firms",
    siteName: "Plainsight Digital",
    locale: "en_KE",
    type: "website",
  },
  alternates: {
    canonical: "https://plainsight.digital/law-firms",
  },
};

export default function LawFirmsPage() {
  return (
    <SegmentPage
      badge="Law Firms"
      sector="law-firms"
      h1="Websites for law firms that need stronger authority online."
      intro="Most legal websites look acceptable but convert poorly. We structure your pages around trust, clarity, and consultation requests from the right clients."
      title="What we build for law firms"
      points={[
        "Practice-area pages that answer client intent quickly and establish expertise",
        "High-trust structure for first-time visitors seeking legal representation",
        "Consultation funnel with faster lead capture and follow-up automation",
        "Attorney bio pages that build personal connection before the first call",
      ]}
    />
  );
}
