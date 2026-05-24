import type { AnalyticsKpis } from '../types';

interface KpiDto {
  totalRevenue?: number;
  totalOrders?: number;
  avgOrderValue?: number;
  customerRating?: number;
  revenueTrend?: number;
  ordersTrend?: number;
  avgOrderValueTrend?: number;
  ratingTrend?: number;
  // fallback from old full response
  revenue?: number;
  orderCount?: number;
}

export const toKpis = (dto: KpiDto): AnalyticsKpis => ({
  totalRevenue: dto.totalRevenue ?? dto.revenue ?? 0,
  totalOrders: dto.totalOrders ?? dto.orderCount ?? 0,
  avgOrderValue: dto.avgOrderValue ?? 0,
  customerRating: dto.customerRating ?? 4.8,
  revenueTrend: dto.revenueTrend ?? 0,
  ordersTrend: dto.ordersTrend ?? 0,
  avgOrderValueTrend: dto.avgOrderValueTrend ?? 0,
  ratingTrend: dto.ratingTrend ?? 0,
});
