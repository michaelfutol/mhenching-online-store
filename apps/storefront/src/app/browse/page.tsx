import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { products, type ProductLane } from "@/lib/catalog";

type SearchParams = Promise<{ q?: string; lane?: string }>;

const laneOptions: Array<{ label: string; value?: ProductLane }> = [
  { label: "All" },
  { label: "Mhenching Finds", value: "find" },
  { label: "Gawang Magdalena", value: "local" },
  { label: "Seasonal", value: "seasonal" }
];

export default async function BrowsePage({ searchParams }: { searchParams: SearchParams }) {
  const { q = "", lane } = await searchParams;
  const normalized = q.trim().toLowerCase();
  const validLane = laneOptions.some((option) => option.value === lane) ? lane as ProductLane : undefined;

  const filtered = products.filter((product) => {
    const laneMatches = !validLane || product.lane === validLane;
    const haystack = [product.name, product.descriptor, product.why, product.origin ?? "", ...product.tags].join(" ").toLowerCase();
    return laneMatches && (!normalized || haystack.includes(normalized));
  });

  return (
    <section className="browse-hero">
      <div className="shell">
        <div className="eyebrow">Browse quietly</div>
        <h1>{validLane === "local" ? "Gawang Magdalena" : validLane === "find" ? "Mhenching Finds" : validLane === "seasonal" ? "Seasonal Finds" : "Everything worth a look"}</h1>
        <p className="muted">Prototype catalog data only. Real price, stock, maker provenance, and delivery promises will come from verified records and the protected POS integration.</p>

        <div className="browse-controls" aria-label="Browse filters">
          {laneOptions.map((option) => {
            const href = option.value ? `/browse?lane=${option.value}${normalized ? `&q=${encodeURIComponent(normalized)}` : ""}` : normalized ? `/browse?q=${encodeURIComponent(normalized)}` : "/browse";
            const active = option.value === validLane || (!option.value && !validLane);
            return <Link key={option.label} className={`chip ${active ? "chip--active" : ""}`} href={href}>{option.label}</Link>;
          })}
        </div>

        <div className="results-note">{filtered.length} result{filtered.length === 1 ? "" : "s"}{normalized ? ` for “${q}”` : ""}</div>

        {filtered.length ? (
          <div className="product-grid">
            {filtered.map((product) => <ProductCard key={product.slug} product={product} />)}
          </div>
        ) : (
          <div className="empty-state">
            <div className="eyebrow">Nothing here yet</div>
            <h2>Tell Mhenching what you were trying to find.</h2>
            <p className="muted">Later, searches with no result will become one of Mhenching Radar’s most useful demand signals.</p>
            <Link className="button" href="/browse">Clear search</Link>
          </div>
        )}
      </div>
    </section>
  );
}
