# Automated Customer Chat — Architecture v0.1

## Current status

Customer chat automation is **not yet implemented**. This document defines the intended design so it can be added without turning customer support into an unbounded autonomous agent.

## Goal

Give customers fast help for common questions while escalating uncertain, sensitive or money-impacting cases to Chingmen/Michael.

## Channels

Phase 1:
- website chat widget

Later:
- Messenger / Facebook page integration
- other approved channels where practical

## What the assistant may answer automatically

- product availability summary from approved catalog/availability service
- store hours / pickup instructions
- delivery-zone and fee information
- order-status lookup after customer verification
- product discovery / gift suggestions
- basic Gawang Magdalena maker/product stories from approved published data
- common payment instructions
- return/cancellation policy summaries

## Must escalate

- refund requests
- price disputes
- complaints involving injury/safety
- payment mismatch
- lost/failed delivery
- custom promises not represented in system policy
- supplier/maker disputes
- anything requiring a discretionary discount or compensation

## Architecture

```text
Customer
  ↓
Website Chat UI
  ↓
Customer Support Service
  ├── approved FAQ / policy retrieval
  ├── catalog search
  ├── order status tool
  ├── delivery tool
  ├── payment status tool
  └── escalation queue
        ↓
   Chingmen / Michael / Lum Admin
```

## Intelligence model

Use a retrieval/tool-first assistant. It should not invent store facts from model memory.

Possible model stack:
- hosted senior model for difficult cases
- local Ollama "Intern Lum" for classification, summarization and low-risk draft replies after evaluation

## Human handoff

The interface must always provide a simple path to:
- "Talk to Mhenching"
- leave name/mobile/message
- continue from the same conversation context

## Logging and privacy

- record conversation ID, timestamps, channel, tool calls and escalation state;
- store only necessary customer contact/order references;
- do not expose other customers' order information;
- redact secrets and internal supplier costs from customer responses.

## Success gate

The chat system is considered automated only when it can successfully handle a measured set of common customer questions, escalate correctly, and retrieve real order/catalog/payment data through scoped tools rather than hallucinating answers.
