"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { useState } from "react";

export default function CartPage() {
    const { cart, addToCart, removeFromCart, clearCart } = useCart();

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const taxes = Math.round(subtotal * 0.15 * 100) / 100; // 15% tax
    const total = Math.round((subtotal + taxes) * 100) / 100;

    const [loading, setLoading] = useState(false);

    const handleQuantityChange = (itemId: number, quantity: number) => {
        if (quantity < 1) return;

        const item = cart.find((p) => p.id === itemId);
        if (!item) return;

        removeFromCart(itemId); // Remove old
        addToCart({ ...item, quantity }); // Add updated
    };

    const handleCheckout = () => {
        setLoading(true);
        clearCart();  // Clear cart before redirecting
        window.location.href = "/checkout/confirmation"; // Redirect manually after clearing the cart
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

            {cart.length === 0 ? (
                <p className="text-gray-600">Your cart is empty.</p>
            ) : (
                <div className="space-y-6">
                    {cart.map((item) => (
                        <div
                            key={item.id + String(item.isSubscription) + (item.interval ?? "")}
                            className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 gap-4"
                        >
                            <div className="flex items-center gap-4">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-20 h-20 object-cover rounded-md"
                                />
                                <div>
                                    <h3 className="font-semibold">{item.name}</h3>
                                    <p className="text-sm text-gray-600">
                                        {item.isSubscription
                                            ? `Subscription: Every ${item.interval} month(s)`
                                            : "One-time purchase"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 w-full sm:w-auto justify-between sm:justify-end">
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                    >
                                        −
                                    </Button>
                                    <span className="w-6 text-center">{item.quantity}</span>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                    >
                                        +
                                    </Button>
                                </div>

                                <div className="text-right">
                                    <p className="font-semibold">${item.price * item.quantity}</p>
                                    <Button
                                        variant="link"
                                        className="text-red-600 p-0 h-auto text-sm"
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        Remove
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Checkout Summary */}
                    <div className="border-t pt-6 space-y-4">
                        <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Subtotal</span>
                            <span className="text-sm font-medium">${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Estimated Taxes (15%)</span>
                            <span className="text-sm font-medium">${taxes.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between border-t pt-4 text-lg font-bold">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>

                        {/* Proceed to Checkout Button */}
                        <Button
                            className="w-full mt-4 text-base font-semibold"
                            onClick={handleCheckout}
                            disabled={loading}
                        >
                            {loading ? "Processing..." : "Proceed to Checkout"}
                        </Button>

                        {/* Clear Cart Button */}
                        <Button
                            variant="ghost"
                            className="text-red-600 w-full text-sm"
                            onClick={clearCart}
                        >
                            Clear Cart
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}