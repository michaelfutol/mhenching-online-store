-- MHENCHING ONLINE STORE — SCHEMA DRAFT v0.1
-- IMPORTANT: This file is NOT an applied Supabase migration.
-- It is an architecture draft for review before a separate online-store
-- Supabase project is selected or created.

begin;

create extension if not exists pgcrypto;
create schema if not exists commerce_private;

-- -----------------------------------------------------------------------------
-- PUBLIC / CUSTOMER-SAFE CATALOG
-- -----------------------------------------------------------------------------

create table if not exists public.catalog_products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  descriptor text not null default '',
  why_text text not null default '',
  lane text not null check (lane in ('find', 'local', 'seasonal', 'everyday')),
  status text not null default 'draft' check (status in ('draft', 'active', 'archived')),
  price_centavos bigint not null check (price_centavos >= 0),
  compare_at_centavos bigint check (compare_at_centavos is null or compare_at_centavos >= price_centavos),
  external_inventory_sku text,
  stock_display_policy text not null default 'bucket' check (stock_display_policy in ('hidden', 'bucket', 'exact')),
  origin_label text,
  maker_public_name text,
  visual_key text,
  tags text[] not null default '{}',
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists catalog_products_lane_status_idx
  on public.catalog_products (lane, status);

create index if not exists catalog_products_tags_gin_idx
  on public.catalog_products using gin (tags);

create table if not exists public.delivery_zones (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  label text not null,
  fee_centavos bigint not null default 0 check (fee_centavos >= 0),
  active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.catalog_products enable row level security;
alter table public.delivery_zones enable row level security;

drop policy if exists "catalog products are publicly readable when active" on public.catalog_products;
create policy "catalog products are publicly readable when active"
  on public.catalog_products
  for select
  to anon, authenticated
  using (status = 'active');

drop policy if exists "active delivery zones are publicly readable" on public.delivery_zones;
create policy "active delivery zones are publicly readable"
  on public.delivery_zones
  for select
  to anon, authenticated
  using (active = true);

grant select on table public.catalog_products to anon, authenticated;
grant select on table public.delivery_zones to anon, authenticated;

-- -----------------------------------------------------------------------------
-- PRIVATE COMMERCE DATA
-- -----------------------------------------------------------------------------

create table if not exists commerce_private.customers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  mobile text not null,
  email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists commerce_private.customer_addresses (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references commerce_private.customers(id) on delete cascade,
  barangay text,
  address_text text not null,
  landmark text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists commerce_private.online_orders (
  id uuid primary key default gen_random_uuid(),
  public_token uuid not null unique default gen_random_uuid(),
  customer_id uuid references commerce_private.customers(id),
  address_id uuid references commerce_private.customer_addresses(id),
  state text not null default 'pending_reservation' check (
    state in (
      'pending_reservation', 'reserved', 'confirmed', 'preparing', 'ready',
      'ready_for_pickup', 'out_for_delivery', 'completed', 'reservation_failed',
      'cancelled', 'failed_delivery', 'returned', 'refunded'
    )
  ),
  fulfillment_method text not null check (fulfillment_method in ('pickup', 'local_delivery', 'provincial_delivery')),
  delivery_zone_code text,
  payment_method text not null check (payment_method in ('cash_pickup', 'cash_delivery', 'digital_qr')),
  payment_state text not null default 'unpaid' check (payment_state in ('unpaid', 'pending', 'paid', 'failed', 'refunded')),
  subtotal_centavos bigint not null check (subtotal_centavos >= 0),
  delivery_fee_centavos bigint not null default 0 check (delivery_fee_centavos >= 0),
  total_centavos bigint not null check (total_centavos >= 0),
  idempotency_key text not null unique,
  pos_reservation_id text,
  reservation_expires_at timestamptz,
  campaign_source text,
  campaign_id text,
  customer_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists online_orders_state_created_idx
  on commerce_private.online_orders (state, created_at desc);
create index if not exists online_orders_customer_idx
  on commerce_private.online_orders (customer_id, created_at desc);

create table if not exists commerce_private.online_order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references commerce_private.online_orders(id) on delete cascade,
  catalog_product_id uuid not null references public.catalog_products(id),
  external_inventory_sku text,
  name_snapshot text not null,
  unit_price_centavos bigint not null check (unit_price_centavos >= 0),
  quantity integer not null check (quantity > 0),
  line_total_centavos bigint not null check (line_total_centavos >= 0),
  created_at timestamptz not null default now()
);

create index if not exists online_order_items_order_idx
  on commerce_private.online_order_items (order_id);

create table if not exists commerce_private.inventory_reservations (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null unique references commerce_private.online_orders(id) on delete cascade,
  idempotency_key text not null unique,
  external_reservation_id text unique,
  status text not null default 'requested' check (status in ('requested', 'reserved', 'confirmed', 'released', 'expired', 'failed')),
  expires_at timestamptz,
  last_error_code text,
  last_error_message text,
  reconciliation_status text not null default 'pending' check (reconciliation_status in ('pending', 'matched', 'needs_review')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists commerce_private.order_events (
  id bigint generated always as identity primary key,
  order_id uuid not null references commerce_private.online_orders(id) on delete cascade,
  event_type text not null,
  from_state text,
  to_state text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists order_events_order_created_idx
  on commerce_private.order_events (order_id, created_at);

alter table commerce_private.customers enable row level security;
alter table commerce_private.customer_addresses enable row level security;
alter table commerce_private.online_orders enable row level security;
alter table commerce_private.online_order_items enable row level security;
alter table commerce_private.inventory_reservations enable row level security;
alter table commerce_private.order_events enable row level security;

revoke all on schema commerce_private from public, anon, authenticated;
revoke all on all tables in schema commerce_private from public, anon, authenticated;

commit;
