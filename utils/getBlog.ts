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
 * Get a single blog article by slug with full content
 * Returns null if article not found
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
 * Get all unique topics from blog articles
 * Returns array of unique topics sorted alphabetically
 */
export async function getAllTopics(locale: string = 'en'): Promise<string[]> {
  try {
    const blogs = await getAllBlogs(locale);
    const topics = blogs.map((blog) => blog.topic);
    const uniqueTopics = Array.from(new Set(topics));
    return uniqueTopics.sort((a, b) => a.localeCompare(b));
  } catch (error) {
    console.error('Error fetching topics:', error);
    return [];
  }
}

/**
 * Get blog articles filtered by topic
 * Returns array of articles sorted by date (newest first)
 */
export async function getBlogsByTopic(
  topic: string,
  locale: string = 'en'
): Promise<BlogArticle[]> {
  try {
    const res = await fetch(
      `${process.env.STRAPI_URL}/api/articles?filters[topic][$eq]=${encodeURIComponent(topic)}&locale=${locale}`,
      { cache: 'no-store' }
    );

    if (!res.ok) {
      console.error(`Failed to fetch articles for topic: ${topic}`);
      return [];
    }

    const data = await res.json();
    const articles = data?.data || [];

    // Map Strapi response to BlogArticle interface
    const blogs: BlogArticle[] = articles.map((article: any) => ({
      slug: article.slug,
      date: article.publishedAt,
      topic: article.topic,
      title: article.title,
      description: article.description,
    }));

    // Sort by date (newest first)
    return blogs.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  } catch (error) {
    console.error(`Error fetching blogs by topic ${topic}:`, error);
    return [];
  }
}
