import type { AnalyticsKpis } from '../types';

interface KpiDto {
  totalRevenue: number;
  totalOrders: number;
  avgOrderValue: number;
  customerRating: number;
  revenueTrend: number;
  ordersTrend: number;
  avgOrderValueTrend: number;
  ratingTrend: number;
}

export const toKpis = (dto: KpiDto): AnalyticsKpis => dto;
