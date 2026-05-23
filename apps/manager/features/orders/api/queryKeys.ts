export const orderKeys = {
  all: ['orders'] as const,
  list: (restaurantId: number) =>
    [...orderKeys.all, 'list', restaurantId] as const,
  detail: (id: string) => [...orderKeys.all, 'detail', id] as const,
}
