import Link from "next/link";
import { ProductVisual } from "@/components/ProductVisual";
import { formatPeso, getProduct } from "@/lib/catalog";

const cartRows = [
  { product: getProduct("rechargeable-motion-light")!, quantity: 1 },
  { product: getProduct("magnetic-cable-organizers")!, quantity: 2 }
];

export default function CartPage() {
  const subtotal = cartRows.reduce((sum, row) => sum + row.product.price * row.quantity, 0);

  return (
    <div className="shell">
      <header className="page-title">
        <div className="eyebrow">Prototype cart</div>
        <h1>A small basket.</h1>
        <p className="muted">No stock is reserved yet. This screen validates the customer flow only.</p>
      </header>

      <div className="cart-layout">
        <div className="cart-list">
          {cartRows.map(({ product, quantity }) => (
            <article className="cart-item" key={product.slug}>
              <ProductVisual kind={product.visual} label={product.name} compact />
              <div>
                <h2>{product.name}</h2>
                <p>{product.descriptor}</p>
                <span className="qty" aria-label={`Quantity ${quantity}`}>Qty <strong>{quantity}</strong></span>
              </div>
              <div className="price">{formatPeso(product.price * quantity)}</div>
            </article>
          ))}
        </div>

        <aside className="summary-card" aria-label="Order summary">
          <h2>Order summary</h2>
          <div className="summary-row"><span>Items</span><span>{formatPeso(subtotal)}</span></div>
          <div className="summary-row"><span>Pickup</span><span>Free</span></div>
          <div className="summary-row summary-row--total"><span>Total</span><span>{formatPeso(subtotal)}</span></div>
          <Link className="button" href="/checkout">Continue to checkout</Link>
          <div className="summary-note">Prototype only · checkout will revalidate stock through the POS bridge before production launch.</div>
        </aside>
      </div>
    </div>
  );
}
