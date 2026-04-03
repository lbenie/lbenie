# Bilingual Astro Website - Core Layout & Components

This directory contains the core layout system and reusable components for the bilingual (English/French) Astro website.

## 📁 Directory Structure

```
src/
├── components/           # Reusable UI components
│   ├── Footer.astro
│   ├── Header.astro
│   ├── LanguageSwitcher.astro
│   └── SkipLink.astro
├── layouts/             # Page layouts
│   └── BaseLayout.astro
├── types/               # TypeScript type definitions
│   └── index.ts
├── utils/               # Utility functions
│   ├── i18n.ts
│   └── seo.ts
└── styles/              # Global styles (already created)
    ├── global.css
    ├── reset.css
    └── utilities.css
```

## 🎨 Components

### BaseLayout.astro

The main layout wrapper for all pages. Provides:

- Semantic HTML5 structure
- SEO meta tags (Open Graph, Twitter Cards, JSON-LD)
- Language alternate links
- Skip to main content link
- Header and Footer components
- View Transitions API support

**Usage:**

```astro
---
import BaseLayout from '@layouts/BaseLayout.astro';

const meta = {
  title: 'Page Title',
  description: 'Page description',
  keywords: ['keyword1', 'keyword2'],
  type: 'website'
};
---

<BaseLayout meta={meta} locale="en">
  <h1>Your page content</h1>
</BaseLayout>
```

### Header.astro

Responsive header with:

- Logo/brand name
- Desktop navigation menu
- Mobile hamburger menu (accessible)
- Language switcher
- Hide-on-scroll behavior
- Active link highlighting

**Features:**

- Sticky positioning
- Smooth transitions
- Keyboard navigation support
- ARIA labels for accessibility
- Auto-hide on scroll down, show on scroll up

### Footer.astro

Site footer containing:

- Navigation links
- Social media links (GitHub, LinkedIn, Email)
- Copyright notice
- Responsive grid layout

### LanguageSwitcher.astro

Toggle between English and French:

- Globe icon with language codes (EN/FR)
- Maintains current route when switching
- Hover and focus states
- Accessible with proper ARIA labels

### SkipLink.astro

Accessibility feature for keyboard navigation:

- Visually hidden until focused
- Jumps to main content
- WCAG 2.1 AA compliant

## 🛠️ Utilities

### i18n.ts

Internationalization helpers:

```typescript
import {
  getLocaleFromPath,
  switchLocale,
  getLocalizedPath,
  formatDate,
  getAlternateLinks
} from '@utils/i18n';

// Get locale from URL path
const locale = getLocaleFromPath('/fr/blog'); // 'fr'

// Switch to different locale
const newPath = switchLocale('/blog/my-post', 'fr'); // '/fr/blogue/my-post'

// Format dates
const formatted = formatDate(new Date(), 'fr'); // "1 janvier 2024"

// Get alternate links for SEO
const alternates = getAlternateLinks('/blog', 'https://example.com');
```

**Constants:**

- `DEFAULT_LOCALE`: 'en'
- `SUPPORTED_LOCALES`: ['en', 'fr']
- `LOCALE_NAMES`: Display names for each locale
- `LOCALE_ROUTES`: Route translations (e.g., /blog → /blogue)

### seo.ts

SEO and meta tag utilities:

```typescript
import {
  buildPageTitle,
  buildCanonicalURL,
  generateOpenGraphMeta,
  generateTwitterCardMeta,
  generateWebsiteSchema,
  SITE_CONFIG
} from '@utils/seo';

// Build full page title
const title = buildPageTitle('About'); // 'About | Lucien Bénié'

// Generate canonical URL
const canonical = buildCanonicalURL('/blog/post');

// Generate structured data
const schema = generateWebsiteSchema('en');
```

**SITE_CONFIG:**

Update this object in `seo.ts` with your site information:

```typescript
export const SITE_CONFIG: SiteConfig = {
  name: 'Your Name',
  title: 'Your Name - Software Engineer',
  description: 'Your description',
  author: 'Your Name',
  defaultLocale: 'en',
  locales: ['en', 'fr'],
  url: 'https://yoursite.com',
  socialLinks: {
    github: 'https://github.com/username',
    linkedin: 'https://linkedin.com/in/username',
    email: 'your@email.com',
  },
};
```

## 📝 Type Definitions

See `types/index.ts` for all TypeScript interfaces:

- `Locale`: 'en' | 'fr'
- `SEOMeta`: SEO metadata structure
- `NavItem`: Navigation item structure
- `BaseLayoutProps`: Layout component props
- `HeaderProps`, `FooterProps`, etc.

