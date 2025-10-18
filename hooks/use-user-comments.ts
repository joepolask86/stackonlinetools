import { useState, useEffect, useCallback } from 'react';

export interface UserComment {
  id: string;
  content: string;
  toolId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserCommentsResponse {
  comments: UserComment[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
  };
}

export interface UseUserCommentsOptions {
  userId: string;
  limit?: number;
}

export function useUserComments({ userId, limit = 10 }: UseUserCommentsOptions) {
  const [comments, setComments] = useState<UserComment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit,
    total: 0,
    hasMore: false,
  });

  const fetchComments = useCallback(async (page: number = 1, append: boolean = false) => {
    if (!userId) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/user-comments?userId=${encodeURIComponent(userId)}&page=${page}&limit=${limit}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch user comments');
      }

      const data: UserCommentsResponse = await response.json();

      if (append) {
        setComments(prev => [...prev, ...data.comments]);
      } else {
        setComments(data.comments);
      }

      setPagination(data.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch user comments');
    } finally {
      setIsLoading(false);
    }
  }, [userId, limit]);

  const loadMore = useCallback(() => {
    if (pagination.hasMore && !isLoading) {
      fetchComments(pagination.page + 1, true);
    }
  }, [fetchComments, pagination.hasMore, pagination.page, isLoading]);

  const refreshComments = useCallback(() => {
    fetchComments(1, false);
  }, [fetchComments]);

  // Load comments on mount
  useEffect(() => {
    fetchComments(1, false);
  }, [fetchComments]);

  return {
    comments,
    isLoading,
    error,
    pagination,
    loadMore,
    refreshComments,
  };
}
