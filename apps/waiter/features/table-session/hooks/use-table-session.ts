'use client';

import { useQuery } from '@tanstack/react-query';
import { useTables } from '@/features/tables';
import { useTableOrders } from '@/features/orders';
import type { Table } from '@/features/tables';
import type { Order } from '@/features/orders';

export interface TableSession {
  table: Table | undefined;
  orders: Order[];
  isLoading: boolean;
}

export function useTableSession(tableId: number): TableSession {
  const { data: tables, isLoading: tablesLoading } = useTables(0);
  const table = tables?.find((t) => t.id === tableId);
  const { data: orders = [], isLoading: ordersLoading } = useTableOrders(tableId);

  return {
    table,
    orders,
    isLoading: tablesLoading || ordersLoading,
  };
}
