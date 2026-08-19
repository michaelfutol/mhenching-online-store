export type Score10 = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type RegularCandidateInput = {
  usefulness: Score10;
  customerDemand: Score10;
  priceAttractiveness: Score10;
  marginPotential: Score10;
  demoWow: Score10;
  localNovelty: Score10;
  supplierReliability: Score10;
  storageDeliveryEase: Score10;
  lowReturnSafetyRisk: Score10;
  evergreenPotential: Score10;
};

export type LocalCandidateInput = {
  localAuthenticity: Score10;
  craftStoryValue: Score10;
  quality: Score10;
  customerAppeal: Score10;
  fairMakerEconomics: Score10;
  giftPasalubongPotential: Score10;
  productionReliability: Score10;
  shippingStoragePracticality: Score10;
  differentiation: Score10;
};

export type CandidateEconomicsInput = {
  supplierPriceCentavos: number;
  inboundShippingCentavos?: number;
  packagingCentavos?: number;
  paymentCostCentavos?: number;
  expectedLossCentavos?: number;
  targetRetailCentavos: number;
};

export type EconomicsResult = {
  landedCostCentavos: number;
  grossContributionCentavos: number;
  grossMarginPercent: number;
  markupPercent: number;
};

export type RadarDecision = "TEST_NOW" | "SAMPLE_WATCH" | "WEAK_MAYBE" | "IGNORE";

export type RadarRecommendation = {
  score: number;
  decision: RadarDecision;
  suggestedTestQuantity: number;
  rationale: string;
};

const regularWeights: Record<keyof RegularCandidateInput, number> = {
  usefulness: 15,
  customerDemand: 15,
  priceAttractiveness: 10,
  marginPotential: 10,
  demoWow: 10,
  localNovelty: 10,
  supplierReliability: 10,
  storageDeliveryEase: 5,
  lowReturnSafetyRisk: 10,
  evergreenPotential: 5
};

const localWeights: Record<keyof LocalCandidateInput, number> = {
  localAuthenticity: 20,
  craftStoryValue: 15,
  quality: 15,
  customerAppeal: 10,
  fairMakerEconomics: 15,
  giftPasalubongPotential: 10,
  productionReliability: 5,
  shippingStoragePracticality: 5,
  differentiation: 5
};

function assertMoney(value: number, label: string) {
  if (!Number.isSafeInteger(value) || value < 0) {
    throw new Error(`${label} must be a non-negative whole centavo amount.`);
  }
}

function weightedScore<T extends Record<string, Score10>>(input: T, weights: Record<keyof T, number>) {
  return Math.round(
    Object.entries(weights).reduce((sum, [key, weight]) => {
      const value = input[key as keyof T];
      return sum + (value / 10) * weight;
    }, 0)
  );
}

export function scoreRegularCandidate(input: RegularCandidateInput) {
  return weightedScore(input, regularWeights);
}

export function scoreLocalCandidate(input: LocalCandidateInput) {
  return weightedScore(input, localWeights);
}

export function calculateCandidateEconomics(input: CandidateEconomicsInput): EconomicsResult {
  assertMoney(input.supplierPriceCentavos, "supplierPriceCentavos");
  assertMoney(input.inboundShippingCentavos ?? 0, "inboundShippingCentavos");
  assertMoney(input.packagingCentavos ?? 0, "packagingCentavos");
  assertMoney(input.paymentCostCentavos ?? 0, "paymentCostCentavos");
  assertMoney(input.expectedLossCentavos ?? 0, "expectedLossCentavos");
  assertMoney(input.targetRetailCentavos, "targetRetailCentavos");

  const landedCostCentavos =
    input.supplierPriceCentavos +
    (input.inboundShippingCentavos ?? 0) +
    (input.packagingCentavos ?? 0) +
    (input.paymentCostCentavos ?? 0) +
    (input.expectedLossCentavos ?? 0);

  const grossContributionCentavos = input.targetRetailCentavos - landedCostCentavos;
  const grossMarginPercent = input.targetRetailCentavos === 0
    ? 0
    : (grossContributionCentavos / input.targetRetailCentavos) * 100;
  const markupPercent = landedCostCentavos === 0
    ? 0
    : (grossContributionCentavos / landedCostCentavos) * 100;

  return {
    landedCostCentavos,
    grossContributionCentavos,
    grossMarginPercent: Number(grossMarginPercent.toFixed(1)),
    markupPercent: Number(markupPercent.toFixed(1))
  };
}

export function recommendFromScore(score: number): RadarRecommendation {
  if (!Number.isFinite(score) || score < 0 || score > 100) {
    throw new Error("Radar score must be between 0 and 100.");
  }

  if (score >= 80) {
    return {
      score,
      decision: "TEST_NOW",
      suggestedTestQuantity: 5,
      rationale: "Strong candidate. Validate with a tiny 3–5 unit test before scaling."
    };
  }

  if (score >= 65) {
    return {
      score,
      decision: "SAMPLE_WATCH",
      suggestedTestQuantity: 3,
      rationale: "Promising but not yet strong enough for meaningful stock. Sample and collect evidence."
    };
  }

  if (score >= 50) {
    return {
      score,
      decision: "WEAK_MAYBE",
      suggestedTestQuantity: 1,
      rationale: "Weak candidate. Only sample if there is a strategic reason or strong customer request."
    };
  }

  return {
    score,
    decision: "IGNORE",
    suggestedTestQuantity: 0,
    rationale: "Do not spend working capital yet. Keep only as a low-priority watch item."
  };
}

export function recommendRegularCandidate(input: RegularCandidateInput) {
  return recommendFromScore(scoreRegularCandidate(input));
}

export function recommendLocalCandidate(input: LocalCandidateInput) {
  const score = scoreLocalCandidate(input);
  const base = recommendFromScore(score);
  return {
    ...base,
    rationale: score >= 65
      ? `${base.rationale} For local-made goods, preserve fair maker economics; do not force commodity-low pricing.`
      : base.rationale
  };
}

export function grossMarginSignal(result: EconomicsResult) {
  if (result.grossContributionCentavos <= 0) return "LOSS" as const;
  if (result.grossMarginPercent < 20) return "THIN" as const;
  if (result.grossMarginPercent < 35) return "WORKABLE" as const;
  return "STRONG" as const;
}
