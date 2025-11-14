import '@/styles/main.scss';
import type { Metadata } from 'next';
import { Noto_Sans } from 'next/font/google';
import AppHeader from '../../components/AppHeader/AppHeader';
import AppFooter from '../../components/AppFooter/AppFooter';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { generateSiteMetadata } from '@/utils/generateSiteMetadata';
import { generateOrganizationSchema, generateWebSiteSchema } from '@/data/structured-data';
import StructuredData from '@/utils/structuredData';

const notoSans = Noto_Sans({
  subsets: ['latin'],
  variable: '--font-noto-sans',
  display: 'swap',
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateSiteMetadata(locale);
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  let messages;

  try {
    const messagesModule = await import(`../../i18n/${locale}.json`);
    messages = messagesModule.default;
  } catch (error) {
    console.error(`Failed to load messages for locale "${locale}":`, error);
    notFound();
  }

  // Generate global structured data
  const organizationSchema = generateOrganizationSchema(locale);
  const websiteSchema = generateWebSiteSchema(locale);

  return (
    <html lang={locale}>
      <head>
        <StructuredData data={[organizationSchema, websiteSchema]} />
      </head>
      <body className={notoSans.variable} suppressHydrationWarning>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AppHeader />
          {children}
          <AppFooter />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
