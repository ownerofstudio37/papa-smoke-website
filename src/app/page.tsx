import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, MapPin, ShoppingBag } from "lucide-react";
import { PublicShell } from "@/components/public-shell";
import {
  businessInfo,
  defaultHomeSections,
  demoImages,
  siteConfig,
  socialProof,
} from "@/lib/site";
import { getPublishedPosts } from "@/lib/content";

export default async function Home() {
  const posts = (await getPublishedPosts()).slice(0, 3);

  return (
    <PublicShell>
      <main>
        <section className="relative mx-auto grid min-h-[78vh] max-w-7xl items-center gap-12 overflow-hidden px-5 py-16 md:grid-cols-[1.1fr_0.9fr]">
          <div className="vapor-field" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="wave-lines absolute inset-0 opacity-60" aria-hidden="true" />
          <div className="relative z-10">
            <p className="mb-5 inline-flex items-center gap-2 rounded border border-amber-400/25 bg-amber-400/10 px-3 py-2 text-sm font-bold text-amber-200">
              <MapPin className="size-4" />
              Smoke shop near Pinehurst and Magnolia, TX
            </p>
            <h1 className="font-display max-w-4xl text-5xl font-black leading-[0.95] text-white md:text-7xl">
              A better smoke shop website for Papa Smoke on FM 1774.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-stone-300">
              This demo turns Papa Smoke’s local reputation into a polished
              search-ready site for glass pipes, vape essentials, wraps, papers,
              cleaners, directions, and online shopping near Pinehurst and
              Magnolia.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={siteConfig.shopUrl}
                className="pressable inline-flex min-h-12 items-center justify-center gap-2 rounded bg-amber-400 px-6 font-black text-black hover:bg-amber-300"
              >
                Shop Online <ArrowRight className="size-4" />
              </a>
              <Link
                href="/location"
                className="pressable inline-flex min-h-12 items-center justify-center rounded border border-white/15 px-6 font-bold text-white hover:border-teal-300"
              >
                Visit the Store
              </Link>
            </div>
          </div>
          <div className="relative z-10">
            <div className="lift-card image-zoom neon-panel overflow-hidden rounded border border-white/10 bg-white/[0.04] shadow-2xl">
              <div className="relative aspect-[4/5]">
                <span className="smoke-ring" aria-hidden="true" />
                <Image
                  src={demoImages.hero}
                  alt="Neon retail smoke shop atmosphere"
                  fill
                  priority
                  unoptimized
                  className="object-cover"
                  sizes="(min-width: 768px) 44vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <Image
                    src="/papa-smoke-logo.svg"
                    alt="Papa Smoke LED logo"
                    width={390}
                    height={98}
                    className="mb-5 h-auto w-full max-w-sm"
                  />
                  <p className="max-w-sm text-lg font-bold leading-7 text-white">
                    Built to turn searches for smoke shops, vapes, and glass
                    near Pinehurst into store visits, calls, and online shoppers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden border-y border-white/10 bg-stone-950/80 px-5 py-16">
          <div className="vapor-field opacity-70" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
            {defaultHomeSections.map((item, index) => (
              <article key={item.title} className="lift-card neon-panel relative z-10 overflow-hidden rounded border border-white/10 bg-black/45 p-6">
                <div className="image-zoom relative mb-5 aspect-[4/3] overflow-hidden rounded">
                  <span className="smoke-ring" aria-hidden="true" />
                  <Image
                    src={[demoImages.glass, demoImages.accessories, demoImages.localHelp][index]}
                    alt={`${item.title} at Papa Smoke`}
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="(min-width: 768px) 33vw, 100vw"
                  />
                </div>
                <h2 className="font-display text-3xl font-black text-white">{item.title}</h2>
                <p className="mt-3 leading-7 text-stone-300">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="relative overflow-hidden px-5 py-16">
          <div className="wave-lines absolute inset-0 opacity-40" aria-hidden="true" />
          <div className="relative z-10 mx-auto grid max-w-7xl gap-8 rounded border border-white/10 bg-black/70 p-6 md:grid-cols-[0.9fr_1.1fr] md:p-8">
            <div>
              <p className="font-bold text-teal-200">Social Proof</p>
              <h2 className="font-display mt-3 text-5xl font-black leading-tight text-white">
                {socialProof.headline}
              </h2>
              <p className="mt-5 text-lg leading-8 text-stone-300">
                {socialProof.summary}
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="lift-card rounded border border-white/10 bg-white/[0.04] p-5">
                <p className="font-display text-5xl font-black text-amber-300">
                  {socialProof.recommendationRate}
                </p>
                <p className="mt-2 font-bold text-white">recommend on Facebook</p>
                <p className="mt-1 text-sm text-stone-400">
                  Based on {socialProof.reviewCount} public reviews.
                </p>
              </div>
              <div className="lift-card rounded border border-white/10 bg-white/[0.04] p-5">
                <p className="font-display text-5xl font-black text-teal-200">
                  {socialProof.facebookLikes}
                </p>
                <p className="mt-2 font-bold text-white">Facebook likes</p>
                <p className="mt-1 text-sm text-stone-400">
                  Plus {socialProof.visits} public check-ins.
                </p>
              </div>
              <div className="rounded border border-white/10 bg-white/[0.04] p-5 sm:col-span-2">
                <p className="text-sm font-black uppercase tracking-[0.18em] text-amber-200">
                  What listings point to
                </p>
                <ul className="mt-4 grid gap-3 text-sm font-bold text-stone-200 md:grid-cols-3">
                  {socialProof.highlights.map((highlight) => (
                    <li key={highlight} className="rounded bg-black/50 p-3">
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-bold text-teal-200">Local SEO Blog</p>
              <h2 className="font-display mt-2 text-5xl font-black text-white">
                Local guides that help Papa Smoke win nearby searches
              </h2>
            </div>
            <Link href="/blog" className="font-bold text-amber-200 hover:text-amber-100">
              Read all posts
            </Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="lift-card neon-panel overflow-hidden rounded border border-white/10 bg-white/[0.04] p-6 hover:border-teal-300/50"
              >
                <h3 className="text-xl font-black text-white">{post.title}</h3>
                <p className="mt-3 text-sm leading-6 text-stone-300">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="relative overflow-hidden border-y border-white/10 bg-black px-5 py-16">
          <div className="wave-lines absolute inset-0 opacity-50" aria-hidden="true" />
          <div className="relative z-10 mx-auto grid max-w-7xl gap-8 md:grid-cols-[0.95fr_1.05fr] md:items-center">
            <div className="lift-card image-zoom neon-panel relative aspect-[5/4] overflow-hidden rounded border border-white/10">
              <span className="smoke-ring" aria-hidden="true" />
              <Image
                src={demoImages.lounge}
                alt="Modern neon retail interior"
                fill
                unoptimized
                className="object-cover"
                sizes="(min-width: 768px) 45vw, 100vw"
              />
            </div>
            <div>
              <p className="font-bold text-teal-200">Plan Your Stop</p>
              <h2 className="font-display mt-3 text-5xl font-black leading-tight text-white">
                Browse online, visit the shop, or read a local guide first.
              </h2>
              <p className="mt-5 text-lg leading-8 text-stone-300">
                Papa Smoke is open daily on FM 1774 for shoppers near Pinehurst,
                Magnolia, Tomball, The Woodlands, and Montgomery County. The
                site pairs trust signals, local SEO pages, CMS publishing, and
                CRM lead capture with clear paths to directions and online
                shopping.
              </p>
              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                <a
                  href={businessInfo.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="pressable rounded border border-white/10 bg-white/[0.04] p-4 hover:border-amber-300/50"
                >
                  <MapPin className="size-5 text-amber-300" />
                  <p className="mt-3 font-black text-white">Directions</p>
                </a>
                <a
                  href={siteConfig.shopUrl}
                  className="pressable rounded border border-white/10 bg-white/[0.04] p-4 hover:border-teal-300/50"
                >
                  <ShoppingBag className="size-5 text-teal-200" />
                  <p className="mt-3 font-black text-white">Shop Online</p>
                </a>
                <Link
                  href="/blog"
                  className="pressable rounded border border-white/10 bg-white/[0.04] p-4 hover:border-amber-300/50"
                >
                  <Clock className="size-5 text-amber-300" />
                  <p className="mt-3 font-black text-white">Local Guides</p>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-amber-400 px-5 py-12 text-black">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-black uppercase tracking-[0.18em]">Papa Smoke</p>
              <h2 className="font-display mt-1 text-4xl font-black">
                Serving {businessInfo.areaServed.slice(0, 3).join(", ")}.
              </h2>
            </div>
            <Link
              href="/location"
              className="pressable inline-flex min-h-12 items-center justify-center rounded bg-black px-6 font-black text-white hover:bg-stone-900"
            >
              Get Directions
            </Link>
          </div>
        </section>
      </main>
    </PublicShell>
  );
}
