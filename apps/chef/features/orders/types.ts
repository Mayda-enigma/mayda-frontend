export type BackendOrderStatus = 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'READY' | 'OUT_FOR_DELIVERY' | 'COMPLETED' | 'CANCELLED';

export interface OrderListDto {
  id: number;
  orderNumber: string;
  restaurantId: number;
  tableId: number | null;
  type: string;
  status: BackendOrderStatus;
  totalAmount: number;
  paymentStatus: string;
  orderTime: string;
  user: { id: number; firstName: string; lastName: string; phone: number } | null;
  table: { id: number; number: number; capacity: number } | null;
  itemCount: number;
}

export interface OrderItemDto {
  id: number;
  dishId: number;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  notes: string | null;
  dish: Record<string, unknown>;
}

export interface OrderDetailDto {
  id: number;
  orderNumber: string;
  userId: number | null;
  restaurantId: number;
  tableId: number | null;
  type: string;
  status: BackendOrderStatus;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  totalAmount: number;
  deliveryAddressId: number | null;
  estimatedDeliveryTime: string | null;
  actualDeliveryTime: string | null;
  paymentStatus: string;
  paymentMethod: string | null;
  notes: string | null;
  orderTime: string;
  confirmedAt: string | null;
  preparedAt: string | null;
  readyAt: string | null;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
  items: OrderItemDto[];
  user: Record<string, unknown> | null;
  table: { id: number; number: number; capacity: number } | null;
  restaurant: Record<string, unknown>;
}

export interface Dish {
  name: string;
  notes: string;
  allergens: string[];
  image?: string;
}

export interface DishStep {
  name: string;
  notes: string;
  allergens: string[];
  image?: string;
  prepTime: number;
  steps: string[];
  currentStep: number;
}

export type OrderStatus = 'pending' | 'in-progress' | 'ready' | 'completed';
export type Complexity = 'low' | 'medium' | 'high';
export type Priority = 'normal' | 'urgent';

export interface Order {
  id: string;
  backendId: number;
  tableNumber: number;
  timeReceived: Date;
  status: OrderStatus;
  complexity: Complexity;
  dishes: Dish[];
  specialRequests: string;
  priority: Priority;
}

export interface OrderDetail extends Order {
  dishes: DishStep[];
  customerNotes?: string;
  estimatedCompletion?: Date;
}

export interface StockAlert {
  ingredient: string;
  currentStock: number;
  threshold: number;
  unit: string;
  category: string;
}
