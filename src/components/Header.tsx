'use client'

import { useCart } from '@/context/CartContext'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import CartModal from './CartModal'

export function Header() {
  const { cart, clearCart } = useCart()
  const router = useRouter()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogout = () => {
    clearCart()
    router.push('/')
  }

  return (
    <header className="bg-white shadow-md" data-test-id="header">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4" data-test-id="header-nav">
        <div className="flex justify-between items-center">
          <Link href="/dashboard" className="flex items-center" data-test-id="header-logo-link">
            <div className="relative w-[180px] h-[45px]" data-test-id="logo-container">
              <Image
                src="/images/agile-actors-logo.webp"
                alt="Agile Actors Logo"
                fill
                sizes="180px"
                priority
                quality={100}
                className="object-contain"
                data-test-id="logo-image"
              />
            </div>
            <div className="h-[45px] w-[2px] bg-gray-300 mx-4" />
            <span className="text-xl font-semibold text-[rgba(0,94,207,255)] hidden sm:inline self-center mt-[4px]" data-test-id="header-title">
              Testing playground
            </span>
          </Link>
          {mounted && pathname !== '/' && (
            <div className="flex items-center">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="sm:hidden p-2 text-gray-700 hover:text-gray-900 ml-2"
                data-test-id="mobile-menu-button"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                  />
                </svg>
              </button>

              {/* Desktop Navigation */}
              <div className="hidden sm:flex items-center space-x-4">
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="relative p-2 text-gray-700 hover:text-gray-900"
                  data-test-id="cart-button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    data-test-id="cart-icon"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  {cart.length > 0 && (
                    <span 
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs" 
                      data-test-id="cart-count"
                    >
                      {totalQuantity}
                    </span>
                  )}
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                  data-test-id="logout-button"
                >
                  Logout
                </button>
              </div>

              {/* Mobile Cart Button (Always Visible) */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="sm:hidden relative p-2 text-gray-700 hover:text-gray-900"
                data-test-id="mobile-cart-button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {cart.length > 0 && (
                  <span 
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                    data-test-id="mobile-cart-count"
                  >
                    {totalQuantity}
                  </span>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && mounted && pathname !== '/' && (
          <div className="sm:hidden mt-4 border-t pt-4" data-test-id="mobile-menu">
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              data-test-id="mobile-logout-button"
            >
              Logout
            </button>
          </div>
        )}
      </nav>
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  )
}

export default Header 