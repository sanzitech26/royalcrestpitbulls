-- Puppies no longer have a date of birth (the website used it to show an age in weeks) or a color.
-- Run once in the Supabase SQL editor (or `supabase db push`), AFTER 20260924000000_admin_foundation.sql.
--
-- This permanently deletes those two columns and the values stored in them. Nothing else changes: names, prices,
-- genders, breeds, statuses and photos are untouched.

alter table public.puppies
  drop column if exists date_of_birth,
  drop column if exists color;
