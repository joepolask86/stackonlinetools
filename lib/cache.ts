import { Redis } from '@upstash/redis';

// Type definitions for cached responses
interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}

interface UserFavoritesResponse {
  favorites: string[];
}

interface UserCommentsResponse {
  comments: Array<{
    id: string;
    toolId: string;
    content: string;
    createdAt: Date | null;
    updatedAt: Date | null;
  }>;
  pagination: PaginationInfo;
}

interface UserBugReportsResponse {
  reports: Array<{
    id: string;
    title: string;
    description: string;
    toolId: string;
    status: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  }>;
  pagination: PaginationInfo;
}

interface UserToolRequestsResponse {
  toolRequests: Array<{
    id: string;
    toolName: string;
    description: string;
    category: string;
    similarToolURL: string;
    status: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  }>;
  pagination: PaginationInfo;
}

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Cache configuration
export const CACHE_CONFIG = {
  // Cache TTL in seconds
  TTL: {
    USER_FAVORITES: 60, // 1 minute
    USER_COMMENTS: 120, // 2 minutes  
    USER_BUG_REPORTS: 120, // 2 minutes
    USER_TOOL_REQUESTS: 180, // 3 minutes
  },
  // Cache key prefixes
  KEYS: {
    USER_FAVORITES: 'user:favorites:',
    USER_COMMENTS: 'user:comments:',
    USER_BUG_REPORTS: 'user:bug_reports:',
    USER_TOOL_REQUESTS: 'user:tool_requests:',
  },
};

