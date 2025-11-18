// Define the blog article type
export interface BlogArticle {
  slug: string;
  date: string;
  topic: string;
  title: string;
  description: string;
  content?: string;
}

/**
 * Get all blog articles for a specific locale
 * Returns array of articles sorted by date (newest first)
 */
export async function getAllBlogs(locale: string = 'en'): Promise<BlogArticle[]> {
  try {
    const res = await fetch(`${process.env.STRAPI_URL}/api/articles?locale=${locale}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error('Failed to fetch articles from Strapi');
      return [];
    }

    const data = await res.json();
    const articles = data?.data || [];

    // Map Strapi response to BlogArticle interface
    const allBlogs: BlogArticle[] = articles.map((article: any) => ({
      slug: article.slug,
      date: article.publishedAt,
      topic: article.topic,
      title: article.title,
      description: article.description,
    }));

    // Sort by date (newest first)
    return allBlogs.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  } catch (error) {
    console.error('Error fetching blogs from Strapi:', error);
    return [];
  }
}

/**
 * Get a single blog article by slug for a specific locale
 * Returns the article with parsed HTML content
 */
export async function getBlogBySlug(
  slug: string,
  locale: string = 'en'
): Promise<BlogArticle | null> {
  try {
    const res = await fetch(
      `${process.env.STRAPI_URL}/api/articles?filters[slug][$eq]=${slug}&locale=${locale}&populate=*`,
      { cache: 'no-store' }
    );

    if (!res.ok) {
      console.error(`Failed to fetch article with slug: ${slug}`);
      return null;
    }

    const data = await res.json();
    const article = data?.data?.[0];

    if (!article) {
      return null;
    }

    // Extract content from blocks (rich-text component)
    const richTextBlock = article.blocks?.find(
      (block: any) => block.__component === 'shared.rich-text'
    );
    const content = richTextBlock?.body || '';

    // Return complete article with content
    return {
      slug: article.slug,
      date: article.publishedAt,
      topic: article.topic,
      title: article.title,
      description: article.description,
      content: content,
    };
  } catch (error) {
    console.error(`Error fetching blog by slug ${slug}:`, error);
    return null;
  }
}

/**
 * Get all unique topics from blog articles for a specific locale
 */
export async function getAllTopics(locale: string = 'en'): Promise<string[]> {
  const allBlogs = await getAllBlogs(locale);
  const topics = allBlogs.map((article) => article.topic);
  return Array.from(new Set(topics));
}

/**
 * Get blog articles filtered by topic for a specific locale
 */
export async function getBlogsByTopic(
  topic: string,
  locale: string = 'en'
): Promise<BlogArticle[]> {
  const allBlogs = await getAllBlogs(locale);
  return allBlogs.filter((article) => article.topic === topic);
}
