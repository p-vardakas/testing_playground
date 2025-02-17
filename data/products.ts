/**
 * Product images sourced from Unsplash (https://unsplash.com)
 * License: Unsplash License (https://unsplash.com/license)
 * - Free to use commercially and non-commercially
 * - No permission needed
 * - No attribution required
 * 
 * Image credits:
 * - Headphones by Daniel Romero
 * - Smart Watch by Luke Chesser
 * - Laptop by XPS
 * - Mouse by Francesca Tosolini
 * - Gaming Console by Igor Karimov
 * - Smartphone by Tyler Lastovich
 */

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

// Image credits in alphabetical order
const IMAGE_CREDITS = [
  'Daniel Romero - Wireless Earbuds',
  'Igor Karimov - Gaming Console',
  'Luke Chesser - Smart Watch',
  'Francesca Tosolini - Wireless Mouse',
  'Tyler Lastovich - Smartphone',
  'XPS - Laptop Pro'
] as const

export const products: Product[] = [
  {
    id: 1,
    name: "Wireless Earbuds",
    price: 199.99,
    description: "Premium wireless earbuds with noise cancellation",
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=500&q=80"
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 199.99,
    description: "Feature-rich smartwatch with health tracking capabilities",
    image: "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=500&q=80"
  },
  {
    id: 3,
    name: "Laptop Pro",
    price: 1299.99,
    description: "Powerful laptop for professionals and creators",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80"
  },
  {
    id: 4,
    name: "Wireless Mouse",
    price: 49.99,
    description: "Ergonomic wireless mouse with precision tracking",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80"
  },
  {
    id: 5,
    name: "Gaming Console",
    price: 499.99,
    description: "Next-gen gaming console for immersive gaming experience",
    image: "https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=500&q=80"
  },
  {
    id: 6,
    name: "Smartphone",
    price: 799.99,
    description: "Latest smartphone with advanced camera system",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80"
  }
] as const

// Validate product data
products.forEach(product => {
  if (!product.name || !product.price || !product.description || !product.image) {
    throw new Error(`Invalid product data: ${JSON.stringify(product)}`)
  }
}) 