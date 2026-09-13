import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import { PublicShell } from "@/components/public-shell";
import { businessInfo, defaultHomeSections, demoImages, siteConfig } from "@/lib/site";
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
            <div className="overflow-hidden rounded border border-white/10 bg-white/[0.04] shadow-2xl">
              <div className="relative aspect-[4/5]">
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
                    A polished smoke shop presence built to help local shoppers
                    find the store, browse guides, and shop online.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-stone-950/80 px-5 py-16">
          <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
            {defaultHomeSections.map((item, index) => (
              <article key={item.title} className="rounded border border-white/10 bg-black/35 p-6">
                <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded">
                  <Image
                    src={[demoImages.glass, demoImages.accessories, demoImages.localHelp][index]}
                    alt={`${item.title} at Papa Smoke`}
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="(min-width: 768px) 33vw, 100vw"
                  />
                </div>
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

        <section className="border-y border-white/10 bg-black px-5 py-16">
          <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-center">
            <div className="relative aspect-[5/4] overflow-hidden rounded">
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
              <p className="font-bold text-teal-200">Demo-Ready Visual System</p>
              <h2 className="mt-3 text-4xl font-black leading-tight text-white">
                A brand direction that feels close to the real Papa Smoke sign.
              </h2>
              <p className="mt-5 text-lg leading-8 text-stone-300">
                The new logo keeps the bold LED pink from the storefront photo,
                cleans up the lettering for web use, and adds a subtle smoke
                detail rising from the &quot;O&quot; for a memorable owner-facing concept.
              </p>
            </div>
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
