"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: string;
  appeal_id?: number;
  title: string;
  amount: number;
  frequency: "once" | "monthly";
  image?: string;
  isZakatEligible?: boolean;
}

export type Currency = "USD" | "GBP" | "EUR" | "CAD" | "AUD";

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: "$",
  GBP: "£",
  EUR: "€",
  CAD: "CA$",
  AUD: "AU$",
};

const CURRENCY_RATES: Record<Currency, number> = {
  USD: 1.0,
  GBP: 0.78,
  EUR: 0.92,
  CAD: 1.36,
  AUD: 1.52,
};

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  currency: Currency;
  currencySymbol: string;
  addToCart: (item: Omit<CartItem, "id">) => void;
  removeFromCart: (id: string) => void;
  updateAmount: (id: string, amount: number) => void;
  toggleFrequency: (id: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  setCurrency: (c: Currency) => void;
  totalAmount: number;
  formatPrice: (amountInUSD: number) => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currency, setCurrency] = useState<Currency>("USD");

  // Load from local storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("ihsan_cart_items");
      if (saved) setItems(JSON.parse(saved));
      const savedCurr = localStorage.getItem("ihsan_currency") as Currency;
      if (savedCurr && CURRENCY_SYMBOLS[savedCurr]) setCurrency(savedCurr);
    } catch {
      // ignore
    }
  }, []);

  // Save to local storage
  useEffect(() => {
    try {
      localStorage.setItem("ihsan_cart_items", JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem("ihsan_currency", currency);
    } catch {
      // ignore
    }
  }, [currency]);

  const addToCart = (newItem: Omit<CartItem, "id">) => {
    const id = `${newItem.appeal_id || "general"}-${newItem.frequency}-${Date.now()}`;
    setItems((prev) => [...prev, { ...newItem, id }]);
    setIsOpen(true);
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateAmount = (id: string, amount: number) => {
    if (amount <= 0) return;
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, amount } : item))
    );
  };

  const toggleFrequency = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, frequency: item.frequency === "once" ? "monthly" : "once" }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const totalAmount = items.reduce((sum, item) => sum + item.amount, 0);

  const formatPrice = (amountInUSD: number) => {
    const rate = CURRENCY_RATES[currency] || 1.0;
    const converted = amountInUSD * rate;
    const sym = CURRENCY_SYMBOLS[currency] || "$";
    return `${sym}${converted.toFixed(2)}`;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        currency,
        currencySymbol: CURRENCY_SYMBOLS[currency] || "$",
        addToCart,
        removeFromCart,
        updateAmount,
        toggleFrequency,
        clearCart,
        openCart,
        closeCart,
        setCurrency,
        totalAmount,
        formatPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
