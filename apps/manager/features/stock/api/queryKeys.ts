export const stockKeys = {
  all: ['stock'] as const,
  current: (restaurantId: number) =>
    [...stockKeys.all, 'current', restaurantId] as const,
  forecast: (item: string, date: string) =>
    [...stockKeys.all, 'forecast', item, date] as const,
}
