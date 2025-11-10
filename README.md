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

This section describes the organization of the project’s source code, components, styles, and assets. Following this structure helps maintain scalability, readability, and consistency across the project.

├── app/ # Next.js **App Router**
│ ├── [locale]/ # Dynamic locale folder for internationalization
│ │ ├── layout.tsx # Layout wrapper for pages that define header, footer and overall structure of Website UI
│ │ └── page.tsx # Homepage
│ │
│ └── other-page-folders/ # Additional page folders
│
├── components/ # Reusable React components
│ ├── Header/
│ │ ├── Header.tsx
│ │ └── Header.module.scss # Component-scoped SCSS
│ ├── Section/
│ │ ├── Section.tsx
│ │ └── Section.module.scss
│ ├── YourComponent/
│ │ ├── YourComponent.tsx
│ │ └── YourComponent.module.scss
│ └── Footer/
│ ├── Footer.tsx
│ └── Footer.module.scss
│
├── styles/ # Global SCSS and partials
│ ├── \_variables.scss # Colors, fonts, and other SCSS variables
│ ├── \_mixins.scss # Reusable mixins
│ ├── \_functions.scss # SCSS helper functions
│ ├── \_globals.scss # Base/global styles (body, typography)
│ ├── \_reset.scss # CSS reset or normalize
│ ├── \_layout.scss # Generic layout utilities (grid, spacing)
│ ├── \_utils.scss # Common utility styles shared across the project
│ └── main.scss # Main SCSS file that imports all partials
│
├── public/
│ └── images/ # Static assets (images, icons, etc.)
│
├── i18n/ # Internationalization (i18n) setup
│ ├── en.json # English translations
│ ├── ms.json # Malay translations
│ ├── routing.ts # Routing-related helper functions
│ ├── navigation.ts # Navigation and menu translations
│ └── request.ts # Fetch/format localized data
│
├── middleware.ts # Next.js middleware for locale detection, redirects, etc.
└── package.json # Project dependencies and scripts

# Project Architecture

1. **App Router with `[locale]`**
   - Each locale has its own folder under `app/` (e.g., `app/en`, `app/fr`).
   - This enables straightforward localization using **Next.js dynamic routing**.

2. **Additional Page Folders**
   - Feature-specific or nested pages can have their own folders inside `app/[locale]/'`.
   - Each folder can include `layout.tsx` and `page.tsx` for modular page-level layouts.
   - Folders can be nested further to organize complex routes or features.

3. **i18n Setup**
   - The `i18n/` folder contains all JSON translation files for different locales (e.g., `en.json`, `ms.json`).
   - next-intl helper files manage localization logic:
   - **`routing.ts`** – This file configures which languages our app supports and integrates them with the Next.js routing system.
   - **`navigation.ts`** – Wraps Next.js navigation utilities (Link, redirect, useRouter, etc.)
     so they automatically include the active locale from routing.ts.
   - **`request.ts`** – Determines the active locale for the current request.

4. **Components**
   - Any reusable UI piece should be converted to component and placed under this directory to be used across the project.
   - Components are modular and use **CSS modules** (`.module.scss`) for scoped styling.
   - This ensures styles are local to each component and prevents global conflicts.
   - Component we build should be prefixed with 'App' (e.g AppHeader, AppButton).

5. **Styles**
   - Global SCSS is organized into partials for variables, mixins, functions, and layout utilities.
   - `main.scss` imports all partials to provide a consistent global style.
   - Any new reusable SCSS should be added as a partial and imported into `main.scss`.
   - Reusable SCSS includes shared styles, like \_utils.scss, that can be used throughout the app.

6. **Middleware**
   - `middleware.ts` at the root handles locale detection and redirects users to the appropriate language route.

7. **Public Folder**
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

| Category            | Naming                   | Example                    |
| ------------------- | ------------------------ | -------------------------- |
| **Page file**       | `page.tsx`               | `app/profile/page.tsx`     |
| **Layout file**     | `layout.tsx`             | `app/dashboard/layout.tsx` |
| **Component file**  | `PascalCase.tsx`         | `UserCard.tsx`             |
| **Component style** | `PascalCase.module.scss` | `UserCard.module.scss`     |
| **Utility/Hook**    | `camelCase.ts`           | `useFetchData.ts`          |
| **Shared partials** | `_kebab-case.scss`       | `_variables.scss`          |

## Naming Notes

- **Avoid abbreviations:** Use clear, meaningful names in CSS, style files, components, functions, and any other place where naming is required.
- **Component names:** The component name must match its file name exactly.
- **Class naming conventions:**
  - **Module-specific classes** (CSS Modules) → `camelCase`
  - **Common/global styles** → `kebab-case`
- **SCSS variables:** Always use `kebab-case` for naming variables (e.g., `$primary-color`, `$font-size-large`).

## SEO friendly Website

// Guide for SEO-friendly HTML page structure

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
