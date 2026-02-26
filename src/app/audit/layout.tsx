import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Website Audit | Plainsight Digital",
  description: "Get a comprehensive website analysis in 30 seconds. 15+ checks covering security, speed, SEO, and conversions for Kenyan businesses.",
  alternates: {
    canonical: "https://www.plainsightdigital.dev/audit",
  },
};

export default function AuditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
