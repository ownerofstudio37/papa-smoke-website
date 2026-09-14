"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { createSupabaseServiceClient } from "@/lib/supabase";
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

export async function createLead(formData: FormData) {
  const honeypot = field(formData, "website");

  if (honeypot) {
    redirect("/location?sent=1");
  }

  const name = field(formData, "name");
  const email = field(formData, "email");
  const phone = field(formData, "phone");
  const subject = field(formData, "subject") || "Website contact";
  const message = field(formData, "message");

  if (!name || !message || (!email && !phone)) {
    redirect(
      `/location?error=${encodeURIComponent("Add your name, message, and either an email or phone number.")}`,
    );
  }

  const serviceSupabase = createSupabaseServiceClient();
  const supabase = serviceSupabase || (await createSupabaseServerClient());

  if (!supabase) {
    redirect(`/location?error=${encodeURIComponent("Contact form is not configured yet.")}`);
  }

  const payload = {
    name,
    email: email || null,
    phone: phone || null,
    subject,
    message,
    source: "location_page",
    status: "new",
    priority: "normal",
    updated_at: new Date().toISOString(),
  };

  const result = serviceSupabase
    ? await serviceSupabase.from("leads").insert(payload).select("id").single()
    : await supabase.from("leads").insert(payload);

  const { data, error } = result;

  if (error) {
    redirect(`/location?error=${encodeURIComponent(error.message)}`);
  }

  if (serviceSupabase && data?.id) {
    await serviceSupabase.from("lead_events").insert({
      lead_id: data.id,
      event_type: "form_submission",
      body: message,
      metadata: {
        subject,
        source: "location_page",
      },
    });
  }

  revalidatePath("/admin/crm");
  redirect("/location?sent=1");
}

export async function updateLead(formData: FormData) {
  const supabase = await requireAdminClient();
  const id = field(formData, "id");
  const status = field(formData, "status");
  const priority = field(formData, "priority");
  const adminNotes = field(formData, "admin_notes");
  const eventBody = field(formData, "event_body");
  const lastContacted = field(formData, "last_contacted_at");

  const { error } = await supabase
    .from("leads")
    .update({
      status,
      priority,
      admin_notes: adminNotes || null,
      last_contacted_at: lastContacted || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    redirect(`/admin/crm/${id}?error=${encodeURIComponent(error.message)}`);
  }

  if (eventBody) {
    await supabase.from("lead_events").insert({
      lead_id: id,
      event_type: "note",
      body: eventBody,
      metadata: {},
    });
  }

  revalidatePath("/admin/crm");
  revalidatePath(`/admin/crm/${id}`);
  redirect(`/admin/crm/${id}?saved=1`);
}
