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
