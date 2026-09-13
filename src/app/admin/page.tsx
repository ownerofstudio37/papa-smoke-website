import Link from "next/link";
import { FilePlus2, Newspaper, Sparkles } from "lucide-react";

export default function AdminPage() {
  const cards = [
    {
      href: "/admin/posts/new",
      title: "New Blog Post",
      body: "Write manually or generate an SEO draft with Gemini.",
      icon: Newspaper,
    },
    {
      href: "/admin/pages/new",
      title: "New Page",
      body: "Build local SEO landing pages and publish them dynamically.",
      icon: FilePlus2,
    },
    {
      href: "/admin/ai-writer",
      title: "AI Writer",
      body: "Open the focused AI generation workspace.",
      icon: Sparkles,
    },
  ];

  return (
    <div>
      <h1 className="text-4xl font-black text-white">Dashboard</h1>
      <p className="mt-3 text-stone-400">
        Manage Papa Smoke pages, blog content, metadata, and AI-generated drafts.
      </p>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {cards.map(({ href, title, body, icon: Icon }) => (
          <Link key={href} href={href} className="rounded border border-white/10 bg-white/[0.04] p-6 hover:border-amber-300/50">
            <Icon className="size-7 text-amber-300" />
            <h2 className="mt-4 text-xl font-black text-white">{title}</h2>
            <p className="mt-2 leading-7 text-stone-300">{body}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
