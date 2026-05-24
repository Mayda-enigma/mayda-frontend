export type TableStatus = 'free' | 'occupied' | 'waiting' | 'served';

export interface Table {
  id: number;
  number: string;
  status: TableStatus;
  guests: number;
  pendingOrders: number;
  elapsedTime: number;
  needsAttention: boolean;
  lastOrderTime?: string;
}

export interface TableDto {
  id: number;
  number: string;
  status: string;
  guests: number;
  pendingOrders: number;
  elapsedTime: number;
  needsAttention: boolean;
  lastOrderTime?: string;
}
