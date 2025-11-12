import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

// Define the blog article type
export interface BlogArticle {
  slug: string;
  date: string;
  topic: string;
  title: string;
  description: string;
  content?: string;
}

// Get the blog directory path based on locale
function getBlogDirectory(locale: string): string {
  return path.join(process.cwd(), 'data', 'blog', locale);
}

// Convert markdown to HTML
async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}

/**
 * Get all blog articles for a specific locale
 * Returns array of articles sorted by date (newest first)
 */
export async function getAllBlogs(locale: string = 'en'): Promise<BlogArticle[]> {
  const blogDirectory = getBlogDirectory(locale);

  // Check if directory exists
  if (!fs.existsSync(blogDirectory)) {
    return [];
  }

  // Get all MDX files
  const fileNames = fs.readdirSync(blogDirectory).filter((file) => file.endsWith('.mdx'));

  const allBlogs = fileNames.map((fileName) => {
    // Read file contents
    const fullPath = path.join(blogDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Parse frontmatter
    const { data } = matter(fileContents);

    // Return article metadata
    return {
      slug: data.slug,
      date: data.date,
      topic: data.topic,
      title: data.title,
      description: data.description,
    } as BlogArticle;
  });

  // Sort by date (newest first)
  return allBlogs.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

/**
 * Get a single blog article by slug for a specific locale
 * Returns the article with parsed HTML content
 */
export async function getBlogBySlug(
  slug: string,
  locale: string = 'en'
): Promise<BlogArticle | null> {
  const blogDirectory = getBlogDirectory(locale);
  const filePath = path.join(blogDirectory, `${slug}.mdx`);

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
    topic: data.topic,
    title: data.title,
    description: data.description,
    content: htmlContent,
  } as BlogArticle;
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
