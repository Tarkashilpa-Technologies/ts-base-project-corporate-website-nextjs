import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

// Base article interface
export interface Article {
  slug: string;
  date: string;
  title: string;
  description: string;
  content?: string;
}

// Blog article extends Article with topic
export interface BlogArticle extends Article {
  topic: string;
}

// News article extends Article with location
export interface NewsArticle extends Article {
  location: string;
}

// Article type
export type ArticleType = 'blog' | 'news';

// Get the article directory path based on type and locale
function getArticleDirectory(type: ArticleType, locale: string): string {
  return path.join(process.cwd(), 'data', type, locale);
}

// Convert markdown to HTML
async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}

/**
 * Get all articles for a specific type and locale
 * Returns array of articles sorted by date (newest first)
 */
export async function getAllArticles<T extends Article>(
  type: ArticleType,
  locale: string = 'en'
): Promise<T[]> {
  const articleDirectory = getArticleDirectory(type, locale);

  // Check if directory exists
  if (!fs.existsSync(articleDirectory)) {
    return [];
  }

  // Get all MD files
  const fileNames = fs.readdirSync(articleDirectory).filter((file) => file.endsWith('.md'));

  const allArticles = fileNames.map((fileName) => {
    // Read file contents
    const fullPath = path.join(articleDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Parse frontmatter
    const { data } = matter(fileContents);

    // Return article metadata
    return {
      slug: data.slug,
      date: data.date,
      title: data.title,
      description: data.description,
      ...(type === 'blog' && { topic: data.topic }),
      ...(type === 'news' && { location: data.location }),
    } as T;
  });

  // Sort by date (newest first)
  return allArticles.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

/**
 * Get a single article by slug for a specific type and locale
 * Returns the article with parsed HTML content
 */
export async function getArticleBySlug<T extends Article>(
  type: ArticleType,
  slug: string,
  locale: string = 'en'
): Promise<T | null> {
  const articleDirectory = getArticleDirectory(type, locale);
  const filePath = path.join(articleDirectory, `${slug}.md`);

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    return null;
  }

  // Read file contents
  const fileContents = fs.readFileSync(filePath, 'utf8');

  // Parse frontmatter and content
  const { data, content } = matter(fileContents);

  // Convert markdown to HTML
  const htmlContent = await markdownToHtml(content);

  // Return article with content
  return {
    slug: data.slug,
    date: data.date,
    title: data.title,
    description: data.description,
    content: htmlContent,
    ...(type === 'blog' && { topic: data.topic }),
    ...(type === 'news' && { location: data.location }),
  } as T;
}

/**
 * Get all unique topics from blog articles for a specific locale
 */
export async function getAllTopics(locale: string = 'en'): Promise<string[]> {
  const allBlogs = await getAllArticles<BlogArticle>('blog', locale);
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
  const allBlogs = await getAllArticles<BlogArticle>('blog', locale);
  return allBlogs.filter((article) => article.topic === topic);
}

// Backward compatibility functions for blog
export async function getAllBlogs(locale: string = 'en'): Promise<BlogArticle[]> {
  return getAllArticles<BlogArticle>('blog', locale);
}

export async function getBlogBySlug(
  slug: string,
  locale: string = 'en'
): Promise<BlogArticle | null> {
  return getArticleBySlug<BlogArticle>('blog', slug, locale);
}

// News-specific functions
export async function getAllNews(locale: string = 'en'): Promise<NewsArticle[]> {
  return getAllArticles<NewsArticle>('news', locale);
}

export async function getNewsBySlug(
  slug: string,
  locale: string = 'en'
): Promise<NewsArticle | null> {
  return getArticleBySlug<NewsArticle>('news', slug, locale);
}
