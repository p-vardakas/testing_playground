'use client'

import { products } from '../../data/products'
import ProductCard from '../../components/ProductCard'
import ProductModal from '../../components/ProductModal'
import { useState } from 'react'
import { Product } from '../../data/products'

export default function Dashboard() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-semibold text-white mb-8">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClickView={() => setSelectedProduct(product)}
          />
        ))}
      </div>
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  )
} 