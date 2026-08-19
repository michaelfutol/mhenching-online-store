import Link from "next/link";
import { ChristmasAmbient } from "@/components/ChristmasAmbient";
import { ProductCard } from "@/components/ProductCard";
import { christmasProducts, localProducts } from "@/lib/catalog";

const budgets = [
  ["Under ₱100", "/browse?q=under-100", "Tiny gifts and useful little finds"],
  ["Under ₱200", "/browse?q=under-200", "Easy exchange-gift territory"],
  ["Gawang Magdalena", "/browse?lane=local", "Handmade and rooted close to home"],
  ["Something useful", "/browse?q=useful", "Gifts that keep earning their shelf space"]
] as const;

export const metadata = {
  title: "Christmas World",
  description: "A calm Christmas shopping world from Mhenching Online — useful gifts, local craft and tiny discoveries."
};

export default function ChristmasWorldPage() {
  return (
    <div className="christmas-world">
      <ChristmasAmbient />

      <section className="christmas-hero">
        <div className="shell christmas-hero-grid">
          <div>
            <div className="eyebrow">Paskong Mhenching · Christmas 2026</div>
            <h1>A little Christmas magic, without the shopping noise.</h1>
            <p>
              Small gifts, useful discoveries and local craft in a quieter Christmas world. We’ll test tiny batches first,
              photograph the real products beautifully, and let customers show us what deserves a bigger shelf.
            </p>
            <div className="hero-actions">
              <Link className="button" href="/browse?lane=seasonal">Browse Christmas Finds</Link>
              <Link className="button button--secondary" href="/browse?lane=local">Gawang Magdalena</Link>
            </div>
          </div>

          <div className="christmas-hero-card">
            <small>Quiet Christmas · real local discovery</small>
            <h2>Giftable. Useful. Thoughtful.</h2>
            <p>Tiny multicolored lights, gentle snow, and products that remain the real focus.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-heading">
            <div>
              <div className="eyebrow">Find by feeling or budget</div>
              <h2>Start small. Find something worth giving.</h2>
            </div>
          </div>
          <div className="christmas-budget-grid">
            {budgets.map(([label, href, note]) => (
              <Link className="christmas-budget-card" href={href} key={label}>
                <strong>{label}</strong>
                <small>{note}</small>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="shell">
          <div className="section-heading">
            <div>
              <div className="eyebrow">Christmas test collection</div>
              <h2>Seasonal ideas we can validate before scaling.</h2>
              <p>Prototype listings remain clearly labeled until sourcing, price, maker and real stock are verified.</p>
            </div>
          </div>
          <div className="product-grid">
            {christmasProducts.map((product) => <ProductCard key={product.slug} product={product} />)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell christmas-local-story">
          <div className="eyebrow">Christmas, made in Magdalena</div>
          <h2>Things from here can travel far beyond here.</h2>
          <p>
            Native-material ornaments, woven pieces, pili products and thoughtful handmade gifts can become a signature
            Christmas lane once the real makers, provenance, production capacity and export readiness are verified.
          </p>
          <Link className="button" href="/browse?lane=local">Explore local-made products ({localProducts.length})</Link>
        </div>
      </section>
    </div>
  );
}
