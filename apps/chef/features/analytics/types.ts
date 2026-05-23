export type AnalyticsRange = 'day' | 'week' | 'month';

export interface HourlyMetricDto {
  hour: number;
  orderCount: number;
}

export interface KitchenAnalyticsDto {
  avgPrepMinutes: number;
  ordersPerHour: HourlyMetricDto[];
  lateOrderRate: number;
}

export interface HourlyMetric {
  hour: number;
  orderCount: number;
}

export interface KitchenAnalytics {
  avgPrepMinutes: number;
  ordersPerHour: HourlyMetric[];
  lateOrderRate: number;
}
