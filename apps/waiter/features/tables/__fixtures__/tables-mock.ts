import type { Table } from '../types';

export const mockTables: Table[] = [
  { id: 1, number: 'T01', status: 'waiting', guests: 4, pendingOrders: 2, elapsedTime: 15, needsAttention: true, lastOrderTime: '14:30' },
  { id: 2, number: 'T02', status: 'served', guests: 2, pendingOrders: 0, elapsedTime: 45, needsAttention: false, lastOrderTime: '14:15' },
  { id: 3, number: 'T03', status: 'occupied', guests: 6, pendingOrders: 1, elapsedTime: 25, needsAttention: false, lastOrderTime: '14:25' },
  { id: 4, number: 'T04', status: 'free', guests: 0, pendingOrders: 0, elapsedTime: 0, needsAttention: false },
  { id: 5, number: 'T05', status: 'waiting', guests: 3, pendingOrders: 3, elapsedTime: 35, needsAttention: true, lastOrderTime: '14:10' },
  { id: 6, number: 'T06', status: 'occupied', guests: 2, pendingOrders: 1, elapsedTime: 10, needsAttention: false, lastOrderTime: '14:35' },
];
