import { Metadata } from 'next';

// Site configuration
export const siteConfig = {
  name: 'NTT DATA Malaysia',
  description: {
    en: 'NTT DATA is a leading IT consulting firm providing innovative digital solutions, strategic consulting, and cutting-edge technologies to transform organizations and shape a better society.',
    ms: 'NTT DATA ialah firma perunding IT terkemuka yang menyediakan penyelesaian digital inovatif, perundingan strategik, dan teknologi terkini untuk mengubah organisasi dan membentuk masyarakat yang lebih baik.',
  },
  url: 'https://www.nttdatapay.com/my', // Update with your actual domain
  ogImage: '/images/og-image.jpg', // Update with your actual OG image path
  twitterCreator: '@nttdata', // Update with your actual Twitter handle
  twitterSite: '@nttdata', // Update with your actual Twitter handle
};

// Locale-specific metadata
export const localeMetadata = {
  en: {
    title: 'NTT DATA Malaysia',
    description: siteConfig.description.en,
    locale: 'en_US',
  },
  ms: {
    title: 'NTT DATA Malaysia',
    description: siteConfig.description.ms,
    locale: 'ms_MY',
  },
};

// Generate metadata function for use in layouts
export function generateSiteMetadata(locale: string): Metadata {
  const currentLocale = locale as keyof typeof localeMetadata;
  const metadata = localeMetadata[currentLocale] || localeMetadata.en;

  return {
    title: {
      default: metadata.title,
      template: `%s | ${metadata.title}`,
    },
    description: metadata.description,
    applicationName: siteConfig.name,
    authors: [{ name: 'NTT DATA' }],
    generator: 'Next.js',
    keywords: [
      'NTT DATA',
      'IT consulting',
      'digital transformation',
      'technology solutions',
      'Malaysia',
      'enterprise solutions',
      'cloud services',
      'AI',
      'data analytics',
    ],
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
