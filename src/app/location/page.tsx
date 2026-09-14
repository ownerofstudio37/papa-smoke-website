import type { Metadata } from "next";
import { Clock, ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { createLead } from "@/app/actions";
import { PublicShell } from "@/components/public-shell";
import { businessInfo } from "@/lib/site";

export const metadata: Metadata = {
  title: "Location & Contact",
  description:
    "Contact Papa Smoke at 37125 FM 1774 #102 near Pinehurst and Magnolia, TX. Find smoke shop essentials near Tomball, Magnolia, and The Woodlands.",
};

export default async function LocationPage({
  searchParams,
}: PageProps<"/location">) {
  const params = await searchParams;
  const sent = params.sent === "1";
  const error = typeof params.error === "string" ? params.error : null;

  return (
    <PublicShell>
      <main className="mx-auto max-w-7xl px-5 py-20">
        <p className="font-bold text-teal-200">Location & Contact</p>
        <h1 className="font-display mt-3 max-w-4xl text-6xl font-black text-white">
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
                className="pressable inline-flex min-h-12 w-full items-center justify-center gap-2 rounded bg-amber-400 px-5 font-black text-black hover:bg-amber-300"
              >
                Get Directions
                <ExternalLink className="size-4" />
              </a>
            </div>
          </section>
          <section className="min-h-[22rem] rounded border border-white/10 bg-[linear-gradient(135deg,#121212,#1f332f)] p-8">
            <h2 className="font-display text-4xl font-black text-white">Serving nearby communities</h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-stone-300">
              Papa Smoke is located at {businessInfo.streetAddress} in{" "}
              {businessInfo.city}, close to Pinehurst, Tomball, The Woodlands,
              and the surrounding Montgomery County area for glass, vapes,
              wraps, papers, and smoke shop accessories.
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
        <section className="mt-8 grid gap-6 rounded border border-white/10 bg-black/60 p-6 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="font-bold text-teal-200">Ask Papa Smoke</p>
            <h2 className="font-display mt-3 text-4xl font-black text-white">
              Send a message before you stop by.
            </h2>
            <p className="mt-4 leading-7 text-stone-300">
              This form drops straight into the built-in CRM for follow-up. If
              the owner buys, Resend can send automatic notification and
              confirmation emails from the same submission.
            </p>
          </div>
          <form action={createLead} className="grid gap-4">
            {sent ? (
              <p className="rounded border border-teal-300/25 bg-teal-300/10 p-3 text-sm font-bold text-teal-100">
                Message sent. Papa Smoke can follow up from the CRM.
              </p>
            ) : null}
            {error ? (
              <p className="rounded border border-red-400/25 bg-red-500/10 p-3 text-sm font-bold text-red-100">
                {error}
              </p>
            ) : null}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm font-bold text-stone-300">
                Name
                <input
                  name="name"
                  required
                  className="min-h-12 rounded border border-white/10 bg-black px-4 text-white outline-none focus:border-amber-300"
                />
              </label>
              <label className="grid gap-2 text-sm font-bold text-stone-300">
                Email
                <input
                  type="email"
                  name="email"
                  className="min-h-12 rounded border border-white/10 bg-black px-4 text-white outline-none focus:border-amber-300"
                />
              </label>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm font-bold text-stone-300">
                Phone
                <input
                  name="phone"
                  className="min-h-12 rounded border border-white/10 bg-black px-4 text-white outline-none focus:border-amber-300"
                />
              </label>
              <label className="grid gap-2 text-sm font-bold text-stone-300">
                Subject
                <input
                  name="subject"
                  placeholder="Question about glass, vapes, hours..."
                  className="min-h-12 rounded border border-white/10 bg-black px-4 text-white outline-none focus:border-amber-300"
                />
              </label>
            </div>
            <label className="grid gap-2 text-sm font-bold text-stone-300">
              Message
              <textarea
                name="message"
                required
                className="min-h-32 rounded border border-white/10 bg-black p-4 text-white outline-none focus:border-amber-300"
              />
            </label>
            <button className="pressable min-h-12 rounded bg-amber-400 px-6 font-black text-black hover:bg-amber-300">
              Send Message
            </button>
          </form>
        </section>
      </main>
    </PublicShell>
  );
}
