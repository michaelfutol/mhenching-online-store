"use client";

import { useCart } from "@/components/CartProvider";

export function CartBadge() {
  const { itemCount } = useCart();
  return <span aria-label={`${itemCount} item${itemCount === 1 ? "" : "s"} in cart`}>{itemCount}</span>;
}
