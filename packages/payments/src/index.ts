export type CheckoutPaymentMethod = "gcash" | "qrph";

export type PaymentCheckoutLine = {
  name: string;
  description?: string;
  amountCentavos: number;
  quantity: number;
};

export type PaymentCheckoutCustomer = {
  name: string;
  email?: string;
  phone?: string;
};

export type CreatePaymentCheckoutInput = {
  orderReference: string;
  description: string;
  lines: PaymentCheckoutLine[];
  customer?: PaymentCheckoutCustomer;
  methods: CheckoutPaymentMethod[];
  successUrl: string;
  cancelUrl: string;
  metadata?: Record<string, string>;
  sendEmailReceipt?: boolean;
};

export type PaymentCheckoutSession = {
  provider: "paymongo";
  sessionId: string;
  checkoutUrl: string;
  liveMode: boolean;
};

type PayMongoCheckoutResponse = {
  data?: {
    id?: string;
    attributes?: {
      checkout_url?: string;
      livemode?: boolean;
    };
  };
  errors?: Array<{
    code?: string;
    detail?: string;
  }>;
};

function assertCheckoutInput(input: CreatePaymentCheckoutInput) {
  if (!input.orderReference.trim()) throw new Error("Order reference is required.");
  if (!input.description.trim()) throw new Error("Checkout description is required.");
  if (!input.successUrl.startsWith("https://") && !input.successUrl.startsWith("http://localhost")) {
    throw new Error("A secure success URL is required outside localhost.");
  }
  if (!input.cancelUrl.startsWith("https://") && !input.cancelUrl.startsWith("http://localhost")) {
    throw new Error("A secure cancel URL is required outside localhost.");
  }
  if (!Array.isArray(input.lines) || input.lines.length === 0) {
    throw new Error("At least one checkout line is required.");
  }
  if (!Array.isArray(input.methods) || input.methods.length === 0) {
    throw new Error("At least one payment method is required.");
  }

  for (const line of input.lines) {
    if (!line.name.trim()) throw new Error("Checkout line name is required.");
    if (!Number.isInteger(line.amountCentavos) || line.amountCentavos <= 0) {
      throw new Error("Checkout amounts must be positive whole centavos.");
    }
    if (!Number.isInteger(line.quantity) || line.quantity <= 0) {
      throw new Error("Checkout quantities must be positive whole numbers.");
    }
  }
}

function basicAuth(secretKey: string) {
  return `Basic ${globalThis.btoa(`${secretKey}:`)}`;
}

export async function createPayMongoCheckoutSession(
  secretKey: string,
  input: CreatePaymentCheckoutInput
): Promise<PaymentCheckoutSession> {
  if (!secretKey || !secretKey.startsWith("sk_")) {
    throw new Error("A PayMongo secret key is required.");
  }

  assertCheckoutInput(input);

  const response = await fetch("https://api.paymongo.com/v2/checkout_sessions", {
    method: "POST",
    headers: {
      Authorization: basicAuth(secretKey),
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      data: {
        attributes: {
          billing: input.customer
            ? {
                name: input.customer.name,
                email: input.customer.email,
                phone: input.customer.phone
              }
            : undefined,
          cancel_url: input.cancelUrl,
          description: input.description,
          line_items: input.lines.map((line) => ({
            amount: line.amountCentavos,
            currency: "PHP",
            description: line.description,
            name: line.name,
            quantity: line.quantity
          })),
          metadata: input.metadata,
          payment_method_types: input.methods,
          reference_number: input.orderReference,
          send_email_receipt: input.sendEmailReceipt ?? false,
          show_description: true,
          show_line_items: true,
          success_url: input.successUrl
        }
      }
    })
  });

  const payload = (await response.json()) as PayMongoCheckoutResponse;

  if (!response.ok) {
    const detail = payload.errors?.map((error) => error.detail || error.code).filter(Boolean).join("; ");
    throw new Error(detail || `PayMongo checkout failed with HTTP ${response.status}.`);
  }

  const sessionId = payload.data?.id;
  const checkoutUrl = payload.data?.attributes?.checkout_url;
  if (!sessionId || !checkoutUrl) {
    throw new Error("PayMongo returned an incomplete checkout session.");
  }

  return {
    provider: "paymongo",
    sessionId,
    checkoutUrl,
    liveMode: payload.data?.attributes?.livemode === true
  };
}

export function isPayMongoPaidCheckoutEvent(payload: unknown): payload is {
  data: {
    type: "checkout_session.payment.paid";
    data: {
      id: string;
      attributes: {
        reference_number: string;
      };
    };
  };
} {
  if (!payload || typeof payload !== "object") return false;
  const root = payload as Record<string, unknown>;
  const data = root.data;
  if (!data || typeof data !== "object") return false;
  const event = data as Record<string, unknown>;
  if (event.type !== "checkout_session.payment.paid") return false;
  const session = event.data;
  if (!session || typeof session !== "object") return false;
  const sessionRecord = session as Record<string, unknown>;
  const attrs = sessionRecord.attributes;
  return (
    typeof sessionRecord.id === "string" &&
    !!attrs &&
    typeof attrs === "object" &&
    typeof (attrs as Record<string, unknown>).reference_number === "string"
  );
}
