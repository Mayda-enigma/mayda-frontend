export const analyticsKeys = {
  all: ['analytics'] as const,
  kitchen: (range: string) => [...analyticsKeys.all, 'kitchen', range] as const,
};
