import { getBlogBySlug, getAllBlogs } from '@/utils/fetchArticles';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import AppSection from '../../../../components/AppSection/AppSection';
import AppBreadcrumb from '../../../../components/AppBreadcrumb/AppBreadcrumb';
import { generatePageMetadata } from '@/utils/generatePageMetadata';
import { getTranslations } from 'next-intl/server';

// Generate static params for all blog articles
export async function generateStaticParams() {
  const locales = ['en', 'ms'];
  const params = [];

  for (const locale of locales) {
    const articles = await getAllBlogs(locale);
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
  const article = await getBlogBySlug(slug, locale);

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  return generatePageMetadata({
    locale,
    title: article.title,
    description: article.description,
    path: `blog/${slug}`,
    imageAlt: article.title,
    type: 'article',
    publishedTime: article.date,
  });
}

export default async function BlogPost({
  params,
}: Readonly<{
  params: Promise<{ locale: string; slug: string }>;
}>) {
  const { locale, slug } = await params;
  const article = await getBlogBySlug(slug, locale);
  const t = await getTranslations('PAGE_TITLE');

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
              { label: t('HOME'), href: '/' },
              { label: t('BLOG'), href: '/blog' },
              { label: article.title },
            ]}
          />

          <div className="mb-16px">
            <span className="blog-card-topic px-12px py-4px me-2">{article.topic}</span>
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
                Popular Topics
              </div>
            </div>
          </div>
        </AppSection>
      </article>
    </main>
  );
}
