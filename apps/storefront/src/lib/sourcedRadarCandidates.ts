import {
  calculateCandidateEconomics,
  recommendRegularCandidate,
  type RegularCandidateInput
} from "@mhenching/radar";

type SourcedRadarCandidate = {
  id: string;
  name: string;
  source: string;
  sourceItemId: string;
  sourceShopId: string;
  sourceShopName: string;
  sourcePriceCentavos: number;
  historicalSoldText: string;
  monthlySoldText: string;
  ratingText: string;
  adAngle: string;
  sourceStatus: "REFERENCE_ONLY";
  upstreamStatus: "CHECK_OPEN" | "NO_CLEAR_MATCH_YET";
  provisional: true;
  economics: ReturnType<typeof calculateCandidateEconomics>;
  recommendation: ReturnType<typeof recommendRegularCandidate>;
};

function buildCandidate(input: {
  id: string;
  name: string;
  sourceItemId: string;
  sourceShopId: string;
  sourceShopName: string;
  sourcePriceCentavos: number;
  historicalSoldText: string;
  monthlySoldText: string;
  ratingText: string;
  adAngle: string;
  inboundShippingCentavos: number;
  packagingCentavos: number;
  targetRetailCentavos: number;
  score: RegularCandidateInput;
  upstreamStatus?: SourcedRadarCandidate["upstreamStatus"];
}): SourcedRadarCandidate {
  return {
    id: input.id,
    name: input.name,
    source: "Shopee PH connected sourcing run · 20 Aug 2026",
    sourceItemId: input.sourceItemId,
    sourceShopId: input.sourceShopId,
    sourceShopName: input.sourceShopName,
    sourcePriceCentavos: input.sourcePriceCentavos,
    historicalSoldText: input.historicalSoldText,
    monthlySoldText: input.monthlySoldText,
    ratingText: input.ratingText,
    adAngle: input.adAngle,
    sourceStatus: "REFERENCE_ONLY",
    upstreamStatus: input.upstreamStatus ?? "NO_CLEAR_MATCH_YET",
    provisional: true,
    economics: calculateCandidateEconomics({
      supplierPriceCentavos: input.sourcePriceCentavos,
      inboundShippingCentavos: input.inboundShippingCentavos,
      packagingCentavos: input.packagingCentavos,
      targetRetailCentavos: input.targetRetailCentavos
    }),
    recommendation: recommendRegularCandidate(input.score)
  };
}

export const sourcedRadarCandidates: SourcedRadarCandidate[] = [
  buildCandidate({
    id: "motion-sensor-light-01",
    name: "Rechargeable motion-sensor cabinet light",
    sourceItemId: "25379455822",
    sourceShopId: "840070410",
    sourceShopName: "NEWHALO",
    sourcePriceCentavos: 5600,
    historicalSoldText: "10K+ sold",
    monthlySoldText: "1K+ sold/month",
    ratingText: "4.5",
    adAngle: "Dark cabinet/stairs → instant light without wiring.",
    inboundShippingCentavos: 1500,
    packagingCentavos: 500,
    targetRetailCentavos: 14900,
    score: {
      usefulness: 9,
      customerDemand: 9,
      priceAttractiveness: 9,
      marginPotential: 8,
      demoWow: 9,
      localNovelty: 7,
      supplierReliability: 7,
      storageDeliveryEase: 9,
      lowReturnSafetyRisk: 7,
      evergreenPotential: 9
    }
  }),
  buildCandidate({
    id: "mini-bag-sealer-01",
    name: "Rechargeable mini bag sealer",
    sourceItemId: "29733942748",
    sourceShopId: "874263603",
    sourceShopName: "IHOMEI",
    sourcePriceCentavos: 8900,
    historicalSoldText: "7K+ sold",
    monthlySoldText: "643 sold/month",
    ratingText: "4.7",
    adAngle: "Open chips/snack bag → clean reseal in seconds.",
    inboundShippingCentavos: 1500,
    packagingCentavos: 500,
    targetRetailCentavos: 17900,
    score: {
      usefulness: 8,
      customerDemand: 9,
      priceAttractiveness: 8,
      marginPotential: 8,
      demoWow: 9,
      localNovelty: 7,
      supplierReliability: 8,
      storageDeliveryEase: 9,
      lowReturnSafetyRisk: 7,
      evergreenPotential: 8
    }
  }),
  buildCandidate({
    id: "cable-clips-20pc-01",
    name: "20-pc adhesive cable organizer clips",
    sourceItemId: "40600020784",
    sourceShopId: "1522332669",
    sourceShopName: "RISING_PH",
    sourcePriceCentavos: 2000,
    historicalSoldText: "8K+ sold",
    monthlySoldText: "1K+ sold/month",
    ratingText: "4.8",
    adAngle: "Messy charging desk → tidy cable path before/after.",
    inboundShippingCentavos: 1000,
    packagingCentavos: 500,
    targetRetailCentavos: 6900,
    score: {
      usefulness: 8,
      customerDemand: 8,
      priceAttractiveness: 10,
      marginPotential: 9,
      demoWow: 7,
      localNovelty: 5,
      supplierReliability: 7,
      storageDeliveryEase: 10,
      lowReturnSafetyRisk: 9,
      evergreenPotential: 9
    }
  }),
  buildCandidate({
    id: "fairy-lights-short-01",
    name: "Battery fairy/string lights · short length",
    sourceItemId: "22309178320",
    sourceShopId: "757677157",
    sourceShopName: "ALLEN MALL",
    sourcePriceCentavos: 1400,
    historicalSoldText: "10K+ sold",
    monthlySoldText: "2K+ sold/month",
    ratingText: "4.8",
    adAngle: "Plain gift/room corner → warm Christmas glow in one cut.",
    inboundShippingCentavos: 1000,
    packagingCentavos: 500,
    targetRetailCentavos: 5900,
    score: {
      usefulness: 6,
      customerDemand: 10,
      priceAttractiveness: 10,
      marginPotential: 9,
      demoWow: 10,
      localNovelty: 5,
      supplierReliability: 7,
      storageDeliveryEase: 10,
      lowReturnSafetyRisk: 8,
      evergreenPotential: 4
    }
  }),
  buildCandidate({
    id: "reusable-lint-remover-01",
    name: "Reusable lint / pet-hair remover",
    sourceItemId: "20891897863",
    sourceShopId: "789592547",
    sourceShopName: "T-ORAS",
    sourcePriceCentavos: 5300,
    historicalSoldText: "10K+ sold",
    monthlySoldText: "929 sold/month",
    ratingText: "4.6",
    adAngle: "Hair-covered cloth/sofa → visibly clean pass for a satisfying demo.",
    inboundShippingCentavos: 1200,
    packagingCentavos: 500,
    targetRetailCentavos: 12900,
    score: {
      usefulness: 9,
      customerDemand: 8,
      priceAttractiveness: 9,
      marginPotential: 8,
      demoWow: 10,
      localNovelty: 6,
      supplierReliability: 7,
      storageDeliveryEase: 9,
      lowReturnSafetyRisk: 8,
      evergreenPotential: 9
    }
  })
];
