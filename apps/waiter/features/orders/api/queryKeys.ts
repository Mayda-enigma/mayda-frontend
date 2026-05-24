export const orderKeys = {
  all: ['orders'] as const,
  mine: () => [...orderKeys.all, 'mine'] as const,
  byTable: (tableId: number) => [...orderKeys.all, 'table', tableId] as const,
};
