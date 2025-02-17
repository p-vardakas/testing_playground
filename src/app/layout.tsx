import type { Metadata } from "next"
import { GeistSans } from 'geist/font/sans'
import "./globals.css"
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { CartProvider } from '@/context/CartContext'

const geist = GeistSans

export const metadata: Metadata = {
  title: "E-commerce Testing Playground",
  description: "A testing playground for e-commerce functionality",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={geist.className}>
      <body className="bg-gray-900">
        <CartProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  )
}