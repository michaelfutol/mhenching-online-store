# Mhenching Online Store — Milestone Map

**Purpose:** At any point, this file should answer three questions:

1. What are we building?
2. Where are we now?
3. What must be true before we move to the next milestone?

Status legend: ✅ Done · 🟢 In progress · 🟡 Planned/partially designed · ⬜ Not started · 🔒 Gate/hold

---

## Milestone 0 — Product Foundation ✅

**Goal:** Lock the product, repo boundaries, design language and safety rules before production code.

- ✅ Dedicated `mhenching-online-store` repository
- ✅ Physical POS kept in separate `mhenching-store-system` repository
- ✅ Canonical PRD
- ✅ Quiet Commerce / Quiet Tropical Morning design system
- ✅ Stitch export reviewed and constrained
- ✅ POS Inventory Bridge contract drafted
- ✅ Online commerce data model drafted
- ✅ ADR: POS and online store stay separate
- ✅ Agent guardrails in `AGENTS.md`

**Exit gate:** Product/business rules are documented and POS protection is explicit.

---

## Milestone 1 — Storefront Shell 🟢

**Goal:** Produce the first usable customer-facing shopping experience with mock data only.

Branch: `phase-1-storefront-shell`  
PR: #2

- ✅ Next.js storefront scaffold
- ✅ Mobile-first Quiet Commerce theme
- ✅ Home
- ✅ Browse/Search
- ✅ Product Detail
- ✅ Cart visual flow
- ✅ Checkout visual flow
- ✅ Not-found/empty states
- ✅ Mhenching Finds lane
- ✅ Gawang Magdalena lane
- ✅ Seasonal/Christmas lane
- ✅ Reduced-motion/accessibility basics
- ✅ GitHub Actions typecheck
- ✅ GitHub Actions production build
- 🟡 Visual review against Stitch screens
- ⬜ Interactive cart state
- ⬜ Real responsive-device QA

**Exit gate:** UI is approved on mobile and desktop, CI green, and no production stock/payment claims are hard-coded.

---

## Milestone 2 — Online Commerce Backend 🟢

**Goal:** Build a standalone online commerce backend without touching the physical POS database.

Branch: `phase-2-commerce-backend`  
PR: #4

- ✅ Backend architecture plan
- ✅ Public catalog / private commerce boundary
- ✅ Review-only SQL schema draft
- ✅ RLS/security baseline
- ✅ Orders / order items / events model
- ✅ Reservation records and idempotency fields
- ✅ Delivery-zone model
- ✅ Shared TypeScript contracts
- ✅ Order state machine
- ✅ Contract typecheck in CI
- ⬜ Catalog repository interface
- ⬜ Mock server repository
- ⬜ Quote service
- ⬜ Order service
- ⬜ API route handlers
- ⬜ Unit/integration tests
- 🔒 Do not apply schema until a dedicated online database is selected

**Exit gate:** Online catalog/order APIs are testable against a separate dev database or mock backend and cannot access the POS database directly.

---

## Milestone 3 — Simplest-Form Admin 🟡

**Goal:** Chingmen and Michael can manage the online shop without needing technical knowledge.

### Quick Add Item

Target experience:

**Photo → Name → Price → Stock/availability → Category → Save**

Everything else is optional or auto-suggested.

- ⬜ Mobile-first admin login
- ⬜ Quick Add Item
- ⬜ Camera/photo upload
- ⬜ Barcode/SKU optional field
- ⬜ Simple price/cost entry
- ⬜ Availability mode: in-store / online-only / made-to-order / consignment
- ⬜ Category/collection suggestions
- ⬜ Auto-generated short description suggestion
- ⬜ Maker/local-product toggle
- ⬜ Draft → Preview → Publish
- ⬜ Duplicate/edit product
- ⬜ Bulk price/stock edits

### Advanced drawer — hidden unless needed

- ⬜ supplier/maker
- ⬜ provenance
- ⬜ dimensions/weight
- ⬜ landed cost
- ⬜ target margin
- ⬜ international eligibility
- ⬜ production lead time
- ⬜ bundle membership
- ⬜ campaign tags

**Exit gate:** A nontechnical store operator can add and publish a real product on a phone in under roughly one minute, while advanced metadata remains available without cluttering the primary flow.

---

## Milestone 4 — POS Inventory Bridge ⬜

**Goal:** The online store can safely reflect/reserve physical-store inventory without becoming part of the POS application.

- ⬜ Availability endpoint
- ⬜ Atomic reservation
- ⬜ Reservation expiry/release
- ⬜ Confirmation/commit path
- ⬜ Idempotency
- ⬜ Audit log
- ⬜ Reconciliation job
- ⬜ Failure/degraded mode
- ⬜ Integration tests against POS sandbox/dev copy
- 🔒 No direct ecommerce writes to POS inventory tables

**Exit gate:** Concurrent online orders cannot oversell stock; online failures do not prevent physical checkout.

---

## Milestone 5 — Real Checkout + Local Fulfillment ⬜

**Goal:** Real customers in Sta. Magdalena can complete orders safely.

