"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CheckoutFailure() {
    return (
        <div className="max-w-xl mx-auto px-6 py-20 text-center">
            <h1 className="text-3xl font-bold mb-4 text-red-600">Payment Failed</h1>
            <p className="text-gray-600 mb-6">
                Something went wrong during the payment process. Please try again or choose another method.
            </p>
            <Link href="/cart">
                <Button className="w-full text-base font-semibold">Return to Cart</Button>
            </Link>
        </div>
    );
}