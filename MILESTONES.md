# Mhenching Online Store — Milestone Map

**Purpose:** At any point this file must answer:

1. What are we building?
2. Where are we now?
3. What is the next gate?
4. What is blocking a real Christmas launch?

Status: ✅ Done · 🟢 In progress · 🟡 Designed/partially built · ⬜ Not started · 🔒 External/approval gate

---

## M0 — Product Foundation ✅ 100%

**Goal:** lock product direction, repo boundaries, design language and safety doctrine.

- ✅ dedicated `mhenching-online-store` repository
- ✅ physical POS remains in separate `mhenching-store-system`
- ✅ canonical PRD
- ✅ Quiet Commerce / Quiet Tropical Morning design system
- ✅ Stitch reference constrained by PRD/architecture
- ✅ POS Inventory Bridge contract
- ✅ online commerce data model
- ✅ ADR: POS and online store remain separate
- ✅ `AGENTS.md` guardrails
- ✅ Overkill-underneath / Simplest-form-on-top doctrine

**Gate:** passed.

---

## M1 — Storefront Shell 🟢 90%

**Goal:** beautiful mobile-first shopping shell independent of production data.

Integrated into `main` via Phase 1.

- ✅ Next.js storefront
- ✅ Home
- ✅ Browse/Search
- ✅ Product Detail
- ✅ Cart visual flow
- ✅ Checkout visual flow
- ✅ empty/not-found states
- ✅ Mhenching Finds
- ✅ Gawang Magdalena
- ✅ responsive Quiet Commerce styling
- ✅ reduced-motion basics
- ✅ CI: TypeScript + production build
- ✅ global resident-attendant mount added on current working branch
- ⬜ interactive persistent cart
- ⬜ real-device visual QA / final Stitch comparison

**Next gate:** interactive cart + mobile/desktop visual acceptance.

---

## M2 — Online Commerce Backend 🟢 50%

**Goal:** standalone online commerce backend with no direct POS database access.

Foundation integrated into `main`.

- ✅ backend architecture plan
- ✅ public catalog / private commerce boundary
- ✅ review-only SQL schema draft
- ✅ RLS/security baseline design
- ✅ orders / order items / events model
- ✅ reservations + idempotency contracts
- ✅ delivery-zone model
- ✅ shared TypeScript contracts
- ✅ order state machine
- ✅ CI coverage for contracts
- ⬜ dedicated online Supabase project
- ⬜ applied/reviewed migrations
- ⬜ catalog repository implementation
- ⬜ quote service
- ⬜ order service
- ⬜ API route handlers
- ⬜ unit/integration tests

**Hard gate:** 🔒 create/select a **separate online Supabase project**; never reuse the physical POS database.

---

## M3 — Simplest-Form Admin 🟡 15%

**Goal:** Chingmen/Michael manage the shop without technical knowledge.

Primary flow:

**Photo → Name → Price → Stock/availability → Category → Save**

- ✅ workflow/spec locked
- ⬜ admin authentication
- ⬜ mobile admin shell
- ⬜ Quick Add Item
- ⬜ camera/photo upload
- ⬜ optional SKU/barcode
- ⬜ price/cost entry
- ⬜ availability modes: in-store / online-only / made-to-order / consignment
- ⬜ category/description suggestions
- ⬜ maker/local-product toggle
- ⬜ Draft → Preview → Publish
- ⬜ edit/duplicate/bulk updates
- ⬜ hidden advanced metadata drawer

**Dependency:** M2 online DB/auth/storage.

**Exit gate:** a nontechnical operator can publish a normal item from a phone in roughly one minute.

---

## M4 — POS Inventory Bridge ⬜ 10%

**Goal:** reflect/reserve physical-store stock without coupling ecommerce to POS checkout.

- ✅ integration contract drafted
- ⬜ POS-side availability service
- ⬜ atomic reservation
- ⬜ reservation expiry/release
- ⬜ confirmation/commit
- ⬜ idempotency implementation
- ⬜ audit log
- ⬜ reconciliation
- ⬜ degraded mode
- ⬜ sandbox integration tests

