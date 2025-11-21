export interface StrapiSectionContent {
  id: number;
  title: string;
  subtitle: string | null;
  content: string;
  backgroundColorLight: boolean;
  linkType: string | null;
  link: string | null;
  linkTextToDisplay: string | null;
}
