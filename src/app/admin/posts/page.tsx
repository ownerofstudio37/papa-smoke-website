import Link from "next/link";
import { Plus } from "lucide-react";
import { createSupabaseServiceClient, type Post } from "@/lib/supabase";

export default async function AdminPostsPage() {
  const supabase = createSupabaseServiceClient();
  const { data } = supabase
    ? await supabase.from("posts").select("*").order("updated_at", { ascending: false })
    : { data: [] };
  const posts = (data || []) as Post[];

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-black text-white">Blog Posts</h1>
          <p className="mt-2 text-stone-400">Create and edit SEO posts for the public blog.</p>
        </div>
        <Link href="/admin/posts/new" className="inline-flex min-h-11 items-center justify-center gap-2 rounded bg-amber-400 px-5 font-black text-black">
          <Plus className="size-4" />
          New Post
        </Link>
      </div>
      <div className="mt-8 overflow-hidden rounded border border-white/10">
        {posts.map((post) => (
          <Link key={post.id} href={`/admin/posts/${post.id}`} className="grid gap-2 border-b border-white/10 bg-black p-5 hover:bg-white/[0.04] md:grid-cols-[1fr_auto]">
            <div>
              <h2 className="font-black text-white">{post.title}</h2>
              <p className="mt-1 text-sm text-stone-400">/blog/{post.slug}</p>
            </div>
            <span className="text-sm font-bold text-amber-200">{post.status}</span>
          </Link>
        ))}
        {!posts.length ? <p className="bg-black p-5 text-stone-400">No posts yet.</p> : null}
      </div>
    </div>
  );
}
