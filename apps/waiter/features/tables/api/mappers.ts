import type { Table, TableDto } from '../types';

const statusMap: Record<string, Table['status']> = {
  free: 'free',
  occupied: 'occupied',
  waiting: 'waiting',
  served: 'served',
};

export const toTable = (dto: TableDto): Table => ({
  id: dto.id,
  number: dto.number,
  status: statusMap[dto.status] || 'free',
  guests: dto.guests,
  pendingOrders: dto.pendingOrders,
  elapsedTime: dto.elapsedTime,
  needsAttention: dto.needsAttention,
  lastOrderTime: dto.lastOrderTime,
});
