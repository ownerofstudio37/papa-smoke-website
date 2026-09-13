import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PublicShell } from "@/components/public-shell";
import { getPostBySlug, getPublishedPosts } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.meta_title || post.title,
    description: post.meta_description || post.excerpt || undefined,
    alternates: {
      canonical: `${siteConfig.url}/blog/${post.slug}`,
    },
    openGraph: {
      title: post.meta_title || post.title,
      description: post.meta_description || post.excerpt || undefined,
      type: "article",
      url: `${siteConfig.url}/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <PublicShell>
      <article className="mx-auto max-w-4xl px-5 py-20">
        <p className="font-bold text-amber-200">Papa Smoke Blog</p>
        <h1 className="mt-3 text-5xl font-black leading-tight text-white">{post.title}</h1>
        {post.excerpt ? <p className="mt-5 text-xl leading-8 text-stone-300">{post.excerpt}</p> : null}
        <div
          className="content-html mt-10"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </PublicShell>
  );
}
