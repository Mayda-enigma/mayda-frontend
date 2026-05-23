export const employeeKeys = {
  all: ['employees'] as const,
  list: (restaurantId: number) => [...employeeKeys.all, 'list', restaurantId] as const,
  detail: (id: number) => [...employeeKeys.all, 'detail', id] as const,
};
