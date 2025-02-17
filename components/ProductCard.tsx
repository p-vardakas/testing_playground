'use client'

import { Product } from '../data/products'
import { useCart } from '../context/CartContext'
import Image from 'next/image'

interface ProductCardProps {
  product: Product
  onClickView: () => void
}

export default function ProductCard({ product, onClickView }: ProductCardProps) {
  const { addToCart } = useCart()

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden" data-testid={`product-card-${product.id}`}>
      <div className="relative h-48" data-testid="product-image-container">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          data-testid="product-image"
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800" data-testid="product-name">
          {product.name}
        </h2>
        <p className="text-gray-600 mt-2" data-testid="product-price">€{product.price.toFixed(2)}</p>
        <div className="mt-4 flex justify-between">
          <button
            onClick={() => addToCart(product)}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            data-testid="add-to-cart-button"
          >
            Add to Cart
          </button>
          <button
            onClick={onClickView}
            className="bg-gray-100 text-gray-800 px-4 py-2 rounded hover:bg-gray-200"
            data-testid="view-details-button"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  )
} 