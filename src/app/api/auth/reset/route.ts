// app/api/reset-password/route.ts
import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export async function POST(req: Request) {
    try {
        const { password } = await req.json()

        const { error } = await supabase.auth.updateUser({ password })

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 400 })
        }

        return NextResponse.json({ message: 'Contraseña actualizada correctamente' })
    } catch (err: any) {
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
    }
}