## 🎯 Key Features

### Accessibility (WCAG AA Compliant)

- ✅ Semantic HTML elements
- ✅ Skip to main content link
- ✅ Proper ARIA labels and roles
- ✅ Keyboard navigation support
- ✅ Focus visible states
- ✅ Color contrast ratios
- ✅ Screen reader friendly

### SEO Optimized

- ✅ Meta tags (title, description, keywords)
- ✅ Open Graph tags
- ✅ Twitter Card tags
- ✅ JSON-LD structured data
- ✅ Canonical URLs
- ✅ Language alternate links (hreflang)
- ✅ Semantic HTML5 structure

### Internationalization (i18n)

- ✅ English and French support
- ✅ Route translations
- ✅ Language switcher
- ✅ Locale-specific formatting (dates, numbers)
- ✅ SEO-friendly URLs

### Performance

- ✅ View Transitions API
- ✅ CSS custom properties
- ✅ Modern CSS features
- ✅ Minimal JavaScript
- ✅ Mobile-first responsive design

## 🚀 Usage Examples

### Creating a New Page

```astro
---
// src/pages/about.astro
import BaseLayout from '@layouts/BaseLayout.astro';

const meta = {
  title: 'About Me',
  description: 'Learn more about my background and experience',
  keywords: ['about', 'developer', 'software engineer'],
};
---

<BaseLayout meta={meta} locale="en">
  <div class="container">
    <h1>About Me</h1>
    <p>Your content here...</p>
  </div>
</BaseLayout>
```

### French Version

```astro
---
// src/pages/fr/a-propos.astro
import BaseLayout from '@layouts/BaseLayout.astro';

const meta = {
  title: 'À Propos',
  description: 'En savoir plus sur mon parcours et mon expérience',
  keywords: ['à propos', 'développeur', 'ingénieur logiciel'],
};
---

<BaseLayout meta={meta} locale="fr">
  <div class="container">
    <h1>À Propos de Moi</h1>
    <p>Votre contenu ici...</p>
  </div>
</BaseLayout>
```

## 🎨 Styling

All components use CSS custom properties from `global.css`:

```css
/* Colors */
var(--color-text-primary)
var(--color-text-secondary)
var(--color-bg-primary)
var(--color-accent-primary)

/* Typography */
var(--font-sans)
var(--font-size-base)
var(--font-weight-medium)

/* Spacing */
var(--space-sm)
var(--space-md)
var(--space-lg)

/* Layout */
var(--container-max)
var(--radius-md)
var(--shadow-sm)
```

## ⚙️ Configuration

### Adding New Routes

Update `LOCALE_ROUTES` in `utils/i18n.ts`:

```typescript
export const LOCALE_ROUTES: LocaleRoutes = {
  // ... existing routes
  about: {
    en: '/about',
    fr: '/a-propos',
  },
  // Add your new route
  services: {
    en: '/services',
    fr: '/services', // or '/prestations'
  },
};
```

### Adding Navigation Links

Update `navItems` in `Header.astro` and `footerLinks` in `Footer.astro`.

## 📦 Dependencies

The components rely on:

- Astro (framework)
- TypeScript (type safety)
- CSS Custom Properties (styling)

**Note:** The current implementation uses static translations in components. For full i18n support with translation files, you'll need to:

1. Set up translation JSON files in `public/locales/`
2. Configure astro-i18next properly
3. Replace hardcoded strings with `t()` function calls

## 🔧 Future Enhancements

- [ ] Add translation JSON files for better i18n management
- [ ] Add breadcrumb component
- [ ] Add pagination component
- [ ] Add theme switcher (dark mode)
- [ ] Add more structured data schemas (Article, Person, etc.)
- [ ] Add RSS feed generation
- [ ] Add sitemap generation

## 📚 Resources

- [Astro Documentation](https://docs.astro.build)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Open Graph Protocol](https://ogp.me/)
- [Schema.org](https://schema.org/)
- [Web.dev Best Practices](https://web.dev/)

## 💡 Tips

1. **SEO**: Always provide unique, descriptive meta titles and descriptions
2. **Accessibility**: Test with keyboard navigation and screen readers
3. **Performance**: Optimize images and use appropriate formats (WebP, AVIF)
4. **i18n**: Keep URL structures consistent between languages
5. **Maintenance**: Update copyright year in Footer.astro annually

---

Built with ❤️ using Astro, TypeScript, and modern CSS