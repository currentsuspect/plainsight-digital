import type { Metadata } from "next";
import { SegmentPage } from "@/lib/segmentPage";

export const metadata: Metadata = {
  title: "Logistics Company Website Design in Kenya | Plainsight Digital",
  description: "Lead-focused websites for logistics companies targeting higher-value contracts.",
};

export default function LogisticsPage() {
  return (
    <SegmentPage
      badge="Logistics"
      h1="Websites for logistics teams that want better commercial leads."
      intro="For logistics operators, buyers move fast and compare hard. We build service pages and inquiry flows that make your capabilities obvious and easy to contact."
      title="What we build for logistics companies"
      points={[
        "Service-line landing pages for clear buyer intent",
        "Capability and coverage pages that build trust quickly",
        "Lead forms ready for sales follow-up and routing",
      ]}
    />
  );
}