**Hard rule:** ecommerce never writes directly to POS stock tables.

**Exit gate:** simultaneous online orders cannot oversell the final unit and website failure cannot stop physical sales.

---

## M5 — Checkout, Manual Payment & Local Fulfillment 🟢 35%

**Goal:** complete a real Sta. Magdalena order without percentage-cut payment gateways.

### MVP payment rails

- ✅ Cash on Pickup selected
- ✅ COD policy selected for approved local zones, initially Magdalena Poblacion
- ✅ Manual GCash selected
- ✅ Official manual QR selected
- ✅ screenshot-is-not-proof rule
- ✅ payment verification state model/contracts
- ✅ review-only manual-payment schema addendum
- ✅ checkout UI aligned with manual GCash/QR/COD policy
- ⬜ real guest-order submission
- ⬜ official GCash/QR admin configuration
- ⬜ payment-reference submission
- ⬜ private proof upload
- ⬜ staff Verify / Reject / Ask Customer queue
- ⬜ COD collection reconciliation
- ⬜ order confirmation/status
- ⬜ delivery-zone fees
- ⬜ staff order board

**Dependencies:** M2 database + M4 bridge for physical-stock-backed products.

**Exit gate:** one real local order reaches completed pickup/delivery with correct stock and payment reconciliation.

---

## M5B — Resident Customer Attendant 🟢 65%

**Goal:** an always-available calm front desk that helps without hallucinating operational facts.

Current working branch: `phase-5-resident-attendant`.

- ✅ global chat widget
- ✅ resident API route
- ✅ catalog retrieval
- ✅ budget gift queries
- ✅ Christmas discovery
- ✅ Gawang Magdalena discovery
- ✅ payment-policy answers
- ✅ delivery/pickup answers
- ✅ sensitive-case detection
- ✅ human-handoff flag
- ✅ no paid model required for v1
- ✅ future Ollama/model role documented
- ⬜ live order-status tool with verified lookup
- ⬜ actual human handoff queue/inbox
- ⬜ conversation persistence + privacy/retention controls
- ⬜ live payment-state tool
- ⬜ Intern Lum classifier/paraphraser evaluation
- ⬜ Messenger/other channel integration later

**Doctrine:** LLM may interpret/draft; tools remain source of truth for stock, payment and orders.

**Exit gate:** common customer questions are answered correctly 24/7 and sensitive cases reach a human with context.

---

## M6 — Admin Analytics ⬜ 10%

**Goal:** first screen tells management what needs attention.

Target first screen:

- Sales today
- Orders waiting
- Best sellers
- Slow movers
- Low stock
- Searches with no result
- Best-converting campaign
- Estimated gross margin
- pickup/delivery mix

- ✅ KPI definition drafted
- ⬜ analytics dashboard
- ⬜ product performance
- ⬜ funnel conversion
- ⬜ campaign attribution
- ⬜ no-result searches
- ⬜ margin/profitability
- ⬜ Gawang Magdalena performance
- ⬜ Christmas dashboard

**Dependency:** live order/event data from M2/M5.

---

## M7 — Mhenching Radar / Agent Product Finder ⬜ 15%

**Goal:** continuously discover cheap, meaningful, locally relevant products and local makers.

- ✅ Mhenching Product Score framework
- ✅ separate Gawang Magdalena scoring philosophy
- ✅ candidate workflow designed
- ⬜ candidate board
- ⬜ supplier/maker registry
- ⬜ landed-cost calculator
- ⬜ internal unmet-search signals
- ⬜ supplier/wholesale ingestion
- ⬜ local maker submissions
- ⬜ trend research connectors
- ⬜ 3–5 unit test-drop workflow
- ⬜ reorder/kill recommendation
- ⬜ price watch
- ⬜ human approval gate implementation

**Hard rule:** agent may recommend/draft; it cannot autonomously buy inventory.

---

