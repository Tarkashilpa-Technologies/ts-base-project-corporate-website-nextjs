import { Metadata } from 'next';
import { siteConfig, localeMetadata, baseKeywords } from '@/data/metadata';

/**
 * Generate metadata function for use in layouts
 * @param locale - The locale string (e.g., 'en', 'ms')
 * @returns Metadata object for Next.js
 */
export function generateSiteMetadata(locale: string): Metadata {
  const currentLocale = locale as keyof typeof localeMetadata;
  const metadata = localeMetadata[currentLocale] || localeMetadata.en;

  return {
    title: {
      default: metadata.title,
      template: `%s`,
    },
    description: metadata.description,
    applicationName: siteConfig.name,
    authors: [{ name: 'NTT DATA' }],
    generator: 'Next.js',
    keywords: baseKeywords,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: metadata.locale,
      alternateLocale: currentLocale === 'en' ? 'ms_MY' : 'en_US',
      url: siteConfig.url,
      siteName: siteConfig.name,
      title: metadata.title,
      description: metadata.description,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: metadata.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: siteConfig.twitterSite,
      creator: siteConfig.twitterCreator,
      title: metadata.title,
      description: metadata.description,
      images: [siteConfig.ogImage],
    },
    alternates: {
      canonical: `${siteConfig.url}/${locale}`,
      languages: {
        en: `${siteConfig.url}/en`,
        ms: `${siteConfig.url}/ms`,
      },
    },
    verification: {
      // Add verification codes if needed
      // google: 'your-google-verification-code',
      // yandex: 'your-yandex-verification-code',
      // bing: 'your-bing-verification-code',
    },
  };
}
