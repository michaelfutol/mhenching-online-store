# Mhenching Sourcing Lanes

Mhenching Online should not behave like a random marketplace. The store is deliberately curated around two complementary sourcing lanes, with local Magdalena products kept as a third identity lane.

## Lane A — China Innovation Radar

Purpose: discover cheap, practical, recently emerging products that solve an everyday annoyance or make a common task noticeably easier.

Default test order: **12 pieces per approved product**.

Selection filters:
- clear practical benefit in one sentence;
- strong 6–15 second demo potential;
- low landed-cost target with room for healthy markup;
- low storage burden;
- simple variants;
- low regulatory and return risk;
- preferably MOQ 12 or lower, although MOQ 10 is acceptable if we order 12;
- not merely a commodity already sold everywhere locally at the same price.

Workflow:
`DISCOVER → VERIFY SUPPLIER → GET 12-PC DELIVERED QUOTE → RADAR SCORE → APPROVE → ORDER → RECEIVE → QA → ACTUAL LANDED COST → OWN PHOTO/VIDEO → PHYSICAL STOCK → ONLINE DRAFT → PUBLISH → REORDER/KILL`

The first six verified Wave 1 candidates live in `apps/storefront/src/lib/chinaDirectCandidates.ts`.

## Lane B — Local Bargain / Warehouse Finds

Purpose: exploit real Philippine bargains such as S&R/warehouse sales, distributor promotions, clearance lines and other legitimate discounted food/household items that Magdalena customers would otherwise need to travel for or order online.

Examples:
- imported snacks;
- chocolates/candies;
- shelf-stable sauces/condiments;
- beverages where transport/storage is sensible;
- household consumables;
- seasonal giftable food packs.

Scoring differs from China gadgets because the constraints are different:
- real expiry date and remaining shelf life;
- temperature/storage requirements;
- package integrity;
- current sale price vs normal price;
- transport cost from source to Magdalena;
- realistic local retail price;
- unit margin and absolute peso contribution;
- demand familiarity;
- potential for COD/local delivery;
- perishability/slow-moving risk.

No food item should be bought simply because it is discounted. A bargain is only a bargain if it still sells at a healthy contribution before expiry.

## Lane C — Gawang Magdalena / Sorsogon

Purpose: preserve Mhenching's own identity instead of becoming only a reseller.

Priority:
- handicrafts;
- pili products;
- native materials/products;
- local gift sets;
- later export-ready products.

This lane uses the separate local-product Radar score, which explicitly values authenticity, maker economics, story, quality and differentiation.

## Curation Rule

Small catalog is acceptable. Poorly curated catalog is not.

Every approved Mhenching Find should have:
1. a clean name;
2. a one- or two-sentence human introduction;
3. a concrete use case;
4. one strong short-video demonstration idea;
5. actual Mhenching photography/video after receiving;
6. verified price and stock;
7. transparent fulfillment availability.

The goal is for customers to feel: **“Mhenching already filtered the internet for me.”**
