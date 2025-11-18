# Project Structure Guide for Cline

This guide provides quick references and best practices for creating new components, pages, and styles in the NTT DATA PAY Malaysia website project.

---

## 🗂️ Quick Directory Reference

```plaintext
├── app/[locale]/              # Next.js App Router with i18n
│   ├── page.tsx              # Homepage
│   ├── layout.tsx            # Main layout (header, footer)
│   ├── not-found.tsx         # 404 page
│   └── [feature]/            # Feature-specific pages
│       ├── page.tsx          # Feature page
│       └── layout.tsx        # Optional feature layout
│
├── components/                # All reusable React components
│   └── AppComponentName/
│       ├── AppComponentName.tsx
│       └── AppComponentName.module.scss
│
├── styles/                    # Global SCSS
│   ├── _variables.scss       # Colors, fonts, spacing
│   ├── _mixins.scss          # Reusable mixins
│   ├── _functions.scss       # SCSS helper functions
│   ├── _globals.scss         # Base styles
│   ├── _utils.scss           # Common utilities
│   └── main.scss             # Main import file
│
├── i18n/                      # Translations
│   ├── en.json               # English
│   ├── ms.json               # Malay
│   ├── routing.ts            # Locale config
│   ├── navigation.ts         # Navigation helpers
│   └── request.ts            # Request locale
│
├── data/                      # Static content
│   ├── metadata.ts           # Site metadata config
│   ├── structured-data.ts    # SEO schemas
│   └── blog/ | news/         # Markdown content
│
├── utils/                     # Utility functions
│   ├── generatePageMetadata.ts
│   └── structuredData.tsx
│
└── public/images/             # Static assets
```

---

## 🧩 Creating New Components

### Location

Place all components in `components/` directory.

### Naming Requirements

- **Component name:** PascalCase with "App" prefix
- **Example:** `AppButton`, `AppCard`, `AppHeader`
- **File structure:**
  ```
  components/
  └── AppComponentName/
      ├── AppComponentName.tsx
      └── AppComponentName.module.scss
  ```

### Component Template

```tsx
// components/AppButton/AppButton.tsx
import React from 'react';
import styles from './AppButton.module.scss';

interface AppButtonProps {
  text: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
}

const AppButton: React.FC<AppButtonProps> = ({
  text,
  onClick,
  variant = 'primary',
  className = '',
}) => {
  return (
    <button className={`${styles.button} ${styles[variant]} ${className}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default AppButton;
```

### Component Styles Template

```scss
// components/AppButton/AppButton.module.scss
@import '@/styles/variables';
@import '@/styles/mixins';

.button {
  padding: $spacing-md $spacing-lg;
  border: none;
  border-radius: $border-radius;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.9;
  }
}

.primary {
  background-color: $primary-color;
  color: $white;
}

.secondary {
  background-color: $secondary-color;
  color: $white;
}
```

### Class Naming in Components

- **CSS Modules (component styles):** Use `camelCase`
  ```scss
  .buttonPrimary {
  }
  .cardHeader {
  }
  .navigationMenu {
  }
  ```

### Best Practices

- ✅ Component name must match file name exactly
- ✅ Always prefix with "App" (e.g., `AppButton`, not `Button`)
- ✅ Use TypeScript interfaces for props
- ✅ Use CSS Modules (`.module.scss`) for scoped styling
- ✅ Import only needed SCSS partials (`@import '@/styles/variables'`)
- ✅ Use semantic HTML elements (`<button>`, `<section>`, `<nav>`)
- ✅ Add descriptive comments for complex logic
- ✅ Ensure 0 SonarLint warnings
- ✅ Avoid in-line styling as much as possible
- ✅ Always try to use predefined classes
- ✅ Use Bootstrap breakpoints for responsiveness

---

## 📄 Creating New Pages

### Location

Place pages in `app/[locale]/` directory.

### File Structure

```
app/[locale]/
└── feature-name/
    ├── page.tsx          # Required: The page content
    └── layout.tsx        # Optional: Feature-specific layout
```

### Page Template with SEO

```tsx
// app/[locale]/about/page.tsx
import { Metadata } from 'next';
import { generatePageMetadata } from '@/utils/generatePageMetadata';
import { generateWebPageSchema, generateBreadcrumbSchema } from '@/data/structured-data';
import StructuredData from '@/utils/structuredData';
import AppSection from '@/components/AppSection/AppSection';
import AppBreadcrumb from '@/components/AppBreadcrumb/AppBreadcrumb';

