"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Menu, Search, ShoppingCart, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/cart-context";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";

export default function Navbar() {
    const [showSearch, setShowSearch] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const { cart } = useCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
                setShowSearch(false);
            }
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setShowSearch(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <header className="sticky top-0 z-50 bg-white shadow-sm">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <Link href="/" className="text-xl font-bold tracking-tight text-black">
                        DollarClub
                    </Link>
                </div>

                {/* Menú central - solo visible en md+ */}
                <div className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
                    <Link href="/get-started" className="hover:text-black transition">Get Started</Link>
                    <Link href="/products" className="hover:text-black transition">Products</Link>
                    <Link href="/about" className="hover:text-black transition">About</Link>
                    <Link href="/faq" className="hover:text-black transition">FAQ</Link>
                </div>

                {/* Iconos + mobile menu */}
                <div className="flex items-center gap-4" ref={searchRef}>
                    {/* Input de búsqueda */}
                    <div className="relative w-[192px] transition-all duration-200 hidden sm:block">
                        <Input
                            placeholder="Search..."
                            className={`transition-all duration-200 ${showSearch ? "opacity-100" : "opacity-0 pointer-events-none"
                                }`}
                            autoFocus={showSearch}
                        />
                    </div>

                    {/* Lupa */}
                    <button
                        onClick={() => setShowSearch((prev) => !prev)}
                        aria-label="Toggle search"
                    >
                        <Search className="w-5 h-5 cursor-pointer text-gray-700 hover:text-black" />
                    </button>

                    <Link href="/cart">
                        <div className="relative">
                            <ShoppingCart className="w-5 h-5 text-gray-700 hover:text-black" />
                            {totalItems > 0 && (
                                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full px-1.5 py-0.5">
                                    {totalItems}
                                </span>
                            )}
                        </div>
                    </Link>
                    <Link href="/account">
                        <User className="w-5 h-5 cursor-pointer text-gray-700 hover:text-black" />
                    </Link>

                    {/* Menú hamburguesa para mobile */}
                    <div className="md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Menu className="w-6 h-6 cursor-pointer text-gray-700 hover:text-black" />
                            </SheetTrigger>
                            <SheetContent side="left" className="w-64 p-6">
                                <div className="flex flex-col gap-4 text-base font-medium text-gray-700">
                                    <Link href="/get-started" className="hover:text-black transition">Get Started</Link>
                                    <Link href="/products" className="hover:text-black transition">Products</Link>
                                    <Link href="/about" className="hover:text-black transition">About</Link>
                                    <Link href="/faq" className="hover:text-black transition">FAQ</Link>
                                    <hr className="my-2" />
                                    <Link href="/account" className="hover:text-black transition">My Account</Link>
                                    <Link href="/cart" className="hover:text-black transition">Cart</Link>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </nav>
        </header>
    );
}