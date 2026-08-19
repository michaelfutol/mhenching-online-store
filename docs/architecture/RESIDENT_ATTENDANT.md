# Resident Mhenching Attendant

## Purpose

Provide a calm always-available front-desk assistant inside the storefront without allowing a language model to invent stock, payment status, order status, discounts, refunds or delivery promises.

## Architecture

```text
Customer chat widget
      ↓
Resident Attendant API
      ↓
Intent / safety router
      ├── catalog search
      ├── Christmas/budget discovery
      ├── local-product discovery
      ├── payment-policy knowledge
      ├── delivery-policy knowledge
      ├── order-status tool (when live DB exists)
      └── human handoff
            ↓
      Chingmen / Michael
```

## Current implementation

The first resident version is deliberately **tool/retrieval first** and requires no paid model. It can already:

- greet and explain capabilities;
- search the current pilot catalog;
- find budget-based product ideas;
- surface Christmas suggestions;
- surface Gawang Magdalena/local products;
- explain COD, Cash on Pickup, manual GCash and official QR policy;
- explain local pickup/delivery scope;
- detect sensitive refund/payment/complaint/order-status intents and hand off instead of guessing.

## Next intelligence layer

A model may later improve natural-language interpretation, summarization and tone, but model output remains subordinate to authoritative tools.

Preferred future sequence:

1. deterministic tool/policy answer exists;
2. Intern Lum/Ollama may classify intent and draft a reply;
3. resident service validates tool results and policy boundaries;
4. only safe final text reaches the customer;
5. uncertain/sensitive cases escalate.

## Local LLM role

The local Ollama intern is best suited initially for:

- intent classification;
- product-query normalization;
- multilingual/Taglish paraphrasing;
- drafting answers from retrieved facts;
- summarizing a conversation before human handoff.

It must not be the source of truth for inventory, payments or order status.

A Vercel-hosted storefront cannot directly call an Ollama server running only inside a home/store LAN. To make local inference available to the public resident attendant later, use a deliberately secured reachable gateway or keep the local intern on admin/back-office tasks while the public attendant uses deterministic tools or a cloud model.

## Handoff policy

Mandatory human handoff for:

- payment mismatch / charged but no order;
- refund requests;
- damaged/wrong item complaints;
- fraud/scam allegations;
- discretionary discount requests;
- manual payment verification;
- account/payment-recipient changes;
- uncertain order status before identity/order verification.

## Privacy

Do not request sensitive data in free chat if a dedicated verified flow can be used instead. Conversation logs should have retention controls and should not expose proof images or customer addresses to the model unnecessarily.

## Success gate

Resident Attendant v1 is successful when a customer can get correct product/payment/delivery guidance at any hour, discover products conversationally, and be handed to a person for sensitive cases without the assistant fabricating operational facts.
