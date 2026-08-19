import {
  assertValidCartLines,
  type OrderQuoteRequest,
  type OrderQuoteResponse
} from "@mhenching/contracts";
import type { CatalogRepository } from "@/server/catalog-repository";

export class QuoteError extends Error {
  constructor(public readonly code: string, message: string) {
    super(message);
    this.name = "QuoteError";
  }
}

export async function createOrderQuote(
  request: OrderQuoteRequest,
  catalog: CatalogRepository
): Promise<OrderQuoteResponse> {
  assertValidCartLines(request.lines);

  if (request.fulfillmentMethod !== "pickup") {
    throw new QuoteError(
      "DELIVERY_CONFIG_PENDING",
      "Live delivery-zone pricing is not connected yet. Store pickup can be quoted now."
    );
  }

  const lines = await Promise.all(request.lines.map(async (line) => {
    const product = await catalog.getById(line.productId);
    if (!product || !product.active) {
      throw new QuoteError("PRODUCT_UNAVAILABLE", `Product ${line.productId} is unavailable.`);
    }

    return {
      productId: product.id,
      name: product.name,
      unitPriceCentavos: product.priceCentavos,
      quantity: line.quantity,
      lineTotalCentavos: product.priceCentavos * line.quantity
    };
  }));

  const subtotalCentavos = lines.reduce((sum, line) => sum + line.lineTotalCentavos, 0);
  const deliveryFeeCentavos = 0;

  return {
    lines,
    subtotalCentavos,
    deliveryFeeCentavos,
    totalCentavos: subtotalCentavos + deliveryFeeCentavos,
    quoteExpiresAt: new Date(Date.now() + 5 * 60 * 1000).toISOString()
  };
}
