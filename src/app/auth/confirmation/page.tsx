'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export default function ConfirmEmailPage() {
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
    const searchParams = useSearchParams()
    const router = useRouter()

    useEffect(() => {
        const code = searchParams.get('code')
        const type = searchParams.get('type')

        if (code && type === 'signup') {
            supabase.auth.exchangeCodeForSession(code)
                .then(({ data, error }) => {
                    if (error) {
                        setStatus('error')
                    } else {
                        toast.success('¡Tu cuenta fue confirmada!')
                        setStatus('success')
                    }
                })
                .catch(() => setStatus('error'))
        } else {
            setStatus('error')
        }
    }, [searchParams])

    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
            {status === 'loading' && (
                <div className="flex items-center gap-2 text-gray-600">
                    <Loader2 className="animate-spin" />
                    Confirmando tu cuenta...
                </div>
            )}

            {status === 'success' && (
                <div>
                    <h1 className="text-2xl font-bold mb-4">¡Cuenta confirmada!</h1>
                    <p className="mb-6">Ya podés iniciar sesión.</p>
                    <Button onClick={() => router.push('/profile/login')}>
                        Ir al login
                    </Button>
                </div>
            )}

            {status === 'error' && (
                <div>
                    <h1 className="text-2xl font-bold text-red-600 mb-4">Error al confirmar</h1>
                    <p>El link puede estar vencido o no es válido.</p>
                </div>
            )}
        </div>
    )
}