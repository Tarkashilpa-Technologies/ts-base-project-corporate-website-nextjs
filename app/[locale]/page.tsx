import AppCard from '@/components/AppCard/AppCard';
import AppSection from '@/components/AppSection/AppSection';
import AppLink from '@/components/AppLink/AppLink';
import Image from 'next/image';
import type { Metadata } from 'next';
import { siteConfig } from '@/data/metadata';
import { generateWebPageSchema, generateBreadcrumbSchema } from '@/data/structured-data';
import StructuredData from '@/utils/structuredData';
import { generatePageMetadata } from '@/utils/generatePageMetadata';
import { getTranslations } from 'next-intl/server';

// Page-specific metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations('PAGE_TITLE');
  const tDesc = await getTranslations('PAGE_DESCRIPTION');

  return generatePageMetadata({
    locale,
    title: t('HOME'),
    description: tDesc('HOME'),
    path: '',
    image: '/images/top-kv_05_sp.jpg',
    imageWidth: 1500,
    imageHeight: 840,
    imageAlt: 'NTT DATA Malaysia',
  });
}

export default async function Home({
  params,
}: Readonly<{
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const t = await getTranslations('PAGE_TITLE');
  const tDesc = await getTranslations('PAGE_DESCRIPTION');

  // Generate page-specific structured data
  const title = t('HOME');
  const description = tDesc('HOME');

  const webPageSchema = generateWebPageSchema(
    title,
    description,
    `${siteConfig.url}/${locale}`,
    locale
  );

  const breadcrumbSchema = generateBreadcrumbSchema([], locale);
  const spotlightCards = [
    {
      type: 'Guide',
      title: 'NTT DATA and Cisco partner to power networking for the AI era',
      backgroundImage: 'card-img-1.jpg',
    },
    {
      type: 'Service',
      title: 'Generative AI',
      backgroundImage: 'card-img-2.jpg',
    },
    {
      type: 'Article',
      title: 'Empower your workforce with AI in manufacturing operations',
      backgroundImage: 'card-img-3.jpg',
    },
    {
      type: 'Article',
      title: 'Measuring customer loyalty in the age on AI needs a fresh take on NPS',
      backgroundImage: 'card-img-4.jpg',
    },
    {
      type: 'Article',
      title: 'Honoring our planet, one action at a time',
      backgroundImage: 'card-img-5.jpg',
    },
    {
      type: 'Article',
      title: 'Setting sail for future: Agentic AI charts a new course for business',
      backgroundImage: 'card-img-6.jpg',
    },
  ];

  return (
    <>
      <StructuredData data={[webPageSchema, breadcrumbSchema]} />
      <main className="flex min-h-screen flex-col items-center justify-between pt-80px">
        <section className="hero-container">
          <div className="hero-background-wrapper overlay-wrapper">
            <Image src={'/images/top-kv_05_sp.jpg'} alt="image" width={1500} height={840} />
          </div>
          <div className="homepage-hero-text-container">
            <div className="content-wrapper h-100 d-flex flex-column justify-content-center align-items-start">
              <h1 className="mt-24px">Elevate customer experiences with NTT DATA</h1>
              <AppLink
                text="Read More"
                variant="buttonLink"
                iconAfter="ArrowRight"
                className="mt-24px"
              ></AppLink>
            </div>
          </div>
        </section>

        <AppSection title="Spotlight">
          <div className="three-columns-grid">
            {spotlightCards.map((spotlight, index) => (
              <AppCard
                type={spotlight.type}
                title={spotlight.title}
                backgroundImage={spotlight.backgroundImage}
                linkText="Read more"
                key={spotlight.title + index}
              ></AppCard>
            ))}
          </div>
        </AppSection>

        <AppSection
          title="We're ONE NTT DATA"
          subtitle="From strategic consulting to leading-edge technologies, we enable experiences that transform organizations, disrupt industries, and shape a better society for all."
          className="bg-light"
        >
          <AppLink
            text="Learn more About Us"
            link="/about"
            variant="secondaryLink"
            iconAfter="ArrowRight"
            className="mb-64px"
          ></AppLink>
          <div className="three-columns-grid">
            {spotlightCards.map(
              (spotlight, index) =>
                index < 3 && (
                  <AppCard
                    type={spotlight.type}
                    title={spotlight.title}
                    backgroundImage={spotlight.backgroundImage}
                    linkText="Read more"
                    key={spotlight.title + index}
                  ></AppCard>
                )
            )}
          </div>
        </AppSection>

        <AppSection
          title="Mission statement"
          subtitle="Learn what core principles and values the NTT DATA Group believes in and shares with its employees across the globe."
        >
          <AppLink
            text="Read more"
            link="/about"
            variant="tertiaryLink"
            iconAfter="ArrowRight"
          ></AppLink>
          <AppSection title="Discover our initiatives below" className="pb-0">
            <div className="three-columns-grid">
              {spotlightCards.map((spotlight, index) => (
                <AppCard
                  type={spotlight.type}
                  title={spotlight.title}
                  backgroundImage={spotlight.backgroundImage}
                  linkText="Read more"
                  key={spotlight.title + index}
                ></AppCard>
              ))}
            </div>
          </AppSection>
        </AppSection>

        <AppSection title="Investors" className="bg-light pb-0">
          <div className="three-columns-grid">
            {spotlightCards.map(
              (spotlight, index) =>
                index < 3 && (
                  <AppCard
                    type={spotlight.type}
                    title={spotlight.title}
                    backgroundImage={spotlight.backgroundImage}
                    linkText="Read more"
                    key={spotlight.title + index}
                  ></AppCard>
                )
            )}
          </div>
        </AppSection>

        <AppSection title="Media" className="bg-light">
          <div className="three-columns-grid">
            {spotlightCards.map(
              (spotlight, index) =>
                index > 3 && (
                  <AppCard
                    type={spotlight.type}
                    title={spotlight.title}
                    backgroundImage={spotlight.backgroundImage}
                    linkText="Read more"
                    key={spotlight.title + index}
                  ></AppCard>
                )
            )}
          </div>
        </AppSection>

        <AppSection
          subtitle="Select a location to explore services and solutions relevant to you."
          className="fs-4"
        >
          <AppLink
            text="Select a Country"
            iconBefore="Globe"
            variant="buttonLink"
            iconAfter="ArrowRight"
            className="py-3"
          ></AppLink>
        </AppSection>

        <section className="ntt-bg-logo">
          <div className="content-wrapper">
            <AppSection title="Connect with us">
              <AppLink
                text="Contact Us"
                variant="primaryLink"
                iconAfter="ArrowRight"
                className="py-3"
              ></AppLink>
            </AppSection>
          </div>
        </section>
      </main>
    </>
  );
}
