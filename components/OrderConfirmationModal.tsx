'use client'

import { CartItem } from '../context/CartContext'
import Image from 'next/image'

interface OrderConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  orderDetails: {
    name: string
    email: string
    phone: string
    address: string
    city: string
    state: string
    zip: string
  }
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" data-testid="order-confirmation-modal">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4" data-testid="confirmation-title">
            Order Confirmation
          </h2>
          
          <div className="space-y-4">
            <div data-testid="shipping-info">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Shipping Information</h3>
              <p className="text-gray-700" data-testid="shipping-name">{orderDetails.name}</p>
              <p className="text-gray-700" data-testid="shipping-phone">{orderDetails.phone}</p>
              <p className="text-gray-700" data-testid="shipping-address">{orderDetails.address}</p>
              <p className="text-gray-700" data-testid="shipping-location">{`${orderDetails.city}, ${orderDetails.state} ${orderDetails.zip}`}</p>
            </div>

            <div data-testid="order-items">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Order Items</h3>
              <div className="space-y-2">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4" data-testid={`order-item-${item.id}`}>
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover rounded"
                        data-testid={`order-item-image-${item.id}`}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-700" data-testid={`order-item-name-${item.id}`}>{item.name}</p>
                      <p className="text-gray-600" data-testid={`order-item-price-${item.id}`}>
                        €{item.price.toFixed(2)} x {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium text-gray-900" data-testid="order-total-label">Total:</span>
                <span className="text-xl font-bold" data-testid="order-total-amount">
                  €{total.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={onClose}
                className="flex-1 bg-gray-100 text-gray-800 px-4 py-2 rounded hover:bg-gray-200"
                data-testid="cancel-order-button"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                data-testid="confirm-order-button"
              >
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 