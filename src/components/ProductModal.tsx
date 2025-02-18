'use client'

import {Product} from '@/data/products'
import {useCart} from '@/context/CartContext'
import Image from 'next/image'

interface ProductModalProps {
    product: Product
    isOpen: boolean
    onClose: () => void
}

export default function ProductModal({product, isOpen, onClose}: ProductModalProps) {
    const {addToCart} = useCart()

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
             data-test-id="product-modal">
            <div className="bg-white rounded-lg max-w-2xl w-full">
                <div className="p-6">
                    <div className="flex justify-between items-start">
                        <h2 className="text-2xl font-bold text-gray-900"
                            data-test-id="modal-product-name">{product.name}</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-500"
                            data-test-id="close-modal-button"
                        >
                            <span className="sr-only">Close</span>
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>
                    <div className="mt-4 relative h-64" data-test-id="modal-product-image-container">
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover rounded-lg"
                            data-test-id="modal-product-image"
                        />
                    </div>
                    <p className="mt-4 text-gray-600" data-test-id="modal-product-description">{product.description}</p>
                    <p className="mt-4 text-xl font-bold text-gray-900" data-test-id="modal-product-price">
                        €{product.price.toFixed(2)}
                    </p>
                    <div className="mt-6">
                        <button
                            onClick={() => {
                                addToCart(product)
                                onClose()
                            }}
                            className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                            data-test-id="modal-add-to-cart-button"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
} 