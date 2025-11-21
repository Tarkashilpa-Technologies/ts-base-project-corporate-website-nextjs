import { StrapiMedia } from './StrapiMedia';
import { StrapiLink } from './StrapiLink';
import { StrapiCard } from './StrapiCard';
import { StrapiAllOurValues } from './StrapiAllOurValues';
import { StrapiSectionContent } from './StrapiSectionContent';

export interface StrapiAboutUsPage {
  sectionOneVideoLink: string;
  sectionOnePlayImage: StrapiMedia;
  sectionOnePDF: StrapiMedia;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: StrapiMedia | null;
  allSections: Array<{
    id: number;
    section: StrapiSectionContent;
  }>;
  locale: string;
  aboutUsSectionTwoCards: StrapiCard[];
  cardsBelowOurValues: StrapiCard[];
  allOurValues: StrapiAllOurValues[];
  ourValuesImage: StrapiMedia;
  ourValuesTitle: string;
  ourValuesLink: StrapiLink;
  messageFromCEOLink: StrapiLink;
  ourLeadershipImage: StrapiMedia;
}
