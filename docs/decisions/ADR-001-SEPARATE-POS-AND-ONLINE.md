# ADR-001 — Keep Physical POS and Online Store in Separate Repositories

**Status:** Accepted  
**Date:** 2026-08-19

## Context

Mhenching already has a functioning physical-store POS/store-management application. Ecommerce development introduces faster UI iteration, public traffic, campaign experiments, customer-facing dependencies and different deployment risk.

## Decision

Keep:

- `mhenching-store-system` for physical POS/store operations;
- `mhenching-online-store` for customer ecommerce/discovery.

Integrate only through an intentionally narrow inventory/order bridge.

## Consequences

### Positive

- storefront bugs cannot directly break the cash register;
- independent deployments;
- clearer security boundary;
- ecommerce can evolve quickly;
- POS remains operational if website is down.

### Cost

- integration contract must be maintained;
- two deployables;
- eventual consistency for browsing;
- explicit reconciliation required.

The isolation benefit outweighs this cost.
