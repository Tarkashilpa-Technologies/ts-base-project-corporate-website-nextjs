// TypeScript Interfaces for About Us Page from Strapi

interface StrapiImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  url: string;
  formats?: any;
}

interface SectionContent {
  id: number;
  title: string;
  subtitle: string | null;
  content: string;
  backgroundColorLight: boolean;
  linkType: string | null;
  link: string | null;
  linkTextToDisplay: string | null;
}

interface AboutSection {
  id: number;
  section: SectionContent;
}

export interface AboutUsPage {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: StrapiImage | null;
  allSections: AboutSection[];
  locale: string;
}

/**
 * Get About Us page data from Strapi
 * @param locale - The locale (en, ms)
 * @param isDraft - If true, fetches draft content (preview mode)
 * @returns About Us page data or null if not found
 */
export async function getAboutUsPage(
  locale: string = 'en',
  isDraft: boolean = false
): Promise<AboutUsPage | null> {
  try {
    // Add publicationState parameter for preview mode
    const publicationState = isDraft ? 'draft' : 'published';

    // Fetch with 2-level deep population for nested sections
    const url = `${process.env.STRAPI_URL}/api/about-us-page?locale=${locale}&populate[heroImage]=*&populate[allSections][populate][section]=*&status=${publicationState}`;

    const res = await fetch(url, { cache: 'no-store' });

    if (!res.ok) {
      console.error('Failed to fetch About Us page from Strapi');
      return null;
    }

    const response = await res.json();
    const data = response?.data;

    if (!data) {
      return null;
    }

    // Map Strapi response to AboutUsPage interface
    return {
      heroTitle: data.heroTitle,
      heroSubtitle: data.heroSubtitle,
      heroImage: data.heroImage,
      allSections: data.allSections || [],
      locale: data.locale,
    };
  } catch (error) {
    console.error('Error fetching About Us page:', error);
    return null;
  }
}

/**
 * Helper function to get full image URL
 * Handles both relative and absolute URLs
 */
export function getImageUrl(url: string): string {
  if (url.startsWith('http')) {
    return url;
  }
  return `${process.env.NEXT_PUBLIC_STRAPI_URL || process.env.STRAPI_URL}${url}`;
}

/**
 * Helper function to map Strapi link types to AppLink variants
 */
export function getLinkVariant(
  linkType: string | null
): 'primaryLink' | 'secondaryLink' | 'tertiaryLink' | 'buttonLink' {
  switch (linkType) {
    case 'Primary Link':
      return 'primaryLink';
    case 'Secondary Link':
      return 'secondaryLink';
    case 'Tertiary Link':
      return 'tertiaryLink';
    case 'Button Link':
      return 'buttonLink';
    default:
      return 'tertiaryLink';
  }
}
