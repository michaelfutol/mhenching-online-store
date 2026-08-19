-- MHENCHING ONLINE STORE — PAYMENTS ADDENDUM DRAFT
-- REVIEW ONLY. Do not apply to the physical POS database.

begin;

-- Extend the conceptual online-order payment method set when this draft is
-- folded into the dedicated online Supabase schema.
-- Intended values: cash_pickup, cash_delivery, gcash, qrph.

create table if not exists commerce_private.payment_attempts (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references commerce_private.online_orders(id) on delete cascade,
  provider text not null check (provider in ('paymongo')),
  method text not null check (method in ('gcash', 'qrph')),
  provider_session_id text not null unique,
  provider_payment_id text,
  status text not null default 'pending' check (status in ('pending', 'paid', 'failed', 'cancelled', 'refunded')),
  amount_centavos bigint not null check (amount_centavos > 0),
  currency text not null default 'PHP' check (currency = 'PHP'),
  provider_fee_centavos bigint,
  net_amount_centavos bigint,
  livemode boolean not null default false,
  last_event_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists payment_attempts_order_created_idx
  on commerce_private.payment_attempts (order_id, created_at desc);

create table if not exists commerce_private.payment_events (
  id bigint generated always as identity primary key,
  provider text not null check (provider in ('paymongo')),
  provider_event_id text unique,
  provider_session_id text,
  event_type text not null,
  payload jsonb not null,
  processed boolean not null default false,
  processing_error text,
  received_at timestamptz not null default now(),
  processed_at timestamptz
);

create index if not exists payment_events_session_idx
  on commerce_private.payment_events (provider_session_id, received_at desc);

alter table commerce_private.payment_attempts enable row level security;
alter table commerce_private.payment_events enable row level security;
revoke all on table commerce_private.payment_attempts from public, anon, authenticated;
revoke all on table commerce_private.payment_events from public, anon, authenticated;

commit;
