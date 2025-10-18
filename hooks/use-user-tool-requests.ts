import { useState, useEffect, useCallback } from 'react';

export interface UserToolRequest {
  id: string;
  toolName: string;
  description: string;
  category: string;
  similarToolURL: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserToolRequestsResponse {
  requests: UserToolRequest[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
  };
}

export interface UseUserToolRequestsOptions {
  userId: string;
  limit?: number;
}

export function useUserToolRequests({ userId, limit = 10 }: UseUserToolRequestsOptions) {
  const [requests, setRequests] = useState<UserToolRequest[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit,
    total: 0,
    hasMore: false,
  });

  const fetchRequests = useCallback(async (page: number = 1, append: boolean = false) => {
    if (!userId) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/user-tool-requests?userId=${encodeURIComponent(userId)}&page=${page}&limit=${limit}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch user tool requests');
      }

      const data: UserToolRequestsResponse = await response.json();

      if (append) {
        setRequests(prev => [...prev, ...data.requests]);
      } else {
        setRequests(data.requests);
      }

      setPagination(data.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch user tool requests');
    } finally {
      setIsLoading(false);
    }
  }, [userId, limit]);

  const loadMore = useCallback(() => {
    if (pagination.hasMore && !isLoading) {
      fetchRequests(pagination.page + 1, true);
    }
  }, [fetchRequests, pagination.hasMore, pagination.page, isLoading]);

  const refreshRequests = useCallback(() => {
    fetchRequests(1, false);
  }, [fetchRequests]);

  // Load requests on mount
  useEffect(() => {
    fetchRequests(1, false);
  }, [fetchRequests]);

  return {
    requests,
    isLoading,
    error,
    pagination,
    loadMore,
    refreshRequests,
  };
}
