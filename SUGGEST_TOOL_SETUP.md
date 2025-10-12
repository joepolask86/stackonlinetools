# Suggest Tool Setup Instructions

## reCAPTCHA Configuration

To enable reCAPTCHA spam protection for the suggest tool form, you need to:

1. **Get reCAPTCHA Keys:**
   - Go to [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
   - Create a new site or use an existing one
   - Choose reCAPTCHA v2 ("I'm not a robot" Checkbox)
   - Add your domain(s) to the site list
   - Copy the Site Key and Secret Key

2. **Environment Variables:**
   Create a `.env.local` file in your project root with:
   ```
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key_here
   RECAPTCHA_SECRET_KEY=your_secret_key_here
   ```

3. **Current Status:**
   - The form currently uses a test key for development
   - Replace the test key in `components/suggest/suggest-tool-form.tsx` line 195 with your actual site key
   - For production, use environment variables as shown above

## Features Implemented

✅ **Form Fields:**
- Name (required)
- Email (required, validated)
- Tool Name (required)
- Category selection (required)
- Tool Description (required, min 50 chars)
- Use Case (required)

✅ **Validation:**
- Client-side form validation
- Email format validation
- Required field validation
- Character count for description

✅ **reCAPTCHA Integration:**
- Spam protection with Google reCAPTCHA v2
- Visual feedback for validation errors
- Reset functionality

✅ **User Experience:**
- Loading states during submission
- Success confirmation screen
- Error handling with toast notifications
- Responsive design
- Accessible form labels

✅ **Navigation:**
- Integrated in header navigation
- Added to footer navigation for better discoverability
- Link points to `/suggest` route

## Backend Integration

The form currently simulates submission. To integrate with a real backend:

1. Create an API route at `app/api/suggest/route.ts`
2. Implement server-side reCAPTCHA verification
3. Store suggestions in your database
4. Send confirmation emails
5. Update the form submission handler in `suggest-tool-form.tsx`

## Testing

The suggest tool page is now available at `/suggest` and includes:
- Form validation
- reCAPTCHA integration (with test key)
- Responsive design
- Error handling
- Success states
