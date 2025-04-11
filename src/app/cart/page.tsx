"use client";

import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function CartPage() {
    const { cart, addToCart, removeFromCart, clearCart } = useCart();
    const [loading, setLoading] = useState(false);

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const remainingForFreeShipping = Math.max(0, 18 - subtotal);
    const total = subtotal;
    const router = useRouter();

    const handleQuantityChange = (itemId: number, quantity: number) => {
        if (quantity < 1) return;
        const item = cart.find((p) => p.id === itemId);
        if (!item) return;
        removeFromCart(itemId);
        addToCart({ ...item, quantity });
    };

    const handleCheckout = async () => {
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            alert("You must be logged in to proceed");
            return;
        }

        // Guardar en sessionStorage por si lo necesitás en confirmation
        sessionStorage.setItem("lastOrder", JSON.stringify(cart));

        const orderData = {
            items: cart,
            created_at: new Date().toISOString(),
            user_email: user.email,
        };

        console.log("Sending orderData to backend:", orderData); // <-- CLAVE

        const res = await fetch("/api/save-order", {
            method: "POST",
            body: JSON.stringify(orderData),
            headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error("Failed to save order:", res.status, errorText);
            return;
        }

        // Redirigir al usuario
        router.push("/checkout/confirmation");
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT SIDE */}
            <div className="lg:col-span-2 space-y-6">
                <h1 className="text-2xl font-bold">MY CART</h1>
                <Separator />

                {cart.length === 0 ? (
                    <p className="text-gray-600">Your cart is empty.</p>
                ) : (
                    cart.map((item) => (
                        <div
                            key={item.id + String(item.isSubscription) + (item.interval ?? "")}
                            className="flex flex-col sm:flex-row sm:items-center justify-between gap-6"
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-32 h-32 object-cover rounded-md border"
                            />
                            <div className="flex flex-col flex-1">
                                <h3 className="font-semibold">{item.name}</h3>
                                {item.isSubscription && (
                                    <p className="text-sm text-gray-500">
                                        Subscription: Every {item.interval} month{item.interval! > 1 ? "s" : ""}
                                    </p>
                                )}
                            </div>

                            {/* QUANTITY */}
                            <div className="flex items-center gap-2">
                                <Button
                                    size="icon"
                                    variant="outline"
                                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                    className="cursor-pointer"
                                >
                                    −
                                </Button>
                                <Input
                                    type="text"
                                    value={item.quantity}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        const parsed = parseInt(value);
                                        if (!isNaN(parsed)) {
                                            handleQuantityChange(item.id, parsed);
                                        }
                                    }}
                                    className="w-16 text-center no-arrows cursor-text"
                                />
                                <Button
                                    size="icon"
                                    variant="outline"
                                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                    className="cursor-pointer"
                                >
                                    +
                                </Button>
                            </div>

                            <div className="text-right">
                                <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                                <Button
                                    variant="link"
                                    className="text-red-500 text-sm p-0 cursor-pointer"
                                    onClick={() => removeFromCart(item.id)}
                                >
                                    Remove
                                </Button>
                            </div>
                        </div>
                    ))
                )}

                {/* NOTICE */}
                {cart.length > 0 && (
                    <Card className="bg-orange-50 border-0">
                        <CardContent className="p-6 flex flex-col gap-3 sm:flex-row justify-between items-center text-sm">
                            <div className="flex items-center gap-2">
                                <span>🚚</span>
                                <span>
                                    $2 Shipping on all blades. Free shipping above $18.{" "}
                                    <a href="#" className="underline">Details</a>
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span>💳</span>
                                <span>
                                    30-day Money Back Guarantee.{" "}
                                    <a href="#" className="underline">Details</a>
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>

            {/* RIGHT SIDE */}
            <div className="space-y-6">
                <Card className="bg-orange-50 border-0">
                    <CardContent className="p-6 space-y-4">
                        <h2 className="text-xl font-bold">ORDER SUMMARY</h2>

                        <div className="flex justify-between text-sm">
                            <span>Subtotal ({cart.length} item{cart.length !== 1 ? "s" : ""})</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>

                        {subtotal < 18 && (
                            <div className="bg-white text-center text-sm py-2 border rounded">
                                ${remainingForFreeShipping.toFixed(2)} away from free shipping
                            </div>
                        )}

                        <div className="flex justify-between text-sm">
                            <span>Discounts</span>
                            <span>−$0.00</span>
                        </div>

                        <div className="flex justify-between text-sm">
                            <span>Shipping & Handling</span>
                            <span>Calculated at checkout</span>
                        </div>

                        <div className="flex justify-between text-sm">
                            <span>Taxes</span>
                            <span>Calculated at checkout</span>
                        </div>

                        <Separator />

                        <div className="flex justify-between font-bold text-base">
                            <span>Estimated Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>

                        <Button
                            className="w-full text-base font-semibold mt-4 cursor-pointer"
                            onClick={handleCheckout}
                            disabled={loading}
                        >
                            {loading ? "Processing..." : "Proceed to Checkout"}
                        </Button>

                        <Button
                            variant="ghost"
                            className="text-red-600 w-full text-sm cursor-pointer"
                            onClick={clearCart}
                        >
                            Clear Cart
                        </Button>



                    </CardContent>
                </Card>
            </div>
        </div>
    );
}