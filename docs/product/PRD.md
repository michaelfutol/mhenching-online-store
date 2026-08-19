# Product Requirements Document — Mhenching Online Store

**Version:** 0.2  
**Status:** Canonical initial definition  
**Location:** Sta. Magdalena, Sorsogon, Philippines  
**Golden launch case:** Christmas 2026

## 1. Vision

Build a calm, mobile-first local-commerce platform connected to a real family store while preserving the physical POS as an independent protected system.

Mhenching Online combines four ideas:

1. **Real local commerce** — customers see stock that is actually nearby.
2. **Discovery commerce** — useful and surprising low-cost products shown through short demonstrations.
3. **Local maker commerce** — Magdalena/Sorsogon handicrafts and native products with provenance and maker stories.
4. **Fulfillment infrastructure** — pickup, local delivery, provincial shipping and, later, a local courier layer.

## 2. Primary customer promise

**See it → understand it → order it → get it locally.**

Customers should always understand:

- what the product is;
- why it is useful or meaningful;
- price;
- whether it is available;
- pickup/delivery choices;
- what happens after checkout.

## 3. Product principles

### 3.1 Quiet commerce

The interface must be calm and breathable. No fake countdowns, fabricated scarcity, flashing sale banners or deceptive urgency.

### 3.2 Mobile first

The primary experience is a phone. All critical actions must be thumb-friendly and obvious to users who are not sophisticated ecommerce shoppers.

### 3.3 Local-first advantage

The store competes on trust, nearby availability, curated selection and fulfillment speed — not catalog size.

### 3.4 Lean inventory

New products follow:

**Scout → Score → Sample → Demonstrate → Measure → Reorder or Kill**

Typical initial test quantity: **3–5 units**.

### 3.5 Human approval

AI/ranking systems can recommend products, but a human approves publication, sourcing and scale-up.

### 3.6 Physical POS protection

The website cannot directly mutate physical-store stock tables. Stock-sensitive actions use the approved Inventory Bridge contract.

## 4. Commercial lanes

### 4.1 Mhenching Finds

Affordable products selected for usefulness, novelty locally, price attractiveness, margin, demonstration value, low return/safety risk, storage/delivery practicality and evergreen potential.

### 4.2 Gawang Magdalena

Local goods may include buri/anahaw/karagumoy handicrafts, woven bags/bayong, home décor, native Christmas ornaments, pili and suitable food products, local delicacies, craft and farm products, and other verified Magdalena/Sorsogon-made goods.

Local products are **not** optimized for cheapest price. Fair maker economics and authenticity are first-class values.

Required local-product fields should eventually include maker/producer, barangay/town, materials, story/provenance, production lead time, available quantity, capacity/week, wholesale/consignment/made-to-order model, dimensions/weight, shipping class, and international eligibility/compliance notes.

### 4.3 Seasonal Finds

Christmas 2026 first. Later: school opening, fiestas, Valentine’s, Mother’s/Father’s Day, rainy season and others.

### 4.4 Everyday Mhenching

A selected online subset of ordinary store inventory.

## 5. Initial geography

### Zone 1 — Sta. Magdalena

- store pickup;
- same-day/local delivery when operationally available;
- COD/cash on pickup;
- digital payment workflow.

### Zone 2 — Sorsogon Province

- scheduled delivery;
- courier/shipping;
- consolidated delivery runs where practical.

### Future — Philippines and international

Suitable native/handmade goods may later support domestic and international shipping, subject to packaging, customs, food, plant/material and carrier rules.

## 6. Customer-facing MVP

### Home

Search, Mhenching Finds, Gawang Magdalena, New Arrivals, Best Sellers, seasonal collections, budget shortcuts, products available today, and local fulfillment/trust messaging.

### Browse/Search

Simple filtering by price, availability, category, newest, Mhenching Finds, local-made, and seasonal collection.

### Product detail

Strong imagery/video, product name, price, short explanation, “Why this is useful” or “Story of this product,” real availability state, quantity, Add to Cart / Buy Now, pickup and delivery options, related products, and maker profile for local products.

### Cart

Quantity/edit/remove, subtotal, delivery estimate/method, promo/bundle support, restrained cross-sells, checkout.

### Checkout

Guest checkout allowed. Minimum: name, mobile/contact, pickup/delivery selection, address if needed, payment method, order summary, explicit next step.

Initial payment modes:

- cash on delivery;
- cash on pickup;
- approved digital/QR payment workflow.

### Order confirmation/status

Order lifecycle visible in plain language.

## 7. Online order state machine

