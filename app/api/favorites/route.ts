import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { userFavorites } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { UserCacheManager } from "@/lib/cache";

// GET /api/favorites - Get user's favorites
export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Try to get from cache first
    const cachedFavorites = await UserCacheManager.getCachedFavorites(session.user.id);
    if (cachedFavorites) {
      return NextResponse.json(cachedFavorites);
    }

    // If not in cache, fetch from database
    const favorites = await db
      .select()
      .from(userFavorites)
      .where(eq(userFavorites.userId, session.user.id));

    const response = { 
      favorites: favorites.map(fav => fav.toolId) 
    };

    // Cache the result
    await UserCacheManager.cacheFavorites(session.user.id, response);

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/favorites - Add a tool to favorites
export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { toolId } = await request.json();

    if (!toolId) {
      return NextResponse.json(
        { error: "Tool ID is required" },
        { status: 400 }
      );
    }

    // Check if already favorited
    const existing = await db
      .select()
      .from(userFavorites)
      .where(
        and(
          eq(userFavorites.userId, session.user.id),
          eq(userFavorites.toolId, toolId)
        )
      )
      .limit(1);

    if (existing.length > 0) {
      return NextResponse.json({ message: "Already favorited" });
    }

    // Add to favorites
    await db.insert(userFavorites).values({
      userId: session.user.id,
      toolId: toolId,
    });

    // Invalidate cache
    await UserCacheManager.invalidateFavoritesCache(session.user.id);

    return NextResponse.json({ message: "Added to favorites" });
  } catch (error) {
    console.error("Error adding favorite:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/favorites - Remove a tool from favorites
export async function DELETE(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const toolId = searchParams.get("toolId");

    if (!toolId) {
      return NextResponse.json(
        { error: "Tool ID is required" },
        { status: 400 }
      );
    }

    // Remove from favorites
    await db
      .delete(userFavorites)
      .where(
        and(
          eq(userFavorites.userId, session.user.id),
          eq(userFavorites.toolId, toolId)
        )
      );

    // Invalidate cache
    await UserCacheManager.invalidateFavoritesCache(session.user.id);

    return NextResponse.json({ message: "Removed from favorites" });
  } catch (error) {
    console.error("Error removing favorite:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
