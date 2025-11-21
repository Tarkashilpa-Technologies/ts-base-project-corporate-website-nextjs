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
import { getAboutUsPage, getMediaUrl, getLinkVariant } from '@/lib/getAboutUsPage';
import AppPreviewBanner from '@/components/AppPreviewBanner/AppPreviewBanner';
import AppLink from '@/components/AppLink/AppLink';
import AppCardDark from '@/components/AppCardDark/AppCardDark';
import { Link } from '@/i18n/navigation';
import AppCardWithImageTop from '@/components/AppCardWithImageTop/AppCardWithImageTop';

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

  if (pageData?.heroImage?.url) console.log('media url: ', getMediaUrl(pageData?.heroImage?.url));
  console.log(pageData);

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
                src={getMediaUrl(pageData.heroImage.url)}
                alt={pageData.heroImage.alternativeText || title}
                width={pageData.heroImage.width || 1500}
                height={pageData.heroImage.height || 840}
                unoptimized
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
          if (index === 0) {
            return (
              <Section
                key={item.id}
                title={section.title}
                subtitle={section.subtitle || undefined}
                className={section.backgroundColorLight ? 'bg-light' : ''}
              >
                <div className="two-columns-grid">
                  <div className="">
                    <p>{section.content}</p>
                    {/* Render link if available */}
                    {pageData?.sectionOnePDF?.url && section.linkTextToDisplay && (
                      <div className="my-24px">
                        <AppLink
                          text={section.linkTextToDisplay}
                          link={getMediaUrl(pageData?.sectionOnePDF?.url)}
                          variant={getLinkVariant(section.linkType)}
                          iconAfter="ArrowRight"
                        />
                      </div>
                    )}
                  </div>
                  <div className="">
                    <div className="hover-zoom-wrapper">
                      <Link href={pageData.sectionOneVideoLink} target="_blank">
                        <Image
                          src={getMediaUrl(pageData.sectionOnePlayImage.url)}
                          alt={pageData.sectionOnePlayImage.alternativeText || title}
                          width={pageData.sectionOnePlayImage.width || 600}
                          height={400}
                          unoptimized
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </Section>
            );
          }
          if (index === 1) {
            return (
              <Section
                key={item.id}
                title={section.title}
                subtitle={section.subtitle || undefined}
                className={`pt-0 ${section.backgroundColorLight ? 'bg-light' : ''}`}
              >
                <div className="mt-24px mb-64px">
                  {section.linkTextToDisplay && (
                    <AppLink
                      text={section.linkTextToDisplay}
                      variant={getLinkVariant(section.linkType)}
                      iconAfter="ArrowRight"
                    />
                  )}
                </div>
                <div className="two-columns-grid">
                  {pageData.aboutUsSectionTwoCards?.map((card) => (
                    <div key={card.id} className="">
                      <AppCardDark
                        title={card.title}
                        subtitle={card.subTitle}
                        description={card.description}
                        linkUrl={card.link.url || undefined}
                        linkText={card.link.textToDisplay}
                        linkType={card.link.type}
                      />
                    </div>
                  ))}
                </div>
              </Section>
            );
          }

          if (index === 2) {
            return (
              <Section
                key={item.id}
                title={section.title}
                subtitle={section.subtitle || undefined}
                className={section.backgroundColorLight ? 'bg-light' : ''}
              >
                <div className="two-columns-grid  mt-40px text-dark">
                  {/* Content Column - Left on desktop */}
                  <div className="">
                    <h3 className="fs-responsive-md mb-24px">{pageData.ourValuesTitle}</h3>
                    {pageData.allOurValues.map((item, index) => (
                      <div key={'value' + index} className="mb-40px">
                        <p className="fw-bold mb-2">{item.value}</p>
                        <p>{item.valueInDepth}</p>
                      </div>
                    ))}
                    {pageData.ourValuesLink.textToDisplay && (
                      <AppLink
                        text={pageData.ourValuesLink.textToDisplay}
                        link={pageData.ourValuesLink.url || undefined}
                        variant={getLinkVariant(pageData.ourValuesLink.type)}
                        iconAfter="ArrowRight"
                      />
                    )}
                  </div>
                  {/* Image Column - Right on desktop */}
                  <div className="">
                    {pageData.ourValuesImage && (
                      <Image
                        src={getMediaUrl(pageData.ourValuesImage.url)}
                        alt={pageData.ourValuesImage.alternativeText || pageData.ourValuesTitle}
                        width={pageData.ourValuesImage.width || 600}
                        height={pageData.ourValuesImage.height || 400}
                        unoptimized
                        className="w-100 h-auto mb-40px"
                      />
                    )}
                  </div>
                </div>

                {/* Cards Below Our Values */}
                {pageData.cardsBelowOurValues && pageData.cardsBelowOurValues.length > 0 && (
                  <div className="two-columns-grid">
                    {pageData.cardsBelowOurValues.map((card) => (
                      <div key={card.id} className="">
                        <AppCardWithImageTop
                          title={card.title}
                          description={card.description}
                          image={
                            card.image ? getMediaUrl(card.image.url) : '/images/card-img-1.jpg'
                          }
                          linkText={card.link.textToDisplay}
                          link={card.link.url || '#'}
                          linkType={getLinkVariant(card.link.type)}
                          className="text-dark"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </Section>
            );
          }

          if (index === 3) {
            return (
              <Section
                key={item.id}
                title={section.title}
                subtitle={section.subtitle || undefined}
                className={`pt-0 ${section.backgroundColorLight ? 'bg-light' : ''}`}
              >
                <div className="two-columns-grid">
                  <div>
                    {pageData.ourLeadershipImage && (
                      <Image
                        src={getMediaUrl(pageData.ourLeadershipImage.url)}
                        alt={pageData.ourLeadershipImage.alternativeText || pageData.ourValuesTitle}
                        width={pageData.ourLeadershipImage.width || 600}
                        height={pageData.ourLeadershipImage.height || 400}
                        unoptimized
                        className="w-100 h-auto mb-40px"
                      />
                    )}
                  </div>

                  <div className="d-flex flex-column text-dark">
                    <p className="mb-24px">{section.content}</p>
                    {section.linkTextToDisplay && (
                      <AppLink
                        text={section.linkTextToDisplay}
                        variant={getLinkVariant(section.linkType)}
                        iconAfter="ArrowRight"
                        className="mb-24px"
                      />
                    )}
                    {pageData.messageFromCEOLink.textToDisplay && (
                      <AppLink
                        text={pageData.messageFromCEOLink.textToDisplay}
                        variant={getLinkVariant(pageData.messageFromCEOLink.type)}
                        iconAfter="ArrowRight"
                        className="mb-24px"
                      />
                    )}
                  </div>
                </div>
              </Section>
            );
          }
        })}
      </main>
    </>
  );
}
