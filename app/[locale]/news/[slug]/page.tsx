import { getNewsBySlug, getAllNews } from '@/utils/fetchArticles';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import AppSection from '../../../../components/AppSection/AppSection';
import AppBreadcrumb from '../../../../components/AppBreadcrumb/AppBreadcrumb';
import { generatePageMetadata } from '@/utils/generatePageMetadata';
import { getTranslations } from 'next-intl/server';

// Generate static params for all news articles
export async function generateStaticParams() {
  const locales = ['en', 'ms'];
  const params = [];

  for (const locale of locales) {
    const articles = await getAllNews(locale);
    for (const article of articles) {
      params.push({
        locale,
        slug: article.slug,
      });
    }
  }

  return params;
}

// Generate metadata for the page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = await getNewsBySlug(slug, locale);

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  return generatePageMetadata({
    locale,
    title: article.title,
    description: article.description,
    path: `news/${slug}`,
    imageAlt: article.title,
    type: 'article',
    publishedTime: article.date,
  });
}

export default async function NewsPost({
  params,
}: Readonly<{
  params: Promise<{ locale: string; slug: string }>;
}>) {
  const { locale, slug } = await params;
  const article = await getNewsBySlug(slug, locale);
  const tTitle = await getTranslations('PAGE_TITLE');

  if (!article) {
    notFound();
  }

  const date = new Date(article.date);
  const formattedDate = date.toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-80px">
      <article>
        <AppSection className="bg-light text-black">
          <AppBreadcrumb
            className="text-black"
            items={[
              { label: tTitle('HOME'), href: '/' },
              { label: tTitle('NEWS'), href: '/news' },
              { label: article.title },
            ]}
          />

          <div className="mb-16px d-flex align-items-center gap-2 flex-wrap">
            <span
              className="d-inline-block px-3 py-1"
              style={{
                fontSize: '12px',
                border: '1px solid #ddd',
                borderRadius: '20px',
                color: '#333',
              }}
            >
              {article.location}
            </span>
            <span className="blog-card-date">{formattedDate}</span>
          </div>

          <h1 className="mb-24px">{article.title}</h1>

          <p className="lead mb-32px" style={{ color: '#2e404d' }}>
            {article.description}
          </p>

          <div className="w-100">
            <hr className="mb-32px" />

            <div className="d-flex flex-column flex-md-row" style={{ flexBasis: 0 }}>
              <div className="col-12 col-md-8 flex-grow-1">
                <div
                  className="markdown-content"
                  dangerouslySetInnerHTML={{ __html: article.content || '' }}
                />
              </div>
              <div
                className="col-12 col-md-4 ml-48px"
                style={{
                  position: 'sticky',
                  top: '120px',
                  alignSelf: 'flex-start',
                  maxHeight: 'calc(100vh - 140px)',
                  overflowY: 'auto',
                }}
              >
                Recent News
              </div>
            </div>
          </div>
        </AppSection>
      </article>
    </main>
  );
}
