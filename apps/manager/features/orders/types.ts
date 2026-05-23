export type BackendOrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PREPARING'
  | 'READY'
  | 'OUT_FOR_DELIVERY'
  | 'COMPLETED'
  | 'CANCELLED'

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'ready'
  | 'completed'
  | 'cancelled'

export interface OrderItemDto {
  id: number
  dishId: number
  quantity: number
  unitPrice: number
  totalPrice: number
  notes: string | null
  dish: Record<string, unknown>
}

export interface OrderListDto {
  id: number
  orderNumber: string
  restaurantId: number
  tableId: number | null
  type: string
  status: BackendOrderStatus
  totalAmount: number
  paymentStatus: string
  orderTime: string
  user: {
    id: number
    firstName: string
    lastName: string
    phone: string | null
  } | null
  table: {
    id: number
    number: string
    capacity: number
  } | null
  itemCount: number
}

export interface OrderDetailDto {
  id: number
  orderNumber: string
  userId: number | null
  restaurantId: number
  tableId: number | null
  type: string
  status: BackendOrderStatus
  subtotal: number
  deliveryFee: number
  discount: number
  totalAmount: number
  deliveryAddressId: number | null
  estimatedDeliveryTime: string | null
  actualDeliveryTime: string | null
  paymentStatus: string
  paymentMethod: string | null
  notes: string | null
  orderTime: string
  confirmedAt: string | null
  preparedAt: string | null
  readyAt: string | null
  completedAt: string | null
  createdAt: string
  updatedAt: string
  items: OrderItemDto[]
  user: Record<string, unknown> | null
  table: { id: number; number: string; capacity: number } | null
  restaurant: Record<string, unknown>
}

export interface OrderItem {
  name: string
  quantity: number
  unitPrice: number
  totalPrice: number
  notes: string | null
}

export interface Order {
  id: string
  orderNumber: string
  customerName: string
  tableNumber: string
  status: OrderStatus
  totalAmount: number
  itemCount: number
  orderTime: string
  orderTimeFormatted: string
  paymentStatus: string
}

export interface OrderDetail extends Order {
  items: OrderItem[]
  paymentMethod: string | null
  notes: string | null
  estimatedCompletionTime: string | null
  confirmedAt: string | null
  preparedAt: string | null
  readyAt: string | null
  completedAt: string | null
  createdAt: string
}

export interface OrderStatusUpdateInput {
  id: string
  status: OrderStatus
  notes?: string
}
