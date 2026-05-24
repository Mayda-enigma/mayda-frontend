export const tableKeys = {
  all: ['tables'] as const,
  list: (restaurantId: number) => [...tableKeys.all, 'list', restaurantId] as const,
  detail: (id: number) => [...tableKeys.all, 'detail', id] as const,
  currentOrders: (id: number) => [...tableKeys.all, 'current-orders', id] as const,
};
