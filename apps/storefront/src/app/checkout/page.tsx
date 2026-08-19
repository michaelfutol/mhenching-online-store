import Link from "next/link";
import { formatPeso } from "@/lib/catalog";

const prototypeTotal = 327;

export default function CheckoutPage() {
  return (
    <div className="shell">
      <header className="page-title">
        <div className="eyebrow">Simple by design</div>
        <h1>Checkout without the obstacle course.</h1>
        <p className="muted">Guest checkout is the default. This is a visual prototype; submitting real orders is intentionally disabled.</p>
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
              <div className="option-card"><strong>Local delivery</strong><span>Sta. Magdalena · fee will depend on delivery zone</span></div>
              <div className="option-card"><strong>Sorsogon delivery</strong><span>Later phase · scheduled/courier fulfillment</span></div>
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
              <div className="option-card option-card--selected"><strong>Cash on pickup</strong><span>Pay when you collect the order.</span></div>
              <div className="option-card"><strong>Cash on delivery</strong><span>Available when the delivery zone supports it.</span></div>
              <div className="option-card"><strong>QR / digital</strong><span>Planned after the payment confirmation workflow is finalized.</span></div>
            </div>
          </section>
        </div>

        <aside className="summary-card" aria-label="Checkout summary">
          <h2>Almost there</h2>
          <div className="summary-row"><span>Items</span><span>{formatPeso(prototypeTotal)}</span></div>
          <div className="summary-row"><span>Pickup</span><span>Free</span></div>
          <div className="summary-row summary-row--total"><span>Prototype total</span><span>{formatPeso(prototypeTotal)}</span></div>
          <button className="button" type="button" disabled aria-disabled="true">Place order after bridge integration</button>
          <div className="summary-note">Production checkout will reserve stock atomically before confirming the order.</div>
          <Link className="soft-button" href="/cart" style={{ width: "100%", marginTop: 10 }}>Back to cart</Link>
        </aside>
      </div>
    </div>
  );
}
