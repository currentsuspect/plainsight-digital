import type { Metadata } from "next";
import { SegmentPage } from "@/lib/segmentPage";

export const metadata: Metadata = {
  title: "Hotel Website Design in Kenya | Plainsight Digital",
  description: "Hospitality websites designed to increase direct bookings and reduce OTA dependency. Capture more revenue with conversion-optimized room and package pages.",
  keywords: ["hotel website design Kenya", "resort website Nairobi", "hospitality web design", "direct booking website"],
  openGraph: {
    title: "Hotel Website Design in Kenya | Plainsight Digital",
    description: "Hospitality websites designed to increase direct bookings and reduce OTA dependency.",
    url: "https://plainsight.digital/hotels",
    siteName: "Plainsight Digital",
    locale: "en_KE",
    type: "website",
  },
  alternates: {
    canonical: "https://plainsight.digital/hotels",
  },
};

export default function HotelsPage() {
  return (
    <SegmentPage
      badge="Hotels"
      sector="hotels"
      h1="Websites for hotels that need more direct bookings."
      intro="If your guests discover you online but book elsewhere, you're losing margin. We build direct-booking paths that keep conversion on your side."
      title="What we build for hotels"
      points={[
        "Mobile booking journey with fewer drop-offs and streamlined checkout",
        "Room, package, and event pages that convert browsers into guests",
        "Trust cues that reduce booking hesitation and highlight your unique experience",
        "OTA-independent booking engine integration and commission-free reservations",
      ]}
    />
  );
}
