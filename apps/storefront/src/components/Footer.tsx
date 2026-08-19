import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <div className="brand brand--footer">
            <span className="brand-mark" aria-hidden="true">M</span>
            <span><strong>Mhenching</strong><small>Online</small></span>
          </div>
          <p className="footer-note">A quieter way to discover useful things, local craft, and everyday essentials from Sta. Magdalena.</p>
        </div>
        <div>
          <h2>Browse</h2>
          <Link href="/browse?lane=find">Mhenching Finds</Link>
          <Link href="/browse?lane=local">Gawang Magdalena</Link>
          <Link href="/browse?lane=seasonal">Seasonal Finds</Link>
        </div>
        <div>
          <h2>Fulfillment</h2>
          <span>Store pickup</span>
          <span>Sta. Magdalena delivery</span>
          <span>Sorsogon expansion later</span>
        </div>
      </div>
      <div className="shell footer-bottom">© 2026 Mhenching Variety · Prototype storefront — stock and delivery data are mocked until POS bridge integration.</div>
    </footer>
  );
}
