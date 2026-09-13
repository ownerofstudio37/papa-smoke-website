import type { MetadataRoute } from "next";
import { getPublishedPages, getPublishedPosts } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, pages] = await Promise.all([getPublishedPosts(), getPublishedPages()]);
  const now = new Date();

  const staticRoutes = ["", "/about", "/location", "/blog"].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: now,
  }));

  return [
    ...staticRoutes,
    ...posts.map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: new Date(post.updated_at),
    })),
    ...pages.map((page) => ({
      url: `${siteConfig.url}/${page.slug}`,
      lastModified: new Date(page.updated_at),
    })),
  ];
}
