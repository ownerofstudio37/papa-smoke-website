import { notFound } from "next/navigation";
import { savePost } from "@/app/actions";
import { ContentForm } from "@/components/content-form";
import { type Post } from "@/lib/supabase";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export default async function EditPostPage({
  params,
  searchParams,
}: PageProps<"/admin/posts/[id]">) {
  const { id } = await params;
  const query = await searchParams;
  const saveError = typeof query.error === "string" ? query.error : null;
  const supabase = await createSupabaseServerClient();
  const { data } = supabase
    ? await supabase.from("posts").select("*").eq("id", id).single()
    : { data: null };

  if (!data) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-4xl font-black text-white">Edit Blog Post</h1>
      <div className="mt-8">
        <ContentForm
          type="post"
          action={savePost}
          item={data as Post}
          saveError={saveError}
        />
      </div>
    </div>
  );
}
