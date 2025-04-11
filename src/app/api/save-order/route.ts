import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log("Incoming order body:", body);

        const { items, created_at, user_email } = body;

        if (!items || !user_email || !created_at) {
            console.error("Missing fields in request body");
            return new NextResponse("Missing required fields", { status: 400 });
        }

        // ✅ Calcular total antes de insertar
        const total = items.reduce(
            (sum: number, item: any) => sum + item.price * item.quantity,
            0
        );

        const { error } = await supabaseAdmin.from("orders").insert([
            {
                items,         // JSON column
                created_at,    // timestamp
                user_email,    // text (si seguís usándolo, aunque lo ideal es usar user_id)
                total,         // ✅ agregado
            }
        ]);

        if (error) {
            console.error("Supabase insert error:", error.message, error.details);
            return new NextResponse(`Failed to save order: ${error.message}`, { status: 500 });
        }

        return new NextResponse("Order saved", { status: 200 });

    } catch (err: any) {
        console.error("Unexpected error:", err.message);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}