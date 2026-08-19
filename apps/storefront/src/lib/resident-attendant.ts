import { formatPeso, products, type Product } from "@/lib/catalog";

export type ResidentProductResult = Pick<Product, "slug" | "name" | "price" | "descriptor" | "stockLabel" | "lane">;

export type ResidentReply = {
  text: string;
  products?: ResidentProductResult[];
  suggestions?: string[];
  handoff?: boolean;
  intent:
    | "greeting"
    | "product_search"
    | "christmas"
    | "local_products"
    | "payment"
    | "delivery"
    | "order_status"
    | "support_handoff"
    | "help";
};

const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9₱\s-]/g, " ").replace(/\s+/g, " ").trim();

function extractBudget(message: string) {
  const peso = message.match(/(?:₱|php\s*)\s?(\d{2,5})/i);
  if (peso) return Number(peso[1]);

  const under = message.match(/(?:under|below|less than|budget|hanggang|below|less|mga)\s*(\d{2,5})/i);
  return under ? Number(under[1]) : undefined;
}

function searchProducts(message: string, options?: { lane?: Product["lane"]; limit?: number }) {
  const query = normalize(message);
  const budget = extractBudget(message);
  const stop = new Set([
    "may", "meron", "ba", "po", "please", "show", "find", "hanap", "hanapan", "gusto", "need",
    "under", "below", "budget", "gift", "gifts", "item", "items", "product", "products", "mga", "ako",
    "something", "for", "para", "worth", "less", "than", "php"
  ]);
  const terms = query.split(" ").filter((term) => term.length > 2 && !stop.has(term) && !/^\d+$/.test(term));

  return products
    .filter((product) => !options?.lane || product.lane === options.lane)
    .filter((product) => budget === undefined || product.price <= budget)
    .map((product) => {
      const haystack = normalize([product.name, product.descriptor, product.why, product.tags.join(" "), product.origin ?? ""].join(" "));
      const score = terms.reduce((sum, term) => sum + (haystack.includes(term) ? 2 : 0), 0)
        + (budget !== undefined && product.price <= budget ? 1 : 0)
        + (product.lane === "seasonal" && /christmas|pasko|monito|monita/.test(query) ? 3 : 0)
        + (product.lane === "local" && /local|magdalena|handmade|handicraft|native|buri|anahaw|pili/.test(query) ? 3 : 0);
      return { product, score };
    })
    .filter(({ score }) => score > 0 || terms.length === 0)
    .sort((a, b) => b.score - a.score || a.product.price - b.product.price)
    .slice(0, options?.limit ?? 4)
    .map(({ product }) => ({
      slug: product.slug,
      name: product.name,
      price: product.price,
      descriptor: product.descriptor,
      stockLabel: product.stockLabel,
      lane: product.lane
    }));
}

function isSupportRisk(query: string) {
  return /refund|charged|na charge|doble|double charge|wrong item|mali ang item|complaint|reklamo|damaged|sira|scam|fraud|cancel payment|payment mismatch/.test(query);
}

