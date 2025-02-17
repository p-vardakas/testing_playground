'use client'

import { Product } from '@/data/products'
import { useCart } from '@/context/CartContext'
import Image from 'next/image'

interface ProductCardProps {
  product: Product
  onClickView: () => void
}

export default function ProductCard({ product, onClickView }: ProductCardProps) {
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    try {
      addToCart(product)
      console.log('Product added to cart:', product.name)
    } catch (error) {
      console.error('Error adding to cart:', error)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden" data-test-id={`product-card-${product.id}`}>
      <div className="relative h-48" data-test-id="product-image-container">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          data-test-id="product-image"
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800" data-test-id="product-name">
          {product.name}
        </h2>
        <p className="text-gray-600 mt-2" data-test-id="product-price">
          €{product.price.toFixed(2)}
        </p>
        <div className="mt-4 flex justify-between">
          <button
            onClick={handleAddToCart}
            className="btn-primary"
            data-test-id="add-to-cart-button"
          >
            Add to Cart
          </button>
          <button
            onClick={onClickView}
            className="btn-secondary"
            data-test-id="view-details-button"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  )
} 