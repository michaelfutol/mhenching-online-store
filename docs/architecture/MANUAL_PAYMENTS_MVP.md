# Manual Payments MVP — GCash / QR / COD

## Decision

Mhenching Online MVP will **not require a percentage-fee payment gateway**.

Primary rails:

1. Cash on Delivery — enabled only for approved local delivery zones, initially Sta. Magdalena Poblacion.
2. Cash on Pickup — for store pickup.
3. Manual GCash transfer — to the official Mhenching receiving account.
4. Manual QR payment — using the official Mhenching QR.

PayMongo/provider integrations remain optional future adapters and are not part of the MVP acceptance gate.

## Principle

Keep customer UX simple while keeping verification auditable underneath.

### Customer experience

`Choose payment → see exact amount + official payment details → send payment → enter reference/upload proof → wait for verification`

### Staff experience

`Pending verification → compare with actual receiving-account history → Verify / Reject`

## Manual GCash / QR state machine

- `unpaid`
- `awaiting_manual_payment`
- `submitted_for_verification`
- `verified`
- `rejected`
- `refunded` (later/manual process)

An uploaded screenshot is **not proof by itself**. It is supporting evidence only. A staff member must compare against the actual account/merchant transaction history before marking the payment verified.

## Order reference

Each order receives a short human-friendly payment reference in addition to its internal UUID, e.g. `MH-2419`.

The checkout screen should display:

- order reference;
- exact amount;
- official account name;
- official GCash number or QR;
- clear instruction to include/save the order reference;
- field for GCash transaction/reference number;
- optional proof-image upload.

Payment recipient details must come from server-controlled/admin configuration, not hard-coded JSX.

## COD policy

COD availability is zone-controlled.

Initial proposed zone:

- Sta. Magdalena Poblacion — COD allowed.

Admin may later enable nearby barangays individually.

COD order records should include:

- amount to collect;
- collection state: `not_collected`, `collected`, `short`, `waived`, `failed`;
- collector/rider/staff identifier;
- collected timestamp;
- note/reason for exception.

Repeated refused/failed COD deliveries may become a customer risk signal, but automated blocking should not be introduced without human review.

## Cash on Pickup

Cash is collected at Mhenching. Staff marks the order paid when collected. This should remain extremely simple for Chingmen.

## Admin UI

Payment verification queue should show only what staff needs:

- order ref;
- customer;
- amount due;
- submitted transaction/reference number;
- optional proof image;
- submitted time;
- buttons: `Verify payment` / `Reject` / `Ask customer`.

Advanced audit data stays hidden unless needed.

## Customer chat behavior

The customer assistant may:

- show official payment instructions;
- explain COD/pickup eligibility;
- report `waiting for verification` / `verified` / `rejected` states;
- ask customer for missing reference information;
- escalate mismatches.

It may **not** verify a payment, issue a refund, or alter the receiving account.

## Security

- Only public receiving information intended for customers may be displayed.
- Never expose login credentials, OTPs, wallet PINs, API secrets, or account recovery data.
- Admin verification actions require authenticated staff and are audit logged.
- Proof images are private commerce data and require controlled storage access.
- Payment configuration changes require elevated/admin permission.

## Future upgrade path

If volume grows enough that manual reconciliation costs more than gateway fees, provider adapters such as PayMongo can be re-enabled without redesigning order/payment state because the system keeps a provider-neutral payment model.