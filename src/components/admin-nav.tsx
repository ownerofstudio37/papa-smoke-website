import Link from "next/link";
import { ContactRound, FileText, LayoutDashboard, LogOut, Newspaper, Sparkles } from "lucide-react";
import { logout } from "@/app/actions";

export function AdminNav() {
  const links = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/posts", label: "Posts", icon: Newspaper },
    { href: "/admin/pages", label: "Pages", icon: FileText },
    { href: "/admin/crm", label: "CRM", icon: ContactRound },
    { href: "/admin/ai-writer", label: "AI Writer", icon: Sparkles },
  ];

  return (
    <aside className="border-r border-white/10 bg-black p-5 md:min-h-screen md:w-64">
      <Link href="/admin" className="text-xl font-black text-white">
        Papa Smoke CMS
      </Link>
      <nav className="mt-8 grid gap-2">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex min-h-11 items-center gap-3 rounded px-3 text-sm font-bold text-stone-300 hover:bg-white/10 hover:text-white"
          >
            <Icon className="size-4" />
            {label}
          </Link>
        ))}
      </nav>
      <form action={logout} className="mt-8">
        <button className="flex min-h-11 w-full items-center gap-3 rounded px-3 text-sm font-bold text-stone-300 hover:bg-white/10 hover:text-white">
          <LogOut className="size-4" />
          Sign Out
        </button>
      </form>
    </aside>
  );
}
