"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CheckoutPending() {
    return (
        <div className="max-w-xl mx-auto px-6 py-20 text-center">
            <h1 className="text-3xl font-bold mb-4 text-yellow-500">Payment Pending</h1>
            <p className="text-gray-600 mb-6">
                Your payment is being processed. We’ll notify you by email once it's confirmed.
            </p>
            <Link href="/">
                <Button className="w-full text-base font-semibold">Back to Home</Button>
            </Link>
        </div>
    );
}