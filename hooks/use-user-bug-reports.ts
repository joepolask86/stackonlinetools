import { useState, useEffect, useCallback } from 'react';

export interface UserBugReport {
  id: string;
  toolId: string;
  title: string;
  description: string;
  severity: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserBugReportsResponse {
  reports: UserBugReport[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
  };
}

export interface UseUserBugReportsOptions {
  userId: string;
  limit?: number;
}

export function useUserBugReports({ userId, limit = 10 }: UseUserBugReportsOptions) {
  const [bugReports, setBugReports] = useState<UserBugReport[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit,
    total: 0,
    hasMore: false,
  });

  const fetchBugReports = useCallback(async (page: number = 1, append: boolean = false) => {
    if (!userId) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/user-bug-reports?userId=${encodeURIComponent(userId)}&page=${page}&limit=${limit}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch user bug reports');
      }

      const data: UserBugReportsResponse = await response.json();

      if (page > 1) {
          setBugReports(prev => [...prev, ...data.reports]);
        } else {
          setBugReports(data.reports || []);
        }

      setPagination(data.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch user bug reports');
    } finally {
      setIsLoading(false);
    }
  }, [userId, limit]);

  const loadMore = useCallback(() => {
    if (pagination.hasMore && !isLoading) {
      fetchBugReports(pagination.page + 1, true);
    }
  }, [fetchBugReports, pagination.hasMore, pagination.page, isLoading]);

  const refreshBugReports = useCallback(() => {
    fetchBugReports(1, false);
  }, [fetchBugReports]);

  // Load bug reports on mount
  useEffect(() => {
    fetchBugReports(1, false);
  }, [fetchBugReports]);

  return {
    bugReports,
    isLoading,
    error,
    pagination,
    loadMore,
    refreshBugReports,
  };
}
