import { redirect } from "next/navigation";
import { AdminNav } from "@/components/admin-nav";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export default async function AdminLayout({ children }: LayoutProps<"/admin">) {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return (
      <main className="min-h-screen bg-[#070707] p-6 text-stone-100">
        <div className="mx-auto max-w-2xl rounded border border-amber-300/25 bg-amber-300/10 p-6">
          <h1 className="text-2xl font-black text-white">Supabase setup required</h1>
          <p className="mt-3 leading-7 text-stone-300">
            Add `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and
            `SUPABASE_SERVICE_ROLE_KEY` to `.env.local` and Netlify before using
            the protected CMS.
          </p>
        </div>
      </main>
    );
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[#070707] text-stone-100 md:flex">
      <AdminNav />
      <main className="flex-1 p-5 md:p-8">{children}</main>
    </div>
  );
}
