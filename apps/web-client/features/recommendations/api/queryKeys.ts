export const recommendationKeys = {
  all: ['recommendations'] as const,
  list: (cartItemIds: number[], timeOfDay: string) =>
    [...recommendationKeys.all, { cartItemIds, timeOfDay }] as const,
}
