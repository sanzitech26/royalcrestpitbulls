-- RoyalCrest Pitbulls: complete Supabase setup (contract signatures + admin area + inquiries + optional sample content).
--
-- Paste this WHOLE file into the Supabase SQL editor and click Run. It is safe to run more than once: it never drops
-- data, and everything it creates is skipped or replaced if it already exists. Do NOT also run the individual files in
-- supabase/migrations; this file already contains all of them (20260923 .. 20260925).
--
-- Order of events: run this file, create your login (Authentication > Users > Add user), turn off public sign-ups
-- (Authentication > Sign In / Providers > "Allow new users to sign up" off), then make that user an admin (see
-- "ADDING AND REMOVING ADMINS" at the bottom). Admins are never created by this file itself.
--
-- Security model: the website only ever uses the anon key. Anonymous visitors can read published content and insert
-- inquiries / contract signatures; everything else needs a logged-in user who is listed in `admins`. Row Level Security
-- enforces this in the database itself.

begin;

-- STEP 1 - Contract signatures (used by /contract) ------------------------------------------------------------------

create table if not exists public.contract_signatures (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  puppy text not null check (char_length(puppy) between 1 and 100),
  full_name text not null check (char_length(full_name) between 2 and 100),
  email text not null check (char_length(email) between 5 and 200),
  phone text not null check (char_length(phone) between 7 and 30),
  delivery_address text not null check (char_length(delivery_address) between 2 and 300),
  accepted boolean not null check (accepted),
  policy_version text not null check (char_length(policy_version) between 1 and 20),
  -- PNG data URL of the drawn signature
  signature text not null check (signature like 'data:image/png;base64,%' and char_length(signature) <= 150000)
);

alter table public.contract_signatures enable row level security;

-- Visitors can sign (insert) but never read anyone's data. Admins can read (never edit or delete: these are records).
revoke all on table public.contract_signatures from anon, authenticated;
grant insert on table public.contract_signatures to anon;
grant select on table public.contract_signatures to authenticated;

drop policy if exists "anyone can sign" on public.contract_signatures;
create policy "anyone can sign" on public.contract_signatures for insert to anon with check (true);

-- STEP 2 - Who is an admin ------------------------------------------------------------------------------------------

create table if not exists public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade
);

-- No policies and no grants: nobody can read or write this table directly, only is_admin() (security definer) sees it.
alter table public.admins enable row level security;
revoke all on table public.admins from anon, authenticated;

create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = ''
as $$ select exists (select 1 from public.admins where user_id = auth.uid()) $$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

drop policy if exists "admins read signatures" on public.contract_signatures;
create policy "admins read signatures" on public.contract_signatures
  for select to authenticated using (public.is_admin());

-- STEP 3 - Puppies, testimonials, FAQ -------------------------------------------------------------------------------

create table if not exists public.puppies (
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
  -- a path under /public (sample data) or a full https URL (uploaded to the puppy-photos bucket)
  image text not null check (image ~ '^(/[^/]|https://)' and char_length(image) <= 500)
);

alter table public.puppies enable row level security;
revoke all on table public.puppies from anon, authenticated;
grant select on table public.puppies to anon, authenticated;
grant insert, update, delete on table public.puppies to authenticated;

drop policy if exists "public reads puppies that are not sold" on public.puppies;
create policy "public reads puppies that are not sold" on public.puppies
  for select to anon, authenticated using (status <> 'sold');
drop policy if exists "admins manage puppies" on public.puppies;
create policy "admins manage puppies" on public.puppies
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

