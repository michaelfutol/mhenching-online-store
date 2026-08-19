# POS Inventory Bridge Contract — Draft v0.1

## Goal

Expose the smallest safe integration surface required for online ordering without giving the online store direct control over the physical POS database.

## Invariants

1. POS remains authoritative for physical inventory.
2. Online reservations are atomic.
3. Every mutation is idempotent.
4. Duplicate network retries cannot double-deduct stock.
5. Reservation expiry releases protected quantity.
6. Final sale/commit uses POS-approved logic.
7. All operations are auditable.
8. The bridge can be disabled without breaking physical POS operations.

## Proposed operations

### `GET /availability?sku=...`

Returns a coarse customer-safe availability state plus optional numeric quantity according to merchandising policy.

```json
{
  "sku": "MH-00123",
  "status": "in_stock",
  "availableToPromise": 7,
  "asOf": "2026-08-19T10:00:00+08:00"
}
```

The storefront may display buckets such as `in_stock`, `few_left`, `out_of_stock` instead of exact numbers.

### `POST /reservations`

```json
{
  "idempotencyKey": "checkout_...",
  "onlineOrderId": "...",
  "items": [
    {"sku": "MH-00123", "quantity": 2}
  ]
}
```

Response:

```json
{
  "reservationId": "...",
  "status": "reserved",
  "expiresAt": "...",
  "items": [
    {"sku": "MH-00123", "quantity": 2, "status": "reserved"}
  ]
}
```

MVP preference is whole-cart atomic reservation.

### `POST /reservations/{id}/confirm`

Confirms fulfillment/order acceptance and commits through POS-approved transaction/order logic.

### `POST /reservations/{id}/release`

Releases an unneeded reservation. Idempotent.

### `GET /reservations/{id}`

Used for reconciliation after timeouts.

## Pricing

Do not trust browser-submitted totals.

For MVP either:

- online backend owns online selling price and sends signed/validated price metadata; or
- bridge validates against a POS-exported online price field.

The chosen rule must be documented before production checkout.

## Reconciliation

A scheduled reconciliation process should detect online reservations missing POS acknowledgement, expired but unreleased reservations, confirmed online orders missing physical transaction/order linkage, and stock anomalies.

Reconciliation may alert humans; it must not invent inventory adjustments silently.
