export type StockIntakeLane = "everyday" | "find" | "local" | "seasonal";
export type StockIntakeAvailability = "available" | "incoming" | "made_to_order";

export type ParsedStockLine = {
  lineNumber: number;
  raw: string;
  name: string;
  price: number | null;
  quantity: number | null;
  lane: StockIntakeLane;
  availability: StockIntakeAvailability;
  errors: string[];
};

const laneAliases: Record<string, StockIntakeLane> = {
  everyday: "everyday",
  store: "everyday",
  regular: "everyday",
  find: "find",
  finds: "find",
  local: "local",
  gawang: "local",
  magdalena: "local",
  seasonal: "seasonal",
  christmas: "seasonal",
  pasko: "seasonal"
};

function parsePrice(value: string) {
  const cleaned = value.replace(/php|₱|peso|pesos/gi, "").replace(/,/g, "").trim();
  if (!cleaned) return null;
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
}

function parseQuantity(value: string) {
  const cleaned = value.trim().toLowerCase();
  if (!cleaned) return null;
  if (["mto", "made to order", "made-to-order", "preorder", "pre-order"].includes(cleaned)) return null;
  const parsed = Number(cleaned.replace(/pcs?|pieces?/g, "").trim());
  return Number.isSafeInteger(parsed) && parsed >= 0 ? parsed : null;
}

function chooseDelimiter(line: string) {
  if (line.includes("|")) return "|";
  if (line.includes("\t")) return "\t";
  return ",";
}

export function parseStockIntake(text: string): ParsedStockLine[] {
  return text
    .split(/\r?\n/)
    .map((line, index) => ({ line, index }))
    .filter(({ line }) => line.trim().length > 0)
    .map(({ line, index }) => {
      const delimiter = chooseDelimiter(line);
      const parts = line.split(delimiter).map((part) => part.trim());
      const [name = "", priceRaw = "", quantityRaw = "", laneRaw = "everyday", availabilityRaw = ""] = parts;
      const errors: string[] = [];
      const price = parsePrice(priceRaw);
      const quantity = parseQuantity(quantityRaw);
      const lane = laneAliases[laneRaw.toLowerCase()] ?? "everyday";
      const availabilityText = availabilityRaw.toLowerCase();
      const madeToOrder = [quantityRaw, availabilityRaw].some((value) => /made.?to.?order|\bmto\b/i.test(value));
      const incoming = /incoming|pre.?order|ordered|arriving/i.test(availabilityText);
      const availability: StockIntakeAvailability = madeToOrder ? "made_to_order" : incoming ? "incoming" : "available";

      if (!name) errors.push("Missing item name");
      if (price === null) errors.push("Price must be a valid non-negative number");
      if (availability === "available" && quantity === null) errors.push("Available items need a whole-number quantity");
      if (parts.length < 2) errors.push("Use at least: name | price | quantity");

      return {
        lineNumber: index + 1,
        raw: line,
        name,
        price,
        quantity,
        lane,
        availability,
        errors
      };
    });
}

export function stockIntakeSummary(lines: ParsedStockLine[]) {
  const valid = lines.filter((line) => line.errors.length === 0);
  return {
    total: lines.length,
    valid: valid.length,
    invalid: lines.length - valid.length,
    units: valid.reduce((sum, line) => sum + (line.quantity ?? 0), 0),
    estimatedRetailValue: valid.reduce((sum, line) => sum + (line.price ?? 0) * (line.quantity ?? 0), 0)
  };
}
