export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  customizations?: string[]
  specialInstructions?: string
}
