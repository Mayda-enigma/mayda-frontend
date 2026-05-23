export const reservationKeys = {
  all: ['reservations'] as const,
  byDate: (restaurantId: number, date: string) =>
    [...reservationKeys.all, 'date', restaurantId, date] as const,
  detail: (id: string) => [...reservationKeys.all, 'detail', id] as const,
}

