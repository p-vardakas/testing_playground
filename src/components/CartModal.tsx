'use client'

import {useCart} from '@/context/CartContext'
import {useRouter} from 'next/navigation'
import Image from 'next/image'

interface CartModalProps {
    isOpen: boolean
    onClose: () => void
}

export default function CartModal({isOpen, onClose}: CartModalProps) {
    const {cart, removeFromCart, total} = useCart()
    const router = useRouter()

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
             data-test-id="cart-modal">
            <div className="bg-white rounded-lg max-w-2xl w-full">
                <div className="p-6 border-b">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-semibold text-gray-900" data-test-id="cart-title">Shopping
                            Cart</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-500"
                            data-test-id="close-cart-button"
                        >
                            <span className="sr-only">Close</span>
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6" data-test-id="cart-items-container">
                    {cart.length === 0 ? (
                        <p className="text-center text-gray-500" data-test-id="empty-cart-message">Your cart is
                            empty</p>
                    ) : (
                        <div className="space-y-4">
                            {cart.map((item) => (
                                <div key={item.id} className="flex items-center space-x-4"
                                     data-test-id={`cart-item-${item.id}`}>
                                    <div className="relative w-20 h-20 flex-shrink-0">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover rounded"
                                            data-test-id={`cart-item-image-${item.id}`}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-medium text-gray-900"
                                            data-test-id={`cart-item-name-${item.id}`}>{item.name}</h3>
                                        <p className="text-gray-700" data-test-id={`cart-item-price-${item.id}`}>
                                            €{item.price.toFixed(2)} x {item.quantity}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-red-500 hover:text-red-700"
                                        data-test-id={`remove-item-${item.id}`}
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="p-6 border-t">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-medium text-gray-900"
                              data-test-id="cart-total-label">Total:</span>
                        <span className="text-xl font-bold text-gray-900"
                              data-test-id="cart-total-amount">€{total.toFixed(2)}</span>
                    </div>
                    <button
                        onClick={() => {
                            onClose()
                            router.push('/checkout')
                        }}
                        disabled={cart.length === 0}
                        className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        data-test-id="checkout-button"
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    )
} 