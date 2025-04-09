import Link from "next/link";
import { Input } from "@/components/ui/input";

export default function Footer() {
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
                    <Link href="#" className="text-white font-bold">Do Not Sell Or Share My Personal Information</Link>
                </div>

                {/* Columna 3: Newsletter */}
                <div>
                    <h3 className="font-bold text-base mb-2">Join our Newsletter</h3>
                    <p className="mb-4 text-gray-200">
                        Sign up to receive access to our latest updates and best offers, plus get 25% off your first order.
                    </p>
                    <form className="flex flex-col gap-3">
                        <Input placeholder="Email" className="bg-[#001F3F] border border-gray-300 text-white" />
                        <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4">
                            LETS DO IT
                        </button>
                    </form>
                    <p className="text-xs text-gray-400 mt-3">
                        By submitting this form and signing up for emails, you consent to receive marketing... <Link href="#" className="underline">Privacy Policy & Terms</Link>.
                    </p>
                </div>
            </div>

            {/* Línea inferior */}
            <div className="max-w-7xl mx-auto mt-12 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-400 text-xs border-t border-gray-700 pt-6">
                <div className="flex items-center gap-4">
                    <span>© 2025, Dollar Shave Club. All Rights Reserved.</span>
                    <Link href="#">California Notice at Collection of Personal Information</Link>
                </div>

                {/* Selector de país (fake) */}
                <div className="flex items-center gap-2 border border-white px-3 py-1 rounded">
                    <span role="img" aria-label="US">🇺🇸</span>
                    <span>US</span>
                    <span className="text-white">▼</span>
                </div>
            </div>
        </footer>
    );
}