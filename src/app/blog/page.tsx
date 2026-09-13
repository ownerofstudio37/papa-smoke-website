import type { Metadata } from "next";
import Link from "next/link";
import { PublicShell } from "@/components/public-shell";
import { getPublishedPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Papa Smoke blog posts and local guides for smoke shop shoppers in Pinehurst, TX.",
};

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <PublicShell>
      <main className="mx-auto max-w-7xl px-5 py-20">
        <p className="font-bold text-teal-200">Papa Smoke Blog</p>
        <h1 className="mt-3 text-5xl font-black text-white">Smoke shop guides for Pinehurst.</h1>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="rounded border border-white/10 bg-white/[0.04] p-6 hover:border-amber-300/50"
            >
              <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-200">
                {post.published_at
                  ? new Date(post.published_at).toLocaleDateString("en-US")
                  : "Draft"}
              </p>
              <h2 className="mt-3 text-2xl font-black text-white">{post.title}</h2>
              <p className="mt-3 leading-7 text-stone-300">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </main>
    </PublicShell>
  );
}
