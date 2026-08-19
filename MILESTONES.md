# Mhenching Online Store — Milestone Map

**Purpose:** At any point this file must answer: what are we building, where are we now, what is the next gate, and what blocks a real Christmas launch?

Status: ✅ Done · 🟢 In progress · 🟡 Designed/partially built · ⬜ Not started · 🔒 External/approval gate

---

## M0 — Product Foundation ✅ 100%

- ✅ dedicated `mhenching-online-store` repository
- ✅ physical POS remains in separate `mhenching-store-system`
- ✅ canonical PRD + data model + architecture
- ✅ Quiet Commerce / Quiet Tropical Morning design system
- ✅ Stitch references constrained by product rules
- ✅ POS Inventory Bridge contract
- ✅ ADR + `AGENTS.md` guardrails
- ✅ Overkill-underneath / Simplest-form-on-top doctrine

**Gate:** passed.

---

## M1 — Storefront Shell 🟢 98%

**Goal:** beautiful mobile-first shopping shell independent of production data.

- ✅ Next.js storefront
- ✅ Home / Browse / Search / Product Detail
- ✅ Mhenching Finds / Gawang Magdalena / Christmas lanes
- ✅ interactive persistent browser cart
- ✅ Add to Cart from product pages
- ✅ live header cart count
- ✅ quantity +/- / remove / clear cart
- ✅ empty cart state
- ✅ checkout reflects actual cart contents
- ✅ responsive Quiet Commerce styling
- ✅ reduced-motion basics
- ✅ resident attendant mounted globally
- ✅ CI: strict TypeScript + production build
- ⬜ real-device visual QA / final Stitch comparison

**Next gate:** mobile + desktop visual acceptance on real devices.

---

## M2 — Online Commerce Backend 🟢 65%

**Goal:** standalone online commerce backend with no direct POS database access.

- ✅ backend architecture plan
- ✅ public catalog / private commerce boundary
- ✅ review-only SQL schema draft
- ✅ RLS/security baseline design
- ✅ orders / order items / events model
- ✅ reservations + idempotency contracts
- ✅ delivery-zone model
- ✅ shared TypeScript contracts
- ✅ order state machine
- ✅ `CatalogRepository` interface
- ✅ current static catalog repository adapter
- ✅ canonical server-side quote service
- ✅ server-side product price reload; browser price is not trusted
- ✅ unavailable product / quantity validation
- ✅ `POST /api/orders/quote`
- ✅ checkout consumes server-verified pickup quote
- ✅ CI coverage for contracts + storefront/build
- ⬜ dedicated online Supabase project
- ⬜ applied/reviewed migrations
- ⬜ Supabase catalog repository
- ⬜ real delivery-zone repository/fees
- ⬜ persistent order service
- ⬜ `POST /api/orders`
- ⬜ order-status/cancel routes
- ⬜ unit/integration tests around persistence/idempotency

**Hard gate:** 🔒 create a **separate online Supabase project**; never reuse the physical POS database. Tracked in issue #17.

---

## M3 — Simplest-Form Admin 🟢 40%

**Goal:** Chingmen/Michael manage the shop without technical knowledge.

Primary flow: **Photo → Name → Price → Stock/availability → Category → Preview → Publish**

- ✅ workflow/spec locked
- ✅ server-gated `/admin` preview route
- ✅ preview disabled by default in production
- ✅ phone camera/photo chooser
- ✅ Quick Add fields
- ✅ price + stock/capacity
- ✅ availability: in-store / online-only / made-to-order / consignment
- ✅ lane/category selection
- ✅ deterministic description suggestion
- ✅ hidden optional/advanced section
- ✅ live customer-card preview
- ⬜ Supabase authentication + staff roles
- ⬜ real photo upload/storage
- ⬜ real Create Draft / Preview → Publish
- ⬜ edit/duplicate/bulk updates
- ⬜ supplier/maker/provenance/economics advanced fields

**Dependency:** M2 online DB/auth/storage.

---

## M4 — POS Inventory Bridge ⬜ 10%

**Goal:** reflect/reserve physical-store stock without coupling ecommerce to POS checkout.

- ✅ integration contract drafted
- ⬜ POS-side availability service
- ⬜ atomic reservation + expiry/release
- ⬜ confirmation/commit
- ⬜ idempotency + audit + reconciliation
- ⬜ degraded mode
- ⬜ sandbox integration tests

**Hard rule:** ecommerce never writes directly to POS stock tables.

---

## M5 — Checkout, Manual Payment & Local Fulfillment 🟢 40%

- ✅ Cash on Pickup
- ✅ COD policy for approved local zones, initially Magdalena Poblacion
- ✅ Manual GCash + official manual QR
- ✅ screenshot-is-not-proof rule
- ✅ payment verification states/contracts
- ✅ review-only manual-payment schema addendum
- ✅ interactive cart → checkout
- ✅ server-verified pickup quote
- ⬜ real guest-order submission
- ⬜ official GCash/QR admin config
- ⬜ payment-reference + private proof upload
- ⬜ staff Verify / Reject / Ask Customer queue
- ⬜ COD collection reconciliation
- ⬜ order confirmation/status
- ⬜ delivery-zone fees + staff order board

**Dependencies:** M2 database + M4 bridge for physical-store-backed products.

---

## M5B — Resident Customer Attendant 🟢 65%