create table if not exists public.testimonials (
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

drop policy if exists "public reads published testimonials" on public.testimonials;
create policy "public reads published testimonials" on public.testimonials
  for select to anon, authenticated using (published);
drop policy if exists "admins manage testimonials" on public.testimonials;
create policy "admins manage testimonials" on public.testimonials
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- `category` must match a category title in src/data/faqs.ts (that file also owns each category's icon and order).
create table if not exists public.faq_items (
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

drop policy if exists "public reads faq items" on public.faq_items;
create policy "public reads faq items" on public.faq_items
  for select to anon, authenticated using (true);
drop policy if exists "admins manage faq items" on public.faq_items;
create policy "admins manage faq items" on public.faq_items
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- STEP 4 - Contact inquiries (general /contact form + the per-puppy /contact/<puppy> form) --------------------------

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 2 and 100),
  email text not null check (char_length(email) between 5 and 200),
  subject text not null check (subject in ('puppies', 'breeding', 'shipping', 'other')),
  message text not null check (char_length(message) between 5 and 2000),
  status text not null default 'new' check (status in ('new', 'handled'))
);

-- Only the per-puppy form fills these in; all optional so the general form works unchanged.
alter table public.inquiries
  add column if not exists phone text check (phone is null or char_length(phone) between 7 and 30),
  add column if not exists address text check (address is null or char_length(address) between 1 and 300),
  add column if not exists puppy text check (puppy is null or char_length(puppy) between 1 and 60);

alter table public.inquiries enable row level security;
revoke all on table public.inquiries from anon, authenticated;

-- Visitors can send a message (only these columns, so they can't pre-mark it handled) but never read anything.
grant insert (name, email, subject, message, phone, address, puppy) on table public.inquiries to anon;
drop policy if exists "anyone can send an inquiry" on public.inquiries;
create policy "anyone can send an inquiry" on public.inquiries for insert to anon with check (true);

grant select, update, delete on table public.inquiries to authenticated;
drop policy if exists "admins manage inquiries" on public.inquiries;
create policy "admins manage inquiries" on public.inquiries
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- STEP 5 - Puppy photo storage --------------------------------------------------------------------------------------

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('puppy-photos', 'puppy-photos', true, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do nothing;

-- The bucket is public, so anyone can view a photo by its URL; only admins can add, replace or remove files.
drop policy if exists "admins upload puppy photos" on storage.objects;
create policy "admins upload puppy photos" on storage.objects
  for insert to authenticated with check (bucket_id = 'puppy-photos' and public.is_admin());
drop policy if exists "admins replace puppy photos" on storage.objects;
create policy "admins replace puppy photos" on storage.objects
  for update to authenticated
  using (bucket_id = 'puppy-photos' and public.is_admin())
  with check (bucket_id = 'puppy-photos' and public.is_admin());
drop policy if exists "admins delete puppy photos" on storage.objects;
create policy "admins delete puppy photos" on storage.objects
  for delete to authenticated using (bucket_id = 'puppy-photos' and public.is_admin());

-- STEP 6 - OPTIONAL sample content ----------------------------------------------------------------------------------
-- Loads the placeholder content the website was designed with, so the public pages look filled in from day one.
-- EVERYTHING IN THIS STEP IS INVENTED for layout purposes: the puppies (names, prices, stock photos) and above all the
-- testimonials (invented customers and quotes). Replace or delete them from /admin before launch; do not publish
-- fabricated reviews as real ones. To start with an empty site, delete this whole step before running.
-- Each table is only filled if it is completely empty, so re-running never duplicates rows or brings back deleted ones.

-- Newest first on the site, so kobe gets the latest created_at. Birth dates are worked back from the old "weeks old".
insert into public.puppies (id, name, price, gender, date_of_birth, color, status, image, created_at)
select id, name, price, gender, current_date - weeks * 7, color, 'available', '/images/puppies/' || id || '.jpg',
       now() - (pos - 1) * interval '1 minute'
from (values
  (1, 'kobe',  'Kobe',  900, 'Male',   12, 'Fawn'),
  (2, 'luna',  'Luna',  850, 'Female', 10, 'Fawn'),
  (3, 'zeus',  'Zeus',  950, 'Male',   14, 'Chocolate'),
  (4, 'bella', 'Bella', 875, 'Female', 11, 'Black'),
  (5, 'titan', 'Titan', 900, 'Male',   13, 'Blue & White'),
  (6, 'rosie', 'Rosie', 825, 'Female',  9, 'Cream'),
  (7, 'duke',  'Duke',  925, 'Male',   12, 'Chocolate'),
  (8, 'mia',   'Mia',   800, 'Female', 10, 'Blue & White')
) as p (pos, id, name, price, gender, weeks, color)
where not exists (select 1 from public.puppies)
on conflict (id) do nothing;

-- Newest first, and the newest published review is the featured quote at the top of /testimonials.
insert into public.testimonials (name, location, puppy, rating, quote, created_at)
select name, location, puppy, 5, quote, now() - pos * interval '1 day'
from (values
  (1, 'Marcus T.', 'Atlanta, GA', 'Kobe',
   $q$From the first message to the day Kobe came home, everything was honest and easy. He was healthy, confident and already used to people. Best decision we've made as a family.$q$),
  (2, 'Jennifer & Dave R.', 'Austin, TX', 'Luna',
   $q$Luna arrived with her vet records, a feeding guide and a blanket that smelled like her littermates. You can tell these puppies are raised with real love.$q$),
  (3, 'Aaliyah M.', 'Houston, TX', 'Zeus',
   $q$Zeus is gentle with my kids and full of personality. RoyalCrest still checks in months later. That kind of support is rare.$q$),
  (4, 'Chris L.', 'Denver, CO', 'Titan',
   $q$I researched breeders for a long time. Seeing the pedigree and meeting the parents sold me, and Titan has been everything they promised.$q$),
  (5, 'Priya S.', 'Toronto, ON', 'Bella',
   $q$Shipping to Canada sounded scary, but we got updates the whole way and Bella stepped off the plane wagging her tail.$q$),
  (6, 'Tom & Beth W.', 'Phoenix, AZ', 'Duke',
   $q$Duke has the calm, steady temperament we were hoping for. Every question we had before and after pickup was answered quickly and kindly.$q$),
  (7, 'Danielle K.', 'Tampa, FL', 'Rosie',
   $q$Rosie is the sweetest dog I've ever owned. Thank you for trusting us with her.$q$),
  (8, 'Omar H.', 'Chicago, IL', 'Mia',
   $q$Clear communication, clear paperwork, and a healthy puppy. Mia settled in within a day and sleeps through the night already.$q$),
  (9, 'Rachel P.', 'Portland, OR', 'Nova',
   $q$We drove up to meet the litter and it felt like visiting family. Nova is well socialized, healthy and adored by everyone she meets.$q$)
) as t (pos, name, location, puppy, quote)
where not exists (select 1 from public.testimonials);

insert into public.faq_items (category, question, answer, sort_order)
select category, question, answer, sort_order
from (values
  ('About Our Puppies', 'Are your Pitbull puppies purebred?',
   $q$Our puppies are bred from carefully selected American Pitbull lines. Individual puppy pedigree and lineage information can be provided where applicable.$q$, 1),
  ('About Our Puppies', 'What is the temperament of your Pitbulls?',
   $q$We focus on producing dogs with stable, confident, affectionate temperaments. Early handling and socialization are an important part of our puppy-raising process.$q$, 2),
  ('About Our Puppies', 'Are your puppies raised around people?',
   $q$Yes. Puppies are handled regularly and introduced to normal household experiences, people, sounds, and age-appropriate environments to help encourage confident development.$q$, 3),
  ('About Our Puppies', 'Are your Pitbulls good with children and other pets?',
   $q$Individual temperament varies from dog to dog. We can discuss each puppy's observed personality and help prospective families choose a puppy that fits their household.$q$, 4),

  ('Health & Care', 'Do you offer a health guarantee?',
   $q$Yes. Each puppy is provided with our applicable health guarantee and health documentation. We recommend that every new puppy receive an examination by a licensed veterinarian after arriving home.$q$, 1),
  ('Health & Care', 'What vaccinations and deworming does my puppy receive?',
   $q$Puppies receive age-appropriate veterinary care, vaccinations and deworming before going to their new homes. The specific records provided with each puppy will depend on its age and veterinary schedule.$q$, 2),
  ('Health & Care', 'At what age can I take my puppy home?',
   $q$Puppies should remain with their mother and littermates until they are appropriately ready to transition to a new home. The exact pickup date depends on the puppy's age, development and veterinary requirements.$q$, 3),
  ('Health & Care', 'What should I feed my Pitbull puppy?',
   $q$We can provide guidance on the food your puppy has been eating and recommend maintaining a consistent diet initially before making gradual changes.$q$, 4),

  ('Breeding & Bloodlines', 'Can I see the puppy''s parents?',
   $q$Yes, where available, we can provide information and photographs of the puppy's parents and relevant bloodline information.$q$, 1),
  ('Breeding & Bloodlines', 'Can I see pedigree or bloodline information?',
   $q$Pedigree information is available for puppies where applicable. Contact us for the specific lineage documentation associated with the puppy you're interested in.$q$, 2),
  ('Breeding & Bloodlines', 'Do you breed different colors and sizes?',
   $q$Our dogs may vary in color, structure and size depending on the individual bloodline and breeding. Contact us about currently available puppies and upcoming litters.$q$, 3),

  ('Reservations & Purchase', 'How do I reserve a puppy?',
   $q$Start by contacting us about the puppy you're interested in. We'll discuss availability, answer your questions and explain the current reservation process.$q$, 1),
  ('Reservations & Purchase', 'What is included with my puppy purchase?',
   $q$The exact package can vary by puppy, but typically includes applicable health/veterinary records, care information and documentation provided with the puppy. We'll explain everything included before you complete your purchase.$q$, 2),
  ('Reservations & Purchase', 'What payment methods do you accept?',
   $q$Available payment methods and payment instructions are provided during the reservation process. Please contact us for the current options.$q$, 3),

  ('Shipping & Delivery', 'Do you offer puppy shipping?',
   $q$Yes, shipping options can be discussed for families who cannot personally collect their puppy. Available transportation options depend on the destination and applicable requirements.$q$, 1),
  ('Shipping & Delivery', 'How does puppy shipping work?',
   $q$We first prepare the puppy for travel, confirm the required health and travel documentation, arrange transportation, and provide the buyer with the relevant delivery information.$q$, 2),
  ('Shipping & Delivery', 'Will I receive updates during transportation?',
   $q$Yes. We provide available transportation and delivery updates throughout the journey so you know the status of your puppy's trip.$q$, 3),
  ('Shipping & Delivery', 'Can you ship internationally?',
   $q$International transportation may be possible depending on the destination and current animal-import requirements. We'll discuss the requirements and available options for your location before making arrangements.$q$, 4),

  ('After You Bring Your Puppy Home', 'Do you provide support after purchase?',
   $q$Yes. We want families to feel supported beyond the initial purchase and are available to answer reasonable questions about your puppy's transition and care.$q$, 1),
  ('After You Bring Your Puppy Home', 'Can I contact you if I have additional questions?',
   $q$Absolutely. If your question isn't answered on this page, use the contact form or contact information provided on the website.$q$, 2)
) as f (category, question, answer, sort_order)
where not exists (select 1 from public.faq_items);

commit;

-- ADDING AND REMOVING ADMINS (any time, from inside Supabase; nothing to run in this file) --------------------------
-- An admin is a user in Authentication > Users who also has a row in public.admins. Either of these works, and the
-- change takes effect immediately (no deploy, no restart):
--
--   A) Table Editor > admins > Insert row > paste the person's "User UID" from Authentication > Users into user_id.
--
--   B) SQL editor (the person must already exist under Authentication > Users):
--        insert into public.admins (user_id)
--        select id from auth.users where email = 'their@email.com'
--        on conflict (user_id) do nothing;
--
-- See who is an admin:      select u.email from public.admins a join auth.users u on u.id = a.user_id;
-- Remove an admin:          delete from public.admins where user_id = (select id from auth.users where email = 'their@email.com');
-- (Removing someone from `admins` cuts their access at once, even if they are still signed in. Deleting the user under
-- Authentication > Users also removes their row here automatically.)
