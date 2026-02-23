/** @format */

export interface TopRoleStat {
  role: string;
  count: number;
}

export interface DashboardStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  approvalRate: number;
  recentCount: number;
  topRoles: TopRoleStat[];
}
