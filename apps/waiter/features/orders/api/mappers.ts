import type { Order, OrderDto } from '../types';

const statusMap: Record<string, Order['status']> = {
  pending: 'pending',
  preparing: 'preparing',
  ready: 'ready',
  served: 'served',
  cancelled: 'cancelled',
};

const priorityMap: Record<string, Order['priority']> = {
  normal: 'normal',
  high: 'high',
};

export const toOrder = (dto: OrderDto): Order => ({
  id: dto.id,
  tableId: dto.tableId,
  tableNumber: dto.tableNumber,
  waiterId: dto.waiterId,
  items: dto.items,
  status: statusMap[dto.status] || 'pending',
  priority: priorityMap[dto.priority] || 'normal',
  createdAt: dto.createdAt,
  notes: dto.notes,
});
