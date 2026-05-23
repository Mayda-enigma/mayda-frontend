import type { Order, OrderDetail } from '../types';

export const toOrders = (data: Order[]): Order[] =>
  data.map((item) => ({
    ...item,
    timeReceived: new Date(item.timeReceived),
  }));

export const toOrderDetail = (data: OrderDetail): OrderDetail => ({
  ...data,
  timeReceived: new Date(data.timeReceived),
  estimatedCompletion: data.estimatedCompletion ? new Date(data.estimatedCompletion) : undefined,
});
