"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type CartItem = {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
    isSubscription?: boolean;
    interval?: number; // en meses
};

type CartContextType = {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>(() => {
        if (typeof window === "undefined") return [];
        try {
            const stored = localStorage.getItem("cart");
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart)); // Solo se actualiza cuando cart cambia
    }, [cart]);

    const addToCart = (item: CartItem) => {
        setCart((prev) => {
            const existing = prev.find(
                (p) => p.id === item.id && p.isSubscription === item.isSubscription && p.interval === item.interval
            );
            if (existing) {
                return prev.map((p) =>
                    p.id === item.id &&
                        p.isSubscription === item.isSubscription &&
                        p.interval === item.interval
                        ? { ...p, quantity: p.quantity + item.quantity }
                        : p
                );
            } else {
                return [...prev, item];
            }
        });
    };

    const removeFromCart = (id: number) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    const clearCart = () => {
        setCart([]); // Se limpia el carrito directamente
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within a CartProvider");
    return context;
}