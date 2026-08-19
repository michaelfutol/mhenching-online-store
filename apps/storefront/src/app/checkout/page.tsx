"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { formatPeso, getProduct } from "@/lib/catalog";

export default function CheckoutPage() {
  const { lines } = useCart();
  const rows = lines
    .map((line) => ({ product: getProduct(line.slug), quantity: line.quantity }))
    .filter((row): row is { product: NonNullable<ReturnType<typeof getProduct>>; quantity: number } => Boolean(row.product));
  const subtotal = rows.reduce((sum, row) => sum + row.product.price * row.quantity, 0);

  if (!rows.length) {
    return (
      <div className="shell">
        <header className="page-title">
          <div className="eyebrow">Checkout</div>
          <h1>Your basket is empty.</h1>
          <p className="muted">Add a product first, then come back here. We keep checkout intentionally quiet and short.</p>
        </header>
        <Link className="button" href="/browse">Browse products</Link>
      </div>
    );
  }

  return (
    <div className="shell">
      <header className="page-title">
        <div className="eyebrow">Simple by design</div>
        <h1>Checkout without the obstacle course.</h1>
        <p className="muted">Guest checkout stays simple. Real order submission is still gated until the separate online database and protected inventory bridge are connected.</p>
      </header>

      <div className="checkout-layout">
        <div>
          <section className="checkout-card">
            <h2>1. Who should we contact?</h2>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="name">Name</label>
                <input id="name" placeholder="Your name" autoComplete="name" />
              </div>
              <div className="field">
                <label htmlFor="mobile">Mobile number</label>
                <input id="mobile" placeholder="09xx xxx xxxx" inputMode="tel" autoComplete="tel" />
              </div>
            </div>
          </section>

          <section className="checkout-card">
            <h2>2. How would you like to receive it?</h2>
            <div className="option-grid">
              <div className="option-card option-card--selected"><strong>Store pickup</strong><span>Free · Mhenching Variety, Sta. Magdalena</span></div>
              <div className="option-card"><strong>Local delivery</strong><span>Sta. Magdalena Poblacion first · COD where the configured zone allows it</span></div>
              <div className="option-card"><strong>Sorsogon delivery</strong><span>Later phase · scheduled/courier fulfillment after the local flow is proven</span></div>
            </div>
          </section>

          <section className="checkout-card">
            <h2>3. If delivery is selected</h2>
            <div className="form-grid">
              <div className="field field--full">
                <label htmlFor="address">Address / landmark</label>
                <textarea id="address" rows={3} placeholder="Barangay, street or a clear nearby landmark" />
              </div>
              <div className="field">
                <label htmlFor="barangay">Barangay</label>
                <input id="barangay" placeholder="Barangay" />
              </div>
              <div className="field">
                <label htmlFor="notes">Delivery notes</label>
                <input id="notes" placeholder="Optional" />
              </div>
            </div>
          </section>

          <section className="checkout-card">
            <h2>4. Payment</h2>
            <div className="option-grid">
              <div className="option-card option-card--selected"><strong>Cash on pickup</strong><span>Pay when you collect the order at Mhenching.</span></div>
              <div className="option-card"><strong>Cash on delivery</strong><span>For approved local delivery zones, initially Magdalena Poblacion.</span></div>
              <div className="option-card"><strong>Manual GCash / official QR</strong><span>Send the exact amount, submit the transaction reference, then Mhenching verifies the actual incoming transaction.</span></div>
            </div>
            <p className="summary-note" style={{ marginTop: 12 }}>A payment screenshot is supporting evidence only. It never marks an order paid by itself.</p>
          </section>
        </div>

        <aside className="summary-card" aria-label="Checkout summary">
          <h2>Almost there</h2>
          {rows.map(({ product, quantity }) => (
            <div className="summary-row" key={product.slug}>
              <span>{quantity} × {product.name}</span>
              <span>{formatPeso(product.price * quantity)}</span>
            </div>
          ))}
          <div className="summary-row"><span>Pickup</span><span>Free</span></div>
          <div className="summary-row summary-row--total"><span>Cart total</span><span>{formatPeso(subtotal)}</span></div>
          <button className="button" type="button" disabled aria-disabled="true">Place order after live backend gate</button>
          <div className="summary-note">Production checkout will re-price the cart server-side, reserve stock through the approved bridge where needed, then create the order and selected manual/COD payment workflow.</div>
          <Link className="soft-button" href="/cart" style={{ width: "100%", marginTop: 10 }}>Back to cart</Link>
        </aside>
      </div>
    </div>
  );
}
