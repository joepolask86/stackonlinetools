import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { bugReports } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { toolId, title, description } = await request.json();

    if (!toolId || !title || !description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create bug report
    const newBugReport = await db.insert(bugReports).values({
      userId: session.user.id,
      toolId: toolId,
      title: title,
      description: description,
      severity: "medium", // Default severity
      status: "open", // Default status
    }).returning();

    return NextResponse.json({
      message: "Bug report submitted successfully",
      bugReport: newBugReport[0],
    });
  } catch (error) {
    console.error("Error creating bug report:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const toolId = searchParams.get("toolId");

    let userBugReports;
    
    if (toolId) {
      userBugReports = await db
        .select()
        .from(bugReports)
        .where(and(
          eq(bugReports.userId, session.user.id),
          eq(bugReports.toolId, toolId)
        ));
    } else {
      userBugReports = await db
        .select()
        .from(bugReports)
        .where(eq(bugReports.userId, session.user.id));
    }

    return NextResponse.json({ bugReports: userBugReports });
  } catch (error) {
    console.error("Error fetching bug reports:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
