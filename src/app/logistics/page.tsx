import type { Metadata } from "next";
import { SegmentPage } from "@/lib/segmentPage";

export const metadata: Metadata = {
  title: "Logistics Company Website Design in Kenya | Plainsight Digital",
  description: "Lead-focused websites for logistics companies targeting higher-value contracts. Convert enterprise buyers with service pages that prove your capabilities.",
  keywords: ["logistics website design Kenya", "freight company website", "supply chain website", "logistics web design Nairobi"],
  openGraph: {
    title: "Logistics Company Website Design in Kenya | Plainsight Digital",
    description: "Lead-focused websites for logistics companies targeting higher-value contracts.",
    url: "https://www.plainsightdigital.dev/logistics",
    siteName: "Plainsight Digital",
    locale: "en_KE",
    type: "website",
  },
  alternates: {
    canonical: "https://www.plainsightdigital.dev/logistics",
  },
};

export default function LogisticsPage() {
  return (
    <SegmentPage
      badge="Logistics"
      sector="logistics"
      h1="Websites for logistics teams that want better commercial leads."
      intro="For logistics operators, buyers move fast and compare hard. We build service pages and inquiry flows that make your capabilities obvious and easy to contact."
      title="What we build for logistics companies"
      points={[
        "Service-line landing pages for clear buyer intent and faster qualification",
        "Capability and coverage pages that build trust quickly with procurement teams",
        "Lead forms ready for sales follow-up and CRM routing automation",
        "Case studies and proof points that close enterprise deals faster",
      ]}
    />
  );
}
