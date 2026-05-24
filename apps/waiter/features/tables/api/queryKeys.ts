export const tableKeys = {
  all: ['tables'] as const,
  list: (restaurantId: number) => [...tableKeys.all, 'list', restaurantId] as const,
  detail: (id: number) => [...tableKeys.all, 'detail', id] as const,
};
