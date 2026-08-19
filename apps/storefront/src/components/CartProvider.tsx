"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type CartLine = {
  slug: string;
  quantity: number;
};

type CartContextValue = {
  lines: CartLine[];
  itemCount: number;
  addItem: (slug: string, quantity?: number) => void;
  setQuantity: (slug: string, quantity: number) => void;
  removeItem: (slug: string) => void;
  clearCart: () => void;
};

const STORAGE_KEY = "mhenching-cart-v1";
const CartContext = createContext<CartContextValue | null>(null);

function sanitize(value: unknown): CartLine[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((line): line is { slug: string; quantity: number } =>
      Boolean(line) && typeof line.slug === "string" && Number.isInteger(line.quantity) && line.quantity > 0 && line.quantity <= 99
    )
    .map((line) => ({ slug: line.slug, quantity: line.quantity }));
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(sanitize(JSON.parse(raw)));
    } catch {
      // Corrupt or unavailable localStorage should never break shopping.
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // Cart still works for the current session even if persistence is unavailable.
    }
  }, [hydrated, lines]);

  const addItem = useCallback((slug: string, quantity = 1) => {
    const safeQty = Math.max(1, Math.min(99, Math.trunc(quantity)));
    setLines((current) => {
      const found = current.find((line) => line.slug === slug);
      if (!found) return [...current, { slug, quantity: safeQty }];
      return current.map((line) => line.slug === slug
        ? { ...line, quantity: Math.min(99, line.quantity + safeQty) }
        : line);
    });
  }, []);

  const setQuantity = useCallback((slug: string, quantity: number) => {
    const safeQty = Math.trunc(quantity);
    if (safeQty <= 0) {
      setLines((current) => current.filter((line) => line.slug !== slug));
      return;
    }
    setLines((current) => current.map((line) => line.slug === slug
      ? { ...line, quantity: Math.min(99, safeQty) }
      : line));
  }, []);

  const removeItem = useCallback((slug: string) => {
    setLines((current) => current.filter((line) => line.slug !== slug));
  }, []);

  const clearCart = useCallback(() => setLines([]), []);

  const value = useMemo<CartContextValue>(() => ({
    lines,
    itemCount: lines.reduce((sum, line) => sum + line.quantity, 0),
    addItem,
    setQuantity,
    removeItem,
    clearCart
  }), [lines, addItem, setQuantity, removeItem, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("useCart must be used inside CartProvider");
  return value;
}
