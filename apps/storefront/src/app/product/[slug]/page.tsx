import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductVisual } from "@/components/ProductVisual";
import { formatPeso, getProduct, products } from "@/lib/catalog";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.descriptor
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <section className="product-page">
      <div className="shell">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">The Porch</Link><span>/</span><Link href="/browse">Shop</Link><span>/</span><span>{product.name}</span>
        </nav>

        <div className="product-detail">
          <div className="product-detail__visual">
            <ProductVisual kind={product.visual} label={product.name} />
          </div>

          <div className="product-detail__copy">
            <div className="eyebrow">{product.lane === "local" ? "Gawang Magdalena" : product.lane === "find" ? "Mhenching Find" : "Seasonal Find"}</div>
            <h1>{product.name}</h1>
            <div className="price">{formatPeso(product.price)}</div>
            <div className={`stock stock--${product.stock}`}>{product.stockLabel}</div>
            <p className="product-lead">{product.descriptor}</p>

            <div className="detail-panel">
              <h2>{product.lane === "local" ? "Why this belongs here" : "Why we like this"}</h2>
              <p>{product.why}</p>
            </div>

            {product.origin ? (
              <div className="detail-panel">
                <h2>Place & provenance</h2>
                <p>{product.origin}{product.maker ? ` · ${product.maker}` : ""}. This remains a prototype until the maker/source record is verified.</p>
              </div>
            ) : null}

            <div className="fulfillment-list" aria-label="Fulfillment choices">
              <div className="fulfillment-row"><strong>Pickup at Mhenching</strong><span>Planned · free</span></div>
              <div className="fulfillment-row"><strong>Sta. Magdalena delivery</strong><span>Planned · fee by zone</span></div>
              <div className="fulfillment-row"><strong>Stock validation</strong><span>POS bridge required before launch</span></div>
            </div>

            <div className="product-actions">
              <Link className="button" href="/cart">Add to prototype cart</Link>
              <Link className="soft-button" href="/browse">Keep browsing</Link>
            </div>

            <div className="tag-list">
              {product.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
