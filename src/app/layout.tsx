import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { SiteShell } from "@/components/layout/site-shell";
import "./globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: "Dr. Sandeep Shetty's Dental Clinic and Orthodontic Centre | Mangaluru",
  description:
    "Premium multi-specialty dental care in Mangaluru. Certified Invisalign provider with expert orthodontic, implant, and family dentistry services.",
  keywords: [
    "Dentist in Mangaluru",
    "Orthodontic Centre Mangaluru",
    "Invisalign provider Mangaluru",
    "Dr. Sandeep Shetty Dental Clinic",
  ],
  openGraph: {
    title:
      "Dr. Sandeep Shetty's Dental Clinic and Orthodontic Centre | Mangaluru",
    description:
      "Advanced dental and orthodontic care in Mangaluru. Invisalign-certified, multi-specialty team, open until 8 PM.",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Dr. Sandeep Shetty's Dental Clinic and Orthodontic Centre | Mangaluru",
    description:
      "Precision meets comfort—Invisalign, implants, and family dentistry in Mangaluru.",
  },
};

const clinicJsonLd = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: "Dr. Sandeep Shetty's Dental Clinic and Orthodontic Centre",
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "Marian Paradise Plaza 1st floor, Shop No. 106, Bunts Hostel Rd, near PSR Silk Sarees",
    addressLocality: "Mangaluru",
    addressRegion: "Karnataka",
    postalCode: "575003",
    addressCountry: "IN",
  },
  telephone: "+918244113388",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "115",
  },
  areaServed: { "@type": "City", name: "Mangaluru" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(clinicJsonLd),
          }}
        />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
