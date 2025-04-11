"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { CartItem } from "@/context/cart-context";

export default function ConfirmationPage() {
    const [order, setOrder] = useState<CartItem[] | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const stored = sessionStorage.getItem("lastOrder");

        if (stored) {
            const parsed = JSON.parse(stored) as CartItem[];
            setOrder(parsed);

            const subtotal = parsed.reduce((sum, item) => sum + item.price * item.quantity, 0);

            // Solo enviar al backend si no se envió antes
            if (!submitted) {
                fetch("/api/orders", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        cart: parsed,
                        total: Math.round((subtotal + subtotal * 0.15) * 100) / 100,
                    }),
                })
                    .then((res) => {
                        if (!res.ok) throw new Error("Error saving order");
                        return res.json();
                    })
                    .then(() => {
                        setSubmitted(true);
                    })
                    .catch((err) => {
                        console.error("Failed to submit order", err);
                        setError("We couldn't save your order. Please contact support.");
                    });
            }
        }
    }, [submitted]);

    const subtotal = order?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;
    const taxes = Math.round(subtotal * 0.15 * 100) / 100;
    const total = Math.round((subtotal + taxes) * 100) / 100;

    return (
        <div className="max-w-2xl mx-auto px-4 py-12 text-center">
            <h1 className="text-3xl font-bold mb-4">Thank you for your purchase!</h1>
            <p className="text-gray-600 mb-8">
                Your order has been confirmed. You’ll receive an email with the details shortly.
            </p>

            {error && (
                <p className="text-red-600 text-sm mb-4">{error}</p>
            )}

            {order && order.length > 0 ? (
                <div className="bg-gray-100 rounded-md p-6 text-left space-y-3 mb-8">
                    {order.map((item) => (
                        <div key={item.id + String(item.isSubscription) + (item.interval ?? "")} className="text-sm">
                            <div className="flex justify-between">
                                <span>{item.name} (x{item.quantity})</span>
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                            {item.isSubscription && (
                                <p className="text-xs text-gray-500">
                                    Subscription: Every {item.interval} month{item.interval! > 1 ? "s" : ""}
                                </p>
                            )}
                        </div>
                    ))}
                    <div className="flex justify-between pt-4 border-t mt-4 text-sm text-gray-600">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>Taxes (15%)</span>
                        <span>${taxes.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-4 border-t">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </div>
            ) : (
                <p className="text-sm text-gray-500 mb-8">Order details unavailable because the cart was cleared.</p>
            )}

            <Link href="/">
                <Button className="w-full text-base font-semibold">Back to Home</Button>
            </Link>
        </div>
    );
}