import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, password, name, lastName } = body;

        // ✅ Obtener lista de usuarios de Supabase Auth
        const { data: userList, error: userError } = await supabaseAdmin.auth.admin.listUsers({
            page: 1,
            perPage: 1000,
        });

        if (userError) {
            console.error("Error fetching users from auth:", userError.message);
            return NextResponse.json({ success: false, message: "Error checking email" }, { status: 500 });
        }

        const userExists = userList.users.some((user) => user.email === email);

        if (userExists) {
            return NextResponse.json({ success: false, message: "This email is already registered." }, { status: 409 });
        }

        // ✅ Crear nuevo usuario
        const { error: signUpError } = await supabaseAdmin.auth.admin.createUser({
            email,
            password,
            user_metadata: {
                name,
                lastName,
            },
            email_confirm: true,
        });

        if (signUpError) {
            return NextResponse.json({ success: false, message: signUpError.message }, { status: 400 });
        }

        return NextResponse.json({
            success: true,
            message: "Check your inbox to confirm your registration.",
        });
    } catch (err: any) {
        console.error("Unexpected error:", err.message);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}