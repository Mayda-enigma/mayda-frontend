import type { OrderDto, Order } from '../types'

export const toOrder = (dto: OrderDto): Order => ({
  id: String(dto.id),
  orderNumber: dto.orderNumber,
  tableNumber: dto.table.number,
  status: dto.status,
  total: dto.totalAmount,
  type: dto.type,
  paymentStatus: dto.paymentStatus,
  placedAt: new Date(dto.orderTime),
  itemCount: dto.itemCount,
})

export const toOrders = (dtos: OrderDto[]): Order[] =>
  dtos.map(toOrder)
