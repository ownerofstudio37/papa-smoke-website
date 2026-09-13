import "server-only";
import { Page, Post, createSupabaseServiceClient } from "@/lib/supabase";

const fallbackPosts: Post[] = [
  {
    id: "local-guide",
    title: "What to Look for in a Pinehurst Smoke Shop",
    slug: "pinehurst-smoke-shop-guide",
    excerpt:
      "A quick local guide to choosing glass, vapes, and accessories with confidence.",
    content:
      "<h2>Start with a helpful local shop</h2><p>A good smoke shop should make it easy to compare products, ask questions, and find the right accessory without pressure. Papa Smoke serves Pinehurst, Tomball, Magnolia, and nearby Montgomery County with practical guidance and a clean modern shop experience.</p><h2>What matters most</h2><ul><li>Clear product categories</li><li>Quality glass and accessories</li><li>Friendly staff who can explain options</li><li>Convenient local access</li></ul>",
    meta_title: "Pinehurst Smoke Shop Guide",
    meta_description:
      "Learn what to look for in a Pinehurst, TX smoke shop and how Papa Smoke helps local shoppers choose glass, vapes, and accessories.",
    status: "published",
    featured_image_url: null,
    published_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export async function getPublishedPosts() {
  const supabase = createSupabaseServiceClient();

  if (!supabase) {
    return fallbackPosts;
  }

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) {
    console.error(error);
    return fallbackPosts;
  }

  return (data || []) as Post[];
}

export async function getPostBySlug(slug: string) {
  const supabase = createSupabaseServiceClient();

  if (!supabase) {
    return fallbackPosts.find((post) => post.slug === slug) || null;
  }

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error) {
    return null;
  }

  return data as Post;
}

export async function getPublishedPages() {
  const supabase = createSupabaseServiceClient();

  if (!supabase) {
    return [] as Page[];
  }

  const { data, error } = await supabase
    .from("pages")
    .select("*")
    .eq("status", "published")
    .order("updated_at", { ascending: false });

  if (error) {
    console.error(error);
    return [] as Page[];
  }

  return (data || []) as Page[];
}

export async function getPageBySlug(slug: string) {
  const supabase = createSupabaseServiceClient();

  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("pages")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error) {
    return null;
  }

  return data as Page;
}
