export const orderKeys = {
  all: ['orders'] as const,
  restaurant: (restaurantId: number, status?: string) =>
    [...orderKeys.all, 'restaurant', restaurantId, status] as const,
  byTable: (tableId: number) => [...orderKeys.all, 'table', tableId] as const,
};
