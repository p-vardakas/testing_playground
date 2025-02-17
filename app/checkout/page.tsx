'use client'

import { useCart } from '@/context/CartContext'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Image from 'next/image'
import OrderConfirmationModal from '@/components/OrderConfirmationModal'
import { type CheckoutForm } from '@/types/checkout'

const inputClassName = "mt-1 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm"

export function CheckoutPage() {
  const { cart, total, clearCart } = useCart()
  const router = useRouter()
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [orderDetails, setOrderDetails] = useState<CheckoutForm | null>(null)

  const [formData, setFormData] = useState<CheckoutForm>({
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: ''
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setOrderDetails(formData)
    setShowConfirmation(true)
  }

  function handleConfirmOrder() {
    clearCart()
    router.push('/dashboard')
  }

  function handleZipChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.replace(/\D/g, '').slice(0, 5)
    setFormData({ ...formData, zip: value })
  }

  if (!cart.length) return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-testid="empty-cart-container">
      <p className="text-center text-gray-500" data-testid="empty-cart-message">Your cart is empty</p>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-testid="checkout-container">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <CheckoutForm 
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          handleZipChange={handleZipChange}
          router={router}
        />
        <OrderSummary cart={cart} total={total} />
      </div>

      {showConfirmation && orderDetails && (
        <OrderConfirmationModal
          isOpen={showConfirmation}
          onClose={() => setShowConfirmation(false)}
          onConfirm={handleConfirmOrder}
          orderDetails={orderDetails}
          cart={cart}
          total={total}
        />
      )}
    </div>
  )
}

// Subcomponents
function CheckoutForm({ formData, setFormData, handleSubmit, handleZipChange, router }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-white" data-testid="checkout-title">
        Checkout Information
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4" data-testid="checkout-form">
        {/* Form fields */}
        <FormInput
          label="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <FormInput
          label="Phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
        />
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-3">
            <FormInput
              label="Address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              required
            />
          </div>
          <div>
            <FormInput
              label="ZIP"
              value={formData.zip}
              onChange={handleZipChange}
              pattern="\d{5}"
              title="5-digit ZIP code"
              placeholder="12345"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormInput
            label="City"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            required
          />
          <FormInput
            label="State"
            value={formData.state}
            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
            required
          />
        </div>
        <FormButtons />
      </form>
    </div>
  )
}

function FormInput({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-white">
        {label}
      </label>
      <input className="input-primary" {...props} />
    </div>
  )
}

function FormButtons() {
  return (
    <div className="flex space-x-4">
      <button className="btn-secondary flex-1">Return to Products</button>
      <button className="btn-primary flex-1">Place Order</button>
    </div>
  )
}

function OrderSummary({ cart, total }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-white" data-testid="order-summary-title">
        Order Summary
      </h2>
      <div className="space-y-4" data-testid="order-summary-container">
        {cart.map((item) => (
          <OrderSummaryItem key={item.id} item={item} />
        ))}
        <OrderTotal total={total} />
      </div>
    </div>
  )
}

function OrderSummaryItem({ item }) {
  return (
    <div className="flex items-center space-x-4" data-testid={`summary-item-${item.id}`}>
      <div className="relative w-20 h-20 flex-shrink-0">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover rounded"
          data-testid={`summary-item-image-${item.id}`}
        />
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-medium text-white" data-testid={`summary-item-name-${item.id}`}>
          {item.name}
        </h3>
        <p className="text-gray-400" data-testid={`summary-item-price-${item.id}`}>
          €{item.price.toFixed(2)} x {item.quantity}
        </p>
      </div>
    </div>
  )
}

function OrderTotal({ total }) {
  return (
    <div className="border-t pt-4">
      <div className="flex justify-between items-center">
        <span className="text-lg font-medium text-white" data-testid="summary-total-label">
          Total:
        </span>
        <span className="text-xl font-bold text-white" data-testid="summary-total-amount">
          €{total.toFixed(2)}
        </span>
      </div>
    </div>
  )
}

export default CheckoutPage 