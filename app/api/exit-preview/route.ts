import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  // Parse query parameters
  const searchParams = request.nextUrl.searchParams;
  const locale = searchParams.get('locale') || 'en';

  // Disable Draft Mode
  (await draftMode()).disable();

  // Redirect to blog listing page
  redirect(`http://localhost:3000/${locale}/blog`);
}
