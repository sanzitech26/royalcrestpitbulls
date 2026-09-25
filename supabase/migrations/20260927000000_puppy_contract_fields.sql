-- Puppy Contract (/puppy-contract) collects a price, shipping option and payment method on top of the original fields.
-- Nullable because the rows already in the table are Return & Refund Policy signatures that never had them; the website
-- itself requires shipping and payment. Existing table-level grants and policies already cover new columns.
-- Safe to run more than once.
alter table public.contract_signatures
  add column if not exists agreed_price integer check (agreed_price is null or agreed_price between 0 and 1000000),
  add column if not exists shipping_option text check (shipping_option is null or shipping_option in ('door_step', 'airport')),
  add column if not exists payment_method text check (payment_method is null or payment_method in ('zelle', 'cash_app', 'chime', 'apple_pay'));
