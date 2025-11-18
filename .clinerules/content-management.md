## Brief overview

This document provides guidelines for managing blog and news content in the NTT DATA PAY Malaysia website. The project supports both file-based markdown content and Strapi CMS integration, with dual utilities to facilitate migration from file-based to headless CMS.

---

## Content structure

### Blog articles

**Location:** `data/blog/[locale]/`

**Frontmatter schema:**

```yaml
---
date: 'YYYY-MM-DD' # Publication date (ISO format)
slug: 'article-slug' # URL-friendly identifier (kebab-case)
topic: 'Article Topic' # Category/topic for filtering
title: 'Article Title' # SEO-friendly title
description: 'Brief summary' # Meta description (150-160 chars)
---
```

**File naming:** Must match slug exactly - `{slug}.md`

**Example:** `data/blog/en/digital-transformation-2024.md`

### News articles

**Location:** `data/news/[locale]/`

**Frontmatter schema:**

```yaml
---
date: 'YYYY-MM-DD' # Publication date (ISO format)
slug: 'news-slug' # URL-friendly identifier (kebab-case)
location: 'City, Country' # Geographic location of news
title: 'News Title' # SEO-friendly title
description: 'Brief summary' # Meta description (150-160 chars)
---
```

**File naming:** Must match slug exactly - `{slug}.md`

**Example:** `data/news/en/ntt-data-ai-expansion.md`

---

## Locale support

### Directory structure

Content must be duplicated for each supported locale:

- `data/blog/en/` - English blog articles
- `data/blog/ms/` - Malay blog articles
- `data/news/en/` - English news articles
- `data/news/ms/` - Malay news articles

### Translation requirements

- Each article must exist in both `en` and `ms` directories
- Slug must be identical across locales for the same article
- Translate title, description, and content body
- Keep date, slug, topic/location unchanged

---

## Content utilities

### File-based approach (current)

**Utility:** `utils/fetchArticles.ts`

Uses `gray-matter` for frontmatter parsing and `remark` for markdown-to-HTML conversion.

**Key functions:**

- `getAllArticles<T>(type, locale)` - Fetch all articles for a type and locale
- `getArticleBySlug<T>(type, slug, locale)` - Fetch single article with HTML content
- `getAllBlogs(locale)` - Get all blog articles
- `getBlogBySlug(slug, locale)` - Get single blog with content
- `getAllNews(locale)` - Get all news articles
- `getNewsBySlug(slug, locale)` - Get single news with content
- `getAllTopics(locale)` - Get unique blog topics
- `getBlogsByTopic(topic, locale)` - Filter blogs by topic

### Strapi CMS approach (future/migration)

**Utility:** `utils/getBlog.ts`

Uses Strapi REST API with environment variable `STRAPI_URL`.

**Key functions:**

- `getAllBlogs(locale)` - Fetch articles from Strapi API
- `getBlogBySlug(slug, locale)` - Fetch single article with rich-text content
- `getAllTopics(locale)` - Extract unique topics
- `getBlogsByTopic(topic, locale)` - Filter by topic

**Strapi configuration:**

- Content type: `articles`
- Component for content: `shared.rich-text` with `body` field
- Supports `locale` query parameter
- Supports filtering with `filters[slug][$eq]`

---

## TypeScript interfaces

### Blog article interface

```typescript
export interface BlogArticle {
  slug: string;
  date: string;
  topic: string;
  title: string;
  description: string;
  content?: string; // Optional: HTML content (only in detail views)
}
```

### News article interface

```typescript
export interface NewsArticle {
  slug: string;
  date: string;
  location: string;
  title: string;
  description: string;
  content?: string; // Optional: HTML content (only in detail views)
}
```

### Base article interface

```typescript
export interface Article {
  slug: string;
  date: string;
  title: string;
  description: string;
  content?: string;
}
```

---

## Creating new content

### Adding a blog article

1. Create markdown file in both locale directories:
   - `data/blog/en/{slug}.md`
   - `data/blog/ms/{slug}.md`

2. Include required frontmatter (date, slug, topic, title, description)

3. Write content using standard markdown syntax:
   - Use `#` for H1 (page title)
   - Use `##` for H2 (main sections)
   - Use `###` for H3 (subsections)
   - Support standard markdown: bold, italic, links, lists, code blocks

4. Ensure slug is kebab-case and unique

5. File name must exactly match slug value

### Adding a news article

1. Create markdown file in both locale directories:
   - `data/news/en/{slug}.md`
   - `data/news/ms/{slug}.md`

2. Include required frontmatter (date, slug, location, title, description)

3. Write content using standard markdown syntax

