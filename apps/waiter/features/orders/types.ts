export interface Order {
  id: number;
  orderNumber: string;
  restaurantId: number;
  tableId: number | null;
  userId: number | null;
  status: string;
  totalAmount: number;
  subtotal: number;
  orderTime: string;
  confirmedAt: string | null;
  preparedAt: string | null;
  readyAt: string | null;
  completedAt: string | null;
  type: string;
  paymentStatus: string;
  items: OrderItem[];
}

export interface OrderItem {
  id: number;
  dishId: number;
  dishName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface OrderDto {
  id: number;
  orderNumber: string;
  restaurantId: number;
  tableId: number | null;
  userId: number | null;
  status: string;
  totalAmount: number;
  subtotal: number;
  orderTime: string;
  confirmedAt: string | null;
  preparedAt: string | null;
  readyAt: string | null;
  completedAt: string | null;
  type: string;
  paymentStatus: string;
  items: OrderItemDto[];
}

export interface OrderItemDto {
  id: number;
  dishId: number;
  dishName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}