export function answerResidentMessage(rawMessage: string): ResidentReply {
  const message = rawMessage.trim().slice(0, 600);
  const query = normalize(message);

  if (!query) {
    return {
      intent: "help",
      text: "Type a product, budget, delivery question, or payment question and I’ll help you find the simplest next step.",
      suggestions: ["Gifts under ₱200", "Gawang Magdalena", "How can I pay?", "Delivery in Poblacion"]
    };
  }

  if (isSupportRisk(query)) {
    return {
      intent: "support_handoff",
      handoff: true,
      text: "I don’t want to guess on a payment, refund, damaged-item, or complaint issue. I’ll route this for human review so Mhenching can check the actual order/payment record.",
      suggestions: ["I have my order reference", "I need payment help"]
    };
  }

  if (/^(hi|hello|hey|good morning|good afternoon|good evening|kumusta|hello po|hi po)\b/.test(query)) {
    return {
      intent: "greeting",
      text: "Hi! I’m the resident Mhenching attendant. I can help you discover products, Christmas gifts, local-made items, payment options, pickup, and local delivery.",
      suggestions: ["Gifts under ₱200", "Mhenching Finds", "Gawang Magdalena", "How can I pay?"]
    };
  }

  if (/gcash|g-cash|qr|payment|pay |bayad|cod|cash on delivery|cash on pickup/.test(query)) {
    return {
      intent: "payment",
      text: "For our local MVP, payment options are Cash on Delivery in supported Magdalena Poblacion delivery zones, Cash on Pickup, and manual GCash / official Mhenching QR. For GCash/QR, the exact amount and official payment details are shown with the order. A screenshot alone never marks an order as paid—Mhenching verifies the actual receiving-account transaction first.",
      suggestions: ["Where is pickup?", "Delivery in Poblacion", "I already sent GCash"]
    };
  }

  if (/deliver|delivery|poblacion|pickup|pick up|kuha|padala|shipping|sorsogon/.test(query)) {
    return {
      intent: "delivery",
      text: "Store pickup is available at Mhenching Variety. Local delivery is being launched first for configured Sta. Magdalena Poblacion zones, with COD where enabled. Wider Sorsogon delivery/shipping comes after the local workflow is proven.",
      suggestions: ["Cash on delivery", "How can I pay?", "Show Mhenching Finds"]
    };
  }

  if (/order status|track|tracking|nasaan.*order|where.*order|order.*reference|order.*ref/.test(query)) {
    return {
      intent: "order_status",
      handoff: true,
      text: "Order-status lookup will use a verified order reference and customer check once the live order database is connected. For now I’ll hand this to Mhenching instead of inventing a status.",
      suggestions: ["I have my order reference", "Payment verification"]
    };
  }

  if (/christmas|pasko|monito|monita|exchange gift|xmas/.test(query)) {
    const matches = searchProducts(message, { limit: 4 });
    return {
      intent: "christmas",
      text: matches.length
        ? `Here are a few Christmas-friendly ideas${extractBudget(message) ? ` within ${formatPeso(extractBudget(message)!)}` : ""}. We’ll keep the Christmas collection curated rather than overwhelming.`
        : "I don’t have a strong Christmas match in the current pilot catalog yet. That search itself is useful—we’ll log unmet demand once Radar is connected.",
      products: matches,
      suggestions: ["Gifts under ₱100", "Gifts under ₱200", "Local Christmas gifts", "Something useful"]
    };
  }

  if (/gawang magdalena|local|handmade|handicraft|native|buri|anahaw|karagumoy|pili|talaonga|bayong/.test(query)) {
    const matches = searchProducts(message, { lane: "local", limit: 4 });
    return {
      intent: "local_products",
      text: "These are from our Gawang Magdalena / local-made lane. Maker identity, origin, and availability must be verified before a concept listing becomes a real sale listing.",
      products: matches,
      suggestions: ["Show handmade gifts", "Christmas local products", "How does made-to-order work?"]
    };
  }

  if (/find|show|meron|may |looking|hanap|gift|home|kitchen|kids|tech|light|cable|sealer|plant|under|below|budget|₱|php/.test(query)) {
    const matches = searchProducts(message, { limit: 4 });
    return {
      intent: "product_search",
      text: matches.length
        ? `I found ${matches.length} match${matches.length === 1 ? "" : "es"} in the current pilot catalog.`
        : "I couldn’t find a confident match in the pilot catalog. Later, searches like this will feed Mhenching Radar so we know what customers want us to source.",
      products: matches,
      suggestions: ["Mhenching Finds", "Gawang Magdalena", "Gifts under ₱200", "How can I pay?"]
    };
  }

  return {
    intent: "help",
    text: "I can help with product discovery, budget gifts, Gawang Magdalena, Christmas finds, payment options, pickup, and local delivery. For sensitive order/payment issues, I hand off to a person rather than guess.",
    suggestions: ["Mhenching Finds", "Gifts under ₱200", "Gawang Magdalena", "Delivery in Poblacion"]
  };
}
