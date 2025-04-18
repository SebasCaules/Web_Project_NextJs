// /app/api/orders/route.ts
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { z } from "zod";

const OrderSchema = z.object({
    user_id: z.string(),
    items: z.array(
        z.object({
            id: z.number(),
            name: z.string(),
            price: z.number(),
            quantity: z.number(),
            image: z.string(),
            isSubscription: z.boolean().optional(),
            interval: z.number().optional()
        })
    ),
    total: z.number()
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const parsed = OrderSchema.parse(body);

        // Validar columnas disponibles
        const { error } = await supabaseAdmin
            .from("orders")
            .insert([
                {
                    user_id: parsed.user_id,
                    total: parsed.total,
                    items: parsed.items // Asegurate que esta columna exista y sea tipo JSON
                }
            ]);

        if (error) {
            console.error("Supabase insert error:", error.message);
            return new Response("Failed to insert order", { status: 500 });
        }

        return new Response("Order saved", { status: 200 });
    } catch (err: any) {
        console.error("Validation or server error:", err.message ?? err);
        return new Response("Invalid data", { status: 400 });
    }
}