- ⬜ Guest checkout
- ⬜ Cash on delivery
- ⬜ Cash on pickup
- ⬜ approved QR/digital-payment flow
- ⬜ pickup workflow
- ⬜ delivery zones/fees
- ⬜ order confirmation/status
- ⬜ staff order board
- ⬜ cancellation/refund rules
- ⬜ proof of delivery later

**Exit gate:** One real end-to-end test order can move from product page to completed pickup/delivery with correct inventory reconciliation.

---

## Milestone 6 — Admin Analytics ⬜

**Goal:** Management sees what is selling, why, and what needs action without reading raw reports.

### First screen should answer:

- Sales today
- Orders waiting
- Best sellers
- Slow movers
- Low stock
- Products people searched for but we do not sell
- Campaigns converting best
- Gross margin estimate
- Delivery/pickup mix

- ⬜ KPI dashboard
- ⬜ date filters
- ⬜ product performance
- ⬜ funnel conversion
- ⬜ campaign attribution
- ⬜ no-result searches
- ⬜ margin/profitability
- ⬜ local-maker sales
- ⬜ Christmas/seasonal dashboard
- ⬜ downloadable summaries

**Exit gate:** Chingmen/Michael can make a reorder, promotion or kill-product decision from the dashboard without exporting data first.

---

## Milestone 7 — Mhenching Radar / Agent Product Finder ⬜

**Goal:** Continuously discover cheap, meaningful, locally relevant and commercially promising products.

### Inputs

- internal searches with no result
- customer requests
- sales/returns
- supplier catalogs
- wholesale offers
- approved marketplace/trend signals
- local maker submissions
- seasonal opportunities

### Outputs

- candidate product
- source/supplier
- landed-cost estimate
- target selling price
- margin estimate
- usefulness
- novelty locally
- demo/wow factor
- return/safety risk
- test quantity recommendation
- evidence links/notes

- ⬜ candidate board
- ⬜ Mhenching Product Score
- ⬜ Gawang Magdalena score
- ⬜ supplier/maker registry
- ⬜ test-drop workflow
- ⬜ reorder/kill recommendation
- ⬜ price-change watch
- ⬜ human approval gate

**Hard rule:** An agent may recommend and prepare a listing, but cannot autonomously purchase inventory or publish a supplier claim without human approval.

---

## Milestone 8 — Lum App Administrator / MCP ⬜

**Goal:** Expose safe administrative tools so Lum/authorized agents in Work/Codex can operate the application without broad database access.

Candidate MCP tools:

- `search_products`
- `get_product`
- `create_product_draft`
- `update_product_draft`
- `publish_product` — permission-gated
- `get_inventory_status`
- `get_orders`
- `get_order`
- `update_fulfillment_status`
- `get_sales_summary`
- `get_low_stock`
- `get_no_result_searches`
- `get_radar_candidates`
- `create_radar_candidate`
- `score_candidate`
- `prepare_campaign_draft`

### Permission model

- Read-only analytics: broadest safe scope
- Draft creation: allowed for authorized agent
- Publish/price change: explicit elevated scope
- Refund/cancel/order mutation: stronger scope + audit
- Inventory purchase: human approval only
- POS mutation: never direct

- ⬜ MCP server design
- ⬜ scoped service identity
- ⬜ audit trail
- ⬜ rate limits
- ⬜ tool schemas
- ⬜ Work/Codex connection test
- ⬜ administrator runbook

**Exit gate:** Lum can safely inspect the shop and perform approved admin workflows through tools, with every write attributable and reversible where practical.

---

## Milestone 9 — Christmas 2026 Golden Commercial Validation ⬜

**Goal:** Use Christmas as the first real product-discovery + funnel + fulfillment stress test.

- ⬜ scout ~100 candidates
- ⬜ shortlist and score
- ⬜ sample 3–5 units of strongest candidates
- ⬜ Christmas collections under ₱100/₱200/₱300
- ⬜ bundles/mystery boxes
- ⬜ demo/reel links
- ⬜ source attribution
- ⬜ sell-through analytics
- ⬜ reorder winners
- ⬜ kill weak products quickly
- ⬜ Gawang Magdalena Christmas collection

**Exit gate:** We can identify which products/content/campaigns generated profitable demand and feed those learnings back into Radar.

---

## Milestone 10 — Provincial + International Local Products ⬜

**Goal:** Expand appropriate products beyond Sta. Magdalena without compromising maker economics or compliance.

- ⬜ Sorsogon Province shipping
- ⬜ Philippines-wide shipping for suitable goods
- ⬜ packaging/weight classes
- ⬜ maker lead times
- ⬜ export-ready product metadata
- ⬜ English maker stories
- ⬜ international shipping eligibility flags
- ⬜ customs/material/food compliance gates

**Exit gate:** At least one eligible Gawang Magdalena product can be ordered outside the local delivery area with accurate landed shipping expectations and documented maker provenance.

---

# Current position

**Foundation:** complete.  
**Storefront:** built and CI-green, awaiting visual review/merge.  
**Backend:** contract/schema foundation built and CI-green on stacked branch.  
**Next operational priority:** simplest-form Admin + real online backend APIs, then isolated POS Inventory Bridge.

# Development doctrine

> **Overkill underneath. Simplest form on top.**

The system may be sophisticated internally, but the human workflow should always expose the smallest number of decisions necessary to complete the job safely.
