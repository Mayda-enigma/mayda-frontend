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
  const state = useCartStore((s) => ({
    items: s.items,
    isOpen: s.isOpen,
    total: s.total,
  }))

  const store = useCartStore.getState()

  const dispatch = (action: CartAction) => {
    switch (action.type) {
      case 'ADD_ITEM':
        return store.addItem(action.payload)
      case 'REMOVE_ITEM':
        return store.removeItem(action.payload)
      case 'UPDATE_QUANTITY':
        return store.updateQuantity(action.payload.id, action.payload.quantity)
      case 'CLEAR_CART':
        return store.clear()
      case 'TOGGLE_CART':
        return store.toggle()
      case 'OPEN_CART':
        return store.open()
      case 'CLOSE_CART':
        return store.close()
    }
  }

  return { state, dispatch }
}
