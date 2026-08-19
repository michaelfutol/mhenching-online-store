import { recommendRegularCandidate, type RegularCandidateInput } from "@mhenching/radar";

const USD_TO_PHP_SNAPSHOT = 61.73;

export type ChinaDirectCandidate = {
  id: string;
  name: string;
  supplier: string;
  sourcePlatform: "Alibaba";
  sourceUrl: string;
  sourcePriceUsdLow: number;
  sourcePriceUsdHigh: number;
  sourcePricePhpLow: number;
  sourcePricePhpHigh: number;
  supplierMinimumOrder: number;
  mhenchingTestQty: number;
  supplierEvidence: string;
  shortIntro: string;
  adAngle: string;
  targetRetailPhp: number;
  economicsStatus: "EX_FACTORY_ONLY";
  status: "RADAR_CANDIDATE";
  recommendation: ReturnType<typeof recommendRegularCandidate>;
};

function php(usd: number) {
  return Math.round(usd * USD_TO_PHP_SNAPSHOT);
}

function candidate(input: {
  id: string;
  name: string;
  supplier: string;
  sourceUrl: string;
  sourcePriceUsdLow: number;
  sourcePriceUsdHigh: number;
  supplierMinimumOrder: number;
  supplierEvidence: string;
  shortIntro: string;
  adAngle: string;
  targetRetailPhp: number;
  score: RegularCandidateInput;
}): ChinaDirectCandidate {
  return {
    id: input.id,
    name: input.name,
    supplier: input.supplier,
    sourcePlatform: "Alibaba",
    sourceUrl: input.sourceUrl,
    sourcePriceUsdLow: input.sourcePriceUsdLow,
    sourcePriceUsdHigh: input.sourcePriceUsdHigh,
    sourcePricePhpLow: php(input.sourcePriceUsdLow),
    sourcePricePhpHigh: php(input.sourcePriceUsdHigh),
    supplierMinimumOrder: input.supplierMinimumOrder,
    mhenchingTestQty: 12,
    supplierEvidence: input.supplierEvidence,
    shortIntro: input.shortIntro,
    adAngle: input.adAngle,
    targetRetailPhp: input.targetRetailPhp,
    economicsStatus: "EX_FACTORY_ONLY",
    status: "RADAR_CANDIDATE",
    recommendation: recommendRegularCandidate(input.score)
  };
}

