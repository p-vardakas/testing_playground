'use client'

import {useCart} from '@/context/CartContext'
import {useRouter} from 'next/navigation'
import {useState, useCallback, useEffect} from 'react'
import {type CheckoutForm} from '@/types/checkout'

const phoneRegex = /^\+?[\d\s-]{10,}$/
const zipRegex = /^\d{5}$/

export default function CheckoutPage() {
    const {cart, total, clearCart} = useCart()
    const router = useRouter()
    const [showConfirmation, setShowConfirmation] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const [orderId, setOrderId] = useState('')
    const [showCancelConfirmation, setShowCancelConfirmation] = useState(false)
    const [formData, setFormData] = useState<CheckoutForm>({
        name: '',
        phone: '',
        address: '',
        city: '',
        zip: ''
    })
    const [errors, setErrors] = useState<Partial<Record<keyof CheckoutForm, string>>>({})

    const totalItems = cart.length
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0)

    const validateForm = useCallback((): boolean => {
        const newErrors: Partial<Record<keyof CheckoutForm, string>> = {}

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required'
        }

        if (!phoneRegex.test(formData.phone)) {
            newErrors.phone = 'Please enter a valid phone number'
        }

        if (!formData.address.trim()) {
            newErrors.address = 'Address is required'
        }

        if (!formData.city.trim()) {
            newErrors.city = 'City is required'
        }

        if (!zipRegex.test(formData.zip)) {
            newErrors.zip = 'Please enter a valid 5-digit ZIP code'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }, [formData])

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (validateForm()) {
            setShowConfirmation(true)
        }
    }

    function handleConfirmOrder(): void {
        const randomOrderId = Math.floor(100000 + Math.random() * 900000).toString()
        setOrderId(randomOrderId)
        setShowConfirmation(false)
        setShowSuccess(true)
    }

    function handleReturnToProducts(): void {
        clearCart()
        router.push('/dashboard')
    }

    function handleCancelOrder(): void {
        clearCart()
        router.push('/dashboard')
    }

    useEffect(() => {
        if (showConfirmation || showCancelConfirmation) {
            // Prevent background scrolling when modal is open
            document.body.style.overflow = 'hidden'
            // Focus first interactive element in modal
            const modal = document.querySelector('[role="dialog"]')
            const firstButton = modal?.querySelector('button')
            firstButton?.focus()
        } else {
            document.body.style.overflow = 'unset'
        }
    }, [showConfirmation, showCancelConfirmation])

    if (!cart.length) return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-test-id="empty-cart-container">
            <p className="text-center text-gray-500" data-test-id="empty-cart-message">Your cart is empty</p>
            <button
                onClick={() => router.push('/dashboard')}
                className="btn-primary mt-4 mx-auto block"
                data-test-id="return-to-products-button"
            >
                Return to Products
            </button>
        </div>
    )

    if (showSuccess) return (
        <div 
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" 
            data-test-id="success-container"
            role="alert"
        >
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 max-w-2xl mx-auto text-center">
                {/* Checkmark Icon */}
                <div className="mb-6 flex justify-center">
                    <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center">
                        <svg
                            className="w-12 h-12 text-teal-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            data-test-id="success-checkmark"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                </div>

                {/* Thank You Message */}
                <h2 className="text-[32px] font-bold text-teal-600 mb-4" data-test-id="success-title">
                    Thank You For Your Order!
                </h2>

                {/* Order ID */}
                <p className="text-xl text-gray-300 mb-8" data-test-id="success-order-id">
                    Order ID: #{orderId}
                </p>

                <button
                    onClick={handleReturnToProducts}
                    className="btn-primary"
                    data-test-id="success-return-button"
                    aria-label="Return to products page"
                >
                    Return to Products
                </button>
            </div>
        </div>
    )

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-test-id="checkout-container">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-semibold text-white" data-test-id="checkout-title">Checkout</h1>
                <button
                    onClick={() => router.push('/dashboard')}
                    className="btn-secondary"
                    data-test-id="return-button"
                >
                    Return to Products
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-2xl font-semibold text-white mb-6" data-test-id="shipping-title">Shipping
                        Information</h2>
                    <form onSubmit={handleSubmit} className="space-y-4" data-test-id="checkout-form" noValidate>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-white" data-test-id="name-label">
                                Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                required
                                aria-required="true"
                                aria-invalid={!!errors.name}
                                aria-describedby={errors.name ? "name-error" : undefined}
                                className={`input-primary ${errors.name ? 'border-red-500' : ''}`}
                                value={formData.name}
                                onChange={(e) => {
                                    setFormData({...formData, name: e.target.value})
                                    if (errors.name) {
                                        setErrors({...errors, name: ''})
                                    }
                                }}
                                data-test-id="name-input"
                            />
                            {errors.name && (
                                <p id="name-error" className="mt-1 text-sm text-red-500" role="alert" data-test-id="name-error">
                                    {errors.name}
                                </p>
                            )}
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="col-span-2">
                                <label htmlFor="address" className="block text-sm font-medium text-white" data-test-id="address-label">Address</label>
                                <input
                                    id="address"
                                    type="text"
                                    required
                                    aria-required="true"
                                    aria-invalid={!!errors.address}
                                    aria-describedby={errors.address ? "address-error" : undefined}
                                    className={`input-primary ${errors.address ? 'border-red-500' : ''}`}
                                    value={formData.address}
                                    onChange={(e) => {
                                        setFormData({...formData, address: e.target.value})
                                        if (errors.address) setErrors({...errors, address: ''})
                                    }}
                                    data-test-id="address-input"
                                />
                                {errors.address && (
                                    <p id="address-error" className="mt-1 text-sm text-red-500" role="alert" data-test-id="address-error">
                                        {errors.address}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="zip" className="block text-sm font-medium text-white" data-test-id="zip-label">ZIP Code</label>
                                <input
                                    id="zip"
                                    type="text"
                                    required
                                    aria-required="true"
                                    aria-invalid={!!errors.zip}
                                    aria-describedby={errors.zip ? "zip-error" : undefined}
                                    className={`input-primary ${errors.zip ? 'border-red-500' : ''}`}
                                    value={formData.zip}
                                    onChange={(e) => {
                                        setFormData({...formData, zip: e.target.value.replace(/\D/g, '').slice(0, 5)})
                                        if (errors.zip) setErrors({...errors, zip: ''})
                                    }}
                                    data-test-id="zip-input"
                                />
                                {errors.zip && (
                                    <p id="zip-error" className="mt-1 text-sm text-red-500" role="alert" data-test-id="zip-error">
                                        {errors.zip}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="city" className="block text-sm font-medium text-white" data-test-id="city-label">City</label>
                                <input
                                    id="city"
                                    type="text"
                                    required
                                    aria-required="true"
                                    aria-invalid={!!errors.city}
                                    aria-describedby={errors.city ? "city-error" : undefined}
                                    className={`input-primary ${errors.city ? 'border-red-500' : ''}`}
                                    value={formData.city}
                                    onChange={(e) => {
                                        setFormData({...formData, city: e.target.value})
                                        if (errors.city) setErrors({...errors, city: ''})
                                    }}
                                    data-test-id="city-input"
                                />
                                {errors.city && (
                                    <p id="city-error" className="mt-1 text-sm text-red-500" role="alert" data-test-id="city-error">
                                        {errors.city}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-white" data-test-id="phone-label">Phone</label>
                                <input
                                    id="phone"
                                    type="tel"
                                    required
                                    aria-required="true"
                                    aria-invalid={!!errors.phone}
                                    aria-describedby={errors.phone ? "phone-error" : undefined}
                                    className={`input-primary ${errors.phone ? 'border-red-500' : ''}`}
                                    value={formData.phone}
                                    onChange={(e) => {
                                        setFormData({...formData, phone: e.target.value})
                                        if (errors.phone) setErrors({...errors, phone: ''})
                                    }}
                                    data-test-id="phone-input"
                                />
                                {errors.phone && (
                                    <p id="phone-error" className="mt-1 text-sm text-red-500" role="alert" data-test-id="phone-error">
                                        {errors.phone}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            <button 
                                type="button"
                                onClick={() => setShowCancelConfirmation(true)}
                                className="btn-secondary w-full" 
                                data-test-id="cancel-checkout-button"
                            >
                                Cancel Order
                            </button>
                            <button 
                                type="submit" 
                                className="btn-primary w-full" 
                                data-test-id="place-order-button"
                            >
                                Place Order
                            </button>
                        </div>
                    </form>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold text-white mb-6" data-test-id="order-summary-title">Order
                        Summary</h2>
                    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6" data-test-id="order-summary-container">
                        <div className="space-y-4 mb-6" data-test-id="cart-items-list">
                            {cart.map((item) => (
                                <div key={item.id} className="flex items-center space-x-4"
                                     data-test-id={`cart-item-${item.id}`}>
                                    <div className="flex-1">
                                        <p className="font-medium text-white"
                                           data-test-id={`item-name-${item.id}`}>{item.name}</p>
                                        <p className="text-gray-400" data-test-id={`item-price-${item.id}`}>
                                            €{item.price.toFixed(2)} x {item.quantity}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-gray-700 pt-4 space-y-2">
                            <div className="flex justify-between text-gray-400">
                                <span data-test-id="total-items-label">Total Items:</span>
                                <span data-test-id="total-items-value">{totalItems}</span>
                            </div>
                            <div className="flex justify-between text-gray-400">
                                <span data-test-id="total-quantity-label">Total Quantity:</span>
                                <span data-test-id="total-quantity-value">{totalQuantity}</span>
                            </div>
                            <div className="flex justify-between text-xl font-bold text-white mt-4">
                                <span data-test-id="total-price-label">Total Price:</span>
                                <span data-test-id="total-price-value">€{total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showConfirmation && (
                <div 
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50" 
                    data-test-id="order-confirmation-modal"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="confirmation-title"
                >
                    <div className="bg-white rounded-[20px] max-w-2xl w-full p-8" data-test-id="order-confirmation-content">
                        <h2 className="text-[32px] font-bold text-gray-900 mb-8" data-test-id="confirmation-title">
                            Confirm Your Order
                        </h2>

                        <div className="space-y-8">
                            {/* Shipping Details */}
                            <div>
                                <h3 className="text-[24px] font-semibold text-gray-900 mb-4"
                                    data-test-id="shipping-details-title">
                                    Shipping Details
                                </h3>
                                <div className="space-y-2 text-gray-600">
                                    <p className="text-[16px]" data-test-id="shipping-name">{formData.name}</p>
                                    <p className="text-[16px]" data-test-id="shipping-phone">{formData.phone}</p>
                                    <p className="text-[16px]" data-test-id="shipping-address">{formData.address}</p>
                                    <p className="text-[16px]" data-test-id="shipping-city-state">
                                        {formData.city} {formData.zip}
                                    </p>
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div>
                                <h3 className="text-[24px] font-semibold text-gray-900 mb-4"
                                    data-test-id="order-summary-title">
                                    Order Summary
                                </h3>
                                <div className="space-y-3">
                                    {cart.map((item) => (
                                        <div key={item.id} className="flex justify-between text-[16px] text-gray-600"
                                             data-test-id={`confirmation-item-${item.id}`}>
                                            <span>{item.name} x {item.quantity}</span>
                                            <span>€{(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    ))}
                                    <div
                                        className="flex justify-between font-bold text-[18px] text-gray-900 pt-4 border-t"
                                        data-test-id="confirmation-total">
                                        <span>Total:</span>
                                        <span>€{total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end items-center space-x-4">
                            <button
                                onClick={() => setShowConfirmation(false)}
                                className="px-6 py-3 text-[16px] text-gray-600 hover:text-gray-900 font-medium"
                                data-test-id="modal-cancel-button"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmOrder}
                                className="px-6 py-3 text-[16px] bg-[#6366F1] text-white font-medium rounded-lg hover:bg-[#5558E6]"
                                data-test-id="modal-confirm-button"
                            >
                                Confirm Order
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Cancel Confirmation Modal */}
            {showCancelConfirmation && (
                <div 
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50" 
                    data-test-id="cancel-confirmation-modal"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="cancel-confirmation-title"
                >
                    <div className="bg-white rounded-lg max-w-md w-full p-6" data-test-id="cancel-confirmation-content">
                        <h2 
                            className="text-2xl font-bold text-gray-900 mb-4" 
                            data-test-id="cancel-confirmation-title"
                        >
                            Cancel Order?
                        </h2>
                        <p 
                            className="text-gray-600 mb-6" 
                            data-test-id="cancel-confirmation-message"
                        >
                            Are you sure you want to cancel your order?
                        </p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setShowCancelConfirmation(false)}
                                className="px-4 py-2 text-gray-700 hover:text-gray-900"
                                data-test-id="modal-keep-shopping-button"
                            >
                                Keep Shopping
                            </button>
                            <button
                                onClick={handleCancelOrder}
                                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                                data-test-id="modal-confirm-cancel-button"
                            >
                                Cancel Order
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
} 