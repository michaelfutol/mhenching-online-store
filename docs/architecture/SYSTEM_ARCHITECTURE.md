# System Architecture

## Boundary decision

The physical POS and the online store are intentionally separate applications and repositories.

### Physical POS system owns

- authoritative physical inventory mutation;
- in-store checkout;
- restobar billing;
- store transaction ledger;
- manager voids;
- attendant workflows.

### Mhenching Online Store owns

- public catalog and merchandising;
- discovery/search;
- customer cart;
- online checkout orchestration;
- online order records;
- delivery/pickup UX;
- campaigns/funnel attribution;
- customer-facing status;
- Mhenching Radar product intelligence.

## Integration rule

The online application does **not** receive broad database access to the POS system. It communicates through a narrow server-side Inventory Bridge contract.

```text
┌─────────────────────────────┐
│ Customer storefront         │
│ browse/cart/checkout        │
└──────────────┬──────────────┘
               │ server-side
               ▼
┌─────────────────────────────┐
│ Online commerce backend     │
│ orders, funnels, customers  │
└──────────────┬──────────────┘
               │ authenticated bridge calls
               ▼
┌─────────────────────────────┐
│ POS Inventory Bridge        │
│ availability/reservations   │
└──────────────┬──────────────┘
               │ approved RPC/domain operations
               ▼
┌─────────────────────────────┐
│ Physical POS backend        │
│ canonical stock ledger      │
└─────────────────────────────┘
```

## Failure isolation

The storefront may be degraded or offline without preventing physical sales.

If the POS/bridge is unavailable:

- public product browsing may continue using clearly labeled cached state;
- stock-sensitive checkout must fail safely or become inquiry/preorder mode;
- the online app must never assume cached stock is reservable.

## Consistency model

Browsing may use eventually consistent cached availability. Checkout/reservation must use strong, atomic POS-side validation.

## Security boundary

- no POS service-role secret in browser code;
- no direct client-side write access to POS tables;
- bridge credentials are server-only;
- all reservation/confirmation calls have idempotency keys;
- requests and outcomes are audit logged;
- rate limit public-facing operations;
- validate prices and SKU identity server-side.

## Deployment independence

The online store must deploy independently from the POS. A storefront deployment must never require rebuilding or redeploying physical POS devices.
