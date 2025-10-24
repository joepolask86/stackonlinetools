import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { toolRequests } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';
import { UserCacheManager } from '@/lib/cache';

// GET /api/user-tool-requests?userId=xxx&page=1&limit=10
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Try to get from cache first
    const cachedRequests = await UserCacheManager.getCachedToolRequests(userId, page, limit);
    if (cachedRequests) {
      return NextResponse.json(cachedRequests);
    }

    // If not in cache, fetch from database
    // Get user's tool requests
    const requests = await db
      .select({
        id: toolRequests.id,
        toolName: toolRequests.toolName,
        description: toolRequests.description,
        category: toolRequests.category,
        similarToolURL: toolRequests.similarToolURL,
        status: toolRequests.status,
        createdAt: toolRequests.createdAt,
        updatedAt: toolRequests.updatedAt,
      })
      .from(toolRequests)
      .where(eq(toolRequests.userId, userId))
      .orderBy(desc(toolRequests.createdAt))
      .limit(limit)
      .offset(offset);

    // Get total count for pagination
    const totalCount = await db
      .select({ count: toolRequests.id })
      .from(toolRequests)
      .where(eq(toolRequests.userId, userId));

    const hasMore = totalCount.length > offset + limit;

    const response = {
      toolRequests: requests,
      pagination: {
        page,
        limit,
        total: totalCount.length,
        hasMore,
      },
    };

    // Cache the result
    await UserCacheManager.cacheToolRequests(userId, page, limit, response);

    const jsonResponse = NextResponse.json(response);

    // Add cache-busting headers
    jsonResponse.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    jsonResponse.headers.set('Pragma', 'no-cache');
    jsonResponse.headers.set('Expires', '0');

    return jsonResponse;
  } catch (error) {
    console.error('Error fetching user tool requests:', error);
    return NextResponse.json({ error: 'Failed to fetch user tool requests' }, { status: 500 });
  }
}
