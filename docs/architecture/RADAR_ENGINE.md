# Mhenching Radar — Product Opportunity Engine

## Goal

Turn product sourcing into a measured decision loop rather than intuition-only buying.

`Discover → Understand → Score → Test 3–5 → Measure → Reorder or Kill`

## Two scoring lanes

### Regular Mhenching Finds

100-point weights:

- genuine usefulness — 15
- customer demand — 15
- price attractiveness — 10
- gross-margin potential — 10
- demo/wow factor — 10
- local novelty — 10
- supplier reliability — 10
- storage/delivery ease — 5
- low return/safety risk — 10
- evergreen potential — 5

### Gawang Magdalena

100-point weights:

- local authenticity — 20
- craft/story value — 15
- quality — 15
- customer appeal — 10
- fair maker economics — 15
- gift/pasalubong potential — 10
- production reliability — 5
- shipping/storage practicality — 5
- differentiation — 5

Local products deliberately do **not** include cheapest-price pressure as a primary criterion.

## Decisions

- 80–100 → `TEST_NOW`, normally up to 5 units
- 65–79 → `SAMPLE_WATCH`, normally up to 3 units
- 50–64 → `WEAK_MAYBE`, normally one sample only
- below 50 → `IGNORE`, no working capital yet

These are recommendations, never purchase authorization.

## Economics

The engine calculates:

`landed cost = supplier price + inbound transport + packaging + payment cost + expected loss`

Then:

- gross contribution
- gross margin %
- markup %
- margin signal: LOSS / THIN / WORKABLE / STRONG

## Agent role

A future Radar agent may collect or normalize supplier offers, estimate candidate inputs, and pre-score opportunities. It must preserve source/evidence and uncertainty.

An authorized human approves:

- actual purchase quantity
- supplier commitment
- live product claims
- price changes with material margin impact

## Next persistence layer

Once the dedicated online Supabase project exists, store:

- candidates
- suppliers/makers
- offers
- score snapshots
- economics snapshots
- test drops
- content/campaign signals
- sales/returns
- reorder/kill decisions

The pure scoring/economics package remains deterministic and independently testable.
