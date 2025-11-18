import Section from '../../../components/AppSection/AppSection';
import type { Metadata } from 'next';
import { siteConfig } from '@/data/metadata';
import { generateWebPageSchema, generateBreadcrumbSchema } from '@/data/structured-data';
import StructuredData from '@/utils/structuredData';
import Image from 'next/image';
import { getAllBlogs } from '@/utils/getBlog';
import { getTranslations } from 'next-intl/server';
import AppLink from '../../../components/AppLink/AppLink';
import AppBreadcrumb from '../../../components/AppBreadcrumb/AppBreadcrumb';
import { generatePageMetadata } from '@/utils/generatePageMetadata';

// Page-specific metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const tTitle = await getTranslations('PAGE_TITLE');
  const tDescription = await getTranslations('PAGE_DESCRIPTION');

  return generatePageMetadata({
    locale,
    title: tTitle('BLOG'),
    description: tDescription('BLOG'),
    path: 'blog',
  });
}

export default async function Blog({
  params,
}: Readonly<{
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const t = await getTranslations('COMMON');
  const tTitle = await getTranslations('PAGE_TITLE');
  const tDescription = await getTranslations('PAGE_DESCRIPTION');

  // Generate page-specific structured data
  const title = tTitle('BLOG');
  const description = tDescription('BLOG');

  const webPageSchema = generateWebPageSchema(
    title,
    description,
    `${siteConfig.url}/${locale}/blog`,
    locale
  );

  const breadcrumbSchema = generateBreadcrumbSchema(
    [{ name: title, url: `${siteConfig.url}/${locale}/blog` }],
    locale
  );

  return (
    <>
      <StructuredData data={[webPageSchema, breadcrumbSchema]} />
      <main className="flex min-h-screen flex-col items-center justify-between pt-80px">
        <section className="hero-container">
          <div className="hero-background-wrapper overlay-wrapper">
            <Image src={'/images/kv-d.jpg'} alt="NTT DATA Focus" width={1500} height={840} />
          </div>
          <div className="subpage-hero-text-container">
            <div className="content-wrapper h-100 d-flex flex-column justify-content-center align-items-start">
              <AppBreadcrumb items={[{ label: tTitle('HOME'), href: '/' }, { label: title }]} />
              <h1 className="mb-3">NTT DATA Focus</h1>
              <p className="mb-0">Discover our group initiatives</p>
            </div>
          </div>
        </section>

        <Section title="Blog" className="bg-light">
          <div className="three-columns-grid">
            {(await getAllBlogs(locale)).map((article) => {
              const date = new Date(article.date);
              const formattedDate = date.toLocaleDateString(locale, {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              });

              return (
                <div key={article.slug} className="blog-card p-24px">
                  <div>
                    <h5 className="card-title mb-8px two-line-truncate">{article.title}</h5>
                    <p className="card-subtitle mb-16px three-line-truncate">
                      {article.description}
                    </p>
                    <div className="card-date mb-16px">{formattedDate}</div>
                    <span className="card-badge px-12px py-4px">{article.topic}</span>
                  </div>
                  <div className="card-link pt-24px">
                    <AppLink
                      text={t('READ_MORE')}
                      link={`/blog/${article.slug}`}
                      variant="secondaryLink"
                      iconAfter="ArrowRight"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Section>
      </main>
    </>
  );
}
