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
