export type ProductLane = "find" | "local" | "seasonal" | "everyday";
export type ProductStatus = "draft" | "active" | "archived";
export type FulfillmentMethod = "pickup" | "local_delivery" | "provincial_delivery";
export type PaymentMethod = "cash_pickup" | "cash_delivery" | "gcash" | "qrph" | "digital_qr";
export type PaymentState = "unpaid" | "pending" | "paid" | "failed" | "refunded";
export type OrderState =
  | "pending_reservation"
  | "reserved"
  | "confirmed"
  | "preparing"
  | "ready"
  | "ready_for_pickup"
  | "out_for_delivery"
  | "completed"
  | "reservation_failed"
  | "cancelled"
  | "failed_delivery"
  | "returned"
  | "refunded";

export type AvailabilityBucket = "in_stock" | "few_left" | "out_of_stock" | "made_to_order";

export type CatalogProductDto = {
  id: string;
  slug: string;
  name: string;
  descriptor: string;
  whyText: string;
  lane: ProductLane;
  priceCentavos: number;
  compareAtCentavos?: number | null;
  availability?: AvailabilityBucket;
  originLabel?: string | null;
  makerPublicName?: string | null;
  tags: string[];
  visualKey?: string | null;
};

export type CartLineInput = {
  productId: string;
  quantity: number;
};

export type OrderQuoteRequest = {
  lines: CartLineInput[];
  fulfillmentMethod: FulfillmentMethod;
  deliveryZoneCode?: string;
};

export type OrderQuoteLine = {
  productId: string;
  name: string;
  unitPriceCentavos: number;
  quantity: number;
  lineTotalCentavos: number;
};

export type OrderQuoteResponse = {
  lines: OrderQuoteLine[];
  subtotalCentavos: number;
  deliveryFeeCentavos: number;
  totalCentavos: number;
  quoteExpiresAt: string;
};

export type CreateOrderRequest = {
  idempotencyKey: string;
  customer: {
    name: string;
    mobile: string;
    email?: string;
  };
  fulfillmentMethod: FulfillmentMethod;
  deliveryZoneCode?: string;
  deliveryAddress?: {
    barangay?: string;
    addressText: string;
    landmark?: string;
  };
  paymentMethod: PaymentMethod;
  customerNote?: string;
  campaignSource?: string;
  campaignId?: string;
  lines: CartLineInput[];
};

export type CreateOrderResponse = {
  orderId: string;
  publicToken: string;
  state: OrderState;
  paymentState: PaymentState;
  totalCentavos: number;
  paymentCheckout?: {
    provider: "paymongo";
    sessionId: string;
    checkoutUrl: string;
  };
  reservation?: {
    reservationId: string;
    expiresAt?: string;
  };
};

export type InventoryAvailabilityRequest = {
  skus: string[];
};

export type InventoryAvailabilityItem = {
  sku: string;
  status: AvailabilityBucket;
  availableToPromise?: number;
  asOf: string;
};

export type InventoryAvailabilityResponse = {
  items: InventoryAvailabilityItem[];
};

export type ReserveInventoryRequest = {
  idempotencyKey: string;
  onlineOrderId: string;
  items: Array<{ sku: string; quantity: number }>;
};

export type ReserveInventoryResponse = {
  reservationId: string;
  status: "reserved" | "failed";
  expiresAt?: string;
  items: Array<{
    sku: string;
    quantity: number;
    status: "reserved" | "unavailable";
  }>;
};

export type ReservationMutationRequest = {
  idempotencyKey: string;
  reservationId: string;
};

export const ORDER_TRANSITIONS: Readonly<Record<OrderState, readonly OrderState[]>> = {
  pending_reservation: ["reserved", "reservation_failed", "cancelled"],
  reserved: ["confirmed", "cancelled", "reservation_failed"],
  confirmed: ["preparing", "cancelled", "refunded"],
  preparing: ["ready", "cancelled", "refunded"],
  ready: ["ready_for_pickup", "out_for_delivery", "cancelled"],
  ready_for_pickup: ["completed", "cancelled"],
  out_for_delivery: ["completed", "failed_delivery", "returned"],
  completed: ["returned", "refunded"],
  reservation_failed: ["pending_reservation", "cancelled"],
  cancelled: [],
  failed_delivery: ["out_for_delivery", "cancelled", "returned"],
  returned: ["refunded"],
  refunded: []
};

export function canTransitionOrder(from: OrderState, to: OrderState) {
  return ORDER_TRANSITIONS[from].includes(to);
}

export function isPositiveWholeQuantity(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value > 0;
}

export function assertValidCartLines(lines: CartLineInput[]) {
  if (!Array.isArray(lines) || lines.length === 0) {
    throw new Error("Cart must contain at least one item.");
  }

  for (const line of lines) {
    if (!line.productId || !isPositiveWholeQuantity(line.quantity)) {
      throw new Error("Cart contains an invalid line item.");
    }
  }
}
