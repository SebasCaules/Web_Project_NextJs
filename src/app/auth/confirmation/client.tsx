"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createClient } from "@supabase/supabase-js";
import toast from "react-hot-toast";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ConfirmationClient() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [confirmed, setConfirmed] = useState(false);
    const [error, setError] = useState("");

    const accessToken = searchParams.get("access_token");
    const refreshToken = searchParams.get("refresh_token");
    const type = searchParams.get("type");

    useEffect(() => {
        if (!accessToken || !refreshToken || type !== "signup") {
            setError("Invalid or expired confirmation link.");
        }
    }, [accessToken, refreshToken, type]);

    const handleConfirm = async () => {
        setLoading(true);
        setError("");

        const { error } = await supabase.auth.setSession({
            access_token: accessToken!,
            refresh_token: refreshToken!,
        });

        setLoading(false);

        if (error) {
            setError("Confirmation failed. Please try again.");
            return;
        }

        setConfirmed(true);
        toast.success("Email confirmed! You’re now signed in.");
        router.push("/");
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center px-4 py-12 bg-white text-center">
            <h1 className="text-2xl font-bold mb-4">Email Confirmation</h1>

            {error && <p className="text-red-600 mb-4">{error}</p>}

            {confirmed ? (
                <p className="text-green-600 text-sm mb-6">Your email has been confirmed!</p>
            ) : (
                <>
                    <p className="text-gray-700 mb-6">
                        Click the button below to confirm your email and start using your account.
                    </p>

                    <Button
                        className="bg-orange-500 hover:bg-orange-600 w-full max-w-xs"
                        disabled={!accessToken || loading}
                        onClick={handleConfirm}
                    >
                        {loading ? "Confirming..." : "Confirm Email"}
                    </Button>
                </>
            )}
        </div>
    );
}