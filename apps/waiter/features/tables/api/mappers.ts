import type { Table, TableDto } from '../types';

export const toTable = (dto: TableDto): Table => ({
  id: dto.id,
  number: dto.number,
  capacity: dto.capacity,
  isActive: dto.isActive,
  status: dto.status === 'OCCUPIED' ? 'OCCUPIED' : 'AVAILABLE',
  qrCode: dto.qrCode,
  currentSession: dto.currentSession,
  activeOrdersCount: dto.activeOrdersCount,
});
