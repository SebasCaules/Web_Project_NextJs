'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import classNames from 'classnames'
import { Loader2 } from 'lucide-react'
import PasswordValidationHint from '@/components/models/PasswordValidationHint'

export default function RegisterPage() {
    const [form, setForm] = useState({
        name: '',
        lastName: '',
        email: '',
        password: '',
    })

    const [touched, setTouched] = useState({
        name: false,
        lastName: false,
        email: false,
        password: false,
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    const passwordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(form.password)
    const allFilled = form.name && form.lastName && form.email && form.password
    const isFormValid = allFilled && emailValid && passwordValid

    const handleChange = (field: keyof typeof form, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }))
    }

    const handleRegister = async () => {
        setError('')
        setSuccessMessage('')
        setLoading(true)

        const res = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        })

        const result = await res.json()
        setLoading(false)

        if (!res.ok) {
            setError(result.message || 'Something went wrong. Please try again.')
            return
        }

        setSuccessMessage(result.message)
        setForm({ name: '', lastName: '', email: '', password: '' })
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4 py-12">
            <div className="w-full max-w-md border border-gray-200 rounded-lg shadow-sm bg-gray-100 p-8">
                <h2 className="text-3xl font-bold text-center mb-8">Sign Up</h2>

                {successMessage ? (
                    <p className="text-green-600 text-center text-sm">{successMessage}</p>
                ) : (
                    <>
                        <div className="space-y-4">
                            {/* Nombre */}
                            <div>
                                <label className="text-xs font-semibold text-gray-700 uppercase mb-1 block">First Name</label>
                                <Input
                                    value={form.name}
                                    onChange={(e) => handleChange('name', e.target.value)}
                                    onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
                                    placeholder="John"
                                    className={classNames({ 'border-red-500': touched.name && !form.name })}
                                />
                            </div>

                            {/* Apellido */}
                            <div>
                                <label className="text-xs font-semibold text-gray-700 uppercase mb-1 block">Last Name</label>
                                <Input
                                    value={form.lastName}
                                    onChange={(e) => handleChange('lastName', e.target.value)}
                                    onBlur={() => setTouched((prev) => ({ ...prev, lastName: true }))}
                                    placeholder="Doe"
                                    className={classNames({ 'border-red-500': touched.lastName && !form.lastName })}
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="text-xs font-semibold text-gray-700 uppercase mb-1 block">Email</label>
                                <Input
                                    type="email"
                                    value={form.email}
                                    onChange={(e) => handleChange('email', e.target.value)}
                                    onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
                                    placeholder="john@example.com"
                                    className={classNames({ 'border-red-500': touched.email && !emailValid })}
                                />
                                {touched.email && !emailValid && (
                                    <p className="text-sm text-red-600 mt-1">Enter a valid email address.</p>
                                )}
                            </div>

                            {/* Password */}
                            <div>
                                <label className="text-xs font-semibold text-gray-700 uppercase mb-1 block">
                                    Password
                                </label>
                                <Input
                                    type="password"
                                    value={form.password}
                                    onChange={(e) => handleChange('password', e.target.value)}
                                    onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
                                    placeholder="••••••••"
                                    className={classNames({ 'border-red-500': touched.password && !passwordValid })}
                                />
                                {/* Mostrar las condiciones solo si hay algo escrito y es inválido */}
                                {touched.password && form.password.length > 0 && !passwordValid && (
                                    <PasswordValidationHint password={form.password} />
                                )}
                            </div>
                        </div>

                        {error && <p className="text-sm text-red-600 text-center mt-4">{error}</p>}

                        <Button
                            className="mt-6 w-full font-semibold transition cursor-pointer flex justify-center items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white"
                            disabled={!isFormValid || loading}
                            onClick={handleRegister}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin w-4 h-4" />
                                    Creating account...
                                </>
                            ) : (
                                'Sign Up'
                            )}
                        </Button>
                    </>
                )}
            </div>
        </div>
    )
}