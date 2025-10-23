import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { bugReports } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';
import { UserCacheManager } from '@/lib/cache';

// GET /api/user-bug-reports?userId=xxx&page=1&limit=10
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
    const cachedReports = await UserCacheManager.getCachedBugReports(userId, page, limit);
    if (cachedReports) {
      return NextResponse.json(cachedReports);
    }

    // If not in cache, fetch from database
    // Get user's bug reports
    const reports = await db
      .select({
        id: bugReports.id,
        title: bugReports.title,
        description: bugReports.description,
        toolId: bugReports.toolId,
        status: bugReports.status,
        createdAt: bugReports.createdAt,
        updatedAt: bugReports.updatedAt,
      })
      .from(bugReports)
      .where(eq(bugReports.userId, userId))
      .orderBy(desc(bugReports.createdAt))
      .limit(limit)
      .offset(offset);

    // Get total count for pagination
    const totalCount = await db
      .select({ count: bugReports.id })
      .from(bugReports)
      .where(eq(bugReports.userId, userId));

    const hasMore = totalCount.length > offset + limit;

    const response = {
      reports: reports,
      pagination: {
        page,
        limit,
        total: totalCount.length,
        hasMore,
      },
    };

    // Cache the result
    await UserCacheManager.cacheBugReports(userId, page, limit, response);

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching user bug reports:', error);
    return NextResponse.json({ error: 'Failed to fetch user bug reports' }, { status: 500 });
  }
}
