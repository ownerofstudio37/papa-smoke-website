"use server";

import { GoogleGenAI } from "@google/genai";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";
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

  return supabase;
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
    return createDemoDraft(prompt, type);
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
  const jsonText = text
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```$/i, "")
    .trim();
  let parsed;

  try {
    parsed = JSON.parse(jsonText);
  } catch {
    return createDraftFromText(prompt, text, type);
  }

  return {
    title: String(parsed.title || ""),
    slug: slugify(String(parsed.slug || parsed.title || "")),
    excerpt: String(parsed.excerpt || ""),
    meta_title: String(parsed.meta_title || parsed.title || ""),
    meta_description: String(parsed.meta_description || parsed.excerpt || ""),
    content: String(parsed.content || ""),
  };
}

function createDemoDraft(prompt: string, type: "blog" | "page") {
  const topic = prompt
    .replace(/^.*about:\s*/i, "")
    .replace(/\.$/, "")
    .trim();
  const title =
    type === "blog"
      ? `${topic || "Papa Smoke"} Guide for Pinehurst Shoppers`
      : `${topic || "Smoke Shop Guide"} in Pinehurst and Magnolia`;
  const excerpt = `A helpful local guide from Papa Smoke for shoppers near Pinehurst, Magnolia, Tomball, and Montgomery County.`;

  return {
    title,
    slug: slugify(title),
    excerpt,
    meta_title: title,
    meta_description: excerpt,
    content: `<h2>${title}</h2><p>Papa Smoke helps local shoppers near Pinehurst and Magnolia find glass, vapes, accessories, wraps, papers, cleaners, and everyday smoke shop essentials without making the visit complicated.</p><h3>What shoppers can expect</h3><ul><li>A clean local shop at ${businessInfo.streetAddress} in ${businessInfo.city}, ${businessInfo.region}</li><li>Helpful guidance for comparing products and accessories</li><li>Convenient access for Pinehurst, Tomball, Magnolia, and nearby Montgomery County</li></ul><p>Use this demo draft as a starting point, then add owner-approved product details, photos, and internal links before publishing.</p><p>Visit Papa Smoke in-store or use the shop online button to browse available items.</p>`,
  };
}

function createDraftFromText(prompt: string, text: string, type: "blog" | "page") {
  const fallback = createDemoDraft(prompt, type);

  return {
    ...fallback,
    content: `<h2>${fallback.title}</h2><p>${escapeHtml(text).slice(0, 2500)}</p>`,
  };
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
