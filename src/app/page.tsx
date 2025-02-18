'use client'

import {useRouter} from 'next/navigation'
import {useState} from 'react'

export default function LoginPage() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState('')

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError('')

        // Add validation
        if (!formData.email || !formData.password) {
            setError('Please fill in all fields')
            return
        }

        // Check credentials
        if (formData.email === 'test@test.com' && formData.password === 'test') {
            console.log('Login successful')
            router.push('/dashboard')
        } else {
            setError('Invalid credentials')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center" data-test-id="login-container">
            <div className="max-w-md w-full p-6 bg-white/5 backdrop-blur-sm rounded-lg">
                <h1 className="text-3xl font-semibold text-center text-white mb-6" data-test-id="login-title">
                    Sign in
                </h1>
                {error && (
                    <p className="text-red-500 text-sm text-center mb-4" data-test-id="login-error">
                        {error}
                    </p>
                )}
                <form onSubmit={handleSubmit} className="space-y-4" data-test-id="login-form">
                    <div>
                        <label className="block text-sm font-medium text-white" data-test-id="email-label">
                            Email
                        </label>
                        <input
                            type="email"
                            required
                            className="input-primary"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            data-test-id="email-input"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white" data-test-id="password-label">
                            Password
                        </label>
                        <input
                            type="password"
                            required
                            className="input-primary"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            data-test-id="password-input"
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn-primary w-full"
                        data-test-id="login-button"
                    >
                        Sign in
                    </button>
                </form>
                <p className="mt-4 text-sm text-gray-400 text-center" data-test-id="login-hint">
                    Hint: use test@test.com as email and test as password
                </p>
            </div>
        </div>
    )
} 