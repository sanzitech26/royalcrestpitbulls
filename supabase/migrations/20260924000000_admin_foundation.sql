-- Admin area: admin allowlist, content tables (puppies, testimonials, FAQs), contact inquiries, puppy photo bucket.
-- Run once in the Supabase SQL editor (or `supabase db push`), AFTER 20260923000000_contract_signatures.sql.
-- Then create the owner under Authentication > Users, turn off public sign-ups, and add them to `admins` (see the bottom).
--
-- Security model: the app only ever uses the anon key. Anonymous visitors can read published content and insert
-- inquiries/signatures; everything else needs a logged-in user who is listed in `admins`. Row Level Security enforces
-- this in the database, so it holds even if an admin page or server action forgets its own check.

-- Who is an admin ---------------------------------------------------------------------------------------------------

create table public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade
);

-- No policies and no grants: nobody can read or write this table directly, only is_admin() (security definer) sees it.
alter table public.admins enable row level security;
revoke all on table public.admins from anon, authenticated;

create function public.is_admin() returns boolean
language sql stable security definer set search_path = ''
as $$ select exists (select 1 from public.admins where user_id = auth.uid()) $$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

-- Puppies -----------------------------------------------------------------------------------------------------------

create table public.puppies (
  -- URL slug, e.g. /available-puppies/kobe
  id text primary key check (id ~ '^[a-z0-9]+(-[a-z0-9]+)*$' and char_length(id) <= 60),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 1 and 60),
  price integer not null check (price between 0 and 1000000),
  gender text not null check (gender in ('Male', 'Female')),
  date_of_birth date not null,
  breed text not null default 'Pitbull' check (char_length(breed) between 1 and 60),
  color text not null check (char_length(color) between 1 and 60),
  status text not null default 'available' check (status in ('available', 'reserved', 'sold')),
  -- a path under /public (seed data) or a full https URL (uploaded to the puppy-photos bucket)
  image text not null check (image ~ '^(/[^/]|https://)' and char_length(image) <= 500)
);

alter table public.puppies enable row level security;
revoke all on table public.puppies from anon, authenticated;
grant select on table public.puppies to anon, authenticated;
grant insert, update, delete on table public.puppies to authenticated;

create policy "public reads puppies that are not sold" on public.puppies
  for select to anon, authenticated using (status <> 'sold');
create policy "admins manage puppies" on public.puppies
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Testimonials ------------------------------------------------------------------------------------------------------

create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 1 and 100),
  location text not null check (char_length(location) between 1 and 100),
  puppy text not null check (char_length(puppy) between 1 and 60),
  rating integer not null check (rating between 1 and 5),
  quote text not null check (char_length(quote) between 10 and 1000),
  published boolean not null default true
);

alter table public.testimonials enable row level security;
revoke all on table public.testimonials from anon, authenticated;
grant select on table public.testimonials to anon, authenticated;
grant insert, update, delete on table public.testimonials to authenticated;

create policy "public reads published testimonials" on public.testimonials
  for select to anon, authenticated using (published);
create policy "admins manage testimonials" on public.testimonials
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- FAQ ---------------------------------------------------------------------------------------------------------------

-- `category` must match a category title in src/data/faqs.ts (that file also owns each category's icon and order).
create table public.faq_items (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  category text not null check (char_length(category) between 1 and 100),
  question text not null check (char_length(question) between 5 and 300),
  answer text not null check (char_length(answer) between 5 and 2000),
  sort_order integer not null default 0
);

alter table public.faq_items enable row level security;
revoke all on table public.faq_items from anon, authenticated;
grant select on table public.faq_items to anon, authenticated;
grant insert, update, delete on table public.faq_items to authenticated;

create policy "public reads faq items" on public.faq_items
  for select to anon, authenticated using (true);
create policy "admins manage faq items" on public.faq_items
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Contact inquiries -------------------------------------------------------------------------------------------------

create table public.inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 2 and 100),
  email text not null check (char_length(email) between 5 and 200),
  subject text not null check (subject in ('puppies', 'breeding', 'shipping', 'other')),
  message text not null check (char_length(message) between 5 and 2000),
  status text not null default 'new' check (status in ('new', 'handled'))
);

alter table public.inquiries enable row level security;
revoke all on table public.inquiries from anon, authenticated;

-- Visitors can send a message (only these four columns, so they can't pre-mark it handled) but never read anything.
grant insert (name, email, subject, message) on table public.inquiries to anon;
create policy "anyone can send an inquiry" on public.inquiries for insert to anon with check (true);

grant select, update, delete on table public.inquiries to authenticated;
create policy "admins manage inquiries" on public.inquiries
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Contract signatures (table created by the previous migration) ------------------------------------------------------

-- Read-only for admins: signed agreements are records, so there is deliberately no update or delete.
grant select on table public.contract_signatures to authenticated;
create policy "admins read signatures" on public.contract_signatures
  for select to authenticated using (public.is_admin());

-- Puppy photos ------------------------------------------------------------------------------------------------------

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('puppy-photos', 'puppy-photos', true, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do nothing;

-- The bucket is public, so anyone can view a photo by its URL; only admins can add, replace or remove files.
create policy "admins upload puppy photos" on storage.objects
  for insert to authenticated with check (bucket_id = 'puppy-photos' and public.is_admin());
create policy "admins replace puppy photos" on storage.objects
  for update to authenticated
  using (bucket_id = 'puppy-photos' and public.is_admin())
  with check (bucket_id = 'puppy-photos' and public.is_admin());
create policy "admins delete puppy photos" on storage.objects
  for delete to authenticated using (bucket_id = 'puppy-photos' and public.is_admin());

-- After creating the owner under Authentication > Users, make them an admin (replace the email) -----------------------
--
--   insert into public.admins (user_id) select id from auth.users where email = 'owner@example.com';
