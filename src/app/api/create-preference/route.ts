import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";

const mp = new MercadoPagoConfig({
    accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
});

const preferenceClient = new Preference(mp);

export async function POST(req: NextRequest) {
    const body = await req.json();

    type Item = {
        id: string | number; // <-- esto es lo nuevo
        name: string;
        price: number;
        quantity: number;
    };

    const items = (body.items as Item[]).map((item) => ({
        id: String(item.id), // <- esto es lo que faltaba
        title: item.name,
        quantity: item.quantity,
        unit_price: item.price,
        currency_id: "ARS",
    }));

    try {
        const preference = await preferenceClient.create({
            body: {
                items,
                back_urls: {
                    success: "http://localhost:3000/checkout/success",
                    failure: "http://localhost:3000/checkout/failure",
                    pending: "http://localhost:3000/checkout/pending",
                },
                auto_return: "approved",
            },
        });

        return NextResponse.json({ init_point: preference.sandbox_init_point });
    } catch (error) {
        console.error("MercadoPago Error:", error);
        return NextResponse.json({ error: "Error creating preference" }, { status: 500 });
    }
}