import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { bugReports } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';

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

    // Get user's bug reports
    const bugReportsData = await db
      .select({
        id: bugReports.id,
        toolId: bugReports.toolId,
        title: bugReports.title,
        description: bugReports.description,
        severity: bugReports.severity,
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

    return NextResponse.json({
      bugReports: bugReportsData,
      pagination: {
        page,
        limit,
        total: totalCount.length,
        hasMore,
      },
    });
  } catch (error) {
    console.error('Error fetching user bug reports:', error);
    return NextResponse.json({ error: 'Failed to fetch user bug reports' }, { status: 500 });
  }
}
