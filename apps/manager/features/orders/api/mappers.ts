import type {
  BackendOrderStatus,
  OrderStatus,
  Order,
  OrderDetail,
  OrderListDto,
  OrderDetailDto,
  OrderItem,
} from '../types'

const backendToDomainStatus: Record<BackendOrderStatus, OrderStatus> = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PREPARING: 'preparing',
  READY: 'ready',
  OUT_FOR_DELIVERY: 'ready',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
}

export const domainToBackendStatus: Record<
  OrderStatus,
  BackendOrderStatus
> = {
  pending: 'PENDING',
  confirmed: 'CONFIRMED',
  preparing: 'PREPARING',
  ready: 'READY',
  completed: 'COMPLETED',
  cancelled: 'CANCELLED',
}

const formatOrderTime = (value: string) =>
  new Date(value).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

const getCustomerName = (
  dto: OrderListDto | OrderDetailDto,
): string => {
  if (dto.user && 'firstName' in dto.user) {
    const user = dto.user as { firstName: string; lastName: string }
    return [user.firstName, user.lastName].filter(Boolean).join(' ').trim() || 'Walk-in'
  }
  return 'Walk-in'
}

const getTableNumber = (
  dto: OrderListDto | OrderDetailDto,
): string => (dto.table?.number ? `T-${dto.table.number}` : 'Takeaway')

const mapOrderItem = (dto: {
  quantity: number
  unitPrice: number
  totalPrice: number
  notes: string | null
  dish: Record<string, unknown>
}): OrderItem => ({
  name: (dto.dish?.name as string) ?? 'Unknown item',
  quantity: dto.quantity,
  unitPrice: dto.unitPrice,
  totalPrice: dto.totalPrice,
  notes: dto.notes,
})

export const toOrder = (dto: OrderListDto | OrderDetailDto): Order => ({
  id: String(dto.id),
  orderNumber: dto.orderNumber,
  customerName: getCustomerName(dto),
  tableNumber: getTableNumber(dto),
  status: backendToDomainStatus[dto.status],
  totalAmount: dto.totalAmount,
  itemCount: 'itemCount' in dto ? dto.itemCount : dto.items.length,
  orderTime: dto.orderTime,
  orderTimeFormatted: formatOrderTime(dto.orderTime),
  paymentStatus: dto.paymentStatus,
})

export const toOrderDetail = (dto: OrderDetailDto): OrderDetail => ({
  ...toOrder(dto),
  items: dto.items.map(mapOrderItem),
  paymentMethod: dto.paymentMethod,
  notes: dto.notes,
  estimatedCompletionTime: dto.estimatedDeliveryTime,
  confirmedAt: dto.confirmedAt,
  preparedAt: dto.preparedAt,
  readyAt: dto.readyAt,
  completedAt: dto.completedAt,
  createdAt: dto.createdAt,
})

export const toOrders = (dtos: OrderListDto[]): Order[] =>
  dtos.map(toOrder)
