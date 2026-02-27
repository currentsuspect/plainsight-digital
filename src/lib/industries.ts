// Industry landing page configuration
// Centralized content for all industry pages

export type IndustrySlug = "clinics" | "law-firms" | "schools" | "hotels" | "logistics";

export interface IndustryConfig {
  slug: IndustrySlug;
  badge: string;
  h1: string;
  intro: string;
  title: string;
  points: string[];
  niche: "clinic" | "law" | "school" | "hotel" | "logistics";
  meta: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export const industries: Record<IndustrySlug, IndustryConfig> = {
  clinics: {
    slug: "clinics",
    badge: "Clinics",
    niche: "clinic",
    h1: "Websites for clinics that need trust and booked appointments.",
    intro: "For private clinics, your site is often the first consultation. We make it clear, fast, and confidence-building so more visitors become real patients.",
    title: "What we build for clinics",
    points: [
      "Mobile-first pages for services, doctors, and FAQs optimized for patient discovery",
      "Clear appointment and WhatsApp contact flow that reduces booking friction",
      "Trust stack: credentials, testimonials, location, and hours that build patient confidence",
      "SEO-optimized service pages that rank for local healthcare searches",
    ],
    meta: {
      title: "Website Design for Private Clinics & Medical Centers in Kenya | Plainsight Digital",
      description: "Conversion-focused websites for private clinics and medical centers in Kenya. Get more patient bookings with mobile-first design, appointment scheduling, and trust-building pages.",
      keywords: ["clinic website design Kenya", "medical center website", "hospital website Nairobi", "healthcare web design"],
    },
  },
  "law-firms": {
    slug: "law-firms",
    badge: "Law Firms",
    niche: "law",
    h1: "Websites for law firms that need stronger authority online.",
    intro: "Most legal websites look acceptable but convert poorly. We structure your pages around trust, clarity, and consultation requests from the right clients.",
    title: "What we build for law firms",
    points: [
      "Practice-area pages that answer client intent quickly and establish expertise",
      "High-trust structure for first-time visitors seeking legal representation",
      "Consultation funnel with faster lead capture and follow-up automation",
      "Attorney bio pages that build personal connection before the first call",
    ],
    meta: {
      title: "Law Firm Website Design in Kenya | Plainsight Digital",
      description: "Professional, conversion-focused websites for law firms in Kenya. Attract high-value clients with practice-area pages, consultation booking, and trust-building design.",
      keywords: ["law firm website design Kenya", "advocate website Nairobi", "legal website design", "attorney website Kenya"],
    },
  },
  schools: {
    slug: "schools",
    badge: "Schools",
    niche: "school",
    h1: "Websites for schools that need more enrollment inquiries.",
    intro: "Your website is often the first impression for prospective parents. We make it easy for them to understand your value, request information, and take the next step.",
    title: "What we build for schools",
    points: [
      "Clear information architecture for programs, admissions, and campus life",
      "Streamlined inquiry forms that capture parent details without friction",
      "Trust-building content: faculty credentials, testimonials, achievements",
      "SEO-optimized pages that rank for local school searches",
    ],
    meta: {
      title: "School Website Design in Kenya | Plainsight Digital",
      description: "Professional websites for private schools in Kenya. Increase enrollment with clear information, streamlined inquiries, and parent-focused design.",
      keywords: ["school website design Kenya", "private school website", "international school Nairobi", "educational website design"],
    },
  },
  hotels: {
    slug: "hotels",
    badge: "Hotels",
    niche: "hotel",
    h1: "Websites for hotels that drive more direct bookings.",
    intro: "Stop paying high commissions to booking platforms. We build hotel websites that convert browsers into direct reservations.",
    title: "What we build for hotels",
    points: [
      "Visual-first design that showcases rooms, amenities, and experiences",
      "Direct booking integration to reduce OTA dependency",
      "Mobile-optimized reservation flow for on-the-go travelers",
      "Local SEO to capture 'hotels near me' searches",
    ],
    meta: {
      title: "Hotel Website Design in Kenya | Plainsight Digital",
      description: "Conversion-focused hotel websites in Kenya. Drive direct bookings with stunning visuals, seamless reservations, and local SEO.",
      keywords: ["hotel website design Kenya", "boutique hotel website", "resort website Nairobi", "hospitality web design"],
    },
  },
  logistics: {
    slug: "logistics",
    badge: "Logistics",
    niche: "logistics",
    h1: "Websites for logistics companies that build credibility.",
    intro: "In logistics, trust is everything. We build websites that communicate reliability, capability, and professionalism to potential clients.",
    title: "What we build for logistics",
    points: [
      "Service-focused pages that clearly explain capabilities and coverage",
      "Case studies and client logos that build trust with prospects",
      "Quote request forms that capture detailed requirements",
      "Mobile-responsive design for clients checking on-the-go",
    ],
    meta: {
      title: "Logistics Website Design in Kenya | Plainsight Digital",
      description: "Professional websites for logistics and transport companies in Kenya. Build credibility with service pages, case studies, and clear contact flows.",
      keywords: ["logistics website design Kenya", "transport company website", "freight website Nairobi", "supply chain web design"],
    },
  },
};

export function getIndustry(slug: string): IndustryConfig | null {
  return industries[slug as IndustrySlug] || null;
}

export function listIndustries(): IndustryConfig[] {
  return Object.values(industries);
}

export function getRelatedIndustries(current: IndustrySlug): { label: string; href: string }[] {
  return Object.values(industries)
    .filter((ind) => ind.slug !== current)
    .map((ind) => ({
      label: ind.badge,
      href: `/${ind.slug}`,
    }));
}
