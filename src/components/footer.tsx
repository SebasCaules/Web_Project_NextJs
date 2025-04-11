"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function Footer() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState<"success" | "error" | "">("");

    const handleNewsletterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        setMessageType("");
    
        try {
            const res = await fetch("/api/newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
    
            const isJson = res.headers.get("content-type")?.includes("application/json");
    
            const result = isJson ? await res.json() : {};
    
            if (res.status === 409) {
                setMessage(result.message || "This email is already subscribed.");
                setMessageType("error");
            } else if (!res.ok) {
                setMessage(result.message || "There was a problem. Please try again.");
                setMessageType("error");
            } else {
                setMessage(result.message || "You're now subscribed!");
                setMessageType("success");
                setEmail("");
            }
    
            setTimeout(() => {
                setMessage("");
                setMessageType("");
            }, 4000);
        } catch (err) {
            setMessage("Unexpected error. Please try again.");
            setMessageType("error");
    
            // No hacemos console.error(err) para evitar spam visual en consola
        } finally {
            setLoading(false);
        }
    };

    return (
        <footer className="bg-[#001F3F] text-white px-6 py-12 text-sm">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Columna 1 */}
                <div className="flex flex-col gap-3 font-semibold">
                    <Link href="#">Shop All Products</Link>
                    <Link href="#">Help Center</Link>
                    <Link href="#">Careers</Link>
                    <Link href="#">Club Chronicles</Link>
                    <Link href="#">Refund Policy</Link>
                    <Link href="#">Terms of Service</Link>
                    <Link href="#">Refer a Friend</Link>
                </div>

                {/* Columna 2 */}
                <div className="flex flex-col gap-3 font-semibold">
                    <Link href="#">Rewards</Link>
                    <Link href="#">Contact Us</Link>
                    <Link href="#">Shipping</Link>
                    <Link href="#">Gift Cards</Link>
                    <Link href="#">Privacy Policy</Link>
                    <Link href="#">Accessibility</Link>
                    <Link href="#" className="text-white font-bold">
                        Do Not Sell Or Share My Personal Information
                    </Link>
                </div>

                {/* Columna 3: Newsletter */}
                <div>
                    <h3 className="font-bold text-base mb-2">Join our Newsletter</h3>
                    <p className="mb-4 text-gray-200">
                        Sign up to receive access to our latest updates and best offers, plus get 25% off your first order.
                    </p>
                    <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-3">
                        <Input
                            placeholder="Email"
                            className="bg-[#001F3F] border border-gray-300 text-white"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            required
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin h-5 w-5" /> Submitting...
                                </>
                            ) : (
                                "LET'S DO IT"
                            )}
                        </button>

                        {/* Mensaje visual abajo del botón */}
                        {message && (
                            <div
                                className={`text-sm mt-1 ${messageType === "success"
                                        ? "text-green-400"
                                        : "text-red-400"
                                    }`}
                            >
                                {message}
                            </div>
                        )}
                    </form>

                    <p className="text-xs text-gray-400 mt-3">
                        By submitting this form and signing up for emails, you consent to receive marketing...{' '}
                        <Link href="#" className="underline">Privacy Policy & Terms</Link>.
                    </p>
                </div>
            </div>

            {/* Pie de página */}
            <div className="max-w-7xl mx-auto mt-12 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-400 text-xs border-t border-gray-700 pt-6">
                <div className="flex items-center gap-4">
                    <span>© 2025, Dollar Shave Club. All Rights Reserved.</span>
                    <Link href="#">California Notice at Collection of Personal Information</Link>
                </div>
                <div className="flex items-center gap-2 border border-white px-3 py-1 rounded">
                    <span role="img" aria-label="US">🇺🇸</span>
                    <span>US</span>
                    <span className="text-white">▼</span>
                </div>
            </div>
        </footer>
    );
}