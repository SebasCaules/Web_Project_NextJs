// /app/api/newsletter/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        if (!email || typeof email !== "string") {
            return NextResponse.json(
                { success: false, message: "Invalid email format." },
                { status: 400 }
            );
        }

        const { data, error: selectError } = await supabaseAdmin
            .from("newsletter")
            .select("email")
            .eq("email", email);

        if (selectError) {
            return NextResponse.json(
                { success: false, message: "Error checking existing emails." },
                { status: 500 }
            );
        }

        if (data && data.length > 0) {
            return NextResponse.json(
                { success: false, message: "Email already subscribed." },
                { status: 409 }
            );
        }

        const { error: insertError } = await supabaseAdmin
            .from("newsletter")
            .insert({ email });

        if (insertError) {
            return NextResponse.json(
                { success: false, message: "Could not subscribe. Please try again later." },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { success: true, message: "You're now subscribed!" },
            { status: 200 }
        );

    } catch {
        // No usamos console.error
        return NextResponse.json(
            { success: false, message: "Unexpected error occurred." },
            { status: 500 }
        );
    }
}