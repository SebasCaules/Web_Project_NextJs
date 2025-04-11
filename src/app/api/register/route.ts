// /app/api/register/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password, name, lastName } = body;

        // Chequeo de usuario existente con auth.admin
        const { data: users, error: listError } = await supabaseAdmin.auth.admin.listUsers();
        if (listError) {
            console.error("Error fetching users:", listError.message);
            return NextResponse.json({ message: "Error checking users" }, { status: 500 });
        }

        const alreadyExists = users.users.some((u) => u.email === email);
        if (alreadyExists) {
            return NextResponse.json(
                { message: "This email is already registered." },
                { status: 409 }
            );
        }

        // Registro del usuario
        const { error: signupError } = await supabaseAdmin.auth.admin.createUser({
            email,
            password,
            user_metadata: {
                name,
                lastName,
            },
            email_confirm: true,
        });

        if (signupError) {
            console.error("Error creating user:", signupError.message);
            return NextResponse.json({ message: signupError.message }, { status: 500 });
        }

        return NextResponse.json({
            message: "Check your inbox to confirm your registration.",
        });
    } catch (err: any) {
        console.error("Unexpected error:", err.message);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}