export const chinaDirectCandidates: ChinaDirectCandidate[] = [
  candidate({
    id: "cn-motion-light-01",
    name: "Rechargeable motion-sensor night light",
    supplier: "Shenzhen Yuyang Technology Co., Ltd.",
    sourceUrl: "https://www.alibaba.com/wholesale/rechargeable-motion-sensor-lamp.html",
    sourcePriceUsdLow: 0.49,
    sourcePriceUsdHigh: 0.67,
    supplierMinimumOrder: 10,
    supplierEvidence: "Alibaba current listing signal: MOQ 10, 784 sold, 6-year supplier, 4.4/5 supplier rating at sourcing time.",
    shortIntro: "A small light that wakes up when you walk past it. No electrician, no wall wiring—use it in cabinets, stairs, hallways or beside the bed.",
    adAngle: "Dark cabinet or stair → person approaches → light turns on instantly.",
    targetRetailPhp: 129,
    score: {
      usefulness: 9,
      customerDemand: 9,
      priceAttractiveness: 9,
      marginPotential: 8,
      demoWow: 9,
      localNovelty: 7,
      supplierReliability: 8,
      storageDeliveryEase: 9,
      lowReturnSafetyRisk: 7,
      evergreenPotential: 9
    }
  }),
  candidate({
    id: "cn-mini-sealer-01",
    name: "USB rechargeable mini bag sealer",
    supplier: "Shenzhen Dike Technology Co., Ltd.",
    sourceUrl: "https://www.alibaba.com/wholesale/sealer-rechargeable.html",
    sourcePriceUsdLow: 0.58,
    sourcePriceUsdHigh: 0.73,
    supplierMinimumOrder: 10,
    supplierEvidence: "Alibaba current listing signal: MOQ 10, 60 sold, 9-year supplier, 4.7/5 supplier rating at sourcing time.",
    shortIntro: "For the snack bag you opened but did not finish. Heat-seal the edge again instead of folding it five times and hoping it stays crisp.",
    adAngle: "Open chips → quick seal pass → neat resealed edge in a few seconds.",
    targetRetailPhp: 149,
    score: {
      usefulness: 8,
      customerDemand: 9,
      priceAttractiveness: 9,
      marginPotential: 9,
      demoWow: 10,
      localNovelty: 7,
      supplierReliability: 9,
      storageDeliveryEase: 9,
      lowReturnSafetyRisk: 7,
      evergreenPotential: 8
    }
  }),
  candidate({
    id: "cn-pet-hair-roller-01",
    name: "Reusable self-cleaning pet-hair remover",
    supplier: "Huizhou Shengfeng Feather Craft Factory",
    sourceUrl: "https://www.alibaba.com/showroom/lint-roller.html",
    sourcePriceUsdLow: 0.70,
    sourcePriceUsdHigh: 0.75,
    supplierMinimumOrder: 10,
    supplierEvidence: "Alibaba current listing signal: MOQ 10, 2,488 sold, 6-year supplier, 4.6/5 supplier rating at sourcing time.",
    shortIntro: "A reusable cleaner for fur, lint and buhok sa sofa, bedsheet or clothes—no sticky refill roll to keep buying.",
    adAngle: "Hairy dark fabric → two or three passes → clean fabric + show collected hair compartment.",
    targetRetailPhp: 129,
    score: {
      usefulness: 9,
      customerDemand: 9,
      priceAttractiveness: 8,
      marginPotential: 8,
      demoWow: 10,
      localNovelty: 6,
      supplierReliability: 9,
      storageDeliveryEase: 9,
      lowReturnSafetyRisk: 9,
      evergreenPotential: 9
    }
  }),
  candidate({
    id: "cn-foldable-phone-stand-01",
    name: "360° foldable metal phone stand",
    supplier: "Shenzhen Puxinda Technology Co., Ltd.",
    sourceUrl: "https://www.alibaba.com/wholesale/mobile-phone-standing.html",
    sourcePriceUsdLow: 0.48,
    sourcePriceUsdHigh: 0.56,
    supplierMinimumOrder: 1,
    supplierEvidence: "Alibaba current listing signal: MOQ 1, 567 sold, 8-year supplier, 4.6/5 supplier rating at sourcing time. Mhenching still tests 12 pieces for consistent intake economics.",
    shortIntro: "A sturdy little stand for video calls, recipes, study videos or watching while eating—fold it down when you are done.",
    adAngle: "Phone leaning on random objects → unfold/rotate stand → stable portrait and landscape setup.",
    targetRetailPhp: 79,
    score: {
      usefulness: 8,
      customerDemand: 9,
      priceAttractiveness: 10,
      marginPotential: 9,
      demoWow: 7,
      localNovelty: 5,
      supplierReliability: 9,
      storageDeliveryEase: 10,
      lowReturnSafetyRisk: 9,
      evergreenPotential: 10
    }
  }),
  candidate({
    id: "cn-sink-splash-guard-01",
    name: "Silicone sink splash / faucet water catcher",
    supplier: "Fuyang Jiarun Sports Goods Co., Ltd.",
    sourceUrl: "https://www.alibaba.com/pla/Silicone-Sink-Faucet-Mat-Splash-Guard_1601711087918.html",
    sourcePriceUsdLow: 0.56,
    sourcePriceUsdHigh: 0.66,
    supplierMinimumOrder: 10,
    supplierEvidence: "Alibaba current product listing: MOQ 10, 4.3/5 rating with 95 reviews at sourcing time.",
    shortIntro: "A simple silicone mat that helps catch the wet mess around the faucet before it spreads across the counter.",
    adAngle: "Wet countertop around faucet → place mat → splash water → cleaner, contained sink area.",
    targetRetailPhp: 119,
    score: {
      usefulness: 8,
      customerDemand: 7,
      priceAttractiveness: 9,
      marginPotential: 9,
      demoWow: 9,
      localNovelty: 8,
      supplierReliability: 7,
      storageDeliveryEase: 9,
      lowReturnSafetyRisk: 9,
      evergreenPotential: 9
    }
  }),
  candidate({
    id: "cn-groove-brush-01",
    name: "Hard-bristle gap / window-groove cleaning brush",
    supplier: "Yongkang Jujian Brush Co., Ltd.",
    sourceUrl: "https://www.alibaba.com/countrysearch/CN/groove-brush.html",
    sourcePriceUsdLow: 0.08,
    sourcePriceUsdHigh: 0.10,
    supplierMinimumOrder: 10,
    supplierEvidence: "Alibaba current listing signal: MOQ 10, 10,700 sold, 12-year supplier, 4.9/5 supplier rating at sourcing time.",
    shortIntro: "Tiny brush, annoying problem solved. Pang singit ng window tracks, grout gaps, drawer corners and other places a normal cleaning brush cannot reach.",
    adAngle: "Dust packed into a narrow groove → one or two brush passes → satisfying clean line.",
    targetRetailPhp: 39,
    score: {
      usefulness: 8,
      customerDemand: 8,
      priceAttractiveness: 10,
      marginPotential: 10,
      demoWow: 9,
      localNovelty: 7,
      supplierReliability: 10,
      storageDeliveryEase: 10,
      lowReturnSafetyRisk: 10,
      evergreenPotential: 9
    }
  })
];

export const chinaDirectFxSnapshot = {
  usdToPhp: USD_TO_PHP_SNAPSHOT,
  capturedAt: "2026-08-20",
  note: "Source-cost conversion only. Freight, duty/tax, consolidation, local handling and defects are not included."
};
