import type { Metadata } from "next";
import { SegmentPage } from "@/lib/segmentPage";

export const metadata: Metadata = {
  title: "School Website Design in Kenya | Plainsight Digital",
  description: "Modern school websites that improve admissions inquiries and parent trust. Help families discover your programs and start the enrollment journey.",
  keywords: ["school website design Kenya", "private school website Nairobi", "education website design", "admissions website"],
  openGraph: {
    title: "School Website Design in Kenya | Plainsight Digital",
    description: "Modern school websites that improve admissions inquiries and parent trust.",
    url: "https://plainsight.digital/schools",
    siteName: "Plainsight Digital",
    locale: "en_KE",
    type: "website",
  },
  alternates: {
    canonical: "https://plainsight.digital/schools",
  },
};

export default function SchoolsPage() {
  return (
    <SegmentPage
      badge="Schools"
      sector="schools"
      h1="Websites for schools that want better admissions flow."
      intro="Parents compare schools online first. We help you present academics, culture, and admissions clearly so the right families reach out faster."
      title="What we build for schools"
      points={[
        "Admissions pages with clear next steps and inquiry forms parents actually complete",
        "Program pages for parents making decisions about curriculum and values",
        "Inquiry forms and follow-up-ready lead capture for your admissions team",
        "Virtual tour integration and campus showcase that builds emotional connection",
      ]}
    />
  );
}
