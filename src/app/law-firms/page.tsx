import type { Metadata } from "next";
import { SegmentPage } from "@/lib/segmentPage";

export const metadata: Metadata = {
  title: "Law Firm Website Design in Kenya | Plainsight Digital",
  description: "Professional, conversion-focused websites for law firms that want better client acquisition.",
};

export default function LawFirmsPage() {
  return (
    <SegmentPage
      badge="Law Firms"
      h1="Websites for law firms that need stronger authority online."
      intro="Most legal websites look acceptable but convert poorly. We structure your pages around trust, clarity, and consultation requests from the right clients."
      title="What we build for law firms"
      points={[
        "Practice-area pages that answer client intent quickly",
        "High-trust structure for first-time visitors",
        "Consultation funnel with faster lead capture",
      ]}
    />
  );
}
