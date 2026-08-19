# Phase 2 Backend Plan

## Goal

Build the online commerce backend as a separate system from the physical POS while preserving a narrow future bridge for stock availability and reservations.

## Data ownership

### Public catalog data
Safe for customer-facing reads:

- catalog products and variants;
- categories/collections;
- published maker profiles and provenance;
- published delivery-zone labels/fees;
- seasonal merchandising metadata.

### Private commerce data
Never exposed directly to anonymous browser queries:

- customer contact details;
- addresses;
- carts persisted server-side later;
- online orders/order items;
- payment state;
- fulfillment state;
- POS reservation tokens and reconciliation data;
- internal supplier costs and product-candidate scoring.

## Request path

```text
Browser
  ↓
Next.js Server Components / Route Handlers
  ↓
Online commerce service layer
  ├── public catalog reads
  ├── order validation
  ├── delivery-zone validation
  └── POS bridge client (future)
        ↓
Physical POS bridge
```

The browser must never receive a POS service credential or a Supabase service-role secret.

## Checkout sequence

1. Customer submits cart + contact + fulfillment method.
2. Server reloads canonical online product/price records.
3. Server validates quantities and delivery zone.
4. Server requests atomic POS reservation for physical-store-backed SKUs.
5. If reservation succeeds, create online order with reservation reference.
6. Payment/confirmation proceeds according to payment method.
7. Reservation is confirmed or released through the bridge.
8. All state transitions are recorded for reconciliation.

No browser-submitted price is trusted.

## Initial API surface

Planned Next.js route handlers:

- `GET /api/catalog/search`
- `GET /api/products/:slug`
- `POST /api/orders/quote`
- `POST /api/orders`
- `GET /api/orders/:publicToken`
- `POST /api/orders/:id/cancel`

Later:

- `POST /api/bridge/reservations` (server-to-server adapter only)
- payment/manual verification APIs;
- delivery/rider APIs;
- Mhenching Radar admin APIs.

## Supabase posture

The online store may use a separate Supabase project. Until a project is explicitly selected/created, schema files in this repo are **design drafts**, not applied migrations.

Sensitive commerce tables should live in a non-exposed schema where possible, with server-only access and additional RLS/permissions as defense in depth.

## Availability consistency

- product browsing may use cached/eventually consistent availability;
- checkout reservation must be strongly validated against the POS bridge;
- cached availability must never be treated as a guaranteed reservation.

## Idempotency

Order creation and reservation calls require idempotency keys. Network retries cannot create duplicate reservations, orders, or stock deductions.

## Observability

Minimum audit fields:

- request/order id;
- idempotency key;
- external POS reservation id;
- state transition timestamps;
- source/campaign attribution;
- failure reason/code;
- reconciliation status.

## Phase 2 deliverables

1. Draft online schema.
2. Runtime TypeScript contracts.
3. Server-side catalog repository interface.
4. Order state machine/types.
5. Mock implementations so storefront can stop importing static catalog arrays directly.
6. Tests around quote/order validation.
7. Only then connect a real separate Supabase project.
