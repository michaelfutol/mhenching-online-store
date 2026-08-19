import {
  calculateCandidateEconomics,
  grossMarginSignal,
  recommendLocalCandidate,
  recommendRegularCandidate
} from "@mhenching/radar";

function peso(centavos: number) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0
  }).format(centavos / 100);
}

const candidates = [
  {
    name: "Example · Compact sensor light",
    source: "Marketplace / wholesale candidate",
    economics: calculateCandidateEconomics({
      supplierPriceCentavos: 7200,
      inboundShippingCentavos: 1200,
      packagingCentavos: 600,
      targetRetailCentavos: 16900
    }),
    recommendation: recommendRegularCandidate({
      usefulness: 9,
      customerDemand: 7,
      priceAttractiveness: 8,
      marginPotential: 8,
      demoWow: 9,
      localNovelty: 7,
      supplierReliability: 6,
      storageDeliveryEase: 9,
      lowReturnSafetyRisk: 7,
      evergreenPotential: 8
    })
  },
  {
    name: "Example · Small kitchen helper",
    source: "Wholesale candidate",
    economics: calculateCandidateEconomics({
      supplierPriceCentavos: 5400,
      inboundShippingCentavos: 1000,
      packagingCentavos: 500,
      targetRetailCentavos: 12900
    }),
    recommendation: recommendRegularCandidate({
      usefulness: 8,
      customerDemand: 7,
      priceAttractiveness: 8,
      marginPotential: 8,
      demoWow: 8,
      localNovelty: 6,
      supplierReliability: 7,
      storageDeliveryEase: 9,
      lowReturnSafetyRisk: 8,
      evergreenPotential: 8
    })
  },
  {
    name: "Example · Native woven gift basket",
    source: "Gawang Magdalena candidate",
    economics: calculateCandidateEconomics({
      supplierPriceCentavos: 18000,
      packagingCentavos: 1800,
      targetRetailCentavos: 34900
    }),
    recommendation: recommendLocalCandidate({
      localAuthenticity: 10,
      craftStoryValue: 9,
      quality: 8,
      customerAppeal: 8,
      fairMakerEconomics: 10,
      giftPasalubongPotential: 9,
      productionReliability: 6,
      shippingStoragePracticality: 7,
      differentiation: 9
    })
  }
];

export function AdminRadarPreview() {
  return (
    <section className="admin-panel" id="radar">
      <div className="admin-panel-heading">
        <div>
          <span className="admin-kicker">Radar · preview data</span>
          <h2>What might be worth testing?</h2>
        </div>
        <span className="admin-status admin-status-preview">PREVIEW</span>
      </div>

      <p className="admin-muted">
        These cards exercise the real deterministic Radar scoring/economics engine, but the candidates below are examples only. Live sourcing candidates will arrive after persistence and intake are connected.
      </p>

      <div className="radar-preview-list">
        {candidates.map((candidate) => {
          const signal = grossMarginSignal(candidate.economics);
          return (
            <article className="radar-preview-card" key={candidate.name}>
              <div className="radar-preview-topline">
                <div>
                  <strong>{candidate.name}</strong>
                  <small>{candidate.source}</small>
                </div>
                <span className={`radar-decision radar-${candidate.recommendation.decision.toLowerCase()}`}>
                  {candidate.recommendation.decision.replaceAll("_", " ")}
                </span>
              </div>

              <div className="radar-metrics">
                <div><span>Score</span><strong>{candidate.recommendation.score}/100</strong></div>
                <div><span>Landed</span><strong>{peso(candidate.economics.landedCostCentavos)}</strong></div>
                <div><span>Gross margin</span><strong>{candidate.economics.grossMarginPercent}%</strong></div>
                <div><span>Margin signal</span><strong>{signal}</strong></div>
              </div>

              <div className="radar-test-note">
                Suggested test: <strong>{candidate.recommendation.suggestedTestQuantity} pcs</strong>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