// Generate metadata for SEO
export async function generateMetadata({ params }): Promise<Metadata> {
  const { locale } = await params;

  return generatePageMetadata({
    locale,
    title: 'About Us',
    description: 'Learn more about NTT DATA Malaysia',
    keywords: ['about', 'company', 'team'],
    path: 'about',
    type: 'website',
  });
}

export default async function AboutPage({ params }) {
  const { locale } = await params;

  // Generate structured data
  const webPageSchema = generateWebPageSchema(
    'About Us - NTT DATA Malaysia',
    'Learn more about NTT DATA Malaysia',
    `${siteConfig.url}/${locale}/about`,
    locale
  );

  const breadcrumbSchema = generateBreadcrumbSchema(
    [{ name: 'Home', url: `${siteConfig.url}/${locale}` }, { name: 'About Us' }],
    locale
  );

  return (
    <>
      {/* Structured Data for SEO */}
      <StructuredData data={[webPageSchema, breadcrumbSchema]} />

      {/* Main Content */}
      <main>
        <AppSection title="About Us" subtitle="Our Story">
          <AppBreadcrumb items={[{ label: 'Home', href: '/' }, { label: 'About Us' }]} />

          {/* Page content here */}
          <p>Your content goes here...</p>
        </AppSection>
      </main>
    </>
  );
}
```

### Dynamic Routes

For dynamic routes like `/blog/[slug]`:

```
app/[locale]/
└── blog/
    ├── page.tsx           # Blog listing page
    └── [slug]/
        └── page.tsx       # Individual blog post
```

```tsx
// app/[locale]/blog/[slug]/page.tsx
export default async function BlogPostPage({ params }) {
  const { locale, slug } = await params;

  // Fetch blog data based on slug
  // Render blog content
}
```

### Page Best Practices

- ✅ Always export `generateMetadata` for SEO
- ✅ Include structured data (JSON-LD) for rich snippets
- ✅ Wrap content in `<main>` tag
- ✅ Use `AppSection` for consistent spacing
- ✅ Add breadcrumbs for navigation hierarchy
- ✅ Use semantic HTML (`<article>`, `<section>`, `<header>`)
- ✅ Only one `<h1>` per page
- ✅ All images must have `alt` attributes

---

## 🎨 Creating and Managing Styles

### Global Styles (styles/)

#### When to Create a New Partial

Create a new SCSS partial when you have:

- New global variables (colors, fonts, spacing)
- Reusable mixins or functions
- New utility classes needed across multiple components
- Layout patterns used in multiple places

#### Creating a New Partial

1. **Create the file:**

   ```scss
   // styles/_animations.scss
   @keyframes fadeIn {
     from {
       opacity: 0;
     }
     to {
       opacity: 1;
     }
   }

   .fade-in {
     animation: fadeIn 0.3s ease-in;
   }
   ```

2. **Import in main.scss:**
   ```scss
   // styles/main.scss
   @import 'variables';
   @import 'functions';
   @import 'mixins';
   @import 'animations'; // ← Add new partial
   @import 'globals';
   @import 'layout';
   @import 'utils';
   ```

#### File Naming

- Use underscore prefix: `_filename.scss`
- Use kebab-case: `_my-new-styles.scss`

### Component Styles (Component Modules)

#### When to Use Component Styles

- Styles specific to one component
- Component-specific states and variants
- Scoped styles that don't need to be global

#### Importing Global Styles in Components

```scss
// components/AppCard/AppCard.module.scss
@import '@/styles/variables'; // Access global variables
@import '@/styles/mixins'; // Access mixins

