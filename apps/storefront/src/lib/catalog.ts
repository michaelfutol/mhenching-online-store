export type ProductLane = "find" | "local" | "seasonal" | "everyday";
export type StockState = "in_stock" | "few_left" | "made_to_order" | "out_of_stock";
export type ProductVisualKind = "light" | "bayong" | "pili" | "cable" | "star" | "sealer" | "craft" | "basket";

export type Product = {
  slug: string;
  name: string;
  price: number;
  compareAt?: number;
  descriptor: string;
  why: string;
  lane: ProductLane;
  stock: StockState;
  stockLabel: string;
  origin?: string;
  maker?: string;
  visual: ProductVisualKind;
  tags: string[];
};

export const products: Product[] = [
  {
    slug: "rechargeable-motion-light",
    name: "Rechargeable Motion Light",
    price: 169,
    descriptor: "A soft automatic light for dark hallways, cabinets, and brownout nights.",
    why: "No rewiring. It lights up when movement is detected, then rests when you do not need it.",
    lane: "find",
    stock: "few_left",
    stockLabel: "A few left for testing",
    visual: "light",
    tags: ["home", "useful", "under-200"]
  },
  {
    slug: "talaonga-buri-bayong",
    name: "Talaonga Buri Bayong",
    price: 349,
    descriptor: "A handwoven everyday carry made close to home.",
    why: "Useful enough for the market, beautiful enough for gifting, and rooted in local craft.",
    lane: "local",
    stock: "made_to_order",
    stockLabel: "Made to order · pilot listing",
    origin: "Sta. Magdalena, Sorsogon",
    maker: "Maker profile to be verified",
    visual: "bayong",
    tags: ["gawang-magdalena", "handmade", "gift"]
  },
  {
    slug: "pili-caramel-bites",
    name: "Pili Caramel Bites",
    price: 129,
    descriptor: "A small Sorsogon-style pasalubong pack built around our beloved pili.",
    why: "Easy to share, easy to gift, and a natural candidate for provincial and future export-ready bundles.",
    lane: "local",
    stock: "in_stock",
    stockLabel: "Sample catalog item",
    origin: "Sorsogon",
    visual: "pili",
    tags: ["pili", "pasalubong", "under-200"]
  },
  {
    slug: "magnetic-cable-organizers",
    name: "Magnetic Cable Organizers",
    price: 79,
    descriptor: "Tiny desk clips that keep charging cables from falling into the abyss.",
    why: "A low-cost problem solver with an instant before-and-after demo.",
    lane: "find",
    stock: "in_stock",
    stockLabel: "Test stock available",
    visual: "cable",
    tags: ["desk", "tech", "under-100"]
  },
  {
    slug: "anahaw-christmas-star",
    name: "Anahaw Christmas Star",
    price: 99,
    descriptor: "A quiet native-material Christmas accent for windows, gifts, and small trees.",
    why: "A seasonal piece that can celebrate local material and craft instead of generic plastic décor.",
    lane: "seasonal",
    stock: "made_to_order",
    stockLabel: "Concept · maker sourcing needed",
    origin: "Gawang Magdalena concept",
    visual: "star",
    tags: ["christmas", "local", "under-100"]
  },
  {
    slug: "mini-bag-sealer",
    name: "Mini Bag Sealer + Cutter",
    price: 149,
    descriptor: "A small kitchen helper for resealing opened snack and pantry packs.",
    why: "Simple, demonstrable, inexpensive, and useful well beyond Christmas.",
    lane: "find",
    stock: "in_stock",
    stockLabel: "Test stock available",
    visual: "sealer",
    tags: ["kitchen", "useful", "under-200"]
  },
  {
    slug: "kids-quiet-craft-kit",
    name: "Kids Quiet Craft Kit",
    price: 129,
    descriptor: "A compact activity set for drawing, making, and screen-free little projects.",
    why: "Giftable without being expensive and useful during family gatherings and school breaks.",
    lane: "seasonal",
    stock: "few_left",
    stockLabel: "Small Christmas test batch",
    visual: "craft",
    tags: ["kids", "gift", "under-200"]
  },
  {
    slug: "handwoven-plant-basket",
    name: "Handwoven Plant Basket",
    price: 299,
    descriptor: "A warm woven sleeve that softens ordinary plant pots and small corners.",
    why: "A home product where handmade texture and maker story can carry more value than lowest price.",
    lane: "local",
    stock: "made_to_order",
    stockLabel: "Made to order · pilot listing",
    origin: "Sta. Magdalena concept",
    visual: "basket",
    tags: ["home", "handmade", "plant"]
  }
];

export const featuredFinds = products.filter((product) => product.lane === "find").slice(0, 4);
export const localProducts = products.filter((product) => product.lane === "local");
export const christmasProducts = products.filter((product) => product.lane === "seasonal");

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function formatPeso(value: number) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0
  }).format(value);
}
