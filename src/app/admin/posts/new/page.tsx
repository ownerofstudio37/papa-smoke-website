import { savePost } from "@/app/actions";
import { ContentForm } from "@/components/content-form";

export default function NewPostPage() {
  return (
    <div>
      <h1 className="text-4xl font-black text-white">New Blog Post</h1>
      <div className="mt-8">
        <ContentForm type="post" action={savePost} />
      </div>
    </div>
  );
}