Normal path:

`draft → pending_reservation → reserved → confirmed → preparing → ready → out_for_delivery / ready_for_pickup → completed`

Exceptional states:

`reservation_failed`, `cancelled`, `failed_delivery`, `returned`, `refunded`.

Every transition must be auditable.

## 8. Inventory behavior

The online store may cache availability for browsing but must revalidate at reservation/checkout.

Canonical formula presented to the website:

**Available to promise = physical on-hand − existing protected reservations − unavailable/damaged allocation**

The POS-side implementation owns the exact stock arithmetic.

Online flow:

1. request availability;
2. request reservation with idempotency key;
3. receive reservation token/expiry;
4. confirm order/payment as appropriate;
5. bridge commits/reconciles sale through approved POS-side logic;
6. cancel or expiry releases reservation.

## 9. Mhenching Radar — product intelligence

### Workflow

`NEW → REVIEWED → SAMPLE → TESTING → WINNER → LISTED → SCALE`

or `REJECTED / DEAD`.

### Regular Mhenching Product Score (100)

- genuine usefulness — 15;
- customer demand — 15;
- price attractiveness — 10;
- gross-margin potential — 10;
- demo/wow factor — 10;
- novelty locally — 10;
- supplier reliability — 10;
- easy storage/delivery — 5;
- low return/safety risk — 10;
- evergreen potential — 5.

Suggested interpretation: 80–100 test now; 65–79 watch/sample; 50–64 weak/maybe; below 50 ignore.

### Gawang Magdalena score (100)

- local authenticity — 20;
- craft/story/cultural value — 15;
- quality — 15;
- customer appeal — 10;
- fair maker economics — 15;
- gift/pasalubong potential — 10;
- production reliability — 5;
- shipping/storage practicality — 5;
- differentiation — 5.

### Signals

Radar should eventually ingest internal sales, product-page views, add-to-cart rate, checkout rate, sell-through speed, returns/cancellations, searches with no result, customer requests, supplier price changes, content performance, manual local-scout submissions, and approved external trend/marketplace signals.

## 10. Christmas 2026 validation

Discovery shortcuts:

- Gifts Under ₱100;
- Under ₱200;
- Under ₱300;
- For Kids;
- For Students;
- For Mama;
- For Papa;
- For Jowa;
- Monito/Monita;
- Useful Gifts;
- Funny Gifts;
- Christmas Décor;
- Gawang Magdalena Christmas.

Test loop:

1. scout ~100 candidates;
2. score and shortlist;
3. acquire tiny samples;
4. make short demo content;
5. launch measured product pages/campaign links;
6. track views → visits → carts → orders;
7. reorder winners;
8. stop losers.

Prefer mostly evergreen/giftable stock with a smaller Christmas-only allocation to limit dead stock after December.

## 11. Funnels and attribution

Track:

`Traffic source → Campaign → Landing/Product View → Add to Cart → Checkout → Order → Fulfillment → Repeat Purchase`

Initial source dimensions: Facebook, TikTok, Messenger/share, QR, direct, referral, campaign URL, and future paid ads.

## 12. Bundles and merchandising

Support bundles composed of underlying SKUs. Inventory must reserve/deduct components, not just the marketing bundle wrapper.

Examples: Student Gift Bundle, Kids Surprise Pack, Useful Home Bundle, Christmas Mystery Box, Family Christmas Box, Rider Bundle.

## 13. Customers

Maintain only useful commerce data: contact identity, delivery addresses, order history, fulfillment preference, referral/coupon state, support notes when necessary. Avoid unnecessary collection of sensitive personal data.

## 14. Local delivery

MVP supports configured delivery zones and fees. Future: rider assignment, routing, delivery tracking, proof of delivery, consolidated runs, independent local courier service.

## 15. Success criteria

MVP succeeds when:

1. customers can order from a phone without assistance;
2. website availability is reconciled with actual store stock;
3. checkout cannot oversell the final unit under concurrent orders;
4. physical POS remains unaffected by storefront failures;
5. staff can fulfill pickup/local-delivery orders simply;
6. campaign source can be attributed to orders;
7. basic margin can be calculated;
8. product tests identify winners and losers;
9. Christmas collections can launch without code changes;
10. local products can carry maker/provenance data and made-to-order/consignment modes.

## 16. Explicit non-goals for MVP

- replacing the physical POS;
- becoming a general marketplace for all merchants;
- autonomous purchasing without human approval;
- complex route optimization;
- international shipping automation;
- full accounting suite;
- invasive customer tracking.