## M8 — Lum Admin / MCP 🟡 15%

**Goal:** authorized Lum/agents operate Mhenching through scoped tools, never raw database superpowers.

- ✅ tool/permission philosophy documented
- ✅ candidate tool list documented
- ✅ audit/approval doctrine
- ⬜ MCP server
- ⬜ service identity/scopes
- ⬜ read tools: products/orders/analytics/Radar
- ⬜ draft-write tools
- ⬜ elevated publish/price/order tools
- ⬜ rate limits/audit trail
- ⬜ Work/Codex connection test

**Exit gate:** Lum can safely inspect and perform approved admin workflows with attributable writes.

---

## M8A — Local LLM Intern / Ollama 🟡 15%

**Goal:** small local model handles junior repetitive work under Lum/human supervision.

- ✅ role and limits defined
- ✅ RAG + approved examples + correction/eval learning model defined
- ✅ suitable responsibilities defined
- ⬜ Ollama model installed/benchmarked
- ⬜ Mhenching knowledge pack
- ⬜ eval suite
- ⬜ classifier/product-copy tasks
- ⬜ admin-summary tasks
- ⬜ escalation confidence rules

**Initial role:** classification, normalization, draft copy, candidate prescoring, conversation handoff summaries.

---

## M9 — Paskong Mhenching 2026 Golden Launch 🟢 35%

**Goal:** first grand public launch and first end-to-end commercial validation.

### Experience

- ✅ dedicated `/christmas` Christmas World page
- ✅ gentle falling snow
- ✅ tiny multicolored softly blinking lights
- ✅ Gentle / Off magic control
- ✅ reduced-motion behavior
- ✅ mobile density reduction
- ✅ no Santa/reindeer/noisy effects
- ✅ Quiet Commerce identity preserved
- ⬜ real photographer product imagery
- ⬜ final Christmas UI/UX visual QA

### Commerce

- ⬜ scout ~100 candidates
- ⬜ shortlist/score
- ⬜ 3–5 unit test drops
- ⬜ under ₱100 / ₱200 / ₱300 real collections
- ⬜ bundles / mystery boxes
- ⬜ campaign attribution
- ⬜ real checkout/fulfillment
- ⬜ sell-through analytics
- ⬜ Gawang Magdalena Christmas collection with real makers

**Exit gate:** Christmas customers can discover, order, pay/receive, and the team can tell which products/content actually generated profitable demand.

---

## M10 — Provincial + International Gawang Magdalena ⬜ 15%

**Goal:** expand eligible local goods beyond Sta. Magdalena without compromising maker economics/compliance.

- ✅ export-readiness statuses/spec drafted
- ✅ finished handicrafts prioritized first
- ⬜ Sorsogon Province shipping
- ⬜ Philippines-wide shipping
- ⬜ packaging/weight classes
- ⬜ maker lead times
- ⬜ real export-ready metadata
- ⬜ English maker stories
- ⬜ commodity/country compliance checks
- ⬜ first verified international-ready SKU

---

# Current position — 19 Aug 2026

### Integrated in `main`

- **M0 Foundation:** ✅ complete
- **M1 Storefront shell:** integrated and CI-green
- **M2 Backend foundation:** integrated and CI-green

### Active working branch

`phase-5-resident-attendant`

Contains:

- resident chat attendant v1
- manual GCash/QR/COD contract/schema refinements
- checkout-policy alignment
- Christmas World page + ambient Christmas effects

### Critical path to real Christmas launch

**Create separate online Supabase → M2 live APIs → M3 Quick Add Admin → M4 POS bridge → M5 real local order/payment → M6 analytics → stock real Christmas products/photos → launch.**

### One external gate right now

🔒 A dedicated online Supabase project must be created/selected before we can safely persist users, products, orders, chat handoffs and manual-payment verification.

# Development doctrine

> **Overkill underneath. Simplest form on top.**

Internal systems may be sophisticated. Chingmen and customers should see only the few decisions needed to complete the job safely.
