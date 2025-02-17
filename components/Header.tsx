'use client'

import { useCart } from '@/context/CartContext'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import CartModal from './CartModal'

export function Header() {
  const { cart } = useCart()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="bg-white shadow-md" data-testid="header">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center" data-testid="logo">
            <div className="relative w-[180px] h-[45px]">
              <Image
                src="/images/agile-actors-logo.webp"
                alt="Agile Actors Logo"
                fill
                sizes="180px"
                priority
                quality={100}
                className="object-contain"
                data-testid="logo-image"
              />
            </div>
            <div className="h-[45px] w-[2px] bg-gray-300 mx-4" />
            <span className="text-xl font-semibold text-gray-800">
              E-commerce testing playground
            </span>
          </Link>
          {mounted && pathname !== '/' && (
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-gray-700 hover:text-gray-900"
              data-testid="cart-button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                data-testid="cart-icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs" data-testid="cart-count">
                  {cart.length}
                </span>
              )}
            </button>
          )}
        </div>
      </nav>
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  )
}

export default Header 