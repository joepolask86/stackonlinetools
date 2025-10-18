import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { userComments, users } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';

// GET /api/comments?toolId=xxx&page=1&limit=10
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const toolId = searchParams.get('toolId');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;

    if (!toolId) {
      return NextResponse.json({ error: 'Tool ID is required' }, { status: 400 });
    }

    // Get comments with user information
    const comments = await db
      .select({
        id: userComments.id,
        content: userComments.content,
        createdAt: userComments.createdAt,
        updatedAt: userComments.updatedAt,
        user: {
          id: users.id,
          name: users.name,
          image: users.image,
        },
      })
      .from(userComments)
      .innerJoin(users, eq(userComments.userId, users.id))
      .where(eq(userComments.toolId, toolId))
      .orderBy(desc(userComments.createdAt))
      .limit(limit)
      .offset(offset);

    // Get total count for pagination
    const totalCount = await db
      .select({ count: userComments.id })
      .from(userComments)
      .where(eq(userComments.toolId, toolId));

    const hasMore = totalCount.length > offset + limit;

    return NextResponse.json({
      comments,
      pagination: {
        page,
        limit,
        total: totalCount.length,
        hasMore,
      },
    });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
  }
}

// POST /api/comments
export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { toolId, content } = body;

    if (!toolId || !content?.trim()) {
      return NextResponse.json({ error: 'Tool ID and content are required' }, { status: 400 });
    }

    // Create new comment
    const newComment = await db
      .insert(userComments)
      .values({
        userId: session.user.id,
        toolId,
        content: content.trim(),
      })
      .returning();

    // Get the comment with user information
    const commentWithUser = await db
      .select({
        id: userComments.id,
        content: userComments.content,
        createdAt: userComments.createdAt,
        updatedAt: userComments.updatedAt,
        user: {
          id: users.id,
          name: users.name,
          image: users.image,
        },
      })
      .from(userComments)
      .innerJoin(users, eq(userComments.userId, users.id))
      .where(eq(userComments.id, newComment[0].id))
      .limit(1);

    return NextResponse.json(commentWithUser[0], { status: 201 });
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 });
  }
}
