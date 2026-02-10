export interface MetricItem {
  value: number;
  change: number;
}

export interface InventoryStatus {
  OK: number;
  LOW: number;
  OUT: number;
}

export interface ActivityItem {
  action: string;
  description: string;
  timeAgo: string;
}

export interface PerformanceItem {
  name: string;
  value: number;
}

export interface OverviewType {
  totalSale: MetricItem;
  activeCustomers: MetricItem;
  inventoryStatus: InventoryStatus;
  recentActivity: ActivityItem[];
  monthlyPerformance: PerformanceItem[];
}

export interface InventoryData {
  OK: number;
  LOW: number;
  OUT: number;
}

export interface TopProductItem {
  name: string;
  amount: number;
  growth: number;
}

export interface TopProductGrowth {
  items: TopProductItem[];
  totalGrowth: number;
}

export interface WeeklyChurnItem {
  name: string;
  value: number;
}

export interface ChurnRate {
  weekly: WeeklyChurnItem[];
  summary: string;
}

export interface RegionalItem {
  name: string;
  value: number;
  growth: number;
}

export interface RegionalPerformance {
  data: RegionalItem[];
  summary: string;
  totalGrowth: number;
  totalSales: number;
}

export interface FunnelItem {
  step: string;
  value: number;
}

export interface SalesFunnel {
  data: FunnelItem[];
  conversionChange: number;
}

export interface InsightsType {
  topProductGrowth: TopProductGrowth;
  churnRate: ChurnRate;
  regional: RegionalPerformance;
  funnel: SalesFunnel;
}
