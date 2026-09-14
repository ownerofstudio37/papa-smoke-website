# Papa Smoke Website

Modern Next.js website for Papa Smoke, a local smoke shop in Pinehurst, TX.

## Stack

- Next.js App Router
- Tailwind CSS
- Supabase Auth and database
- Gemini API server actions for AI blog/page drafts
- Netlify deployment with `@netlify/plugin-nextjs`

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Copy the environment example:

```bash
cp .env.example .env.local
```

3. Add real values for:

```bash
NEXT_PUBLIC_SITE_URL
NEXT_PUBLIC_SHOPIFY_URL
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
GEMINI_API_KEY
RESEND_API_KEY
ADMIN_NOTIFY_EMAIL
FROM_EMAIL
```

4. Run `supabase/schema.sql` in the Supabase SQL editor.

5. Create an admin user in Supabase Auth. The trigger creates the matching row in `public.users`.

6. Start the app:

```bash
npm run dev
```

## CMS

- `/admin` is protected by Supabase Auth.
- `/admin/posts` manages blog posts stored in `public.posts`.
- `/admin/pages` manages custom dynamic pages stored in `public.pages`.
- New posts and pages include a Gemini-powered topic prompt that populates title, slug, metadata, excerpt, and HTML content.
- The editor supports rich formatting and a text-only mode for simple WordPress-style edits.

## CRM

- `/admin/crm` lists leads captured from the public Location page contact form.
- Each lead has status, priority, internal notes, last contacted date, and a timeline.
- Resend is not activated yet, but the env placeholders are included for future owner/admin notification emails.

## SEO

- Global metadata and OpenGraph are configured in `src/app/layout.tsx`.
- Local Business schema is injected for Papa Smoke.
- Dynamic metadata is generated for blog posts and CMS pages.
- `/sitemap.xml` includes static routes, published posts, and published pages.
- `/robots.txt` blocks admin/login routes.

## Netlify

Set the same environment variables in Netlify. The included `netlify.toml` runs `npm run build`, publishes `.next`, and loads the Next.js Netlify plugin.
