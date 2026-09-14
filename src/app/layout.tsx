import type { Metadata } from "next";
import { Manrope, Oswald } from "next/font/google";
import "./globals.css";
import { businessInfo, siteConfig, socialProof } from "@/lib/site";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Papa Smoke | Smoke Shop Near Pinehurst & Magnolia, TX",
    template: "%s | Papa Smoke",
  },
  description:
    "Papa Smoke is a modern smoke shop at 37125 FM 1774 #102 near Pinehurst and Magnolia, TX for premium glass, vapes, wraps, papers, accessories, and local guidance.",
  keywords: [
    "Papa Smoke",
    "smoke shop Pinehurst TX",
    "smoke shop Magnolia TX",
    "smokeshop Pinehurst",
    "smokeshop Magnolia",
    "vape shop Pinehurst TX",
    "vape shop Magnolia TX",
    "glass pipes Pinehurst TX",
    "glass shop Magnolia TX",
    "FM 1774 smoke shop",
  ],
  openGraph: {
    title: "Papa Smoke | Smoke Shop Near Pinehurst & Magnolia, TX",
    description:
      "Visit Papa Smoke on FM 1774 near Pinehurst and Magnolia, TX for premium smoke shop essentials, glass, vapes, wraps, papers, and accessories.",
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
    interactionStatistic: [
      {
        "@type": "InteractionCounter",
        interactionType: "https://schema.org/LikeAction",
        userInteractionCount: Number(socialProof.facebookLikes),
      },
      {
        "@type": "InteractionCounter",
        interactionType: "https://schema.org/CheckInAction",
        userInteractionCount: Number(socialProof.visits),
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${manrope.variable} ${oswald.variable} h-full antialiased`}
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
