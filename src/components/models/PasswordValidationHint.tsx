import React from 'react'

interface PasswordValidationHintProps {
    password: string
}

export default function PasswordValidationHint({ password }: PasswordValidationHintProps) {
    if (password.length === 0) return null

    const rules = [
        {
            label: '• Al menos una mayúscula',
            valid: /[A-Z]/.test(password),
        },
        {
            label: '• Al menos una minúscula',
            valid: /[a-z]/.test(password),
        },
        {
            label: '• Al menos un número',
            valid: /\d/.test(password),
        },
        {
            label: '• Mínimo 8 caracteres',
            valid: password.length >= 8,
        },
    ]

    return (
        <ul className="mt-2 text-sm text-gray-600 space-y-1">
            {rules.map((rule, index) => (
                <li key={index} className={rule.valid ? 'text-green-600' : 'text-red-600'}>
                    {rule.label}
                </li>
            ))}
        </ul>
    )
}
