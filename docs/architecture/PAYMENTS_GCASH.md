# GCash Payment Integration — PayMongo Checkout

## Decision

Use **PayMongo Checkout/API** as the first online payment provider for GCash instead of accepting screenshots or relying on a personal GCash wallet.

Why:

- hosted checkout keeps wallet authorization outside our app;
- payment state can be verified server-side;
- webhooks support reliable reconciliation;
- the provider can later expose additional rails (QR Ph, Maya, cards, online banking) without redesigning checkout;
- merchant settlement stays separate from customer screenshots/manual proof.

## Scope

Initial payment methods:

- `cash_pickup`
- `cash_delivery`
- `gcash`

Later:

- `qrph`
- `maya`
- cards / online banking where commercially useful.

## Security invariants

1. `PAYMONGO_SECRET_KEY` is server-only and must never use a `NEXT_PUBLIC_` prefix.
2. Browser-submitted totals are never trusted.
3. Checkout sessions are created only from a server-validated order/quote.
4. Redirect success is **not** proof of payment; webhook/provider verification determines `paid` state.
5. Webhook events are idempotently recorded before changing order state.
6. Payment provider IDs are stored for reconciliation, refunds and support.
7. Live mode remains disabled until Mhenching has an activated merchant account and explicit production configuration.

## Intended flow

```text
Customer checkout
  ↓
Create validated online order + inventory reservation
  ↓
Server creates PayMongo Checkout Session (GCash allowed)
  ↓
Customer redirected to hosted PayMongo checkout
  ↓
GCash authorization
  ↓
PayMongo redirects customer back
  +
PayMongo webhook confirms actual payment state
  ↓
Online order payment_state = paid
  ↓
Order confirmation / fulfillment
```

## Required environment

```text
PAYMONGO_SECRET_KEY=sk_test_...   # test first
PAYMONGO_WEBHOOK_SECRET=...       # if/when provider webhook signing is configured
NEXT_PUBLIC_APP_URL=https://preview-or-production-host
```

No live keys are committed to GitHub.

## Provider boundary

App code should depend on a `PaymentGateway`-style service contract, not PayMongo-specific fields everywhere. The first adapter is PayMongo; another provider can be added without rewriting the order domain.

## Production gate

GCash is considered **connected** only when all are true:

- merchant account activated for GCash;
- test checkout succeeds end-to-end;
- webhook payment confirmation succeeds;
- duplicate webhook replay is harmless;
- cancelled/failed payment returns to a recoverable order state;
- one controlled live payment is reconciled against provider settlement;
- refund procedure is documented and permission-gated.
