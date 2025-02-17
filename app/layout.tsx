import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { CartProvider } from '@/context/CartContext'

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "E-commerce Testing Playground",
  description: "A testing playground for e-commerce functionality",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} font-sans antialiased bg-gray-900`}>
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
  );
}
