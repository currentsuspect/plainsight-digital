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
  metadataBase: new URL("https://plainsight.digital"),
  title: {
    default: "Plainsight Digital | High-Ticket Websites & Conversion Systems",
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
    url: "https://plainsight.digital",
    siteName: "Plainsight Digital",
    title: "Plainsight Digital | High-Ticket Websites & Conversion Systems",
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
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${jakarta.variable} ${playfair.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
