import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { PublicShell } from "@/components/public-shell";
import { businessInfo } from "@/lib/site";

export const metadata: Metadata = {
  title: "Location & Contact",
  description:
    "Contact Papa Smoke in Pinehurst, TX. Find smoke shop essentials near Tomball, Magnolia, and The Woodlands.",
};

export default function LocationPage() {
  return (
    <PublicShell>
      <main className="mx-auto max-w-7xl px-5 py-20">
        <p className="font-bold text-teal-200">Location & Contact</p>
        <h1 className="mt-3 max-w-4xl text-5xl font-black text-white">
          Visit Papa Smoke in Pinehurst, TX.
        </h1>
        <div className="mt-10 grid gap-6 md:grid-cols-[0.85fr_1.15fr]">
          <section className="rounded border border-white/10 bg-white/[0.04] p-6">
            <div className="space-y-6">
              <p className="flex gap-3 text-stone-200">
                <MapPin className="mt-1 size-5 text-amber-300" />
                <span>
                  {businessInfo.streetAddress}
                  <br />
                  {businessInfo.city}, {businessInfo.region} {businessInfo.postalCode}
                </span>
              </p>
              <p className="flex gap-3 text-stone-200">
                <Phone className="mt-1 size-5 text-amber-300" />
                <a href={`tel:${businessInfo.phone}`}>{businessInfo.phone}</a>
              </p>
              <p className="flex gap-3 text-stone-200">
                <Mail className="mt-1 size-5 text-amber-300" />
                <a href={`mailto:${businessInfo.email}`}>{businessInfo.email}</a>
              </p>
            </div>
          </section>
          <section className="min-h-[22rem] rounded border border-white/10 bg-[linear-gradient(135deg,#121212,#1f332f)] p-8">
            <h2 className="text-3xl font-black text-white">Serving nearby communities</h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-stone-300">
              Papa Smoke is positioned for customers in Pinehurst, Tomball,
              Magnolia, The Woodlands, and the surrounding Montgomery County
              area. Replace the placeholder address in `src/lib/site.ts` when
              the final storefront details are ready.
            </p>
          </section>
        </div>
      </main>
    </PublicShell>
  );
}
