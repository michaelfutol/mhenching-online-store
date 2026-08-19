"use client";

import { useState } from "react";
import { useCart } from "@/components/CartProvider";

export function AddToCartButton({ slug, disabled = false }: { slug: string; disabled?: boolean }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <button
      className="button"
      type="button"
      disabled={disabled}
      onClick={() => {
        addItem(slug, 1);
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1400);
      }}
    >
      {disabled ? "Unavailable" : added ? "Added ✓" : "Add to cart"}
    </button>
  );
}
