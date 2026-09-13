import Link from "next/link";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import { PublicShell } from "@/components/public-shell";
import { businessInfo, defaultHomeSections, siteConfig } from "@/lib/site";
import { getPublishedPosts } from "@/lib/content";

export default async function Home() {
  const posts = (await getPublishedPosts()).slice(0, 3);

  return (
    <PublicShell>
      <main>
        <section className="mx-auto grid min-h-[78vh] max-w-7xl items-center gap-12 px-5 py-16 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="mb-5 inline-flex items-center gap-2 rounded border border-amber-400/25 bg-amber-400/10 px-3 py-2 text-sm font-bold text-amber-200">
              <MapPin className="size-4" />
              Smoke shop near Pinehurst and Magnolia, TX
            </p>
            <h1 className="max-w-4xl text-5xl font-black leading-[0.95] text-white md:text-7xl">
              Papa Smoke brings premium smoke shop essentials to FM 1774.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-stone-300">
              Explore glass, vapes, wraps, accessories, and local guidance from
              a modern smoke shop serving Pinehurst, Tomball, Magnolia, and
              nearby Montgomery County.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={siteConfig.shopUrl}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded bg-amber-400 px-6 font-black text-black hover:bg-amber-300"
              >
                Shop Online <ArrowRight className="size-4" />
              </a>
              <Link
                href="/location"
                className="inline-flex min-h-12 items-center justify-center rounded border border-white/15 px-6 font-bold text-white hover:border-teal-300"
              >
                Visit the Store
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="rounded border border-white/10 bg-white/[0.04] p-6 shadow-2xl">
              <div className="aspect-[4/5] rounded bg-[linear-gradient(135deg,#15100b,#312012_45%,#071d1b)] p-6">
                <div className="flex h-full flex-col justify-between border border-amber-300/30 p-6">
                  <Sparkles className="size-10 text-teal-200" />
                  <div>
                    <p className="text-sm font-black uppercase tracking-[0.25em] text-amber-200">
                      Local Goods
                    </p>
                    <h2 className="mt-3 text-4xl font-black text-white">
                      Glass. Vapes. Accessories.
                    </h2>
                    <p className="mt-4 text-stone-300">
                      Curated for daily shoppers and first-time visitors.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-stone-950/80 px-5 py-16">
          <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
            {defaultHomeSections.map((item) => (
              <article key={item.title} className="rounded border border-white/10 bg-black/35 p-6">
                <h2 className="text-2xl font-black text-white">{item.title}</h2>
                <p className="mt-3 leading-7 text-stone-300">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-bold text-teal-200">Local SEO Blog</p>
              <h2 className="mt-2 text-4xl font-black text-white">
                Guides from Papa Smoke
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
                className="rounded border border-white/10 bg-white/[0.04] p-6 hover:border-teal-300/50"
              >
                <h3 className="text-xl font-black text-white">{post.title}</h3>
                <p className="mt-3 text-sm leading-6 text-stone-300">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="bg-amber-400 px-5 py-12 text-black">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-black uppercase tracking-[0.18em]">Papa Smoke</p>
              <h2 className="mt-1 text-3xl font-black">
                Serving {businessInfo.areaServed.slice(0, 3).join(", ")}.
              </h2>
            </div>
            <Link
              href="/location"
              className="inline-flex min-h-12 items-center justify-center rounded bg-black px-6 font-black text-white hover:bg-stone-900"
            >
              Get Directions
            </Link>
          </div>
        </section>
      </main>
    </PublicShell>
  );
}
