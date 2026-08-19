import Link from "next/link";

export function Header() {
  return (
    <header className="site-header">
      <div className="announcement">Delivering locally in Sta. Magdalena · real-store inventory integration coming next</div>
      <div className="shell header-row">
        <Link className="brand" href="/" aria-label="Mhenching Online home">
          <span className="brand-mark" aria-hidden="true">M</span>
          <span>
            <strong>Mhenching</strong>
            <small>Online</small>
          </span>
        </Link>

        <form className="search" action="/browse" method="get" role="search">
          <label className="sr-only" htmlFor="site-search">Search Mhenching</label>
          <input id="site-search" name="q" type="search" placeholder="Search useful little things…" />
          <button type="submit">Search</button>
        </form>

        <nav className="top-nav" aria-label="Main navigation">
          <Link href="/browse">Shop</Link>
          <Link href="/browse?lane=local">Gawang Magdalena</Link>
          <Link href="/browse?lane=seasonal">Christmas</Link>
          <Link className="cart-link" href="/cart">Cart <span aria-hidden="true">2</span></Link>
        </nav>
      </div>
    </header>
  );
}
