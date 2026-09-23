-- Signed Return & Refund Policy acknowledgements from /contract.
-- Run once in the Supabase SQL editor (or `supabase db push`). Rows are read in the Supabase dashboard.

create table public.contract_signatures (
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

-- Visitors can sign (insert) but never read anyone's data. The CHECKs above are the abuse limit.
grant insert on table public.contract_signatures to anon;
create policy "anyone can sign" on public.contract_signatures for insert to anon with check (true);
