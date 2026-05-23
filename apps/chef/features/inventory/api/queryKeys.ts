export const inventoryKeys = {
  all: ['inventory'] as const,

  /* ── stock (inventory items) ── */
  stock: () => [...inventoryKeys.all, 'stock'] as const,
  stockByRestaurant: (restaurantId: number) =>
    [...inventoryKeys.stock(), restaurantId] as const,

  /* ── stats ── */
  stats: () => [...inventoryKeys.all, 'stats'] as const,
  statsByRestaurant: (restaurantId: number) =>
    [...inventoryKeys.stats(), restaurantId] as const,

  /* ── low-stock alerts ── */
  alerts: () => [...inventoryKeys.all, 'alerts'] as const,
  alertsByRestaurant: (restaurantId: number) =>
    [...inventoryKeys.alerts(), restaurantId] as const,

  /* ── ingredients ── */
  ingredients: () => [...inventoryKeys.all, 'ingredients'] as const,

  /* ── AI forecast (keyed per item + date) ── */
  forecasts: () => [...inventoryKeys.all, 'forecast'] as const,
  forecast: (item: string, date: string) =>
    [...inventoryKeys.forecasts(), item, date] as const,
}
