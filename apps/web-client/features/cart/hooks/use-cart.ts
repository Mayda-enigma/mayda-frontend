import { useCallback } from 'react'
import { useCartStore } from '../store'
import type { CartItem } from '../types'

type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> & { quantity?: number } }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' }

export function useCart() {
  const items = useCartStore((s) => s.items)
  const isOpen = useCartStore((s) => s.isOpen)
  const total = useCartStore((s) => s.total)

  const dispatch = useCallback((action: CartAction) => {
    const s = useCartStore.getState()
    switch (action.type) {
      case 'ADD_ITEM':
        return s.addItem(action.payload)
      case 'REMOVE_ITEM':
        return s.removeItem(action.payload)
      case 'UPDATE_QUANTITY':
        return s.updateQuantity(action.payload.id, action.payload.quantity)
      case 'CLEAR_CART':
        return s.clear()
      case 'TOGGLE_CART':
        return s.toggle()
      case 'OPEN_CART':
        return s.open()
      case 'CLOSE_CART':
        return s.close()
    }
  }, [])

  return { state: { items, isOpen, total }, dispatch }
}
