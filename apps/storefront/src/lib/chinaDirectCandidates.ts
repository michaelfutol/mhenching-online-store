import { recommendRegularCandidate, type RegularCandidateInput } from "@mhenching/radar";

const USD_TO_PHP_SNAPSHOT = 61.73;

export type ChinaDirectCandidate = {
  id: string;
  name: string;
  supplier: string;
  sourcePlatform: "Alibaba";
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
    supplier: "Shenzhen Frio Technology Co., Ltd.",
    sourcePriceUsdLow: 0.54,
    sourcePriceUsdHigh: 0.72,
    supplierMinimumOrder: 10,
    supplierEvidence: "8-year supplier; 4.8/5 marketplace supplier rating; low-MOQ rechargeable sensor-light listings.",
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
      supplierReliability: 9,
      storageDeliveryEase: 9,
      lowReturnSafetyRisk: 7,
      evergreenPotential: 9
    }
  }),
  candidate({
    id: "cn-mini-sealer-01",
    name: "USB rechargeable mini bag sealer",
    supplier: "Shenzhen Dike Technology Co., Ltd.",
    sourcePriceUsdLow: 0.58,
    sourcePriceUsdHigh: 0.73,
    supplierMinimumOrder: 10,
    supplierEvidence: "9-year supplier; 4.7/5 supplier rating; low-MOQ rechargeable mini-sealer listing.",
    shortIntro: "For the snack bag you opened but did not finish. Heat-seal the edge again instead of folding it five times and hoping it stays crisp.",
    adAngle: "Open chips → quick seal pass → turn bag upside down / neat resealed edge.",
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
    sourcePriceUsdLow: 0.70,
    sourcePriceUsdHigh: 0.75,
    supplierMinimumOrder: 10,
    supplierEvidence: "6-year supplier; 4.6/5; thousands of marketplace orders on the low-MOQ reusable roller listing.",
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
    name: "Foldable multi-angle phone stand",
    supplier: "Shenzhen City Gaowangfei Technology Company Limited",
    sourcePriceUsdLow: 0.14,
    sourcePriceUsdHigh: 0.24,
    supplierMinimumOrder: 10,
    supplierEvidence: "6-year supplier; thousands sold on a low-MOQ universal foldable stand listing.",
    shortIntro: "A pocket-size stand for video calls, recipes, study videos or watching while eating—fold it flat when you are done.",
    adAngle: "Phone leaning on random objects → click open stand → stable portrait/landscape setup.",
    targetRetailPhp: 59,
    score: {
      usefulness: 8,
      customerDemand: 9,
      priceAttractiveness: 10,
      marginPotential: 10,
      demoWow: 7,
      localNovelty: 5,
      supplierReliability: 8,
      storageDeliveryEase: 10,
      lowReturnSafetyRisk: 9,
      evergreenPotential: 10
    }
  }),
  candidate({
    id: "cn-sink-splash-guard-01",
    name: "Silicone sink splash / faucet water catcher",
    supplier: "Yiwu Chengsheng Trade Co., Ltd.",
    sourcePriceUsdLow: 0.25,
    sourcePriceUsdHigh: 0.28,
    supplierMinimumOrder: 10,
    supplierEvidence: "Low-MOQ modern silicone water-barrier listing from China; simple non-electronic household item.",
    shortIntro: "A simple silicone barrier that helps keep the wet mess around the sink from spreading across the counter.",
    adAngle: "Wet countertop around faucet → place guard → pour/splash water → cleaner counter boundary.",
    targetRetailPhp: 99,
    score: {
      usefulness: 8,
      customerDemand: 7,
      priceAttractiveness: 10,
      marginPotential: 10,
      demoWow: 9,
      localNovelty: 8,
      supplierReliability: 6,
      storageDeliveryEase: 9,
      lowReturnSafetyRisk: 9,
      evergreenPotential: 9
    }
  }),
  candidate({
    id: "cn-mini-cleaning-brush-01",
    name: "Mini keyboard / window-groove cleaning brush",
    supplier: "Anhui Qianshan County Yongxing Special Brush Industry Co., Ltd.",
    sourcePriceUsdLow: 0.04,
    sourcePriceUsdHigh: 0.05,
    supplierMinimumOrder: 10,
    supplierEvidence: "17-year supplier; very low-MOQ mini crevice-cleaning brush listing.",
    shortIntro: "Tiny brush, annoying problem solved. Pang singit ng keyboard, window tracks, drawer corners and other places a normal cleaning brush cannot reach.",
    adAngle: "Dust packed into keyboard/window groove → one brush pass → satisfying clean line.",
    targetRetailPhp: 39,
    score: {
      usefulness: 8,
      customerDemand: 7,
      priceAttractiveness: 10,
      marginPotential: 10,
      demoWow: 8,
      localNovelty: 7,
      supplierReliability: 9,
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
