import { notFound } from "next/navigation";
import { savePage } from "@/app/actions";
import { ContentForm } from "@/components/content-form";
import { type Page } from "@/lib/supabase";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export default async function EditPagePage({
  params,
  searchParams,
}: PageProps<"/admin/pages/[id]">) {
  const { id } = await params;
  const query = await searchParams;
  const saveError = typeof query.error === "string" ? query.error : null;
  const supabase = await createSupabaseServerClient();
  const { data } = supabase
    ? await supabase.from("pages").select("*").eq("id", id).single()
    : { data: null };

  if (!data) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-4xl font-black text-white">Edit Page</h1>
      <div className="mt-8">
        <ContentForm
          type="page"
          action={savePage}
          item={data as Page}
          saveError={saveError}
        />
      </div>
    </div>
  );
}
