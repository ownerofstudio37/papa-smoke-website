import type { Metadata } from "next";
import { login } from "@/app/actions";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function LoginPage({
  searchParams,
}: PageProps<"/login">) {
  const params = await searchParams;
  const error = typeof params.error === "string" ? params.error : null;

  return (
    <main className="grid min-h-screen place-items-center bg-[#070707] px-5 text-stone-100">
      <form action={login} className="w-full max-w-md rounded border border-white/10 bg-black p-6">
        <h1 className="text-3xl font-black text-white">Papa Smoke Admin</h1>
        <p className="mt-2 text-sm text-stone-400">
          Sign in with a Supabase Auth admin account.
        </p>
        {error ? (
          <p className="mt-4 rounded border border-red-400/25 bg-red-500/10 p-3 text-sm text-red-100">
            {error}
          </p>
        ) : null}
        <label className="mt-6 grid gap-2 text-sm font-bold text-stone-300">
          Email
          <input
            type="email"
            name="email"
            required
            className="min-h-12 rounded border border-white/10 bg-black px-4 text-white outline-none focus:border-amber-300"
          />
        </label>
        <label className="mt-4 grid gap-2 text-sm font-bold text-stone-300">
          Password
          <input
            type="password"
            name="password"
            required
            className="min-h-12 rounded border border-white/10 bg-black px-4 text-white outline-none focus:border-amber-300"
          />
        </label>
        <button className="mt-6 min-h-12 w-full rounded bg-amber-400 px-6 font-black text-black hover:bg-amber-300">
          Sign In
        </button>
      </form>
    </main>
  );
}
