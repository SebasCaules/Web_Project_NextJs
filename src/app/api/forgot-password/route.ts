import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

export async function POST(req: Request) {
    try {
        const { email } = await req.json()

        // Buscar si el usuario ya está registrado
        const { data: users, error: listError } = await supabaseAdmin.auth.admin.listUsers()
        if (listError) {
            return NextResponse.json({ error: 'Error al buscar usuarios.' }, { status: 500 })
        }

        const foundUser = users.users.find((u) => u.email === email)
        if (!foundUser) {
            return NextResponse.json({ error: 'Email no registrado' }, { status: 404 })
        }

        // Enviar email de recuperación
        const { error: resetError } = await supabaseAdmin.auth.admin.generateLink({
            type: 'recovery',
            email,
            options: {
                redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset`,
            },
        })

        if (resetError) {
            return NextResponse.json({ error: 'Error al enviar el link de recuperación' }, { status: 500 })
        }

        return NextResponse.json({ message: 'Email de recuperación enviado con éxito.' })
    } catch (err) {
        return NextResponse.json({ error: 'Error inesperado.' }, { status: 500 })
    }
}