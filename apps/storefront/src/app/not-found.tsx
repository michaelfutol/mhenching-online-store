import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="shell empty-state">
        <div className="eyebrow">We looked on the shelf</div>
        <h1>That page is not here.</h1>
        <p className="muted">It may have moved, sold out, or simply does not exist in the prototype catalog.</p>
        <Link className="button" href="/browse">Browse Mhenching</Link>
      </div>
    </section>
  );
}