- ✅ global `Ask Mhenching` widget + API
- ✅ catalog/product retrieval
- ✅ budget gift / Christmas / Gawang Magdalena discovery
- ✅ payment-policy + pickup/delivery answers
- ✅ sensitive-case detection + human-handoff flag
- ✅ no paid model required for v1
- ✅ future Ollama/Intern Lum role documented
- ⬜ live verified order-status tool
- ⬜ human handoff queue/inbox
- ⬜ conversation persistence + privacy/retention
- ⬜ live payment-state tool
- ⬜ Intern Lum classifier/paraphraser evaluation
- ⬜ Messenger/other channels later

**Doctrine:** models may interpret/draft; tools remain source of truth for stock, payments and orders.

---

## M6 — Admin Analytics ⬜ 10%

Target first screen: Sales today · Orders waiting · Best sellers · Slow movers · Low stock · No-result searches · Best campaign · Estimated gross margin · Pickup/delivery mix.

- ✅ KPI definition drafted
- ⬜ analytics dashboard
- ⬜ product/funnel/campaign performance
- ⬜ no-result searches + margin
- ⬜ Gawang Magdalena + Christmas dashboards

**Dependency:** live order/event data from M2/M5.

---

## M7 — Mhenching Radar / Agent Product Finder 🟢 45%

- ✅ regular Mhenching Product Score
- ✅ separate Gawang Magdalena score
- ✅ deterministic weighted scoring package
- ✅ landed cost / gross contribution / margin / markup
- ✅ `TEST_NOW / SAMPLE_WATCH / WEAK_MAYBE / IGNORE`
- ✅ default 3–5 unit test guidance
- ✅ fair-maker-economics protection
- ✅ sourcing/intake workflow formalized in issue #18
- ✅ physical-stock onboarding state machine designed
- ⬜ candidate board/persistence
- ⬜ supplier/maker registry
- ⬜ paste/share source URL intake
- ⬜ supplier/wholesale feed ingestion
- ⬜ internal unmet-search signals
- ⬜ local maker submissions
- ⬜ trend research connectors
- ⬜ received/QA/photo/listing workflow implementation
- ⬜ test-drop feedback + price watch
- ⬜ human purchase approval workflow

**Hard rule:** agent may research, score and draft; it cannot autonomously buy inventory.

---

## M8 — Lum Admin / MCP 🟡 15%

- ✅ tool/permission philosophy + candidate tool list
- ✅ audit/approval doctrine
- ⬜ MCP server + service identity/scopes
- ⬜ products/orders/analytics/Radar read tools
- ⬜ draft-write tools
- ⬜ elevated publish/price/order tools
- ⬜ rate limits/audit trail
- ⬜ Work/Codex connection test

---

## M8A — Local LLM Intern / Ollama 🟡 15%

- ✅ role/limits defined
- ✅ RAG + approved examples + correction/eval learning model
- ✅ responsibilities defined
- ⬜ Ollama model installed/benchmarked
- ⬜ Mhenching knowledge pack + eval suite
- ⬜ classification/product-copy/admin-summary tasks
- ⬜ escalation confidence rules

---

## M9 — Paskong Mhenching 2026 Golden Launch 🟢 40%

### Experience
- ✅ dedicated `/christmas` Christmas World
- ✅ gentle snow + tiny multicolored softly blinking lights
- ✅ Gentle / Off control
- ✅ reduced-motion + mobile density safeguards
- ✅ no Santa/reindeer/noisy effects
- ✅ budget-discovery cards
- ✅ Gawang Magdalena Christmas story lane
- ⬜ real photographer product imagery
- ⬜ final Christmas UI/UX visual QA

### Commerce
- ⬜ scout ~100 candidates
- ⬜ shortlist/score with Radar
- ⬜ 3–5 unit test drops
- ⬜ real Under ₱100 / ₱200 / ₱300 collections
- ⬜ bundles/mystery boxes
- ⬜ campaign attribution
- ⬜ real checkout/fulfillment
- ⬜ sell-through analytics
- ⬜ real-maker Gawang Magdalena Christmas collection

---

## M10 — Provincial + International Gawang Magdalena ⬜ 15%

- ✅ export-readiness statuses/spec drafted
- ✅ finished handicrafts prioritized first
- ⬜ Sorsogon / Philippines shipping
- ⬜ packaging/weight classes + maker lead times
- ⬜ real export metadata + English maker stories
- ⬜ destination/commodity compliance checks
- ⬜ first verified international-ready SKU

---

# Current position — 19 Aug 2026

### Integrated and CI-green in `main`

- **M0 Foundation:** ✅ 100%
- **M1 Storefront:** 🟢 **98%**
- **M2 Backend:** 🟢 **65%**
- **M3 Quick Add Admin:** 🟢 **40%**
- **M5 Checkout/manual payments:** 🟢 **40%**
- **M5B Resident Attendant:** 🟢 **65%**
- **M7 Radar/Product Finder:** 🟢 **45%**
- **M9 Christmas World:** 🟢 **40%**

### Critical path to first real revenue

**Dedicated online Supabase → real catalog/admin persistence → real order creation → POS stock bridge → manual GCash/COD fulfillment → analytics → real product photos/stock → Christmas campaigns → measured sales.**

### External gate

🔒 **Issue #17:** create the dedicated Mhenching Online Supabase project before persisting users, products, orders, payment proofs, chat handoffs or admin writes.

The existing physical `Mhenching Store System` Supabase project remains separate and must not be reused.

# Development doctrine

> **Overkill underneath. Simplest form on top.**

Internal systems may be sophisticated. Chingmen and customers should see only the few decisions needed to complete the job safely.