4. Ensure location follows format: "City, Country"

5. File name must exactly match slug value

---

## Migration strategy (file-based to Strapi)

### Current dual-utility approach

The project maintains both file-based (`fetchArticles.ts`) and Strapi (`getBlog.ts`) utilities to support gradual migration.

### Strapi environment setup

- Set `STRAPI_URL` in `.env` file
- Point to local or remote Strapi instance
- Content type must be named `articles`
- Required fields: slug, publishedAt, topic (or location), title, description
- Rich text content stored in `blocks` with component `shared.rich-text`

### Migration checklist

When migrating content to Strapi:

- [ ] Create `articles` content type in Strapi
- [ ] Add fields: slug (unique), topic/location, title, description
- [ ] Configure i18n plugin for en/ms locales
- [ ] Create `shared.rich-text` component with `body` field
- [ ] Import markdown content to Strapi database
- [ ] Test API endpoints return expected data structure
- [ ] Update pages to use Strapi utility (`getBlog.ts`)
- [ ] Maintain file-based content as backup/fallback

### Backwards compatibility

When switching utilities:

- Keep same TypeScript interfaces
- Maintain same function signatures
- Ensure same data structure returned
- Preserve slug-based routing
- Keep locale support consistent

---

## Best practices

### Content quality

- Write SEO-friendly titles (50-60 characters)
- Craft compelling descriptions (150-160 characters)
- Use descriptive slugs (avoid generic terms like "post-1")
- Include proper heading hierarchy (H1 → H2 → H3)
- Break content into scannable sections

### Markdown conventions

- Always start content with H1 (`#`) matching the title
- Use H2 (`##`) for major sections
- Use H3 (`###`) for subsections
- Add blank lines between sections for readability
- Use code blocks with language specification when showing code

### Date formatting

- Always use ISO format: `YYYY-MM-DD`
- Dates are sorted newest first by utilities
- Front-end can format dates as needed for display

### Slug conventions

- Use kebab-case (lowercase with hyphens)
- Be descriptive but concise
- Avoid special characters, numbers at start
- Must be unique within content type
- Examples: `digital-transformation-2024`, `ntt-data-ai-expansion`

### Topic/Location conventions

**Blog topics:**

- Use title case: "Digital Transformation", "Cloud Security"
- Be consistent across articles
- Topics are used for filtering and categorization

**News locations:**

- Format: "City, Country"
- Examples: "Kuala Lumpur, Malaysia", "Singapore, Singapore"

### File organization

- Keep markdown files organized by locale
- Use consistent file naming
- Remove outdated content by deleting markdown files
- Maintain parallel structure across locales

---

## Error handling

### Missing content

- Utilities return `null` or `[]` for missing content
- Pages should handle null cases gracefully
- Use `not-found.tsx` for missing articles
- Log errors for debugging but don't crash

### Locale fallback

- If content missing in requested locale, can optionally fall back to default (en)
- Consider showing language message to users
- Ensure all content exists in both locales before publishing

---

## SEO considerations

### Metadata generation

- Use `generatePageMetadata` utility for blog/news detail pages
- Include title, description from frontmatter
- Add relevant keywords based on content
- Set proper Open Graph type ('article' for blog/news)

### Structured data

- Add `Article` schema for blog posts
- Add `NewsArticle` schema for news items
- Include breadcrumb schema for navigation
- Use `generateArticleSchema` from `data/structured-data.ts`

### Content optimization

- One H1 per page (article title)
- Include internal links to related articles
- Add alt text to any images in markdown
- Keep paragraphs concise and scannable
- Use descriptive anchor text for links

---

## Testing content

### Verification checklist

When adding new content:

- [ ] Frontmatter includes all required fields
- [ ] Slug is unique and follows kebab-case
- [ ] File name matches slug exactly
- [ ] Content exists in both en and ms locales
- [ ] Markdown renders correctly (headings, lists, links)
- [ ] Date format is correct (YYYY-MM-DD)
- [ ] Description is 150-160 characters
- [ ] Article appears in listing pages
- [ ] Detail page renders without errors
- [ ] SEO metadata is properly generated
- [ ] Structured data validates (Google Rich Results Test)

---

## Future enhancements

### Planned features

- Full Strapi CMS migration with admin interface
- Image upload and management via Strapi
- Content scheduling and draft/publish workflow
- Search functionality across articles
- Related articles suggestions
- Author profiles and attribution
- Comments or social sharing integration

### Strapi advantages over file-based

- Web-based content editor (WYSIWYG)
- No code deployment needed for content updates
- Built-in media library for images
- User roles and permissions
- Content versioning and draft states
- API-first architecture for multi-platform distribution
