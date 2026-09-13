import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { businessInfo, siteConfig } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Papa Smoke | Smoke Shop Near Pinehurst & Magnolia, TX",
    template: "%s | Papa Smoke",
  },
  description:
    "Papa Smoke is a modern local smoke shop at 37125 FM 1774 #102 near Pinehurst and Magnolia, TX for glass, vapes, accessories, and friendly guidance.",
  keywords: [
    "Papa Smoke",
    "smoke shop Pinehurst TX",
    "smokeshop Pinehurst",
    "vape shop Pinehurst TX",
    "glass pipes Pinehurst TX",
  ],
  openGraph: {
    title: "Papa Smoke | Smoke Shop Near Pinehurst & Magnolia, TX",
    description:
      "Visit Papa Smoke near Pinehurst and Magnolia, TX for premium smoke shop essentials, glass, vapes, and accessories.",
    url: siteConfig.url,
    siteName: "Papa Smoke",
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "SmokeShop",
    name: businessInfo.name,
    url: siteConfig.url,
    telephone: businessInfo.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: businessInfo.streetAddress,
      addressLocality: businessInfo.city,
      addressRegion: businessInfo.region,
      postalCode: businessInfo.postalCode,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: businessInfo.latitude,
      longitude: businessInfo.longitude,
    },
    hasMap: businessInfo.googleMapsUrl,
    sameAs: [businessInfo.facebookUrl],
    openingHoursSpecification: businessInfo.openingHoursSpecification,
    areaServed: businessInfo.areaServed,
    priceRange: "$$",
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
      </body>
    </html>
  );
}
