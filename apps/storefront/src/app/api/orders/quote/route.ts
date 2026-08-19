import { NextResponse } from "next/server";
import type { OrderQuoteRequest } from "@mhenching/contracts";
import { StaticCatalogRepository } from "@/server/catalog-repository";
import { createOrderQuote, QuoteError } from "@/server/quote-service";

const catalog = new StaticCatalogRepository();

export async function POST(request: Request) {
  let body: OrderQuoteRequest;

  try {
    body = await request.json() as OrderQuoteRequest;
  } catch {
    return NextResponse.json({ error: "INVALID_JSON", message: "Request body must be valid JSON." }, { status: 400 });
  }

  try {
    const quote = await createOrderQuote(body, catalog);
    return NextResponse.json(quote, {
      status: 200,
      headers: { "Cache-Control": "no-store" }
    });
  } catch (error) {
    if (error instanceof QuoteError) {
      return NextResponse.json({ error: error.code, message: error.message }, { status: 422 });
    }

    if (error instanceof Error) {
      return NextResponse.json({ error: "INVALID_QUOTE", message: error.message }, { status: 422 });
    }

    return NextResponse.json({ error: "QUOTE_FAILED", message: "Unable to create quote." }, { status: 500 });
  }
}
