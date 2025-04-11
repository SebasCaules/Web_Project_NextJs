"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import classNames from "classnames";
import Link from "next/link";
import { useUser } from "@/context/user-context";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
    const { login } = useUser();
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [touched, setTouched] = useState({ email: false, password: false });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const passwordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
    const isFormValid = emailValid && passwordValid;

    const handleLogin = async () => {
        setLoading(true);
        setError("");

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        setLoading(false);

        if (error) {
            setError(error.message);
            return;
        }

        const userName = data.user?.user_metadata?.name || "Usuario";

        login({
            name: userName,
            email: data.user.email!,
        });

        router.push("/");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4 py-12">
            <div className="w-full max-w-md border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-gray-100 p-8">
                <h2 className="text-3xl font-bold text-center mb-8">Log in</h2>

                <div className="space-y-4">
                    <div>
                        <label className="text-xs font-semibold text-gray-700 uppercase mb-1 block">Email address</label>
                        <Input
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
                            className={classNames({
                                "border-red-500": touched.email && !emailValid,
                            })}
                        />
                        {touched.email && !emailValid && (
                            <p className="text-sm text-red-600 mt-1">Enter a valid email address.</p>
                        )}
                    </div>

                    <div>
                        <label className="text-xs font-semibold text-gray-700 uppercase mb-1 block">Password</label>
                        <Input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
                            className={classNames({
                                "border-red-500": touched.password && !passwordValid,
                            })}
                        />
                        {touched.password && !passwordValid && (
                            <ul className="mt-2 text-sm text-gray-600 space-y-1">
                                <li className={/[A-Z]/.test(password) ? "text-green-600" : "text-red-600"}>
                                    • At least one uppercase letter
                                </li>
                                <li className={/[a-z]/.test(password) ? "text-green-600" : "text-red-600"}>
                                    • At least one lowercase letter
                                </li>
                                <li className={/\d/.test(password) ? "text-green-600" : "text-red-600"}>
                                    • At least one number
                                </li>
                                <li className={password.length >= 8 ? "text-green-600" : "text-red-600"}>
                                    • Minimum 8 characters
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
                {error && (
                    <p className="text-red-600 text-sm mt-4 text-center">{error}</p>
                )}
                <Button
                    className="mt-6 w-full font-semibold bg-orange-500 hover:bg-orange-600 transition cursor-pointer"
                    disabled={!isFormValid || loading}
                    onClick={handleLogin}
                >
                    {loading ? "Signing in..." : "Sign In"}
                </Button>

                <Link href="#" className="text-sm text-center mt-4 underline text-gray-700 font-medium block">
                    Forgot/Reset password
                </Link>

                {/* New Customer section */}
                <div className="border-t pt-6 mt-8 text-center">
                    <p className="text-sm text-gray-800 mb-4">New Customer?</p>
                    <Link href="/profile/register" className="block">
                        <Button className="w-full font-bold bg-orange-500 hover:bg-orange-600 cursor-pointer">
                            Sign Up
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}