# Agent Instructions

Before changing code, read in order:

1. `docs/product/PRD.md`
2. `docs/architecture/SYSTEM_ARCHITECTURE.md`
3. `docs/architecture/INVENTORY_BRIDGE.md`
4. `docs/decisions/`
5. `docs/design/STITCH_DESIGN.md`

## Hard rules

- Do not move physical POS code into this repository.
- Do not write directly to physical POS inventory tables from storefront code.
- Do not invent real product stock, maker provenance, delivery promises or pricing.
- Never expose service-role or bridge secrets to the browser.
- Use server-side validation for price, reservation and order-sensitive operations.
- Preserve mobile usability and accessibility over decorative effects.
- Treat Stitch HTML/screens as design references, not business truth.
- Keep Christmas behavior configurable/seasonal, not hard-coded into core navigation.
- Prefer small reviewable changes and tests around inventory/order state transitions.
