export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  customizations?: string[]
  specialInstructions?: string
}

export interface CartState {
  items: CartItem[]
  isOpen: boolean
  total: number
}
