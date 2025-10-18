import { NextRequest, NextResponse } from 'next/server';
import { db, toolRequests } from '@/lib/db';
import { auth } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { toolName, description, category, similarToolURL } = body;
    
    if (!toolName || !description || !category || !similarToolURL) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get the authenticated user
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Save to database
    await db.insert(toolRequests).values({
      userId: session.user.id,
      toolName,
      description,
      category,
      similarToolURL,
      status: 'pending',
    }).returning();

    // console.log('New tool request saved:', {
    //   id: toolRequest[0].id,
    //   userId: session.user.id,
    //   toolName,
    //   category,
    //   timestamp: new Date().toISOString()
    // });

    return NextResponse.json(
      { message: 'Suggestion submitted successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing suggestion:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
