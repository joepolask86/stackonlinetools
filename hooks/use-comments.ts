import { useState, useEffect, useCallback } from 'react';

export interface CommentUser {
  id: string;
  name: string | null;
  image: string | null;
}

export interface Comment {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  user: CommentUser;
}

export interface CommentsResponse {
  comments: Comment[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
  };
}

export interface UseCommentsOptions {
  toolId: string;
  limit?: number;
}

export function useComments({ toolId, limit = 10 }: UseCommentsOptions) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit,
    total: 0,
    hasMore: false,
  });

  const fetchComments = useCallback(async (page: number = 1, append: boolean = false) => {
    if (!toolId) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/comments?toolId=${encodeURIComponent(toolId)}&page=${page}&limit=${limit}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }

      const data: CommentsResponse = await response.json();

      if (append) {
        setComments(prev => [...prev, ...data.comments]);
      } else {
        setComments(data.comments);
      }

      setPagination(data.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch comments');
    } finally {
      setIsLoading(false);
    }
  }, [toolId, limit]);

  const loadMore = useCallback(() => {
    if (pagination.hasMore && !isLoading) {
      fetchComments(pagination.page + 1, true);
    }
  }, [fetchComments, pagination.hasMore, pagination.page, isLoading]);

  const addComment = useCallback(async (content: string): Promise<Comment | null> => {
    if (!toolId || !content.trim()) return null;

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          toolId,
          content: content.trim(),
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Please log in to post a comment');
        }
        throw new Error('Failed to post comment');
      }

      const newComment: Comment = await response.json();
      
      // Add the new comment to the beginning of the list
      setComments(prev => [newComment, ...prev]);
      
      // Update pagination total
      setPagination(prev => ({
        ...prev,
        total: prev.total + 1,
      }));

      return newComment;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to post comment');
      return null;
    } finally {
      setIsSubmitting(false);
    }
  }, [toolId]);

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
    isSubmitting,
    error,
    pagination,
    addComment,
    loadMore,
    refreshComments,
  };
}
