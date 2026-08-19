import Link from "next/link";
import { formatPeso, type Product } from "@/lib/catalog";
import { ProductVisual } from "@/components/ProductVisual";

type Props = {
  product: Product;
};

const laneLabels: Record<Product["lane"], string> = {
  find: "Mhenching Find",
  local: "Gawang Magdalena",
  seasonal: "Seasonal Find",
  everyday: "Everyday Mhenching"
};

export function ProductCard({ product }: Props) {
  return (
    <article className="product-card">
      <Link className="product-card__visual-link" href={`/product/${product.slug}`} aria-label={`View ${product.name}`}>
        <ProductVisual kind={product.visual} label={product.name} compact />
      </Link>
      <div className="product-card__body">
        <div className="product-card__eyebrow">{laneLabels[product.lane]}</div>
        <Link className="product-card__title" href={`/product/${product.slug}`}>{product.name}</Link>
        <p className="product-card__desc">{product.descriptor}</p>
        <div className="product-card__footer">
          <div>
            <div className="price">{formatPeso(product.price)}</div>
            <div className={`stock stock--${product.stock}`}>{product.stockLabel}</div>
          </div>
          <Link className="soft-button soft-button--small" href={`/product/${product.slug}`}>View</Link>
        </div>
      </div>
    </article>
  );
}
