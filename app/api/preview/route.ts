import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  // Parse query parameters
  const searchParams = request.nextUrl.searchParams;
  const secret = searchParams.get('secret');
  const url = searchParams.get('url');
  const locale = searchParams.get('locale') || 'en';
  const status = searchParams.get('status');

  if (status !== 'draft') {
    (
      await // Enable Draft Mode
      draftMode()
    ).disable();

    // Redirect to the blog post page
    redirect(`/${locale}/${url}`);
  }
  if (!secret || secret !== process.env.PREVIEW_SECRET) {
    // Validate secret - return 404 to hide endpoint existence
    return new Response('Invalid token', { status: 404 });
  }

  // Validate required parameters
  if (!url) {
    return new Response('Missing url parameter', { status: 400 });
  }

  // Validate locale
  const validLocales = ['en', 'ms'];
  if (!validLocales.includes(locale)) {
    return new Response('Invalid locale', { status: 400 });
  }

  // Enable Draft Mode
  (
    await // Enable Draft Mode
    draftMode()
  ).enable();

  // Redirect to the blog post page
  redirect(`/${locale}/${url}`);
}
