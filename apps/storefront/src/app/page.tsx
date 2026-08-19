import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { christmasProducts, featuredFinds, localProducts } from "@/lib/catalog";

const quickLinks = [
  ["Mhenching Finds", "/browse?lane=find"],
  ["Gawang Magdalena", "/browse?lane=local"],
  ["Under ₱100", "/browse?q=under-100"],
  ["Under ₱200", "/browse?q=under-200"],
  ["For Home", "/browse?q=home"],
  ["Christmas", "/browse?lane=seasonal"]
] as const;

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <div className="eyebrow">Quiet commerce · Sta. Magdalena</div>
            <h1>Little things worth discovering.</h1>
            <p>Useful finds, thoughtful local craft, and everyday essentials — presented without the noise. Browse slowly. Buy only what feels worth bringing home.</p>
            <div className="hero-actions">
              <Link className="button" href="/browse?lane=find">Explore Mhenching Finds</Link>
              <Link className="button button--secondary" href="/browse?lane=local">Gawang Magdalena</Link>
            </div>
          </div>
          <div className="hero-card" aria-label="Mhenching seasonal preview">
            <span className="hero-card__label">Christmas 2026 · first commercial test</span>
            <div className="hero-card__content">
              <div className="eyebrow">A little Christmas magic</div>
              <h2>Giftable. Useful. Not expensive.</h2>
              <p>We will test tiny batches first, learn what Magdalena actually wants, then scale only the winners.</p>
            </div>
          </div>
        </div>
        <div className="shell quick-links" aria-label="Quick discovery">
          {quickLinks.map(([label, href]) => <Link key={label} className="chip" href={href}>{label}</Link>)}
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-heading">
            <div>
              <div className="eyebrow">Mhenching Finds</div>
              <h2>Small solutions we want to test.</h2>
              <p>Affordable products should earn their shelf space by being useful, demonstrable, or delightfully clever.</p>
            </div>
            <Link className="soft-button" href="/browse?lane=find">See all finds</Link>
          </div>
          <div className="product-grid">
            {featuredFinds.map((product) => <ProductCard key={product.slug} product={product} />)}
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="shell story-card">
          <div className="story-visual" aria-hidden="true" />
          <div className="story-copy">
            <div className="eyebrow">Gawang Magdalena</div>
            <h2>Things from here should be seen beyond here.</h2>
            <p>Handicrafts, native materials, pili, delicacies and maker stories deserve more than a generic listing. We want each local product to carry its provenance, maker economics, and place with dignity.</p>
            <Link className="button" href="/browse?lane=local">Meet the local collection</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-heading">
            <div>
              <div className="eyebrow">Local pilot catalog</div>
              <h2>Gawang Magdalena & Sorsogon.</h2>
              <p>These are prototype listings until we verify real makers, production capacity, price, provenance, and fulfillment.</p>
            </div>
          </div>
          <div className="product-grid">
            {localProducts.map((product) => <ProductCard key={product.slug} product={product} />)}
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="shell trust-grid">
          <article className="trust-card"><div className="trust-icon">✓</div><h3>Real local store</h3><p>The physical Mhenching shop remains the operational anchor.</p></article>
          <article className="trust-card"><div className="trust-icon">↺</div><h3>Real stock later</h3><p>The protected POS bridge will validate availability before reservation.</p></article>
          <article className="trust-card"><div className="trust-icon">⌂</div><h3>Pickup nearby</h3><p>Store pickup is a first-class fulfillment choice, not an afterthought.</p></article>
          <article className="trust-card"><div className="trust-icon">→</div><h3>Gentle delivery</h3><p>Sta. Magdalena local delivery first; provincial expansion after validation.</p></article>
        </div>
      </section>

      <section className="section">
        <div className="shell christmas-banner">
          <div className="eyebrow">Christmas 2026</div>
          <h2>A calmer place to find small gifts people may actually use.</h2>
          <p>Budget collections, native-material Christmas pieces, kids’ gifts, useful home finds, and tiny test drops — without turning the whole store into a red SALE poster.</p>
          <Link className="button" href="/browse?lane=seasonal">Preview Christmas Finds ({christmasProducts.length})</Link>
        </div>
      </section>
    </>
  );
}
