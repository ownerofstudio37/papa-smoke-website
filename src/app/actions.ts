"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { slugify } from "@/lib/ai-drafts";


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
    const target = id ? `/admin/posts/${id}` : "/admin/posts/new";
    redirect(`${target}?error=${encodeURIComponent(error.message)}`);
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
    const target = id ? `/admin/pages/${id}` : "/admin/pages/new";
    redirect(`${target}?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/");
  revalidatePath(`/${slug}`);
  redirect("/admin/pages");
}
