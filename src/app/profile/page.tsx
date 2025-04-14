'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import classNames from "classnames"
import Link from "next/link"
import { Loader2 } from "lucide-react"
import PasswordValidationHint from "@/components/models/PasswordValidationHint"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [touched, setTouched] = useState({ email: false })
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [loginSuccess, setLoginSuccess] = useState(false)

    const router = useRouter()

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    const passwordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)
    const isFormValid = emailValid && passwordValid

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            })

            const data = await res.json()

            if (!res.ok) {
                setError(data.error || "Error desconocido")
                setLoading(false)
                return
            }

            const fullName = `${data.name || ""} ${data.lastName || ""}`.trim()

            console.log("Nombre y apellido:", fullName)
            alert(`Bienvenido, ${fullName}`)
            setLoginSuccess(true)

            setTimeout(() => {
                router.push("/")
            }, 2000)
        } catch (err) {
            setError("Error inesperado")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4 py-12">
            <div className="w-full max-w-md border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-gray-100 p-8">
                <h2 className="text-3xl font-bold text-center mb-8">Log in</h2>

                <form onSubmit={handleLogin} className="space-y-4">
                    {/* Email */}
                    <div>
                        <label className="text-xs font-semibold text-gray-700 uppercase mb-1 block">Mail</label>
                        <Input
                            type="email"
                            placeholder="ejemplo@mail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
                            className={classNames({ "border-red-500": touched.email && !emailValid })}
                        />
                        {touched.email && !emailValid && (
                            <p className="text-sm text-red-600 mt-1">Ingresá un email válido.</p>
                        )}
                    </div>

                    {/* Contraseña */}
                    <div>
                        <label className="text-xs font-semibold text-gray-700 uppercase mb-1 block">Contraseña</label>
                        <Input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {password.length > 0 && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password) && (
                            <PasswordValidationHint password={password} />
                        )}
                    </div>

                    {/* Error */}
                    {error && (
                        <p className="text-sm text-red-600 text-center">{error}</p>
                    )}

                    <Button
                        type="submit"
                        disabled={!isFormValid || loading || loginSuccess}
                        className={`mt-6 w-full font-semibold transition cursor-pointer flex justify-center items-center gap-2
    ${loginSuccess
                                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                                : 'bg-emerald-600 hover:bg-emerald-700 text-white'}`}
                    >
                        {loading && !loginSuccess ? (
                            <>
                                <Loader2 className="animate-spin w-4 h-4" />
                                Ingresando...
                            </>
                        ) : loginSuccess ? (
                            "Ingresado exitosamente"
                        ) : (
                            "Ingresar"
                        )}
                    </Button>
                </form>

                {/* Links */}
                <Link
                    href="/profile/forgot-password"
                    className="text-sm text-center mt-4 underline text-gray-700 font-medium block"
                >
                    Olvidé mi contraseña
                </Link>

                <div className="border-t pt-6 mt-8 text-center">
                    <p className="text-m text-gray-800 mb-4">¿Sos nuevo?</p>
                    <Button asChild className="w-full font-bold bg-black text-white">
                        <Link href="/profile/register">Registrarse</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}