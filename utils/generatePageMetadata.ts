import type { Metadata } from 'next';
import { siteConfig, baseKeywords } from '@/data/metadata';

interface GenerateMetadataParams {
  locale: string;
  title: string;
  description: string;
  keywords?: string[];
  path?: string;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageAlt?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
}

/**
 * Generate metadata for a page
 * @param params - Metadata parameters
 * @returns Metadata object for Next.js
 */
export function generatePageMetadata({
  locale,
  title,
  description,
  keywords,
  path = '',
  image = siteConfig.ogImage,
  imageWidth = 1200,
  imageHeight = 630,
  imageAlt,
  type = 'website',
  publishedTime,
}: GenerateMetadataParams): Metadata {
  const url = path ? `${siteConfig.url}/${locale}/${path}` : `${siteConfig.url}/${locale}`;
  const fullTitle = `${title} | ${siteConfig.name}`;
  const alt = imageAlt || `${title} - ${siteConfig.name}`;

  // Merge base keywords with page-specific keywords
  const finalKeywords = keywords ? [...baseKeywords, ...keywords] : baseKeywords;

  const openGraphBase = {
    title: fullTitle,
    description,
    url,
    type,
    images: [
      {
        url: image,
        width: imageWidth,
        height: imageHeight,
        alt,
      },
    ],
  };

  // Add publishedTime for article type
  const openGraph =
    type === 'article' && publishedTime ? { ...openGraphBase, publishedTime } : openGraphBase;

  const metadata: Metadata = {
    title,
    description,
    keywords: finalKeywords,
    openGraph,
    twitter: {
      title: fullTitle,
      description,
      images: [image],
    },
  };

  return metadata;
}
