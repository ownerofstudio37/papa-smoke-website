"use server";

import { GoogleGenAI } from "@google/genai";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { createSupabaseServiceClient } from "@/lib/supabase";
import { businessInfo, siteConfig } from "@/lib/site";

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function field(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

async function requireAdminClient() {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return createSupabaseServiceClient();
}

export async function login(formData: FormData) {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    redirect("/login?error=Supabase%20is%20not%20configured");
  }

  const email = field(formData, "email");
  const password = field(formData, "password");
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(`/login?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/admin");
}

export async function logout() {
  const supabase = await createSupabaseServerClient();
  await supabase?.auth.signOut();
  redirect("/login");
}

export async function savePost(formData: FormData) {
  const supabase = await requireAdminClient();

  if (!supabase) {
    throw new Error("Supabase service role key is not configured.");
  }

  const id = field(formData, "id");
  const title = field(formData, "title");
  const slug = slugify(field(formData, "slug") || title);
  const status = field(formData, "status") || "draft";

  const payload = {
    title,
    slug,
    excerpt: field(formData, "excerpt"),
    content: field(formData, "content"),
    meta_title: field(formData, "meta_title") || title,
    meta_description: field(formData, "meta_description"),
    featured_image_url: field(formData, "featured_image_url") || null,
    status,
    published_at: status === "published" ? new Date().toISOString() : null,
    updated_at: new Date().toISOString(),
  };

  const query = id
    ? supabase.from("posts").update(payload).eq("id", id)
    : supabase.from("posts").insert(payload);

  const { error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  redirect("/admin/posts");
}

export async function savePage(formData: FormData) {
  const supabase = await requireAdminClient();

  if (!supabase) {
    throw new Error("Supabase service role key is not configured.");
  }

  const id = field(formData, "id");
  const title = field(formData, "title");
  const slug = slugify(field(formData, "slug") || title);
  const status = field(formData, "status") || "draft";

  const payload = {
    title,
    slug,
    content: field(formData, "content"),
    meta_title: field(formData, "meta_title") || title,
    meta_description: field(formData, "meta_description"),
    status,
    updated_at: new Date().toISOString(),
  };

  const query = id
    ? supabase.from("pages").update(payload).eq("id", id)
    : supabase.from("pages").insert(payload);

  const { error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
  revalidatePath(`/${slug}`);
  redirect("/admin/pages");
}

export async function generateBlogDraft(topic: string) {
  return generateGeminiContent(
    `Write a local SEO blog post for Papa Smoke in Pinehurst, TX about: ${topic}.`,
    "blog",
  );
}

export async function generatePageDraft(topic: string) {
  return generateGeminiContent(
    `Create a local SEO landing page for Papa Smoke in Pinehurst, TX about: ${topic}.`,
    "page",
  );
}

async function generateGeminiContent(prompt: string, type: "blog" | "page") {
  const key = process.env.GEMINI_API_KEY;

  if (!key) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }

  const ai = new GoogleGenAI({ apiKey: key });
  const response = await ai.models.generateContent({
    model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
    contents: `${prompt}

Return only valid JSON with these keys: title, slug, excerpt, meta_title, meta_description, content.
The content value must be clean semantic HTML using h2, h3, p, ul, li, and strong tags.
Optimize for search intent, but avoid medical claims, legality claims, cannabis intoxication claims, or age-gated product guarantees.
Mention ${businessInfo.name}, ${businessInfo.city}, ${businessInfo.region}, and nearby areas naturally.
Include a soft call to action to visit the store or shop online at ${siteConfig.shopUrl}.
For ${type === "blog" ? "blog posts" : "pages"}, keep the writing helpful and locally specific.`,
  });

  const text = response.text || "{}";
  const jsonText = text.replace(/^```json\s*/i, "").replace(/```$/i, "").trim();
  const parsed = JSON.parse(jsonText);

  return {
    title: String(parsed.title || ""),
    slug: slugify(String(parsed.slug || parsed.title || "")),
    excerpt: String(parsed.excerpt || ""),
    meta_title: String(parsed.meta_title || parsed.title || ""),
    meta_description: String(parsed.meta_description || parsed.excerpt || ""),
    content: String(parsed.content || ""),
  };
}
