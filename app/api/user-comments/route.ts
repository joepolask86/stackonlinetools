import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { userComments } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';
import { UserCacheManager } from '@/lib/cache';

// GET /api/user-comments?userId=xxx&page=1&limit=10
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
    const cachedComments = await UserCacheManager.getCachedComments(userId, page, limit);
    if (cachedComments) {
      return NextResponse.json(cachedComments);
    }

    // If not in cache, fetch from database
    // Get user's comments
    const comments = await db
      .select({
        id: userComments.id,
        content: userComments.content,
        toolId: userComments.toolId,
        createdAt: userComments.createdAt,
        updatedAt: userComments.updatedAt,
      })
      .from(userComments)
      .where(eq(userComments.userId, userId))
      .orderBy(desc(userComments.createdAt))
      .limit(limit)
      .offset(offset);

    // Get total count for pagination
    const totalCount = await db
      .select({ count: userComments.id })
      .from(userComments)
      .where(eq(userComments.userId, userId));

    const hasMore = totalCount.length > offset + limit;

    const response = {
      comments,
      pagination: {
        page,
        limit,
        total: totalCount.length,
        hasMore,
      },
    };

    // Cache the result
    await UserCacheManager.cacheComments(userId, page, limit, response);

    const jsonResponse = NextResponse.json(response);

    // Add cache-busting headers
    jsonResponse.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    jsonResponse.headers.set('Pragma', 'no-cache');
    jsonResponse.headers.set('Expires', '0');

    return jsonResponse;
  } catch (error) {
    console.error('Error fetching user comments:', error);
    return NextResponse.json({ error: 'Failed to fetch user comments' }, { status: 500 });
  }
}
