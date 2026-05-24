export interface AnalyticsKpis {
  totalRevenue: number;
  totalOrders: number;
  avgOrderValue: number;
  customerRating: number;
  revenueTrend: number;
  ordersTrend: number;
  avgOrderValueTrend: number;
  ratingTrend: number;
}

export interface DailyRevenue {
  name: string;
  revenue: number;
  orders: number;
  profit: number;
}

export interface RevenueData {
  salesData: DailyRevenue[];
  forecast: { revenue: number; change: number };
}

export interface TopDish {
  name: string;
  orders: number;
  revenue: number;
  rating: number;
  trend: string;
}

export interface HourlyDataPoint {
  hour: string;
  orders: number;
  revenue: number;
}

export type RangePreset = '7d' | '30d' | '90d';

export interface CuisineShareItem {
  name: string;
  value: number;
  color: string;
  orders: number;
}

export interface PerformanceMetricsData {
  avgPrepTime: number;
  orderAccuracy: number;
  tableTurnoverRate: string;
  staffEfficiency: number;
  alerts: AlertItem[];
}

export interface AlertItem {
  type: string;
  title: string;
  message: string;
  color: string;
}

export interface MonthlyComparisonItem {
  month: string;
  thisYear: number;
  lastYear: number;
}
