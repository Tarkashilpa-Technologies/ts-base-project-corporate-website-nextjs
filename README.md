# Project Setup

Use VS Code as IDE.

## VS Code Extensions to be Used

- **SonarQube** – for code quality analysis
- **Prettier** – for consistent code formatting

---

## Prettier Setup

This project uses **Prettier** to maintain consistent code formatting.

- **Config file:** `.prettierrc`
- **Ignore file:** `.prettierignore`

### Enable Format on Save in VS Code

1. Go to `Settings → Text Editor → Formatting`
2. Enable **Format on Save**
3. Set default formatter to Prettier:
   1. Press `Ctrl + Shift + P`
   2. Search **“Format Document With…”**
   3. Click **Configure Default Formatter → Prettier - Code Formatter**

# File and Folder structure

This section describes the organization of the project's source code, components, styles, and assets. Following this structure helps maintain scalability, readability, and consistency across the project.

```plaintext
├── app/                    # Next.js App Router
│   ├── [locale]/           # Dynamic locale folder for internationalization
│   │   ├── layout.tsx      # Layout wrapper for pages that define header, footer and overall structure of Website UI
│   │   ├── page.tsx        # Homepage
│   │   ├── not-found.tsx   # Next.js provided file (uses AppPageNotFound component)
│   │   └── [...not-found]/ # Catch-all folder for unknown routes that trigger not-found
│   │
│   └── other-page-folders/ # Additional page folders
│
├── components/             # Reusable React components
│   ├── Header/
│   │   ├── Header.tsx
│   │   └── Header.module.scss  # Component-scoped SCSS
│   ├── Section/
│   │   ├── Section.tsx
│   │   └── Section.module.scss
│   ├── YourComponent/
│   │   ├── YourComponent.tsx
│   │   └── YourComponent.module.scss
│   └── Footer/
│       ├── Footer.tsx
│       └── Footer.module.scss
│
├── styles/                 # Global SCSS and partials
│   ├── _variables.scss    # Colors, fonts, and other SCSS variables
│   ├── _mixins.scss       # Reusable mixins
│   ├── _functions.scss    # SCSS helper functions
│   ├── _globals.scss      # Base/global styles (body, typography)
│   ├── _reset.scss        # CSS reset or normalize
│   ├── _layout.scss       # Generic layout utilities (grid, spacing)
│   ├── _utils.scss        # Common utility styles shared across the project
│   └── main.scss          # Main SCSS file that imports all partials
│
├── public/
│   └── images/            # Static assets (images, icons, etc.)
│
├── i18n/                  # Internationalization (i18n) setup
│   ├── en.json           # English translations
│   ├── ms.json           # Malay translations
│   ├── routing.ts        # Routing-related helper functions
│   ├── navigation.ts     # Navigation and menu translations
│   └── request.ts        # Fetch/format localized data
│
├── middleware.ts          # Next.js middleware for locale detection, redirects, etc.
└── package.json           # Project dependencies and scripts
```

# Project Architecture

1. **App Router with `[locale]`**
   - Each locale has its own folder under `app/` (e.g., `app/en`, `app/ms`).
   - This enables straightforward localization using **Next.js dynamic routing**.

2. **Additional Page Folders**
   - Feature-specific or nested pages can have their own folders inside `app/[locale]/'`.
   - Each folder can include `layout.tsx` and `page.tsx` for modular page-level layouts.
   - Folders can be nested further to organize complex routes or features.

3. **Not found page**
   - Special Next.js file is defined with `app/[locale]/not-found.tsx` and a catch-all route `app/[locale]/[...not-found]/page.tsx`.
   - Any unknown URL under `/[locale]/` shows this 404 page inside the main layout (with header, footer, and translations).

4. **i18n Setup**
   - The `i18n/` folder contains all JSON translation files for different locales (e.g., `en.json`, `ms.json`).
   - next-intl helper files manage localization logic:
   - **`routing.ts`** – This file configures which languages our app supports and integrates them with the Next.js routing system.
   - **`navigation.ts`** – Wraps Next.js navigation utilities (Link, redirect, useRouter, etc.)
     so they automatically include the active locale from routing.ts.
   - **`request.ts`** – Determines the active locale for the current request.

