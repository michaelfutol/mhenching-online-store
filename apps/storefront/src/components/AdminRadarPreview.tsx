import { chinaDirectCandidates, chinaDirectFxSnapshot } from "@/lib/chinaDirectCandidates";

function peso(value: number) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0
  }).format(value);
}

export function AdminRadarPreview() {
  return (
    <section className="admin-panel" id="radar">
      <div className="admin-panel-heading">
        <div>
          <span className="admin-kicker">Radar · connected sourcing</span>
          <h2>China-direct test wave</h2>
        </div>
        <span className="admin-status admin-status-preview">RADAR ONLY</span>
      </div>

      <p className="admin-muted">
        Curated low-MOQ supplier candidates for a 12-piece Mhenching test. Source costs below are ex-factory reference prices converted at the sourcing-run FX snapshot; freight, consolidation, duty/tax, local handling and defects are not yet included. Nothing here is in stock or publicly listed.
      </p>

      <div className="radar-preview-list">
        {chinaDirectCandidates.map((candidate) => (
          <article className="radar-preview-card" key={candidate.id}>
            <div className="radar-preview-topline">
              <div>
                <strong>{candidate.name}</strong>
                <small>{candidate.sourcePlatform} · {candidate.supplier}</small>
              </div>
              <span className={`radar-decision radar-${candidate.recommendation.decision.toLowerCase()}`}>
                {candidate.recommendation.decision.replaceAll("_", " ")}
              </span>
            </div>

            <p className="admin-muted">{candidate.shortIntro}</p>

            <div className="radar-metrics">
              <div><span>Radar score</span><strong>{candidate.recommendation.score}/100</strong></div>
              <div><span>Ex-factory</span><strong>{peso(candidate.sourcePricePhpLow)}–{peso(candidate.sourcePricePhpHigh)}</strong></div>
              <div><span>Supplier MOQ</span><strong>{candidate.supplierMinimumOrder} pcs</strong></div>
              <div><span>Our test</span><strong>{candidate.mhenchingTestQty} pcs</strong></div>
              <div><span>Trial retail</span><strong>{peso(candidate.targetRetailPhp)}</strong></div>
            </div>

            <div className="radar-test-note">
              <strong>Short ad:</strong> {candidate.adAngle}
            </div>
            <div className="radar-test-note">
              <strong>Supplier signal:</strong> {candidate.supplierEvidence}
            </div>
          </article>
        ))}
      </div>

      <p className="admin-muted">
        FX snapshot: $1 = ₱{chinaDirectFxSnapshot.usdToPhp}. Before approval, replace ex-factory price with an actual 12-piece delivered/consolidated quote and re-run margin economics.
      </p>
    </section>
  );
}
