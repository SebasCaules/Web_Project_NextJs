"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type CartItem = {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
    isSubscription?: boolean;
    interval?: number;
};

type CartContextType = {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isHydrated, setIsHydrated] = useState(false);

    // Solo leer localStorage una vez que el componente está montado
    useEffect(() => {
        try {
            const stored = localStorage.getItem("cart");
            if (stored) {
                setCart(JSON.parse(stored));
            }
        } catch {
            setCart([]);
        }
        setIsHydrated(true);
    }, []);

    // Guardar el carrito en localStorage cuando cambie
    useEffect(() => {
        if (isHydrated) {
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }, [cart, isHydrated]);

    const addToCart = (item: CartItem) => {
        setCart((prev) => {
            const existing = prev.find(
                (p) =>
                    p.id === item.id &&
                    p.isSubscription === item.isSubscription &&
                    p.interval === item.interval
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
        setCart([]);
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