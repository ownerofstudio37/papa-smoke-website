import { savePost } from "@/app/actions";
import { ContentForm } from "@/components/content-form";

export default async function NewPostPage({
  searchParams,
}: PageProps<"/admin/posts/new">) {
  const params = await searchParams;
  const saveError = typeof params.error === "string" ? params.error : null;

  return (
    <div>
      <h1 className="text-4xl font-black text-white">New Blog Post</h1>
      <div className="mt-8">
        <ContentForm type="post" action={savePost} saveError={saveError} />
      </div>
    </div>
  );
}
