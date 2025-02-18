'use client'

import {CartItem} from '@/context/CartContext'
import {CheckoutForm} from '@/types/checkout'

interface OrderConfirmationModalProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    orderDetails: CheckoutForm
    cart: CartItem[]
    total: number
}

export default function OrderConfirmationModal({
                                                   isOpen,
                                                   onClose,
                                                   onConfirm,
                                                   orderDetails,
                                                   cart,
                                                   total
                                               }: OrderConfirmationModalProps) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
             data-test-id="order-confirmation-modal">
            <div className="bg-white rounded-lg max-w-2xl w-full">
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4" data-test-id="confirmation-title">Confirm Your
                        Order</h2>

                    <div className="space-y-4">
                        <div className="border-b pb-4">
                            <h3 className="font-semibold text-gray-900 mb-2"
                                data-test-id="shipping-details-title">Shipping Details</h3>
                            <p data-test-id="shipping-name">{orderDetails.name}</p>
                            <p data-test-id="shipping-phone">{orderDetails.phone}</p>
                            <p data-test-id="shipping-address">{orderDetails.address}</p>
                            <p data-test-id="shipping-city-state">{orderDetails.city}, {orderDetails.state} {orderDetails.zip}</p>
                        </div>

                        <div className="border-b pb-4">
                            <h3 className="font-semibold text-gray-900 mb-2" data-test-id="order-summary-title">Order
                                Summary</h3>
                            {cart.map((item) => (
                                <div key={item.id} className="flex justify-between py-2"
                                     data-test-id={`confirmation-item-${item.id}`}>
                                    <span>{item.name} x {item.quantity}</span>
                                    <span>€{(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                            <div className="flex justify-between font-bold mt-2" data-test-id="confirmation-total">
                                <span>Total:</span>
                                <span>€{total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end space-x-4">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-gray-700 hover:text-gray-900"
                            data-test-id="cancel-order-button"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                            data-test-id="confirm-order-button"
                        >
                            Confirm Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
} 