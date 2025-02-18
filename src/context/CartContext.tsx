'use client'

import {Product} from '@/data/products'
import {createContext, useContext, useState, ReactNode, useCallback, useEffect, useMemo} from 'react'
import {toast} from 'react-hot-toast'

export interface CartItem extends Product {
    quantity: number
}

interface CartContextType {
    cart: CartItem[]
    addToCart: (product: Product) => void
    removeFromCart: (productId: number) => void
    clearCart: () => void
    total: number
    error: string | null
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({children}: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>(() => {
        // Safely retrieve cart from localStorage
        if (typeof window !== 'undefined') {
            try {
                const savedCart = localStorage.getItem('cart')
                return savedCart ? JSON.parse(savedCart) : []
            } catch (error) {
                console.error('Failed to parse cart from localStorage:', error)
                return []
            }
        }
        return []
    })
    const [error, setError] = useState<string | null>(null)

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        try {
            localStorage.setItem('cart', JSON.stringify(cart))
        } catch (error) {
            console.error('Failed to save cart to localStorage:', error)
            setError('Failed to save cart')
        }
    }, [cart])

    const addToCart = useCallback((product: Product) => {
        try {
            setCart(currentCart => {
                const existingItem = currentCart.find(item => item.id === product.id)
                if (existingItem) {
                    return currentCart.map(item =>
                        item.id === product.id
                            ? {...item, quantity: item.quantity + 1}
                            : item
                    )
                }
                return [...currentCart, {...product, quantity: 1}]
            })
            toast.success(`Added ${product.name} to cart`)
            setError(null)
        } catch (error) {
            console.error('Failed to add to cart:', error)
            setError('Failed to add item to cart')
            toast.error('Failed to add item to cart')
        }
    }, [])

    const removeFromCart = useCallback((productId: number) => {
        try {
            setCart(currentCart => currentCart.filter(item => item.id !== productId))
            toast.success('Item removed from cart')
            setError(null)
        } catch (error) {
            console.error('Failed to remove from cart:', error)
            setError('Failed to remove item from cart')
            toast.error('Failed to remove item from cart')
        }
    }, [])

    const clearCart = useCallback(() => {
        try {
            setCart([])
            localStorage.removeItem('cart')
            toast.success('Cart cleared')
            setError(null)
        } catch (error) {
            console.error('Failed to clear cart:', error)
            setError('Failed to clear cart')
            toast.error('Failed to clear cart')
        }
    }, [])

    const total = useMemo(() => 
        cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    , [cart])

    return (
        <CartContext.Provider 
            value={{ 
                cart, 
                addToCart, 
                removeFromCart, 
                clearCart, 
                total,
                error 
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider')
    }
    return context
} 