# Mhenching Online Store

> **Quiet commerce for Sta. Magdalena — useful finds, real local stock, local makers, and gentle delivery.**

Mhenching Online Store is the customer-facing ecommerce and discovery platform for **Mhenching Variety** in Sta. Magdalena, Sorsogon, Philippines.

It is deliberately **separate from the physical-store POS repository**. The online store may read availability and request reservations/orders through a narrow integration contract, but it must never directly depend on or rewrite POS checkout logic.

## Product promise

**See it → understand it → order it → get it locally.**

Mhenching Online is not intended to be a mini-Shopee or a generic dropshipping storefront. Its advantage is:

- real nearby inventory;
- trusted local fulfillment;
- carefully curated **Mhenching Finds**;
- seasonal discovery such as Christmas campaigns;
- **Gawang Magdalena** products from local makers and producers;
- pickup and local delivery;
- later, Sorsogon-wide shipping and international sales for suitable native/handmade products.

## Development status

The canonical progress tracker is **[`MILESTONES.md`](MILESTONES.md)**. It records each milestone, status, acceptance/exit gate and the current next priority.

Current position:

- **Milestone 0 — Product Foundation:** complete
- **Milestone 1 — Storefront Shell:** CI-green, review/merge stage
- **Milestone 2 — Online Commerce Backend:** contract/schema foundation in progress
- **Next operational priority:** Simplest-form Admin + real online backend APIs, followed by the isolated POS Inventory Bridge

Development doctrine: **Overkill underneath. Simplest form on top.** See `docs/product/BUILD_DOCTRINE.md`.

## Experience principle: Quiet Commerce

The storefront should feel refreshing, calm, warm, local, trustworthy, contemporary, affordable, and quietly delightful. It should invite discovery rather than pressure customers with visual noise, fake scarcity, countdown timers, or aggressive sale mechanics.

The initial Google Stitch concept is called **Quiet Tropical Morning** and is retained under `docs/design/` as a design reference.

## Repository boundaries

### This repository owns

- customer storefront;
- catalog presentation and merchandising;
- search and collections;
- Mhenching Finds discovery/testing surfaces;
- Gawang Magdalena storytelling and maker profiles;
- carts and online checkout UX;
- online-order lifecycle;
- pickup/local-delivery UX;
- promotions, bundles and funnel attribution;
- customer profiles/order history;
- online analytics;
- integration client for POS inventory/reservation contract.

### This repository does **not** own

- physical-store cash register behavior;
- restobar billing;
- physical POS checkout implementation;
- manager void logic;
- canonical physical inventory mutation rules;
- POS authentication or Android POS app.

Those remain in the separate `mhenching-store-system` repository.

## Source-of-truth hierarchy

1. `docs/product/PRD.md` — what the product must do.
2. `MILESTONES.md` — where development currently stands.
3. `docs/architecture/` — system boundaries, contracts, data ownership and invariants.
4. `docs/decisions/` — architecture decision records.
5. `docs/design/STITCH_DESIGN.md` — visual system and design intent.
6. Stitch-generated HTML/screens — reference implementations only.
7. Application code — implementation of the above.

If generated UI conflicts with the PRD or an invariant, the PRD/invariant wins.

## Planned architecture

```text
Customer browser / PWA
        │
        ▼
Mhenching Online Store
        │
        ├── catalog / discovery / funnels / cart / checkout
        │
        └── POS Inventory Bridge (narrow contract)
                     │
                     ▼
         Mhenching Physical Store System
                     │
                     ▼
             Canonical store stock
```

The online store must never directly decrement POS stock tables. It requests an atomic reservation/confirmation through the bridge.

## Core commerce lanes

### Mhenching Finds
Low-cost products that pass usefulness, novelty, margin, demoability and risk tests.

### Gawang Magdalena
Local handicrafts, buri/anahaw/karagumoy items, pili products, delicacies and other locally made goods. Local products are scored for authenticity, maker economics and cultural/story value — not merely cheapness.

### Seasonal Finds
Christmas first, followed by school opening, fiestas, Valentine’s, Mother’s/Father’s Day, rainy season and other local buying moments.

### Everyday Mhenching
Selected ordinary store inventory that customers can order for pickup or delivery.

## Golden validation case

**Christmas 2026** is the first end-to-end commercial validation:

- scout ~100 product candidates;
- sample only the strongest;
- test in tiny quantities;
- create short demo content;
- measure views → product visits → carts → orders → sell-through;
- scale winners and kill weak products quickly.

## Project structure

```text
apps/
  storefront/             # customer-facing web/PWA
packages/
  contracts/              # shared DTOs/schemas for integrations
integrations/
  pos-bridge/             # client/adapter for physical-store inventory bridge
docs/
  product/                # PRD, doctrine, success metrics
  architecture/           # boundaries, data model, MCP/Radar, API/inventory bridge
  design/                 # canonical visual guidance + Stitch design system
  roadmap/                # delivery plan
  decisions/              # ADRs
reference/
  stitch/                 # exported Stitch references, non-authoritative
```

## Safety rule

> **No ecommerce feature is allowed to modify physical-store stock by writing directly to POS tables.**

All online stock reservations, confirmations, cancellations and releases must go through the approved bridge contract and be idempotent and auditable.
