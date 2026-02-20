import type { Metadata } from "next";
import { SegmentPage } from "@/lib/segmentPage";

export const metadata: Metadata = {
  title: "Hotel Website Design in Kenya | Plainsight Digital",
  description: "Hospitality websites designed to increase direct bookings and reduce OTA dependency.",
};

export default function HotelsPage() {
  return (
    <SegmentPage
      badge="Hotels"
      h1="Websites for hotels that need more direct bookings."
      intro="If your guests discover you online but book elsewhere, you're losing margin. We build direct-booking paths that keep conversion on your side."
      title="What we build for hotels"
      points={[
        "Mobile booking journey with fewer drop-offs",
        "Room, package, and event pages that convert",
        "Trust cues that reduce booking hesitation",
      ]}
    />
  );
}
