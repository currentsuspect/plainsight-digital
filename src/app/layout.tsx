import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.plainsightdigital.dev"),
  title: {
    default: "Plainsight Digital | High-Ticket Websites for Kenya",
    template: "%s | Plainsight Digital",
  },
  description: "Luxury-grade, conversion-focused websites for clinics, law firms, schools, hotels, and logistics companies in Kenya. We build digital systems that generate leads, not just pageviews.",
  keywords: ["website design Kenya", "high-ticket website", "conversion optimization", "law firm website", "clinic website", "school website", "hotel website", "logistics website", "Nairobi web design"],
  authors: [{ name: "Plainsight Digital" }],
  creator: "Plainsight Digital",
  publisher: "Plainsight Digital",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "https://www.plainsightdigital.dev",
    siteName: "Plainsight Digital",
    title: "Plainsight Digital | High-Ticket Websites for Kenya",
    description: "Luxury-grade, conversion-focused websites for clinics, law firms, schools, hotels, and logistics companies in Kenya.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Plainsight Digital | High-Ticket Websites",
    description: "Luxury-grade, conversion-focused websites for clinics, law firms, schools, hotels, and logistics companies in Kenya.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/logo.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID || "G-XXXXXXXXXX";
  
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Google Analytics */}
        {gaId && gaId !== "G-XXXXXXXXXX" && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}></script>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}');
                `,
              }}
            />
          </>
        )}
        {/* JSON-LD LocalBusiness Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Plainsight Digital",
              "description": "Luxury-grade, conversion-focused websites for clinics, law firms, schools, hotels, and logistics companies in Kenya.",
              "url": "https://www.plainsightdigital.dev",
              "telephone": "+254-750-192-512",
              "email": "hello@plainsight.digital",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Nairobi",
                "addressCountry": "KE"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": -1.2921,
                "longitude": 36.8219
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "09:00",
                "closes": "18:00"
              },
              "priceRange": "$$$",
              "areaServed": {
                "@type": "Country",
                "name": "Kenya"
              }
            }),
          }}
        />
      </head>
      <body className={`${jakarta.variable} ${playfair.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
