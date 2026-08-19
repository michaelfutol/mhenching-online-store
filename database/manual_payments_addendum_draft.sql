-- MHENCHING ONLINE STORE — MANUAL PAYMENTS ADDENDUM DRAFT
-- REVIEW ONLY. Never apply to the physical POS database.

begin;

-- Intended payment_method values once folded into the dedicated online schema:
-- cash_pickup, cash_delivery, manual_gcash, manual_qr.
-- Intended payment_state values:
-- unpaid, awaiting_manual_payment, submitted_for_verification, verified,
-- rejected, paid, failed, refunded.

create table if not exists commerce_private.manual_payment_submissions (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references commerce_private.online_orders(id) on delete cascade,
  method text not null check (method in ('manual_gcash', 'manual_qr')),
  transaction_reference text not null,
  proof_asset_path text,
  status text not null default 'submitted_for_verification' check (
    status in ('submitted_for_verification', 'verified', 'rejected', 'ask_customer')
  ),
  customer_note text,
  submitted_at timestamptz not null default now(),
  verified_by uuid,
  verified_at timestamptz,
  verification_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists manual_payment_submissions_order_idx
  on commerce_private.manual_payment_submissions (order_id, submitted_at desc);

create table if not exists commerce_private.payment_config (
  id smallint primary key default 1 check (id = 1),
  public_account_name text,
  public_gcash_number text,
  public_qr_asset_path text,
  manual_gcash_enabled boolean not null default false,
  manual_qr_enabled boolean not null default false,
  cash_pickup_enabled boolean not null default true,
  updated_by uuid,
  updated_at timestamptz not null default now()
);

create table if not exists commerce_private.cod_collections (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null unique references commerce_private.online_orders(id) on delete cascade,
  amount_to_collect_centavos bigint not null check (amount_to_collect_centavos >= 0),
  collection_state text not null default 'not_collected' check (
    collection_state in ('not_collected', 'collected', 'short', 'waived', 'failed')
  ),
  collected_by uuid,
  collected_at timestamptz,
  note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table commerce_private.manual_payment_submissions enable row level security;
alter table commerce_private.payment_config enable row level security;
alter table commerce_private.cod_collections enable row level security;

revoke all on table commerce_private.manual_payment_submissions from public, anon, authenticated;
revoke all on table commerce_private.payment_config from public, anon, authenticated;
revoke all on table commerce_private.cod_collections from public, anon, authenticated;

commit;
