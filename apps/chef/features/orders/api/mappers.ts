import type { OrderListDto, OrderDetailDto, OrderItemDto, Order, OrderDetail, Dish, DishStep, OrderStatus, Complexity } from '../types';

const mapBackendStatus = (status: string): OrderStatus => {
  switch (status) {
    case 'CONFIRMED':
      return 'pending';
    case 'PREPARING':
      return 'in-progress';
    case 'READY':
      return 'ready';
    case 'COMPLETED':
      return 'completed';
    default:
      return 'pending';
  }
};

const mapComplexity = (itemCount: number): Complexity => {
  if (itemCount <= 2) return 'low';
  if (itemCount <= 4) return 'medium';
  return 'high';
};

const mapPriority = (orderTime: string): 'normal' | 'urgent' => {
  const elapsed = Date.now() - new Date(orderTime).getTime();
  return elapsed > 20 * 60 * 1000 ? 'urgent' : 'normal';
};

const dishFromItem = (item: OrderItemDto): Dish => {
  const dish = item.dish as Record<string, unknown>;
  return {
    name: (dish.name as string) || 'Unknown Dish',
    notes: item.notes || (dish.description as string) || '',
    allergens: (dish.allergens as string[]) || [],
    image: (dish.image as string) || undefined,
  };
};

export const toOrders = (data: OrderListDto[]): Order[] =>
  data
    .filter((item) => ['CONFIRMED', 'PREPARING', 'READY'].includes(item.status))
    .map((item) => ({
      id: item.orderNumber,
      backendId: item.id,
      tableNumber: item.table?.number ?? 0,
      timeReceived: new Date(item.orderTime),
      status: mapBackendStatus(item.status),
      complexity: mapComplexity(item.itemCount),
      dishes: [],
      specialRequests: '',
      priority: mapPriority(item.orderTime),
    }));

export const toOrderDetail = (data: OrderDetailDto): OrderDetail => {
  const dishSteps: DishStep[] = data.items.map((item) => {
    const dish = item.dish as Record<string, unknown>;
    return {
      name: (dish.name as string) || 'Unknown Dish',
      notes: item.notes || (dish.description as string) || '',
      allergens: (dish.allergens as string[]) || [],
      image: (dish.image as string) || undefined,
      prepTime: (dish.preparationTime as number) || 15,
      steps: [(dish.name as string) || 'Prepare dish'],
      currentStep: data.status === 'PREPARING' ? 1 : data.status === 'READY' ? 1 : 0,
    };
  });

  return {
    id: data.orderNumber,
    backendId: data.id,
    tableNumber: data.table?.number ?? 0,
    timeReceived: new Date(data.orderTime),
    status: mapBackendStatus(data.status),
    complexity: mapComplexity(data.items.length),
    dishes: dishSteps,
    specialRequests: data.notes || '',
    priority: mapPriority(data.orderTime),
    customerNotes: data.notes || undefined,
    estimatedCompletion: data.estimatedDeliveryTime ? new Date(data.estimatedDeliveryTime) : undefined,
  };
};
