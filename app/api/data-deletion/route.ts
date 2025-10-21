import { NextResponse } from "next/server";

// Minimal endpoint to accept data deletion requests.
// In production, you should authenticate the requester and queue a deletion job.

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const provider = typeof body.provider === "string" ? body.provider.trim() : undefined;
    const providerId = typeof body.providerId === "string" ? body.providerId.trim() : undefined;

    if (!email) {
      return NextResponse.json({ error: "email is required" }, { status: 400 });
    }

    // TODO: enqueue deletion job or persist request to DB for backoffice processing
    // Example shape for logging/auditing without persisting credentials here
    const payload = { email, provider, providerId, requestedAt: new Date().toISOString() };
    console.log("Data deletion request received:", payload);

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: "unexpected_error" }, { status: 500 });
  }
}

export async function GET() {
  // Provide a simple message for crawlers or manual visits
  return NextResponse.json({
    info: "POST a JSON body to request data deletion: { email, provider?, providerId? }",
  });
}


