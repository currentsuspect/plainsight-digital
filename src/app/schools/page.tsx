import type { Metadata } from "next";
import { SegmentPage } from "@/lib/segmentPage";

export const metadata: Metadata = {
  title: "School Website Design in Kenya | Plainsight Digital",
  description: "Modern school websites that improve admissions inquiries and parent trust.",
};

export default function SchoolsPage() {
  return (
    <SegmentPage
      badge="Schools"
      h1="Websites for schools that want better admissions flow."
      intro="Parents compare schools online first. We help you present academics, culture, and admissions clearly so the right families reach out faster."
      title="What we build for schools"
      points={[
        "Admissions pages with clear next steps",
        "Program pages for parents making decisions",
        "Inquiry forms and follow-up-ready lead capture",
      ]}
    />
  );
}