.card {
  padding: $spacing-lg;
  background-color: $white;

  @include respond-to(mobile) {
    padding: $spacing-md;
  }
}
```

### Style Naming Conventions

| Context                     | Convention | Example                           |
| --------------------------- | ---------- | --------------------------------- |
| **CSS Modules (component)** | camelCase  | `.buttonPrimary`, `.cardHeader`   |
| **Global classes**          | kebab-case | `.text-center`, `.mt-4`           |
| **SCSS variables**          | kebab-case | `$primary-color`, `$font-size-lg` |
| **SCSS mixins**             | kebab-case | `@mixin respond-to()`             |
| **SCSS functions**          | kebab-case | `@function rem-calc()`            |

### Utilities vs Component Styles

**Use `_utils.scss` for:**

- Classes used across multiple components
- Layout helpers (.container, .flex-center)
- Text utilities (.text-bold, .text-uppercase)
- Spacing utilities (.mt-4, .p-3)

**Use Component Modules for:**

- Component-specific styling
- Component states and variants
- One-off styles not reused elsewhere

---

## 📛 Naming Conventions Reference

| Category                 | Convention               | Example                    |
| ------------------------ | ------------------------ | -------------------------- |
| **Page file**            | `page.tsx`               | `app/profile/page.tsx`     |
| **Layout file**          | `layout.tsx`             | `app/dashboard/layout.tsx` |
| **Component file**       | `PascalCase.tsx`         | `AppUserCard.tsx`          |
| **Component style**      | `PascalCase.module.scss` | `AppUserCard.module.scss`  |
| **Utility/Hook**         | `camelCase.ts`           | `useFetchData.ts`          |
| **Shared SCSS partials** | `_kebab-case.scss`       | `_variables.scss`          |
| **Interface**            | `PascalCase`             | `interface Article {}`     |
| **Module classes**       | `camelCase`              | `.buttonPrimary`           |
| **Global classes**       | `kebab-case`             | `.text-center`             |
| **SCSS variables**       | `kebab-case`             | `$primary-color`           |

---

## 🔑 Key Principles

### Component Prefix

- **All components MUST start with "App"**
- ✅ `AppButton`, `AppCard`, `AppHeader`
- ❌ `Button`, `Card`, `Header`

### Semantic HTML for SEO

- Use `<main>`, `<article>`, `<section>`, `<nav>`, `<header>`, `<footer>`
- Only one `<h1>` per page
- Proper heading hierarchy (`<h1>` → `<h2>` → `<h3>`)
- All images must have descriptive `alt` attributes
- Include `lang` attribute in layout

### Internationalization (i18n)

- All text must come from translation files (`i18n/en.json`, `i18n/ms.json`)
- Use `useTranslations` hook from `next-intl`
- Use `getTranslations` hook from `next-intl/server for serverside component`
- Support both English (en) and Malay (ms)
- Preserve locale in navigation

### Code Quality

- **Zero SonarLint warnings** - fix all issues before committing
- Use meaningful, non-abbreviated names
- Add comments for complex logic
- Follow TypeScript best practices

### SEO Requirements

Every page must have:

1. ✅ `generateMetadata` function with title, description, keywords
2. ✅ Structured data (JSON-LD) using schemas from `data/structured-data.ts`
3. ✅ Breadcrumb navigation (except homepage)
4. ✅ Semantic HTML structure
5. ✅ Descriptive image alt text

---

## 🚀 Quick Start Checklist

### Creating a New Component

- [ ] Create folder in `components/` with "App" prefix
- [ ] Create `AppComponentName.tsx` file
- [ ] Create `AppComponentName.module.scss` file
- [ ] Define TypeScript interface for props
- [ ] Use camelCase for CSS module classes
- [ ] Import needed SCSS variables/mixins
- [ ] Ensure 0 SonarLint warnings
- [ ] Update readme.md in compoenents section whenever new compoenent is added

### Creating a New Page

- [ ] Create folder in `app/[locale]/`
- [ ] Create `page.tsx` file
- [ ] Export `generateMetadata` function
- [ ] Add structured data (JSON-LD)
- [ ] Wrap content in `<main>` tag
- [ ] Use `AppSection` for layout
- [ ] Add breadcrumbs (if not homepage)
- [ ] Use semantic HTML
- [ ] Support both locales (en, ms)

### Adding Global Styles

- [ ] Create `_filename.scss` in `styles/`
- [ ] Use kebab-case for file name
- [ ] Import in `styles/main.scss`
- [ ] Use kebab-case for variables/mixins
- [ ] Document complex styles with comments

---

## 📚 Available Components

Refer to README.md "Components" section for detailed documentation on:

- `AppSection` - Layout wrapper with title/subtitle
- `AppLink` - Flexible links with variants and icons
- `AppBreadcrumb` - Navigation breadcrumbs
- `AppCard` - Content cards with images
- `AppFooter` - Site footer
- `AppHeader` - Site header with navigation
- `AppIcon` - Phosphor icon wrapper
- `AppLanguageSwitcher` - Language toggle
- `AppPageNotFound` - 404 page component
- `AppKeywordHighlighter` - Text highlighting utility

---

## 🛠️ Tech Stack

- **Framework:** Next.js 16 with App Router
- **CSS:** SCSS with CSS Modules
- **UI Framework:** Bootstrap 5
- **Icons:** Phosphor Icons
- **Font:** Noto Sans
- **i18n:** next-intl
- **Code Quality:** SonarLint, Prettier

---

## 📝 Git Workflow

- **`dev`** - Development branch (branch from here)
- **`uat`** - UAT environment
- **`master`** - Production

**Workflow:**

1. Create feature branch from `dev`
2. Develop following these guidelines
3. Ensure 0 SonarLint warnings
4. Submit PR to `dev`

---

**Last Updated:** November 2025
