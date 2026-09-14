create extension if not exists pgcrypto;

create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  role text not null default 'admin' check (role in ('admin')),
  created_at timestamptz not null default now()
);

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content text not null default '',
  meta_title text,
  meta_description text,
  featured_image_url text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.pages (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  content text not null default '',
  meta_title text,
  meta_description text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  phone text,
  company text,
  subject text,
  message text not null,
  source text not null default 'website',
  status text not null default 'new' check (status in ('new', 'contacted', 'qualified', 'won', 'lost', 'spam')),
  priority text not null default 'normal' check (priority in ('low', 'normal', 'high')),
  admin_notes text,
  last_contacted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.lead_events (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  event_type text not null check (event_type in ('note', 'email', 'call', 'status_change', 'form_submission')),
  body text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.users enable row level security;
alter table public.posts enable row level security;
alter table public.pages enable row level security;
alter table public.leads enable row level security;
alter table public.lead_events enable row level security;

drop policy if exists "Admins can read users" on public.users;
create policy "Admins can read users"
  on public.users for select
  using (auth.uid() = id);

drop policy if exists "Published posts are public" on public.posts;
create policy "Published posts are public"
  on public.posts for select
  using (status = 'published');

drop policy if exists "Admins manage posts" on public.posts;
create policy "Admins manage posts"
  on public.posts for all
  using (exists (select 1 from public.users where id = auth.uid() and role = 'admin'))
  with check (exists (select 1 from public.users where id = auth.uid() and role = 'admin'));

drop policy if exists "Published pages are public" on public.pages;
create policy "Published pages are public"
  on public.pages for select
  using (status = 'published');

drop policy if exists "Admins manage pages" on public.pages;
create policy "Admins manage pages"
  on public.pages for all
  using (exists (select 1 from public.users where id = auth.uid() and role = 'admin'))
  with check (exists (select 1 from public.users where id = auth.uid() and role = 'admin'));

drop policy if exists "Anyone can submit website leads" on public.leads;
create policy "Anyone can submit website leads"
  on public.leads for insert
  with check (true);

drop policy if exists "Admins manage leads" on public.leads;
create policy "Admins manage leads"
  on public.leads for all
  using (exists (select 1 from public.users where id = auth.uid() and role = 'admin'))
  with check (exists (select 1 from public.users where id = auth.uid() and role = 'admin'));

drop policy if exists "Anyone can create lead submission events" on public.lead_events;
create policy "Anyone can create lead submission events"
  on public.lead_events for insert
  with check (event_type = 'form_submission');

drop policy if exists "Admins manage lead events" on public.lead_events;
create policy "Admins manage lead events"
  on public.lead_events for all
  using (exists (select 1 from public.users where id = auth.uid() and role = 'admin'))
  with check (exists (select 1 from public.users where id = auth.uid() and role = 'admin'));

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create index if not exists posts_slug_idx on public.posts(slug);
create index if not exists posts_status_published_idx on public.posts(status, published_at desc);
create index if not exists pages_slug_idx on public.pages(slug);
create index if not exists pages_status_idx on public.pages(status);
create index if not exists leads_status_created_idx on public.leads(status, created_at desc);
create index if not exists leads_email_idx on public.leads(email);
create index if not exists lead_events_lead_id_idx on public.lead_events(lead_id, created_at desc);
