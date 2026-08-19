# Manual Payments MVP — GCash / QR / COD

## Decision

Mhenching Online MVP will **not require a percentage-fee payment gateway**.

Primary rails:

1. Cash on Delivery — enabled only for approved local delivery zones, initially Sta. Magdalena Poblacion.
2. Cash on Pickup — for store pickup.
3. Manual GCash transfer — to the official Mhenching receiving account.
4. Manual QR payment — using the official Mhenching QR.

Payment gateways remain optional future adapters and are not part of the MVP acceptance gate.

## Principle

Keep customer UX simple while keeping verification auditable underneath.

### Customer experience

`Choose payment → see exact amount + official payment details → send payment → enter reference/upload proof → wait for verification`

### Staff experience

`Pending verification → compare with actual receiving-account history → Verify / Reject / Ask customer`

## Manual GCash / QR state machine

- `unpaid`
- `awaiting_manual_payment`
- `submitted_for_verification`
- `verified`
- `rejected`
- `refunded`

An uploaded screenshot is **not proof by itself**. It is supporting evidence only. A staff member must compare against the actual receiving-account transaction history before marking the payment verified.

## Order reference

Each order should receive a short human-friendly payment reference in addition to its internal UUID, e.g. `MH-2419`.

Checkout should display:

- order reference;
- exact amount;
- official account name;
- official GCash number or QR;
- clear instruction to save the order reference;
- field for GCash transaction/reference number;
- optional proof-image upload.

Payment recipient details must come from server-controlled/admin configuration, never hard-coded customer-facing JSX.

## COD policy

COD availability is zone-controlled.

Initial zone:

- Sta. Magdalena Poblacion — COD allowed.

COD records should include amount to collect, collection state, collector/rider/staff identifier, collection timestamp and exception notes.

Repeated refused/failed COD deliveries may become a customer risk signal, but automated blocking should not be introduced without human review.

## Admin UI

Payment verification queue should show only what staff needs:

- order ref;
- customer;
- amount due;
- submitted transaction/reference number;
- optional proof image;
- submitted time;
- `Verify payment` / `Reject` / `Ask customer`.

## Customer attendant behavior

The resident attendant may:

- show official payment instructions;
- explain COD/pickup eligibility;
- report verified payment states once the live order tool is connected;
- ask for missing reference information;
- escalate mismatches.

It may **not** verify a payment, issue a refund, or alter receiving-account details.

## Security

- Only public receiving information intended for customers may be displayed.
- Never expose login credentials, OTPs, wallet PINs, API secrets or recovery data.
- Admin verification actions require authenticated staff and are audit logged.
- Proof images are private commerce data and require controlled storage access.
- Payment configuration changes require elevated permission.
