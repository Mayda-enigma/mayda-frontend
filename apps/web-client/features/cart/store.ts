import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, CartState } from './types'

interface CartActions {
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clear: () => void
  toggle: () => void
  open: () => void
  close: () => void
}

const initialState: CartState = {
  items: [],
  isOpen: false,
  total: 0,
}

const recalculateTotal = (items: CartItem[]): number =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0)

export const useCartStore = create<CartState & CartActions>()(
  persist(
    (set) => ({
      ...initialState,

      addItem: (payload) =>
        set((state) => {
          const existing = state.items.find((item) => item.id === payload.id)
          const items = existing
            ? state.items.map((item) =>
                item.id === payload.id
                  ? { ...item, quantity: item.quantity + (payload.quantity || 1) }
                  : item,
              )
            : [...state.items, { ...payload, quantity: payload.quantity || 1 }]
          return { items, total: recalculateTotal(items) }
        }),

      removeItem: (id) =>
        set((state) => {
          const items = state.items.filter((item) => item.id !== id)
          return { items, total: recalculateTotal(items) }
        }),

      updateQuantity: (id, quantity) =>
        set((state) => {
          const items = state.items
            .map((item) =>
              item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item,
            )
            .filter((item) => item.quantity > 0)
          return { items, total: recalculateTotal(items) }
        }),

      clear: () => set({ items: [], total: 0 }),

      toggle: () => set((state) => ({ isOpen: !state.isOpen })),

      open: () => set({ isOpen: true }),

      close: () => set({ isOpen: false }),
    }),
    { name: 'mayda_cart' },
  ),
)
