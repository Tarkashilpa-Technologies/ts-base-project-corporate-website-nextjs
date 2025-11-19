import Section from '../../../components/AppSection/AppSection';
import type { Metadata } from 'next';
import { siteConfig } from '@/data/metadata';
import { generateWebPageSchema, generateBreadcrumbSchema } from '@/data/structured-data';
import StructuredData from '@/utils/structuredData';
import { generatePageMetadata } from '@/utils/generatePageMetadata';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import AppBreadcrumb from '../../../components/AppBreadcrumb/AppBreadcrumb';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import { getAboutUsPage, getImageUrl, getLinkVariant } from '@/lib/getAboutUsPage';
import AppPreviewBanner from '@/components/AppPreviewBanner/AppPreviewBanner';
import AppLink from '@/components/AppLink/AppLink';

// Page-specific metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { isEnabled: isDraftMode } = await draftMode();

  // Fetch data from Strapi
  const pageData = await getAboutUsPage(locale, isDraftMode);

  // Use Strapi data if available, otherwise fall back to translations
  const tTitle = await getTranslations('PAGE_TITLE');
  const tDescription = await getTranslations('PAGE_DESCRIPTION');

  const title = pageData?.heroTitle || tTitle('ABOUT');
  const description = pageData?.heroSubtitle || tDescription('ABOUT');

  return generatePageMetadata({
    locale,
    title,
    description,
    path: 'about',
  });
}

export default async function About({
  params,
}: Readonly<{
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const { isEnabled: isDraftMode } = await draftMode();

  // Fetch data from Strapi with draft mode support
  const pageData = await getAboutUsPage(locale, isDraftMode);

  // Redirect to 404 if no data
  if (!pageData) {
    notFound();
  }

  const tTitle = await getTranslations('PAGE_TITLE');

  // Generate page-specific structured data
  const title = pageData.heroTitle;
  const description = pageData.heroSubtitle;

  const webPageSchema = generateWebPageSchema(
    title,
    description,
    `${siteConfig.url}/${locale}/about`,
    locale
  );

  const breadcrumbSchema = generateBreadcrumbSchema(
    [{ name: title, url: `${siteConfig.url}/${locale}/about` }],
    locale
  );

  return (
    <>
      <StructuredData data={[webPageSchema, breadcrumbSchema]} />

      {/* Preview Banner for Draft Mode */}
      {isDraftMode && <AppPreviewBanner locale={locale} />}

      <main className="flex min-h-screen flex-col items-center justify-between pt-80px">
        {/* Hero Section with Strapi Data */}
        <section className="hero-container">
          <div className="hero-background-wrapper overlay-wrapper">
            {pageData.heroImage ? (
              <Image
                src={getImageUrl(pageData.heroImage.url)}
                alt={pageData.heroImage.alternativeText || title}
                width={pageData.heroImage.width}
                height={pageData.heroImage.height}
                priority
              />
            ) : (
              <Image src={'/images/kv-d.jpg'} alt={title} width={1500} height={840} priority />
            )}
          </div>
          <div className="subpage-hero-text-container">
            <div className="content-wrapper h-100 d-flex flex-column justify-content-center align-items-start">
              <AppBreadcrumb items={[{ label: tTitle('HOME'), href: '/' }, { label: title }]} />
              <h1 className="mb-3">{pageData.heroTitle}</h1>
              {pageData.heroSubtitle && <p className="lead">{pageData.heroSubtitle}</p>}
            </div>
          </div>
        </section>

        {/* Dynamic Sections from Strapi */}
        {pageData.allSections.map((item, index) => {
          const section = item.section;

          return (
            <Section
              key={item.id}
              title={section.title}
              subtitle={section.subtitle || undefined}
              className={section.backgroundColorLight ? 'bg-light' : ''}
            >
              <p>{section.content}</p>

              {/* Render link if available */}
              {section.link && section.linkTextToDisplay && (
                <div className="mt-4">
                  <AppLink
                    text={section.linkTextToDisplay}
                    link={section.link}
                    variant={getLinkVariant(section.linkType)}
                  />
                </div>
              )}
            </Section>
          );
        })}
      </main>
    </>
  );
}
