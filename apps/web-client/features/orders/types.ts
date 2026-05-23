export type OrderStatus = 'placed' | 'confirmed' | 'preparing' | 'ready' | 'completed'

export type OrderItemStatus = 'pending' | 'preparing' | 'ready' | 'served'

export interface OrderDto {
  id: string
  table_number: string
  items: OrderItemDto[]
  status: OrderStatus
  total_cents: number
  estimated_minutes: number
  placed_at: string
  actual_minutes?: number
  has_review?: boolean
}

export interface OrderItemDto {
  id: string
  name: string
  quantity: number
  price_cents: number
  image_url: string
  status: OrderItemStatus
}

export interface Order {
  id: string
  tableNumber: string
  items: OrderItem[]
  status: OrderStatus
  total: number
  estimatedMinutes: number
  placedAt: Date
  actualMinutes?: number
  hasReview?: boolean
}

export interface OrderItem {
  id: string
  name: string
  quantity: number
  price: number
  image: string
  status: OrderItemStatus
}

export interface CreateOrderItemInput {
  menuItemId: string
  quantity: number
}

export interface CreateOrderInput {
  items: CreateOrderItemInput[]
}

export interface CreateOrderItemDto {
  menu_item_id: string
  quantity: number
}

export interface CreateOrderDto {
  items: CreateOrderItemDto[]
}

export interface OrderError {
  detail?: string
  message?: string
}
