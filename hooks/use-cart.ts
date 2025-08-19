'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: number
  name: string
  price: number
  originalPrice?: number
  quantity: number
  imageNumber: number
  category: string
}

interface CartStore {
  items: CartItem[]
  addItem: (product: any) => void
  removeItem: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
  getItemsCount: () => number
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product) => {
        const { items } = get()
        const existingItem = items.find(item => item.id === product.id)
        
        if (existingItem) {
          set({
            items: items.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          })
        } else {
          set({
            items: [...items, {
              id: product.id,
              name: product.name,
              price: product.price,
              originalPrice: product.originalPrice,
              quantity: 1,
              imageNumber: product.imageNumber,
              category: product.category
            }]
          })
        }
      },
      
      removeItem: (productId) => {
        const { items } = get()
        set({
          items: items.filter(item => item.id !== productId)
        })
      },
      
      updateQuantity: (productId, quantity) => {
        const { items } = get()
        if (quantity <= 0) {
          get().removeItem(productId)
        } else {
          set({
            items: items.map(item =>
              item.id === productId
                ? { ...item, quantity }
                : item
            )
          })
        }
      },
      
      clearCart: () => {
        set({ items: [] })
      },
      
      getTotal: () => {
        const { items } = get()
        return items.reduce((total, item) => total + (item.price * item.quantity), 0)
      },
      
      getItemsCount: () => {
        const { items } = get()
        return items.reduce((count, item) => count + item.quantity, 0)
      }
    }),
    {
      name: 'cart-storage',
    }
  )
) 