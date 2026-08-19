# Admin, MCP and Mhenching Radar Architecture

## 1. Admin UX

The admin application is part of the online-store system, not the physical POS.

Primary operator surfaces:

- Dashboard
- Orders
- Products
- Quick Add
- Collections
- Delivery
- Customers
- Mhenching Radar
- Analytics
- Settings

### Quick Add

The default product-creation flow is intentionally small:

`photo → name → price → stock/availability → category → save`

Optional fields and AI suggestions appear only when useful.

## 2. Analytics

The dashboard should prefer actions over vanity metrics.

Examples:

- low stock needing reorder;
- products with high views but low conversion;
- items searched for but unavailable;
- products selling out quickly;
- slow stock tied up in capital;
- top campaigns by completed order, not merely clicks;
- Gawang Magdalena sales by maker/product;
- delivery performance;
- estimated contribution margin.

Analytics remains deterministic from transaction/event data. Agents may summarize or recommend actions, but must not fabricate metrics.

## 3. Mhenching Radar

Radar is a product-opportunity pipeline, not an autonomous purchasing bot.

Sources may include:

- internal store searches;
- customer requests;
- supplier catalogs/offers;
- approved marketplace/trend research;
- local maker submissions;
- seasonal opportunity research;
- product performance and returns.

Pipeline:

`discovered → normalized → scored → reviewed → sampled → testing → winner/listed → scale`

Every candidate should keep evidence/source references so a human can understand why it was recommended.

## 4. Arbitrage / Product Finder Agent

The agent's purpose is broader than classical Amazon arbitrage. It should identify economically attractive products that fit the Mhenching context.

For each candidate it should estimate or record:

- source price;
- shipping/inbound cost;
- taxes/fees when applicable;
- landed cost;
- proposed retail price;
- gross contribution/margin;
- minimum order quantity;
- supplier reliability evidence;
- availability/lead time;
- novelty and usefulness;
- demo/content potential;
- safety/compliance risk;
- storage and delivery difficulty;
- likely evergreen vs seasonal risk.

The agent may prepare a purchase recommendation. It may not autonomously place supplier orders without explicit human authorization.

## 5. MCP / Lum Administrator

Provide an MCP server or equivalent tool surface over stable application services rather than direct database access.

### Read tools

- products/search
- product detail
- availability
- orders/status
- sales summary
- low stock
- funnel analytics
- no-result searches
- Radar candidates
- supplier/maker records

### Draft/write tools

- create product draft
- update draft
- create Radar candidate
- add candidate evidence
- score/re-score candidate
- prepare collection/campaign draft
- update fulfillment status within allowed transitions

### Elevated tools

- publish/unpublish product
- change public price
- cancel/refund order
- publish campaign

Elevated tools require stronger role/scope and immutable audit records.

### Never expose as direct MCP tools

- arbitrary SQL execution;
- service-role credentials;
- unrestricted POS writes;
- raw payment secrets;
- autonomous inventory purchasing.

## 6. Agent identity and audit

Every agent request should record:

- actor/service identity;
- tool name;
- target resource;
- input summary/hash where appropriate;
- outcome;
- timestamp;
- human approval reference when required.

The goal is for Lum in Work/Codex to be a capable application administrator without becoming an invisible superuser.

## 7. Separation from POS

MCP tools that need inventory information call the approved Inventory Bridge. They never bypass it to write to the physical POS database.
