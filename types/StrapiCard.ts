import { StrapiLink } from './StrapiLink';
import { StrapiMedia } from './StrapiMedia';

export interface StrapiCard {
  id: number;
  title: string;
  subTitle: string;
  description: string;
  link: StrapiLink;
  image?: StrapiMedia;
}
