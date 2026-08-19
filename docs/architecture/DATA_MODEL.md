# Online Commerce Data Model — Draft v0.1

The online store keeps its own commerce/discovery data and references physical-store SKUs through stable external identifiers.

## Core entities

### Catalog

- `catalog_products`
- `product_variants`
- `categories`
- `collections`
- `product_media`
- `product_content`
- `external_inventory_links`

### Local makers

- `makers`
- `maker_products`
- `provenance_records`
- `production_capacity`

### Commerce

- `customers`
- `customer_addresses`
- `carts`
- `cart_items`
- `online_orders`
- `online_order_items`
- `payments`
- `fulfillments`
- `inventory_reservations`

### Delivery

- `delivery_zones`
- `delivery_quotes`
- `delivery_assignments` (future)

### Merchandising

- `promotions`
- `bundles`
- `bundle_components`
- `coupons`
- `referrals`

### Funnel analytics

- `campaigns`
- `attribution_touches`
- `funnel_events`

### Mhenching Radar

- `product_candidates`
- `candidate_sources`
- `candidate_scores`
- `candidate_tests`
- `product_signals`
- `suppliers`
- `supplier_offers`

## Important rule

`external_inventory_links` maps an online variant to the physical POS SKU/barcode/domain identifier. It does not copy ownership of physical inventory into the online database.
