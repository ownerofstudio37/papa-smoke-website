import Link from "next/link";
import { FileText, Newspaper } from "lucide-react";

export default function AiWriterPage() {
  return (
    <div>
      <h1 className="text-4xl font-black text-white">AI Writer</h1>
      <p className="mt-3 max-w-2xl leading-7 text-stone-400">
        Generate SEO-first drafts with Gemini, then review the content in the
        CMS editor before publishing to Supabase.
      </p>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <Link href="/admin/posts/new" className="rounded border border-white/10 bg-white/[0.04] p-6 hover:border-teal-300/50">
          <Newspaper className="size-8 text-teal-200" />
          <h2 className="mt-4 text-2xl font-black text-white">Generate Blog Post</h2>
          <p className="mt-3 leading-7 text-stone-300">
            Turn a topic into a structured blog post with title, excerpt,
            metadata, slug, and formatted HTML.
          </p>
        </Link>
        <Link href="/admin/pages/new" className="rounded border border-white/10 bg-white/[0.04] p-6 hover:border-amber-300/50">
          <FileText className="size-8 text-amber-300" />
          <h2 className="mt-4 text-2xl font-black text-white">Generate Page</h2>
          <p className="mt-3 leading-7 text-stone-300">
            Build local landing pages and evergreen guides that publish at
            clean dynamic URLs.
          </p>
        </Link>
      </div>
    </div>
  );
}
