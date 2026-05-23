export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'READY' | 'COMPLETED' | 'CANCELLED'

export interface OrderUserDto {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: number
}

export interface OrderTableDto {
  id: number
  number: string
  capacity: number
}

export interface OrderDto {
  id: number
  orderNumber: string
  restaurantId: number
  tableId: number
  type: string
  status: OrderStatus
  totalAmount: number
  paymentStatus: string
  orderTime: string
  user: OrderUserDto
  table: OrderTableDto
  itemCount: number
}

export interface Order {
  id: string
  orderNumber: string
  tableNumber: string
  status: OrderStatus
  total: number
  type: string
  paymentStatus: string
  placedAt: Date
  itemCount: number
}

export interface CreateOrderItemInput {
  dishId: number
  quantity: number
}

export interface CreateOrderInput {
  restaurantId: number
  tableId: number
  type: 'DINE_IN' | 'TAKEAWAY' | 'DELIVERY'
  items: CreateOrderItemInput[]
}

export interface CreateOrderItemDto {
  dishId: number
  quantity: number
  unitPrice: number
  totalPrice: number
}

export interface CreateOrderDto {
  restaurantId: number
  tableId: number
  type: string
  items: CreateOrderItemDto[]
}