5. **Components**
   - Any reusable UI piece should be converted to component and placed under this directory to be used across the project.
   - Components are modular and use **CSS modules** (`.module.scss`) for scoped styling.
   - This ensures styles are local to each component and prevents global conflicts.
   - Component we build should be prefixed with 'App' (e.g AppHeader, AppButton).

6. **Styles**
   - Global SCSS is organized into partials for variables, mixins, functions, and layout utilities.
   - `main.scss` imports all partials to provide a consistent global style.
   - Any new reusable SCSS should be added as a partial and imported into `main.scss`.
   - Reusable SCSS includes shared styles, like \_utils.scss, that can be used throughout the app.

7. **Middleware**
   - `middleware.ts` at the root handles locale detection and redirects users to the appropriate language route.

8. **Public Folder**
   - Contains static assets such as images, icons, and fonts, accessible directly in the app.

---

## High Level Project Architecture

- **CSS Framework:** [Bootstrap](https://getbootstrap.com/) – responsive layout, grid system, and utility classes.
- **Icon Library:** [Phosphor Icons](https://phosphoricons.com/) – vector icons for UI elements.
- **Font Family:** **Noto Sans** – primary font for all text elements, providing readability and clean design.
- **Component-based Architecture:** Modular React components with scoped SCSS (`.module.scss`).
- **Internationalization:** Next.js App Router `[locale]` structure with next-intl toolkit for translation and localized routing.
- **Global Styles:** SCSS partials for variables, mixins, functions, layout utilities, imported in `main.scss`.
- **Middleware:** Handles locale detection and language-based routing.

# Good Practices and Conventions

## Naming Conventions

| Category                 | Naming                   | Example                    |
| ------------------------ | ------------------------ | -------------------------- |
| **Page file**            | `page.tsx`               | `app/profile/page.tsx`     |
| **Layout file**          | `layout.tsx`             | `app/dashboard/layout.tsx` |
| **Component file**       | `PascalCase.tsx`         | `UserCard.tsx`             |
| **Component style**      | `PascalCase.module.scss` | `UserCard.module.scss`     |
| **Utility/Hook**         | `camelCase.ts`           | `useFetchData.ts`          |
| **Shared SCSS partials** | `_kebab-case.scss`       | `_variables.scss`          |
| **Interface**            | `PascalCase`             | `interface Article {}`     |

## Naming Notes

- **Avoid abbreviations:** Use clear, meaningful names in CSS, style files, components, functions, and any other place where naming is required.
- **Overriding Predefined Styles:** To maintain consistent styling and prevent unexpected UI bugs, avoid overriding default HTML tag styles (like h1, p, ul, etc.) and Bootstrap’s built-in classes (like .btn, .container, .row, etc.).
- **Component names:** The component name must match its file name exactly.
- **Class naming conventions:**
  - **Module-specific classes** (CSS Modules) → `camelCase`
  - **Common/global styles** → `kebab-case`
- **SCSS variables:** Always use `kebab-case` for naming variables (e.g., `$primary-color`, `$font-size-large`).
- **Utility:** Name the file according to the function it exports. It’s generally a good idea to keep one main function per utility file for clarity. Include more than one function in a utility file if they perform the same operation with slight variations; in such cases, name the file to reflect the function’s overall purpose.

## SEO friendly Website

This section explains how to create SEO-friendly pages in this project. Following these practices helps search engine crawlers better understand and index our content.

### 1. HTML Structure

Use semantic HTML5 elements to give meaning to page structure. This helps search engines understand content hierarchy.

**Key Principles:**

- Use proper heading hierarchy (`<h1>`, `<h2>`, `<h3>`, etc.) - only one `<h1>` per page
- Use semantic elements: `<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`, `<article>`
- Always include the `lang` attribute in `<html>` tag for language specification
- Ensure all images have descriptive `alt` attributes

**Implementation in This Project:**

The main HTML structure is defined in `app/[locale]/layout.tsx`:

```tsx
<html lang={locale}>
  <head>{/* Metadata and structured data */}</head>
  <body>
    <AppHeader /> {/* Site header with navigation */}
    {children} {/* Page-specific content wrapped in <main> */}
    <AppFooter /> {/* Site footer */}
  </body>
</html>
```

All page content should be wrapped in semantic elements. Use the `AppSection` component for consistent section structure.

### 2. Metadata

Metadata provides information about our page to search engines and social media platforms. It includes the page title, description, keywords, and social media tags (Open Graph, Twitter Cards).

**Why It Matters:**

- **Title tag** - Appears in search results and browser tabs
- **Description** - Shows up in search results as page summary
- **Keywords** - Helps categorize our content
- **Open Graph tags** - Controls how our page looks when shared on social media

**Implementation in This Project:**

**Step 1: Define Site Configuration** (`data/metadata.ts`)

```typescript
export const siteConfig = {
  name: 'NTT DATA Malaysia',
  description: { en: '...', ms: '...' },
  url: 'https://www.nttdatapay.com/my',
  ogImage: '/images/og-image.jpg',
};

export const baseKeywords = ['NTT DATA', 'IT consulting', ...];
```

**Step 2: Generate Page Metadata** (use in `page.tsx` files)

```typescript
import { generatePageMetadata } from '@/utils/generatePageMetadata';

export async function generateMetadata({ params }): Promise<Metadata> {
  const { locale } = await params;

  return generatePageMetadata({
    locale,
    title: 'Page Title',
    description: 'Page description',
    keywords: ['additional', 'keywords'], // Optional
    path: 'about', // Page path
    type: 'website', // or 'article' for blog posts
  });
}
```

The system automatically handles:

- Full title generation (adds site name)
- Multi-language support
- Open Graph and Twitter Card tags
- SEO-friendly URLs

### 3. Structured Data

Structured data (JSON-LD format) helps search engines understand our content better. It can enable rich results in search like breadcrumbs, ratings, and enhanced listings.

**Why It Matters:**

- Improves how search engines interpret our content
- Can display rich snippets in search results
- Helps with local SEO and business information
- Supports breadcrumb navigation in search results

**Implementation in This Project:**

**Available Schema Types** (defined in `data/structured-data.ts`):

- **Organization** - Business information (name, address, contact)
- **WebSite** - Website-level information
- **WebPage** - Individual page information
- **BreadcrumbList** - Navigation breadcrumbs

**Step 1: Global Schemas** (automatically included in `layout.tsx`)

```tsx
// These are added to every page automatically
const organizationSchema = generateOrganizationSchema(locale);
const websiteSchema = generateWebSiteSchema(locale);

<head>
  <StructuredData data={[organizationSchema, websiteSchema]} />
</head>;
```

**Step 2: Page-Level Schemas** (add to specific pages)

```tsx
import StructuredData from '@/utils/structuredData';
import { generateWebPageSchema, generateBreadcrumbSchema } from '@/data/structured-data';

export default async function Page({ params }) {
  const { locale } = await params;

  // Generate schemas
  const webPageSchema = generateWebPageSchema(
    'Page Title',
    'Page description',
    'https://example.com/page',
    locale
  );

  const breadcrumbSchema = generateBreadcrumbSchema(
    [{ name: 'Category', url: 'https://example.com/category' }, { name: 'Current Page' }],
    locale
  );

  return (
    <>
      <StructuredData data={[webPageSchema, breadcrumbSchema]} />
      {/* Page content */}
    </>
  );
}
```

**Testing Structured Data:**

- Use [Google Rich Results Test](https://validator.schema.org/) to validate schemas
- Check for errors and ensure all required fields are present

### 4. Not found (404) page behavior

This project uses a custom 404 page that is always shown inside the normal layout (with header and footer) when a page is not found.

**Files involved**

- `app/[locale]/not-found.tsx`
  - Special Next.js file that defines the 404 UI.
  - Renders the `AppPageNotFound` component.
- `components/AppPageNotFound/AppPageNotFound.tsx`
  - Shows a user-friendly error message and a "Back to Home" button.
- `app/[locale]/[...not-found]/page.tsx`
  - Catch-all route for any URL under `/[locale]/` that does **not** match a real page.
  - Calls `notFound()` from `next/navigation`, which tells Next.js to render the custom 404 page.

**How routing works**

1. User visits a URL under `/[locale]`, such as `/en/about` or `/ms/news/some-article`.
2. If the URL matches a real page (like `about`, `blog`, `news`), that page is rendered normally.
3. If the URL does **not** match a page (for example `/en/about/extra` or `/ms/random-page`):
   - Next.js uses `app/[locale]/[...not-found]/page.tsx`.
   - That file calls `notFound()`, which renders `app/[locale]/not-found.tsx`.
   - The layout `app/[locale]/layout.tsx` still wraps everything, so the header and footer are visible around the 404 content.

**Default locale example: `/dummyurl` → `/en/dummyurl`**

- The app uses a default locale of `en`.
- When a user opens a URL without a locale (like `/dummyurl`), the middleware redirects or rewrites it to `/en/dummyurl`.
- If `/en/dummyurl` does not exist, it goes through the same catch-all 404 flow above.

**SEO behavior**

- For URLs that do not exist, the catch-all route calls `notFound()`, so Next.js returns a real **404 status code**.
- This is correct and safe for SEO: search engines understand that the page does not exist.
- Real pages (like `/en/about`, `/en/blog/[slug]`, etc.) still return **200** and can be indexed normally.

## Code Quality

- **SonarLint** is configured in this project to ensure high code quality.
- All code should be written so that **SonarLint reports 0 warnings**.

## Git Workflow

- **`dev` branch:** Stable branch for ongoing development. All new features and bug fixes branch off from here.
- **`uat` branch:** Used for the User Acceptance Testing (UAT) environment.
- **`master` branch:** Production branch for the live environment.

**Branching Guidelines:**

1. Create all **feature** or **bug-fix** branches from `dev`.
2. Complete development in your branch following code quality and naming conventions.
3. Submit a Pull Request (PR) to merge your branch back into `dev`.

# Components

## AppSection Component

`AppSection` is a reusable layout component that wraps content in a styled `<section>` element, ensuring consistent spacing and typography across the app.

### Props

- `title` (optional): A heading displayed at the top of the section.
- `subtitle` (optional): A subheading or descriptive text below the title.
- `children`: The main content of the section (any React nodes).
- `className` (optional): Additional custom CSS classes to extend styling.

### Usage

- All page sections should be wrapped in the `AppSection` component to maintain consistent layout and styling.

## AppLink Component

`AppLink` is a flexible link component that supports multiple variants, optional icons, and custom styling. It wraps Next.js `<Link>`.

### Props

- `text` (required): The display text for the link or button.
- `link` (optional): The URL to navigate to. Defaults to `''` if not provided.
- `variant` (optional): Defines the style of the link. Options:
  - `buttonLink` (default)
  - `primaryLink`
  - `secondaryLink`
  - `tertiaryLink`
- `iconBefore` (optional): Name of the icon to display before the text.
- `iconAfter` (optional): Name of the icon to display after the text.
- `className` (optional): Additional custom CSS classes.

### Usage

- Use `AppLink` wherever a navigation or redirection link is needed in the UI.
- Pass `iconBefore` or `iconAfter` to include icons alongside text.

## AppBreadcrumb Component

`AppBreadcrumb` displays a navigation breadcrumb trail that helps users understand their current location within the website hierarchy.

### Props

- `items` (required): An array of breadcrumb items. Each item should have:
  - `label` (required): The text to display for the breadcrumb.
  - `href` (optional): The URL to link to. If not provided or if it's the last item, it will be displayed as plain text.
- `className` (optional): Additional custom CSS classes. If the class includes `text-black`, the breadcrumb will use a black color variant instead of the default white.

### Usage

- Use `AppBreadcrumb` at the top of pages to show navigation hierarchy.
- The last item in the breadcrumb is automatically styled as the current page (non-clickable).
- Example:
  ```tsx
  <AppBreadcrumb
    items={[
      { label: 'Home', href: '/' },
      { label: 'Blog', href: '/blog' },
      { label: 'Current Article' },
    ]}
  />
  ```

## AppCard Component

`AppCard` is a reusable card component that displays content with a background image, title, and a link. Commonly used for blog posts, news articles, or featured content.

### Props

- `title` (required): The main heading text displayed on the card.
- `backgroundImage` (required): The filename of the image to display as the card background (located in `/public/images/`).
- `linkText` (required): The text for the link/button at the bottom of the card.
- `link` (optional): The URL the card should link to.
- `type` (optional): A label or category displayed above the title (e.g., "Blog", "News").
- `iconAfter` (optional): Name of the icon to display after the link text. Defaults to `ArrowRight`.

### Usage

- Use `AppCard` to display content previews in grid layouts.
- The card includes an overlay effect on hover for better visual interaction.
- Example:
  ```tsx
  <AppCard
    type="Blog"
    title="Digital Transformation 2024"
    backgroundImage="card-img-1.jpg"
    linkText="Read More"
    link="/blog/digital-transformation"
  />
  ```

## AppFooter Component

`AppFooter` is the main footer component that appears at the bottom of all pages. It contains company information, quick links, and contact details.

### Props

- No props required (static component).

### Usage

- Automatically included in the main layout (`app/[locale]/layout.tsx`).

## AppHeader Component

`AppHeader` is the main navigation header that appears at the top of all pages. It includes the logo, navigation menu, and language switcher.

### Props

- No props required (static component with dynamic translations).

### Usage

- Automatically included in the main layout (`app/[locale]/layout.tsx`).

## AppIcon Component

`AppIcon` is a wrapper component for rendering Phosphor icons consistently throughout the application.

### Props

- `name` (required): The name of the Phosphor icon to display (e.g., `ArrowRight`, `House`, `User`).
- `size` (optional): The size of the icon in pixels. Defaults to `24`.
- `color` (optional): The color of the icon. Defaults to `currentColor` (inherits from parent).
- `weight` (optional): The icon style weight. Options: `thin`, `light`, `regular`, `bold`, `fill`, `duotone`. Defaults to `regular`.
- `className` (optional): Additional custom CSS classes.

### Usage

- Use `AppIcon` whenever you need to display an icon from the Phosphor Icons library.
- The component ensures type safety by only accepting valid Phosphor icon names.
- Example:
  ```tsx
  <AppIcon name="ArrowRight" size={32} color="#007bff" weight="bold" />
  ```

## AppLanguageSwitcher Component

`AppLanguageSwitcher` provides language switching functionality, allowing users to toggle between English and Malay versions of the website.

### Props

- No props required (uses hooks internally).

### Usage

- Automatically included in `AppHeader` component.
- Displays two language options: Malay (ms) and English (en).
- Preserves the current page path when switching languages.
- Language labels are fetched from translation files.
- When clicked, reloads the current page with the selected language.

## AppPageNotFound Component

`AppPageNotFound` is a specialized component that displays a user-friendly 404 error page when a requested page is not found.

### Props

- No props required (uses translations internally).

### Usage

- Used in `app/[locale]/not-found.tsx` to handle 404 errors.
- Displays:
  - Error title (from translation: `NOT_FOUND.TITLE`)
  - Error description (from translation: `NOT_FOUND.DESCRIPTION`)
  - A link to return to the homepage
- Wrapped in `AppSection` for consistent styling.
- Example is already implemented in the project's not-found page.

## AppKeywordHighlighter Component

`AppKeywordHighlighter` is a utility component that highlights specific keywords within text by wrapping them in styled spans.

### Props

- `text` (required): The text content to search through and highlight keywords in.
- `keywords` (required): A single keyword string or an array of keywords to highlight.
- `className` (optional): Additional CSS classes to apply to highlighted spans.
- `caseSensitive` (optional): Whether keyword matching should be case-sensitive. Defaults to `false`.

### Usage

- Use `AppKeywordHighlighter` when you need to emphasize specific words or phrases in text content.
- The component automatically prioritizes longer keyword matches over shorter ones to prevent substring conflicts.
- Returns the original text unchanged if no keywords are provided or text is empty.
- Example:
  ```tsx
  <AppKeywordHighlighter
    text="Welcome to NTT DATA Malaysia, your trusted IT consulting partner"
    keywords={['NTT DATA', 'IT consulting']}
  />
  ```
