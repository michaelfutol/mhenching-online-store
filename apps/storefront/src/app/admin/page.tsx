import { AdminRadarPreview } from "@/components/AdminRadarPreview";
import { PreliminaryStockIntake } from "@/components/PreliminaryStockIntake";
import { QuickAddPreview } from "@/components/QuickAddPreview";

const primaryActions = [
  { href: "#quick-add", label: "Add Item", detail: "Photo → name → price → stock → preview", state: "READY" },
  { href: "#stock-intake", label: "Batch Stock", detail: "Paste many preliminary items and normalize them", state: "PREVIEW" },
  { href: "#operations", label: "Orders", detail: "Order board arrives with persistent backend", state: "BLOCKED" },
  { href: "#operations", label: "Payments", detail: "Manual GCash / QR verification queue", state: "BLOCKED" },
  { href: "#radar", label: "Radar", detail: "Score candidates before spending working capital", state: "PREVIEW" }
];

const readiness = [
  ["Storefront", "98%", "Browse → cart → verified quote"],
  ["Online backend", "65%", "Waiting on dedicated Supabase"],
  ["Admin cockpit", "55%", "Quick Add + batch intake UX ready"],
  ["Resident attendant", "65%", "Catalog/policy answers + handoff"],
  ["Radar", "50%", "Scoring/economics live; persistence next"],
  ["Christmas World", "40%", "Ambient experience built"]
];

export default function AdminPreviewPage() {
  return (
    <div className="admin-preview-page">
      <div className="shell admin-cockpit-shell">
        <header className="admin-page-heading admin-cockpit-heading">
          <div>
            <div className="eyebrow">Private operations cockpit · preview mode</div>
            <h1>Run Mhenching without carrying the complexity.</h1>
            <p>
              Daily actions stay simple. The deeper system—inventory contracts, Radar scoring, analytics, agent tools and audit rules—stays underneath.
            </p>
          </div>
          <div className="admin-live-note">
            <span className="admin-status admin-status-preview">PREVIEW</span>
            <strong>No demo number below is a real store sale.</strong>
            <small>Live KPIs unlock only after the dedicated online database is connected.</small>
          </div>
        </header>

        <nav className="admin-jumpbar" aria-label="Admin sections">
          <a href="#today">Today</a>
          <a href="#quick-add">Add Item</a>
          <a href="#stock-intake">Batch Stock</a>
          <a href="#radar">Radar</a>
          <a href="#lum-admin">Lum</a>
          <a href="#readiness">Milestones</a>
        </nav>

        <section className="admin-action-grid" id="today">
          {primaryActions.map((action) => (
            <a className="admin-action-card" href={action.href} key={action.label}>
              <div className="admin-action-topline">
                <strong>{action.label}</strong>
                <span className={`admin-status admin-status-${action.state.toLowerCase()}`}>{action.state}</span>
              </div>
              <p>{action.detail}</p>
              <span className="admin-action-arrow" aria-hidden="true">→</span>
            </a>
          ))}
        </section>

        <section className="admin-panel" id="operations">
          <div className="admin-panel-heading">
            <div>
              <span className="admin-kicker">Daily operations</span>
              <h2>What needs attention?</h2>
            </div>
            <span className="admin-status admin-status-blocked">BLOCKED BY LIVE DATA</span>
          </div>

          <div className="admin-kpi-grid">
            <article><span>Sales today</span><strong>—</strong><small>Awaiting real orders</small></article>
            <article><span>Orders waiting</span><strong>—</strong><small>Order service not live</small></article>
            <article><span>Payments to verify</span><strong>—</strong><small>Manual GCash queue next</small></article>
            <article><span>Low stock</span><strong>—</strong><small>POS bridge not live</small></article>
          </div>

          <p className="admin-muted admin-data-warning">
            We intentionally show blanks instead of invented KPIs. Once Supabase + order persistence are connected, these cards become the real daily dashboard for Michael and Chingmen.
          </p>
        </section>

        <section className="admin-panel" id="quick-add">
          <div className="admin-panel-heading">
            <div>
              <span className="admin-kicker">Simplest-form admin</span>
              <h2>Add one item without learning the system underneath.</h2>
            </div>
            <span className="admin-status admin-status-ready">UX READY</span>
          </div>
          <p className="admin-muted">Photo, name, price, availability, category, preview. Real Save/Publish unlocks after Auth + Storage + catalog persistence.</p>
          <QuickAddPreview />
        </section>

        <section className="admin-panel" id="stock-intake">
          <div className="admin-panel-heading">
            <div>
              <span className="admin-kicker">Preliminary stock intake</span>
              <h2>Paste a shelf list. Let the system clean it up.</h2>
            </div>
            <span className="admin-status admin-status-preview">PREVIEW</span>
          </div>
          <p className="admin-muted">
            This is the fast path for real Mhenching stock: type or paste many item lines from a shelf count, trip purchase, receipt, or inventory note. The parser validates price/quantity and prepares clean rows without publishing anything.
          </p>
          <PreliminaryStockIntake />
        </section>

        <AdminRadarPreview />

        <section className="admin-panel admin-lum-panel" id="lum-admin">
          <div className="admin-panel-heading">
            <div>
              <span className="admin-kicker">Lum Admin</span>
              <h2>The future command desk.</h2>
            </div>
            <span className="admin-status admin-status-blocked">MCP NOT CONNECTED</span>
          </div>

          <div className="lum-preview-grid">
            <div className="lum-preview-console">
              <div className="lum-preview-avatar">L</div>
              <div>
                <strong>Ask Lum about the shop</strong>
                <p>“Show products below 25% margin.”</p>
                <p>“What should we reorder this week?”</p>
                <p>“Find 20 Christmas candidates under our target landed cost.”</p>
              </div>
            </div>
            <div className="lum-preview-status">
              <span>Available later through scoped tools</span>
              <ul>
                <li>products / inventory / orders</li>
                <li>analytics / campaigns / Radar</li>
                <li>draft actions with audit trail</li>
                <li>elevated actions only with stronger approval</li>
              </ul>
            </div>
          </div>

          <label className="lum-disabled-command">
            <span>Command preview</span>
            <input disabled placeholder="Ask Lum… (enabled after MCP/service tools are connected)" />
          </label>
        </section>

        <section className="admin-panel" id="readiness">
          <div className="admin-panel-heading">
            <div>
              <span className="admin-kicker">Build readiness</span>
              <h2>Where are we?</h2>
            </div>
          </div>
          <div className="admin-readiness-grid">
            {readiness.map(([name, progress, detail]) => (
              <article key={name}>
                <div><strong>{name}</strong><span>{progress}</span></div>
                <p>{detail}</p>
              </article>
            ))}
          </div>
          <div className="admin-next-gate">
            <span>Next hard gate</span>
            <strong>Dedicated Mhenching Online Supabase → Auth → real catalog → real orders.</strong>
          </div>
        </section>
      </div>
    </div>
  );
}
