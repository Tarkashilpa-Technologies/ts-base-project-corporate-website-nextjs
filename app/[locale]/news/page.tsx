import Section from '../../../components/AppSection/AppSection';
import type { Metadata } from 'next';
import { siteConfig } from '@/data/metadata';
import { generateWebPageSchema, generateBreadcrumbSchema } from '@/data/structured-data';
import StructuredData from '@/utils/structuredData';
import Image from 'next/image';
import { getAllNews } from '@/utils/getArticlesContentByType';
import AppLink from '../../../components/AppLink/AppLink';
import { getTranslations } from 'next-intl/server';
import AppBreadcrumb from '../../../components/AppBreadcrumb/AppBreadcrumb';
import { generatePageMetadata } from '@/utils/generatePageMetadata';

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
    title: t('NEWS'),
    description: tDesc('NEWS'),
    path: 'news',
  });
}

export default async function News({
  params,
}: Readonly<{
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const tTitle = await getTranslations('PAGE_TITLE');
  const tDesc = await getTranslations('PAGE_DESCRIPTION');

  // Generate page-specific structured data
  const title = tTitle('NEWS');
  const description = tDesc('NEWS');

  const webPageSchema = generateWebPageSchema(
    title,
    description,
    `${siteConfig.url}/${locale}/news`,
    locale
  );

  const breadcrumbSchema = generateBreadcrumbSchema(
    [{ name: title, url: `${siteConfig.url}/${locale}/news` }],
    locale
  );

  return (
    <>
      <StructuredData data={[webPageSchema, breadcrumbSchema]} />
      <main className="flex min-h-screen flex-col items-center justify-between pt-80px">
        <section className="hero-container">
          <div className="hero-background-wrapper overlay-wrapper">
            <Image src={'/images/kv-d.jpg'} alt="NTT DATA News" width={1500} height={840} />
          </div>
          <div className="subpage-hero-text-container">
            <div className="content-wrapper h-100 d-flex flex-column justify-content-center align-items-start">
              <AppBreadcrumb items={[{ label: tTitle('HOME'), href: '/' }, { label: title }]} />
              <h1 className="mb-3">Global News</h1>
            </div>
          </div>
        </section>

        <Section title="News" className="bg-light">
          <div className="d-flex flex-column">
            {(await getAllNews(locale)).map((article, index, arr) => {
              const date = new Date(article.date);
              const formattedDate = date.toLocaleDateString(locale, {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              });
              const isLast = index === arr.length - 1;

              return (
                <div key={article.slug}>
                  <hr className="my-0 text-black" />
                  <div className="d-flex flex-column flex-md-row py-20px px-16px">
                    <div className="mb-16px mr-16px" style={{ minWidth: '110px' }}>
                      <div className="card-date">{formattedDate}</div>
                    </div>
                    <div className="d-flex flex-column w-100">
                      <span className="card-badge px-12px py-4px mb-16px">{article.location}</span>
                      <AppLink
                        text={article.title}
                        link={`/news/${article.slug}`}
                        variant="primaryLink"
                        className="fs-6 text-black w-100 d-flex justify-content-between"
                        iconAfter="ArrowRight"
                      />
                    </div>
                  </div>
                  {isLast && <hr className="my-0 text-black" />}
                </div>
              );
            })}
          </div>
        </Section>
      </main>
    </>
  );
}
