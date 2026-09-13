import type { Metadata } from "next";
import Image from "next/image";
import { PublicShell } from "@/components/public-shell";
import { demoImages } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Papa Smoke",
  description:
    "Learn about Papa Smoke, a modern smoke shop on FM 1774 serving Pinehurst, Magnolia, Tomball, The Woodlands, and nearby Montgomery County.",
};

export default function AboutPage() {
  return (
    <PublicShell>
      <main className="mx-auto max-w-5xl px-5 py-20">
        <p className="font-bold text-teal-200">About Us</p>
        <h1 className="font-display mt-3 text-6xl font-black text-white">
          A sharper local smoke shop experience near Pinehurst.
        </h1>
        <div className="relative mt-8 aspect-[16/7] overflow-hidden rounded border border-white/10">
          <Image
            src={demoImages.accessories}
            alt="Curated retail accessories display"
            fill
            unoptimized
            className="object-cover"
            sizes="(min-width: 1024px) 1024px, 100vw"
          />
        </div>
        <div className="content-html mt-8 text-lg">
          <p>
            Papa Smoke is built for shoppers near Pinehurst and Magnolia who
            want a clean store, clear product categories, and staff who can help
            without making the visit complicated.
          </p>
          <p>
            The shop focuses on glass pipes, vapes, wraps, papers, trays,
            cleaners, and everyday smoke shop accessories for customers across
            Pinehurst, Tomball, Magnolia, The Woodlands, and Montgomery County.
          </p>
          <h2>Local, helpful, and easy to shop</h2>
          <p>
            Whether you know exactly what you need or want help comparing
            options, Papa Smoke is designed to make the stop quick, friendly,
            and useful.
          </p>
        </div>
      </main>
    </PublicShell>
  );
}
