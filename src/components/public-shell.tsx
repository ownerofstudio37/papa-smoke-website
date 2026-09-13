import Link from "next/link";
import { ShoppingBag, MapPin } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/site";

export function PublicShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#070707] text-stone-100">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/75 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded bg-amber-500 text-lg font-black text-black">
              PS
            </span>
            <span className="text-lg font-black tracking-wide">Papa Smoke</span>
          </Link>
          <div className="hidden items-center gap-7 text-sm font-semibold text-stone-300 md:flex">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/location"
              className="hidden size-11 place-items-center rounded border border-white/10 text-stone-200 hover:border-teal-300 md:grid"
              aria-label="Get directions"
            >
              <MapPin className="size-5" />
            </Link>
            <a
              href={siteConfig.shopUrl}
              className="inline-flex min-h-11 items-center gap-2 rounded bg-teal-300 px-4 text-sm font-black text-black hover:bg-teal-200"
            >
              <ShoppingBag className="size-4" />
              Shop Online
            </a>
          </div>
        </nav>
      </header>
      {children}
      <footer className="border-t border-white/10 bg-black px-5 py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-stone-400 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Papa Smoke. Pinehurst, TX.</p>
          <div className="flex gap-5">
            <Link href="/admin" className="hover:text-white">
              Admin
            </Link>
            <Link href="/location" className="hover:text-white">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
