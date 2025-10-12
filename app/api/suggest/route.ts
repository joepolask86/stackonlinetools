import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { name, email, toolName, description, useCase, category, recaptchaToken } = body;
    
    if (!name || !email || !toolName || !description || !useCase || !category || !recaptchaToken) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // TODO: Verify reCAPTCHA token with Google's API
    // const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    //   body: new URLSearchParams({
    //     secret: process.env.RECAPTCHA_SECRET_KEY!,
    //     response: recaptchaToken,
    //   }),
    // });
    // const recaptchaResult = await recaptchaResponse.json();
    // if (!recaptchaResult.success) {
    //   return NextResponse.json({ error: 'reCAPTCHA verification failed' }, { status: 400 });
    // }

    // TODO: Save to database
    // const suggestion = {
    //   name,
    //   email,
    //   toolName,
    //   description,
    //   useCase,
    //   category,
    //   createdAt: new Date(),
    //   status: 'pending'
    // };
    // await db.suggestions.create(suggestion);

    // TODO: Send notification email
    // await sendNotificationEmail(suggestion);

    // For now, just log the suggestion
    console.log('New tool suggestion received:', {
      name,
      email,
      toolName,
      category,
      timestamp: new Date().toISOString()
    });

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
