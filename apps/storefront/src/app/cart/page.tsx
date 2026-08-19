"use client";

import Link from "next/link";
import { ProductVisual } from "@/components/ProductVisual";
import { useCart } from "@/components/CartProvider";
import { formatPeso, getProduct } from "@/lib/catalog";

export default function CartPage() {
  const { lines, setQuantity, removeItem, clearCart } = useCart();
  const rows = lines
    .map((line) => ({ product: getProduct(line.slug), quantity: line.quantity }))
    .filter((row): row is { product: NonNullable<ReturnType<typeof getProduct>>; quantity: number } => Boolean(row.product));
  const subtotal = rows.reduce((sum, row) => sum + row.product.price * row.quantity, 0);

  return (
    <div className="shell">
      <header className="page-title">
        <div className="eyebrow">Your basket</div>
        <h1>{rows.length ? "A small basket." : "Your basket is still quiet."}</h1>
        <p className="muted">Cart contents stay on this device for now. Production checkout will revalidate stock before creating an order.</p>
      </header>

      {!rows.length ? (
        <section className="checkout-card">
          <h2>Nothing here yet.</h2>
          <p className="muted">Browse Mhenching Finds, Gawang Magdalena, or Christmas World and add only what feels worth bringing home.</p>
          <div className="product-actions">
            <Link className="button" href="/browse">Browse the shop</Link>
            <Link className="soft-button" href="/christmas">Christmas World</Link>
          </div>
        </section>
      ) : (
        <div className="cart-layout">
          <div className="cart-list">
            {rows.map(({ product, quantity }) => (
              <article className="cart-item" key={product.slug}>
                <ProductVisual kind={product.visual} label={product.name} compact />
                <div>
                  <h2>{product.name}</h2>
                  <p>{product.descriptor}</p>
                  <div className="qty-controls" aria-label={`Quantity controls for ${product.name}`}>
                    <button type="button" className="soft-button" onClick={() => setQuantity(product.slug, quantity - 1)} aria-label="Decrease quantity">−</button>
                    <span className="qty">Qty <strong>{quantity}</strong></span>
                    <button type="button" className="soft-button" onClick={() => setQuantity(product.slug, quantity + 1)} aria-label="Increase quantity">+</button>
                    <button type="button" className="text-button" onClick={() => removeItem(product.slug)}>Remove</button>
                  </div>
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
            <button className="soft-button" type="button" onClick={clearCart} style={{ width: "100%", marginTop: 10 }}>Clear basket</button>
            <div className="summary-note">No order or stock reservation is created yet. Real checkout stays blocked until the online backend and POS bridge are live.</div>
          </aside>
        </div>
      )}
    </div>
  );
}
