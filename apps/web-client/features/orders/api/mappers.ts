import type {
  OrderDto,
  Order,
  OrderItemDto,
  OrderItem,
  CreateOrderInput,
  CreateOrderDto,
  CreateOrderItemInput,
  CreateOrderItemDto,
} from '../types'

export const toOrderItem = (dto: OrderItemDto): OrderItem => ({
  id: dto.id,
  name: dto.name,
  quantity: dto.quantity,
  price: dto.price_cents / 100,
  image: dto.image_url,
  status: dto.status,
})

export const toOrder = (dto: OrderDto): Order => ({
  id: dto.id,
  tableNumber: dto.table_number,
  items: dto.items.map(toOrderItem),
  status: dto.status,
  total: dto.total_cents / 100,
  estimatedMinutes: dto.estimated_minutes,
  placedAt: new Date(dto.placed_at),
  actualMinutes: dto.actual_minutes,
  hasReview: dto.has_review,
})

export const toOrders = (dtos: OrderDto[]): Order[] =>
  dtos.map(toOrder)

export const toCreateOrderItemDto = (input: CreateOrderItemInput): CreateOrderItemDto => ({
  menu_item_id: input.menuItemId,
  quantity: input.quantity,
})

export const toCreateOrderDto = (input: CreateOrderInput): CreateOrderDto => ({
  items: input.items.map(toCreateOrderItemDto),
})
