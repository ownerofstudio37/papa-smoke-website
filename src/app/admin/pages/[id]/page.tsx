import { notFound } from "next/navigation";
import { savePage } from "@/app/actions";
import { ContentForm } from "@/components/content-form";
import { createSupabaseServiceClient, type Page } from "@/lib/supabase";

export default async function EditPagePage({ params }: PageProps<"/admin/pages/[id]">) {
  const { id } = await params;
  const supabase = createSupabaseServiceClient();
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
        <ContentForm type="page" action={savePage} item={data as Page} />
      </div>
    </div>
  );
}
