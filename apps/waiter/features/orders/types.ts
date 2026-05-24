export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'served' | 'cancelled';
export type OrderPriority = 'normal' | 'high';

export interface Order {
  id: number;
  tableId: number;
  tableNumber: string;
  waiterId: number;
  items: OrderItem[];
  status: OrderStatus;
  priority: OrderPriority;
  createdAt: string;
  notes?: string;
}

export interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  status: OrderStatus;
  specialInstructions?: string;
}

export interface OrderDto {
  id: number;
  tableId: number;
  tableNumber: string;
  waiterId: number;
  items: OrderItem[];
  status: string;
  priority: string;
  createdAt: string;
  notes?: string;
}
