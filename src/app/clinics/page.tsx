import type { Metadata } from "next";
import { SegmentPage } from "@/lib/segmentPage";

export const metadata: Metadata = {
  title: "Website Design for Clinics in Kenya | Plainsight Digital",
  description: "Conversion-focused websites for private clinics and medical centers in Kenya.",
};

export default function ClinicsPage() {
  return (
    <SegmentPage
      badge="Clinics"
      h1="Websites for clinics that need trust and booked appointments."
      intro="For private clinics, your site is often the first consultation. We make it clear, fast, and confidence-building so more visitors become real patients."
      title="What we build for clinics"
      points={[
        "Mobile-first pages for services, doctors, and FAQs",
        "Clear appointment and WhatsApp contact flow",
        "Trust stack: credentials, testimonials, location, and hours",
      ]}
    />
  );
}
