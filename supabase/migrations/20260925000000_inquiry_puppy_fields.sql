-- Puppy inquiries: the /contact/<puppy> form also collects a phone number, an address and the puppy of interest.
-- Run once in the Supabase SQL editor (or `supabase db push`), AFTER 20260924000000_admin_foundation.sql.
--
-- All three are optional, so the general /contact form (which sends none of them) keeps working unchanged.

alter table public.inquiries
  add column phone text check (phone is null or char_length(phone) between 7 and 30),
  add column address text check (address is null or char_length(address) between 1 and 300),
  add column puppy text check (puppy is null or char_length(puppy) between 1 and 60);

-- The admin migration grants anon INSERT on a fixed column list; extend it. Visitors still can't set `status` and
-- still can't read anything.
grant insert (phone, address, puppy) on table public.inquiries to anon;
