"use client";

import { useState } from "react";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";

type Product = {
    id: number;
    name: string;
    price: number;
    image: string;
};

const mockProducts: Product[] = [
    {
        id: 1,
        name: "6 Blade Razor",
        price: 10,
        image: "/products/product1.webp",
    },
    {
        id: 2,
        name: "Shave Butter",
        price: 8,
        image: "/products/product2.webp",
    },
    {
        id: 3,
        name: "6 Blade Razor",
        price: 10,
        image: "/products/product1.webp",
    },
    {
        id: 4,
        name: "Shave Butter",
        price: 8,
        image: "/products/product2.webp",
    },
];

export default function ProductsPage() {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const { addToCart } = useCart();

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold mb-8">All Products</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {mockProducts.map((product) => (
                    <div
                        key={product.id}
                        className="border p-4 rounded-lg shadow-sm flex flex-col items-center text-center"
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full max-w-xs rounded mb-4"
                        />
                        <h3 className="text-lg font-semibold">{product.name}</h3>

                        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                            <DialogTrigger asChild>
                                <Button
                                    className="mt-4 w-full text-sm font-semibold cursor-pointer"
                                    onClick={() => setSelectedProduct(product)}
                                >
                                    Add to cart ${product.price}
                                </Button>
                            </DialogTrigger>

                            <DialogContent className="max-w-md w-full">
                                <DialogTitle className="text-xl font-bold text-center mb-6">
                                    Send this to me...
                                </DialogTitle>

                                {/* Compra única */}
                                <div className="border border-gray-300 rounded-md mb-6 p-4">
                                    <p className="font-semibold mb-2">Purchase Once</p>
                                    <DialogClose asChild>
                                        <Button
                                            className="w-full bg-orange-500 text-white font-bold py-3 border-4 border-transparent hover:bg-orange-600 transition cursor-pointer"
                                            onClick={() => {
                                                if (!selectedProduct) return;
                                                addToCart({
                                                    id: selectedProduct.id,
                                                    name: selectedProduct.name,
                                                    price: selectedProduct.price,
                                                    quantity: 1,
                                                    image: selectedProduct.image,
                                                    isSubscription: false,
                                                });
                                                // Soluciona el foco
                                                document.activeElement instanceof HTMLElement &&
                                                    document.activeElement.blur();
                                            }}
                                        >
                                            ONE-TIME
                                        </Button>
                                    </DialogClose>
                                </div>

                                {/* Suscripción */}
                                <div className="border border-gray-300 rounded-md p-4">
                                    <p className="font-semibold mb-2">Subscribe:</p>
                                    <p className="text-sm text-gray-600 mb-4">
                                        Edit, pause, or cancel your subscription anytime in your account.
                                    </p>
                                    <p className="text-xs font-bold text-gray-600 mb-2">
                                        DELIVERED & BILLED:
                                    </p>

                                    <div className="flex flex-col gap-3">
                                        {[1, 2, 3, 4].map((interval) => (
                                            <DialogClose key={interval} asChild>
                                                <Button
                                                    variant={interval === 2 ? "default" : "outline"}
                                                    className="w-full py-2 rounded-md cursor-pointer"
                                                    onClick={() => {
                                                        if (!selectedProduct) return;
                                                        addToCart({
                                                            id: selectedProduct.id,
                                                            name: selectedProduct.name,
                                                            price: selectedProduct.price,
                                                            quantity: 1,
                                                            image: selectedProduct.image,
                                                            isSubscription: true,
                                                            interval,
                                                        });
                                                        // Soluciona el foco
                                                        document.activeElement instanceof HTMLElement &&
                                                            document.activeElement.blur();
                                                    }}
                                                >
                                                    {interval === 2
                                                        ? "Every 2 Months (Most Popular)"
                                                        : `Every ${interval} Month${interval > 1 ? "s" : ""}`}
                                                </Button>
                                            </DialogClose>
                                        ))}
                                    </div>

                                    <p className="text-xs text-gray-500 mt-4 text-center">
                                        Subscription will renew automatically.
                                    </p>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                ))}
            </div>
        </div>
    );
}