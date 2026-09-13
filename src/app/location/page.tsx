import type { Metadata } from "next";
import { Clock, ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { PublicShell } from "@/components/public-shell";
import { businessInfo } from "@/lib/site";

export const metadata: Metadata = {
  title: "Location & Contact",
  description:
    "Contact Papa Smoke at 37125 FM 1774 #102 near Pinehurst and Magnolia, TX. Find smoke shop essentials near Tomball, Magnolia, and The Woodlands.",
};

export default function LocationPage() {
  return (
    <PublicShell>
      <main className="mx-auto max-w-7xl px-5 py-20">
        <p className="font-bold text-teal-200">Location & Contact</p>
        <h1 className="mt-3 max-w-4xl text-5xl font-black text-white">
          Visit Papa Smoke near Pinehurst and Magnolia, TX.
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
              <div className="flex gap-3 text-stone-200">
                <Clock className="mt-1 size-5 text-amber-300" />
                <div>
                  <p className="font-black text-white">Store Hours</p>
                  <ul className="mt-2 space-y-1 text-sm text-stone-300">
                    {businessInfo.openingHours.map((hours) => (
                      <li key={hours}>{hours}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <a
                href={businessInfo.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded bg-amber-400 px-5 font-black text-black hover:bg-amber-300"
              >
                Get Directions
                <ExternalLink className="size-4" />
              </a>
            </div>
          </section>
          <section className="min-h-[22rem] rounded border border-white/10 bg-[linear-gradient(135deg,#121212,#1f332f)] p-8">
            <h2 className="text-3xl font-black text-white">Serving nearby communities</h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-stone-300">
              Papa Smoke is located at {businessInfo.streetAddress} in{" "}
              {businessInfo.city}, close to Pinehurst, Tomball, The Woodlands,
              and the surrounding Montgomery County area.
            </p>
            <div className="mt-8 overflow-hidden rounded border border-white/10 bg-black/30">
              <iframe
                title="Papa Smoke location map"
                src={`https://www.google.com/maps?q=${businessInfo.latitude},${businessInfo.longitude}&z=15&output=embed`}
                className="h-80 w-full"
                loading="lazy"
              />
            </div>
          </section>
        </div>
      </main>
    </PublicShell>
  );
}
