import type { Order, OrderDto } from '../types';

export const toOrder = (dto: OrderDto): Order => ({
  id: dto.id,
  orderNumber: dto.orderNumber,
  restaurantId: dto.restaurantId,
  tableId: dto.tableId,
  userId: dto.userId,
  status: dto.status,
  totalAmount: dto.totalAmount,
  subtotal: dto.subtotal,
  orderTime: dto.orderTime,
  confirmedAt: dto.confirmedAt,
  preparedAt: dto.preparedAt,
  readyAt: dto.readyAt,
  completedAt: dto.completedAt,
  type: dto.type,
  paymentStatus: dto.paymentStatus,
  items: (dto.items || []).map((item) => ({
    id: item.id,
    dishId: item.dishId,
    dishName: item.dishName,
    quantity: item.quantity,
    unitPrice: item.unitPrice,
    totalPrice: item.totalPrice,
  })),
});