// Generic cache functions
export class CacheManager {
  /**
   * Get data from cache
   */
  static async get<T>(key: string): Promise<T | null> {
    try {
      const data = await redis.get(key);
      return data as T;
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  }

  /**
   * Set data in cache with TTL
   */
  static async set(key: string, data: unknown, ttl: number): Promise<boolean> {
    try {
      await redis.setex(key, ttl, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('Cache set error:', error);
      return false;
    }
  }

  /**
   * Delete data from cache
   */
  static async delete(key: string): Promise<boolean> {
    try {
      await redis.del(key);
      return true;
    } catch (error) {
      console.error('Cache delete error:', error);
      return false;
    }
  }

  /**
   * Delete multiple keys matching a pattern
   */
  static async deletePattern(pattern: string): Promise<boolean> {
    try {
      const keys = await redis.keys(pattern);
      if (keys.length > 0) {
        await redis.del(...keys);
      }
      return true;
    } catch (error) {
      console.error('Cache delete pattern error:', error);
      return false;
    }
  }

  /**
   * Check if key exists in cache
   */
  static async exists(key: string): Promise<boolean> {
    try {
      const result = await redis.exists(key);
      return result === 1;
    } catch (error) {
      console.error('Cache exists error:', error);
      return false;
    }
  }
}

// Specific cache functions for user data
export class UserCacheManager {
  /**
   * Generate cache key for user favorites
   */
  static getFavoritesKey(userId: string): string {
    return `${CACHE_CONFIG.KEYS.USER_FAVORITES}${userId}`;
  }

  /**
   * Generate cache key for user comments with pagination
   */
  static getCommentsKey(userId: string, page: number, limit: number): string {
    return `${CACHE_CONFIG.KEYS.USER_COMMENTS}${userId}:page:${page}:limit:${limit}`;
  }

  /**
   * Generate cache key for user bug reports with pagination
   */
  static getBugReportsKey(userId: string, page: number, limit: number): string {
    return `${CACHE_CONFIG.KEYS.USER_BUG_REPORTS}${userId}:page:${page}:limit:${limit}`;
  }

  /**
   * Generate cache key for user tool requests with pagination
   */
  static getToolRequestsKey(userId: string, page: number, limit: number): string {
    return `${CACHE_CONFIG.KEYS.USER_TOOL_REQUESTS}${userId}:page:${page}:limit:${limit}`;
  }

  /**
   * Cache user favorites
   */
  static async cacheFavorites(userId: string, favorites: UserFavoritesResponse): Promise<boolean> {
    const key = this.getFavoritesKey(userId);
    return CacheManager.set(key, favorites, CACHE_CONFIG.TTL.USER_FAVORITES);
  }

  /**
   * Get cached user favorites
   */
  static async getCachedFavorites(userId: string): Promise<UserFavoritesResponse | null> {
    const key = this.getFavoritesKey(userId);
    return CacheManager.get(key);
  }

  /**
   * Cache user comments
   */
  static async cacheComments(userId: string, page: number, limit: number, comments: UserCommentsResponse): Promise<boolean> {
    const key = this.getCommentsKey(userId, page, limit);
    return CacheManager.set(key, comments, CACHE_CONFIG.TTL.USER_COMMENTS);
  }

  /**
   * Get cached user comments
   */
  static async getCachedComments(userId: string, page: number, limit: number): Promise<UserCommentsResponse | null> {
    const key = this.getCommentsKey(userId, page, limit);
    return CacheManager.get(key);
  }

  /**
   * Cache user bug reports
   */
  static async cacheBugReports(userId: string, page: number, limit: number, bugReports: UserBugReportsResponse): Promise<boolean> {
    const key = this.getBugReportsKey(userId, page, limit);
    return CacheManager.set(key, bugReports, CACHE_CONFIG.TTL.USER_BUG_REPORTS);
  }

  /**
   * Get cached user bug reports
   */
  static async getCachedBugReports(userId: string, page: number, limit: number): Promise<UserBugReportsResponse | null> {
    const key = this.getBugReportsKey(userId, page, limit);
    return CacheManager.get(key);
  }

  /**
   * Cache user tool requests
   */
  static async cacheToolRequests(userId: string, page: number, limit: number, toolRequests: UserToolRequestsResponse): Promise<boolean> {
    const key = this.getToolRequestsKey(userId, page, limit);
    return CacheManager.set(key, toolRequests, CACHE_CONFIG.TTL.USER_TOOL_REQUESTS);
  }

  /**
   * Get cached user tool requests
   */
  static async getCachedToolRequests(userId: string, page: number, limit: number): Promise<UserToolRequestsResponse | null> {
    const key = this.getToolRequestsKey(userId, page, limit);
    return CacheManager.get(key);
  }

  /**
   * Invalidate all cache for a user (useful when user data changes)
   */
  static async invalidateUserCache(userId: string): Promise<boolean> {
    try {
      await Promise.all([
        CacheManager.deletePattern(`${CACHE_CONFIG.KEYS.USER_FAVORITES}${userId}*`),
        CacheManager.deletePattern(`${CACHE_CONFIG.KEYS.USER_COMMENTS}${userId}*`),
        CacheManager.deletePattern(`${CACHE_CONFIG.KEYS.USER_BUG_REPORTS}${userId}*`),
        CacheManager.deletePattern(`${CACHE_CONFIG.KEYS.USER_TOOL_REQUESTS}${userId}*`),
      ]);
      return true;
    } catch (error) {
      console.error('Error invalidating user cache:', error);
      return false;
    }
  }

  /**
   * Invalidate specific cache when user adds/removes favorites
   */
  static async invalidateFavoritesCache(userId: string): Promise<boolean> {
    const key = this.getFavoritesKey(userId);
    return CacheManager.delete(key);
  }

  /**
   * Invalidate comments cache when user adds/updates comments
   */
  static async invalidateCommentsCache(userId: string): Promise<boolean> {
    return CacheManager.deletePattern(`${CACHE_CONFIG.KEYS.USER_COMMENTS}${userId}*`);
  }

  /**
   * Invalidate bug reports cache when user adds/updates bug reports
   */
  static async invalidateBugReportsCache(userId: string): Promise<boolean> {
    return CacheManager.deletePattern(`${CACHE_CONFIG.KEYS.USER_BUG_REPORTS}${userId}*`);
  }

  /**
   * Invalidate tool requests cache when user adds/updates tool requests
   */
  static async invalidateToolRequestsCache(userId: string): Promise<boolean> {
    return CacheManager.deletePattern(`${CACHE_CONFIG.KEYS.USER_TOOL_REQUESTS}${userId}*`);
  }
}