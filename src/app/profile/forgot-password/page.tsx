'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import classNames from 'classnames'

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('')
    const [touched, setTouched] = useState(false)
    const [loading, setLoading] = useState(false)
    const [serverMessage, setServerMessage] = useState<{ success?: string, error?: string } | null>(null)

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setServerMessage(null)

        const res = await fetch('/api/forgot-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        })

        const result = await res.json()
        setLoading(false)

        if (!res.ok) {
            if (res.status === 404) {
                setServerMessage({ error: 'Este mail no está registrado. ' })
            } else {
                toast.error(result.error || 'Hubo un error al enviar el email.')
            }
        } else {
            setServerMessage({ success: 'Te enviamos un link para cambiar tu contraseña.' })
            setEmail('')
            setTouched(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4 py-12">
            <div className="w-full max-w-md border border-gray-200 rounded-lg bg-gray-100 p-8 shadow-sm">
                <h1 className="text-2xl font-bold text-center mb-6">Recuperar contraseña</h1>

                <form onSubmit={handleReset} className="space-y-4">
                    <div>
                        <Input
                            type="email"
                            placeholder="Tu correo"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={() => setTouched(true)}
                            className={classNames({ 'border-red-500': touched && !emailValid })}
                        />
                        {touched && !emailValid && (
                            <p className="text-sm text-red-600 mt-1">Ingresá un email válido.</p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-black hover:bg-zinc-800 text-white font-semibold"
                        disabled={!emailValid || loading}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="animate-spin w-4 h-4 mr-2" />
                                Enviando...
                            </>
                        ) : (
                            'Enviar link'
                        )}
                    </Button>

                    {serverMessage?.success && (
                        <p className="text-sm text-green-600 text-center mt-2">{serverMessage.success}</p>
                    )}

                    {serverMessage?.error && (
                        <p className="text-sm text-red-600 text-center mt-2">
                            {serverMessage.error}
                            <Link href="/profile/register" className="underline text-blue-600 ml-1">
                                ¿Querés registrarte?
                            </Link>
                        </p>
                    )}
                </form>
            </div>
        </div>
    )
}