# Admin Cockpit — UI/UX Contract

## Goal

Give Michael and Chingmen one private operating surface for daily commerce while keeping advanced system complexity underneath.

## First-screen doctrine

The admin home should answer these questions in under 10 seconds:

- What needs attention now?
- What sold / what is moving?
- What stock or payment needs action?
- What product opportunities are waiting?
- What can I ask Lum to do?

## Surface hierarchy

### Daily actions

- Add Item
- Orders
- Payments
- Low Stock
- Today / recent performance

### Intelligence

- Mhenching Radar candidates
- no-result / unmet demand
- campaign performance
- margin signals
- reorder / kill suggestions

### Lum command area

The UI may expose a private command surface, but it must not imply capabilities that are not connected. Before MCP/service tools are live, commands are shown as examples/status only.

## Data-state rule

Preview builds must clearly distinguish:

- `LIVE` — backed by persisted verified data;
- `PREVIEW` — sample/demo data;
- `BLOCKED` — requires Supabase/POS/service integration.

Never display demo KPI values as if they are real store sales.

## Security

- Admin route remains server-gated and non-indexable until Supabase Auth/roles are implemented.
- No public link from storefront navigation.
- No secrets or POS service credentials in browser bundles.
- Sensitive write actions eventually require scoped roles, audit entries and appropriate confirmations.
