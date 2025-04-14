'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import classNames from 'classnames'
import PasswordValidationHint from '@/components/models/PasswordValidationHint'

export default function ResetPasswordPage() {
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [touched, setTouched] = useState({ password: false, confirm: false })
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const passwordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)
    const passwordsMatch = password === confirm

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        const { error } = await supabase.auth.updateUser({ password })

        setLoading(false)

        if (error) {
            toast.error('Error al cambiar la contraseña.')
        } else {
            toast.success('Contraseña cambiada correctamente.')
            router.push('/profile')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4 py-12">
            <div className="w-full max-w-md border border-gray-200 rounded-lg shadow-sm bg-gray-100 p-8">
                <h1 className="text-2xl font-bold text-center mb-6">Nueva contraseña</h1>

                <form onSubmit={handleReset} className="space-y-4">
                    {/* Nueva contraseña */}
                    <div>
                        <label className="text-xs font-semibold text-gray-700 uppercase mb-1 block">Contraseña</label>
                        <Input
                            type="password"
                            placeholder="Nueva contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
                            className={classNames({
                                'border-red-500': touched.password && !passwordValid,
                            })}
                        />
                        {touched.password && <PasswordValidationHint password={password} />}
                    </div>

                    {/* Confirmar contraseña */}
                    <div>
                        <label className="text-xs font-semibold text-gray-700 uppercase mb-1 block">Confirmar contraseña</label>
                        <Input
                            type="password"
                            placeholder="Confirmar contraseña"
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                            onBlur={() => setTouched((prev) => ({ ...prev, confirm: true }))}
                            className={classNames({
                                'border-red-500': touched.confirm && confirm && !passwordsMatch,
                            })}
                        />
                        {touched.confirm && confirm && !passwordsMatch && (
                            <p className="text-sm text-red-600 mt-1">Las contraseñas no coinciden.</p>
                        )}
                    </div>

                    {/* Botón */}
                    <Button
                        type="submit"
                        disabled={!passwordValid || !passwordsMatch || loading}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Actualizando...
                            </>
                        ) : (
                            'Guardar'
                        )}
                    </Button>
                </form>
            </div>
        </div>
    )
}