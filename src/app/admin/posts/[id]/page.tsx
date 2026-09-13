import { notFound } from "next/navigation";
import { savePost } from "@/app/actions";
import { ContentForm } from "@/components/content-form";
import { createSupabaseServiceClient, type Post } from "@/lib/supabase";

export default async function EditPostPage({ params }: PageProps<"/admin/posts/[id]">) {
  const { id } = await params;
  const supabase = createSupabaseServiceClient();
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
        <ContentForm type="post" action={savePost} item={data as Post} />
      </div>
    </div>
  );
}
