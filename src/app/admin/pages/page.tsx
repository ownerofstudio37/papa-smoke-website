import Link from "next/link";
import { Plus } from "lucide-react";
import { type Page } from "@/lib/supabase";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export default async function AdminPagesPage() {
  const supabase = await createSupabaseServerClient();
  const { data } = supabase
    ? await supabase.from("pages").select("*").order("updated_at", { ascending: false })
    : { data: [] };
  const pages = (data || []) as Page[];

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-black text-white">Pages</h1>
          <p className="mt-2 text-stone-400">Create dynamic local SEO pages and guides.</p>
        </div>
        <Link href="/admin/pages/new" className="inline-flex min-h-11 items-center justify-center gap-2 rounded bg-amber-400 px-5 font-black text-black">
          <Plus className="size-4" />
          New Page
        </Link>
      </div>
      <div className="mt-8 overflow-hidden rounded border border-white/10">
        {pages.map((page) => (
          <Link key={page.id} href={`/admin/pages/${page.id}`} className="grid gap-2 border-b border-white/10 bg-black p-5 hover:bg-white/[0.04] md:grid-cols-[1fr_auto]">
            <div>
              <h2 className="font-black text-white">{page.title}</h2>
              <p className="mt-1 text-sm text-stone-400">/{page.slug}</p>
            </div>
            <span className="text-sm font-bold text-amber-200">{page.status}</span>
          </Link>
        ))}
        {!pages.length ? <p className="bg-black p-5 text-stone-400">No pages yet.</p> : null}
      </div>
    </div>
  );
}
