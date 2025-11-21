import qs from 'qs';
import { StrapiAboutUsPage } from '@/types/StrapiAboutUsPage';

// Re-export types for backward compatibility
export type { StrapiAllOurValues as AllOurValues } from '@/types/StrapiAllOurValues';
export type { StrapiCard as Card } from '@/types/StrapiCard';
export type { StrapiAboutUsPage as AboutUsPage } from '@/types/StrapiAboutUsPage';

/**
 * Get About Us page data from Strapi
 * @param locale - The locale (en, ms)
 * @param isDraft - If true, fetches draft content (preview mode)
 * @returns About Us page data or null if not found
 */
export async function getAboutUsPage(
  locale: string = 'en',
  isDraft: boolean = false
): Promise<StrapiAboutUsPage | null> {
  try {
    // Define the populate structure for Strapi
    const populateConfig = {
      heroImage: { populate: '*' },
      sectionOnePlayImage: { populate: '*' },
      sectionOnePDF: { populate: '*' },
      allSections: {
        populate: {
          section: { populate: '*' },
        },
      },
      aboutUsSectionTwoCards: { populate: '*' },
      cardsBelowOurValues: {
        populate: {
          image: { populate: '*' },
          link: { populate: '*' },
        },
      },
      allOurValues: { populate: '*' },
      ourValuesImage: { populate: '*' },
      ourValuesLink: { populate: '*' },
      messageFromCEOLink: { populate: '*' },
      ourLeadershipImage: { populate: '*' },
    };

    // Build query parameters using qs
    const queryParams = {
      locale,
      populate: populateConfig,
      status: isDraft ? 'draft' : 'published',
    };

    const queryString = qs.stringify(queryParams, {
      encodeValuesOnly: true, // Keeps the structure clean
    });

    const url = `${process.env.STRAPI_URL}/api/about-us-page?${queryString}`;

    const res = await fetch(url, { cache: 'no-store' });

    if (!res.ok) {
      console.error('Failed to fetch About Us page from Strapi');
      console.error(res);
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
      sectionOnePlayImage: data.sectionOnePlayImage,
      sectionOnePDF: data.sectionOnePDF,
      sectionOneVideoLink: data.sectionOneVideoLink,
      aboutUsSectionTwoCards: data.aboutUsSectionTwoCards || [],
      cardsBelowOurValues: data.cardsBelowOurValues || [],
      allOurValues: data.allOurValues || [],
      ourValuesImage: data.ourValuesImage,
      ourValuesTitle: data.ourValuesTitle,
      ourValuesLink: data.ourValuesLink,
      messageFromCEOLink: data.messageFromCEOLink,
      ourLeadershipImage: data.ourLeadershipImage,
    };
  } catch (error) {
    console.error('Error fetching About Us page:', error);
    return null;
  }
}

/**
 * Helper function to get full media URL (images, PDFs, documents, etc.)
 * Handles both relative and absolute URLs
 */
export function getMediaUrl(url: string): string {
  if (url.startsWith('http')) {
    return url;
  }
  return `${process.env.STRAPI_URL}${url}`;
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
