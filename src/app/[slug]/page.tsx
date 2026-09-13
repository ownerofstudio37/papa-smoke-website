import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PublicShell } from "@/components/public-shell";
import { getPageBySlug, getPublishedPages } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export async function generateStaticParams() {
  const pages = await getPublishedPages();
  return pages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) {
    return {};
  }

  return {
    title: page.meta_title || page.title,
    description: page.meta_description || undefined,
    alternates: {
      canonical: `${siteConfig.url}/${page.slug}`,
    },
    openGraph: {
      title: page.meta_title || page.title,
      description: page.meta_description || undefined,
      url: `${siteConfig.url}/${page.slug}`,
    },
  };
}

export default async function DynamicPage({ params }: PageProps<"/[slug]">) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) {
    notFound();
  }

  return (
    <PublicShell>
      <article className="mx-auto max-w-4xl px-5 py-20">
        <p className="font-bold text-teal-200">Papa Smoke Guide</p>
        <h1 className="mt-3 text-5xl font-black leading-tight text-white">{page.title}</h1>
        <div
          className="content-html mt-10"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      </article>
    </PublicShell>
  );
}
