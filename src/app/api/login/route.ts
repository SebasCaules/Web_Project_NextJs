// app/api/login/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password } = body;

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error || !data.user) {
            return NextResponse.json(
                { error: error?.message || "No se pudo iniciar sesión" },
                { status: 401 }
            );
        }

        const user = data.user;
        const metadata = user.user_metadata || {};

        return NextResponse.json({
            email: user.email,
            name: metadata.name,
            lastName: metadata.lastName,
        });
    } catch (err: any) {
        console.error("Login API error:", err.message);
        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        );
    }
}