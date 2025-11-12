import Section from '../../../components/AppSection/AppSection';
import type { Metadata } from 'next';
import { siteConfig } from '@/data/metadata';
import { generateWebPageSchema, generateBreadcrumbSchema } from '@/data/structured-data';
import StructuredData from '@/utils/structuredData';
import { generatePageMetadata } from '@/utils/generatePageMetadata';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import AppBreadcrumb from '../../../components/AppBreadcrumb/AppBreadcrumb';

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
    title: t('ABOUT'),
    description: tDesc('ABOUT'),
    path: 'about',
  });
}

export default async function About({
  params,
}: Readonly<{
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const t = await getTranslations('PAGE_TITLE');
  const tDesc = await getTranslations('PAGE_DESCRIPTION');

  // Generate page-specific structured data
  const title = t('ABOUT');
  const description = tDesc('ABOUT');

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
  const counter = new Array(5).fill(null);
  return (
    <>
      <StructuredData data={[webPageSchema, breadcrumbSchema]} />
      <main className="flex min-h-screen flex-col items-center justify-between pt-80px">
        <section className="hero-container">
          <div className="hero-background-wrapper overlay-wrapper">
            <Image src={'/images/kv-d.jpg'} alt="About NTT DATA" width={1500} height={840} />
          </div>
          <div className="subpage-hero-text-container">
            <div className="content-wrapper h-100 d-flex flex-column justify-content-center align-items-start">
              <AppBreadcrumb items={[{ label: t('HOME'), href: '/' }, { label: title }]} />
              <h1 className="mb-3">{title}</h1>
            </div>
          </div>
        </section>

        {counter.map((_, i) => (
          <Section
            title="About Us"
            className={i % 2 == 0 ? '' : 'bg-light text-dark'}
            key={'section' + i}
          >
            <p>This is a About.</p>
          </Section>
        ))}
      </main>
    </>
  );
}
