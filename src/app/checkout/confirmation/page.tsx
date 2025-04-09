"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ConfirmationPage() {
    const { cart, clearCart } = useCart();
    const [isMounted, setIsMounted] = useState(false);

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const taxes = Math.round(total * 0.15 * 100) / 100;
    const finalTotal = Math.round((total + taxes) * 100) / 100;

    // Solo limpiamos el carrito después de que el componente se haya montado
    useEffect(() => {
        if (isMounted) {
            clearCart(); // Solo borra el carrito después de montar el componente
        }
    }, [isMounted, clearCart]);

    // Establecemos isMounted a true después de que el componente haya sido montado
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Evitamos el renderizado hasta que el componente se haya montado
    if (!isMounted) return null;

    return (
        <div className="max-w-2xl mx-auto px-4 py-12 text-center">
            <h1 className="text-3xl font-bold mb-4">Thank you for your purchase!</h1>
            <p className="text-gray-600 mb-8">
                Your order has been confirmed. You’ll receive an email with the details shortly.
            </p>

            <div className="bg-gray-100 rounded-md p-6 text-left space-y-3 mb-8">
                <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Subtotal</span>
                    <span className="text-sm">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Taxes (15%)</span>
                    <span className="text-sm">${taxes.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-4">
                    <span>Total</span>
                    <span>${finalTotal.toFixed(2)}</span>
                </div>
            </div>

            <Button
                className="w-full mt-4 text-base font-semibold"
                onClick={() => {
                    clearCart(); // Limpia antes de ir al checkout
                    window.location.href = "/checkout/confirmation"; // redirige al usuario
                }}
            >
                Proceed to Checkout
            </Button>
        </div>
    );
}