import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { CartItem } from "./types"

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  add: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void
  remove: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clear: () => void
  toggle: () => void
  open: () => void
  close: () => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      add: (payload) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === payload.id)
          const qty = payload.quantity ?? 1
          const items = existing
            ? state.items.map((i) =>
                i.id === payload.id ? { ...i, quantity: i.quantity + qty } : i,
              )
            : [...state.items, { ...payload, quantity: qty }]
          return { items }
        }),
      remove: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items
            .map((i) => (i.id === id ? { ...i, quantity } : i))
            .filter((i) => i.quantity > 0),
        })),
      clear: () => set({ items: [] }),
      toggle: () => set((state) => ({ isOpen: !state.isOpen })),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
    }),
    { name: "mayda_cart" },
  ),
)
