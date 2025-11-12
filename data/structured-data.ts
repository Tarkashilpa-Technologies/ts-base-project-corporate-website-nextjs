import { siteConfig } from './metadata';

// Base structured data types
export interface Organization {
  '@context': 'https://schema.org';
  '@type': 'Organization';
  name: string;
  url: string;
  logo: string;
  description: string;
  address: {
    '@type': 'PostalAddress';
    addressCountry: string;
    addressRegion?: string;
    addressLocality?: string;
  };
  contactPoint?: {
    '@type': 'ContactPoint';
    contactType: string;
    email?: string;
    telephone?: string;
  };
  sameAs?: string[];
}

export interface WebSite {
  '@context': 'https://schema.org';
  '@type': 'WebSite';
  name: string;
  url: string;
  description: string;
  publisher: {
    '@type': 'Organization';
    name: string;
  };
  potentialAction?: {
    '@type': 'SearchAction';
    target: {
      '@type': 'EntryPoint';
      urlTemplate: string;
    };
    'query-input': string;
  };
}

export interface WebPage {
  '@context': 'https://schema.org';
  '@type': 'WebPage';
  name: string;
  url: string;
  description: string;
  inLanguage: string;
  isPartOf: {
    '@type': 'WebSite';
    url: string;
  };
}

export interface BreadcrumbList {
  '@context': 'https://schema.org';
  '@type': 'BreadcrumbList';
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item?: string;
  }>;
}

// Organization schema generator
export function generateOrganizationSchema(locale: string): Organization {
  const description = locale === 'ms' ? siteConfig.description.ms : siteConfig.description.en;

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/header_logo.svg`,
    description,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'MY',
      addressRegion: 'Kuala Lumpur',
      addressLocality: 'Malaysia',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
    },
    sameAs: [
      'https://twitter.com/nttdata',
      'https://www.linkedin.com/company/ntt-data',
      'https://www.facebook.com/nttdata',
    ],
  };
}

// Website schema generator
export function generateWebSiteSchema(locale: string): WebSite {
  const description = locale === 'ms' ? siteConfig.description.ms : siteConfig.description.en;

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description,
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

// WebPage schema generator
export function generateWebPageSchema(
  title: string,
  description: string,
  url: string,
  locale: string
): WebPage {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    url,
    description,
    inLanguage: locale === 'ms' ? 'ms-MY' : 'en-US',
    isPartOf: {
      '@type': 'WebSite',
      url: siteConfig.url,
    },
  };
}

// Breadcrumb schema generator
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url?: string }>,
  locale: string
): BreadcrumbList {
  const homeLabel = locale === 'ms' ? 'Laman Utama' : 'Home';

  const breadcrumbItems = [
    {
      '@type': 'ListItem' as const,
      position: 1,
      name: homeLabel,
      item: `${siteConfig.url}/${locale}`,
    },
    ...items.map((item, index) => ({
      '@type': 'ListItem' as const,
      position: index + 2,
      name: item.name,
      ...(item.url && { item: item.url }),
    })),
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems,
  };
}

// Combine multiple schemas
export function combineSchemas(...schemas: any[]) {
  return schemas;
}
