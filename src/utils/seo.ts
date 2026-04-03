/**
 * SEO utility functions
 * Handles meta tags, Open Graph, Twitter Cards, and structured data
 */

import type { Locale, OpenGraphMeta, SEOMeta, SiteConfig, TwitterCardMeta } from '@/types/index';

/**
 * Default site configuration
 */
export const SITE_CONFIG: SiteConfig = {
  name: 'Lucien Bénié',
  title: 'Lucien Bénié - Software Developer',
  description: 'Staff Frontend Developer specializing in modern web technologies and accessibility',
  author: 'Lucien Bénié',
  defaultLocale: 'en',
  locales: ['en', 'fr'],
  url: 'https://lbenie.me',
  socialLinks: {
    github: 'https://github.com/lbenie',
    linkedin: 'https://linkedin.com/in/lbenie',
    email: 'lucien.benie@gmail.com',
  },
};

/**
 * Build full page title
 */
export const buildPageTitle = (title: string, includeSiteName = true): string => {
  if (!includeSiteName) {
    return title;
  }
  return title === SITE_CONFIG.name ? title : `${title} | ${SITE_CONFIG.name}`;
};

/**
 * Build canonical URL
 */
export const buildCanonicalURL = (path: string, baseUrl = SITE_CONFIG.url): string => {
  // Remove trailing slash from base URL
  const base = baseUrl.replace(/\/$/, '');
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalizedPath}`;
};

/**
 * Generate Open Graph meta tags
 */
export const generateOpenGraphMeta = (meta: SEOMeta, baseUrl = SITE_CONFIG.url): OpenGraphMeta => {
  return {
    title: meta.title,
    description: meta.description,
    type: meta.type || 'website',
    url: meta.canonicalURL || baseUrl,
    image: meta.image || `${baseUrl}/images/og-default.jpg`,
    imageAlt: meta.imageAlt || meta.title,
    locale: meta.locale === 'fr' ? 'fr_CA' : 'en_US',
    siteName: SITE_CONFIG.name,
  };
};

/**
 * Generate Twitter Card meta tags
 */
export const generateTwitterCardMeta = (meta: SEOMeta): TwitterCardMeta => {
  return {
    card: meta.image ? 'summary_large_image' : 'summary',
    title: meta.title,
    description: meta.description,
    image: meta.image,
    imageAlt: meta.imageAlt || meta.title,
    creator: '@lbenie',
  };
};

/**
 * Generate JSON-LD structured data for website
 */
export const generateWebsiteSchema = (locale: Locale): Record<string, unknown> => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    inLanguage: locale === 'fr' ? 'fr-CA' : 'en-US',
    author: {
      '@type': 'Person',
      name: SITE_CONFIG.author,
      url: SITE_CONFIG.url,
      sameAs: [SITE_CONFIG.socialLinks?.github, SITE_CONFIG.socialLinks?.linkedin].filter(Boolean),
    },
  };
};

/**
 * Generate JSON-LD structured data for person
 */
export const generatePersonSchema = (): Record<string, unknown> => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE_CONFIG.author,
    url: SITE_CONFIG.url,
    email: SITE_CONFIG.socialLinks?.email,
    jobTitle: 'Staff Frontend Developer',
    sameAs: [SITE_CONFIG.socialLinks?.github, SITE_CONFIG.socialLinks?.linkedin].filter(Boolean),
  };
};

/**
 * Generate JSON-LD structured data for blog post
 */
export const generateBlogPostSchema = (
  title: string,
  description: string,
  publishDate: Date,
  modifiedDate: Date | undefined,
  image: string | undefined,
  url: string,
  locale: Locale,
): Record<string, unknown> => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: description,
    image: image,
    datePublished: publishDate.toISOString(),
    dateModified: (modifiedDate || publishDate).toISOString(),
    author: {
      '@type': 'Person',
      name: SITE_CONFIG.author,
      url: SITE_CONFIG.url,
    },
    publisher: {
      '@type': 'Person',
      name: SITE_CONFIG.author,
      url: SITE_CONFIG.url,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    inLanguage: locale === 'fr' ? 'fr-CA' : 'en-US',
  };
};

/**
 * Generate JSON-LD structured data for breadcrumbs
 */
export const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>): Record<string, unknown> => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
};

/**
 * Sanitize meta description
 * Ensures description is within recommended length (150-160 characters)
 */
export const sanitizeDescription = (description: string, maxLength = 160): string => {
  if (description.length <= maxLength) {
    return description;
  }

  // Truncate at word boundary
  const truncated = description.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');

  return lastSpace > 0 ? `${truncated.slice(0, lastSpace)}...` : `${truncated}...`;
};

/**
 * Generate keywords string from array
 */
export const generateKeywords = (keywords: string[]): string => {
  return keywords.join(', ');
};

/**
 * Get default meta for a page
 */
export const getDefaultMeta = (locale: Locale): SEOMeta => {
  const titles = {
    en: SITE_CONFIG.title,
    fr: 'Lucien Bénié - Développeur Logiciel',
  };

  const descriptions = {
    en: 'Staff Frontend Developer specializing in modern web technologies, accessibility, and creating exceptional user experiences',
    fr: "Développeur Frontend Senior spécialisé dans les technologies web modernes, l'accessibilité et la création d'expériences utilisateur exceptionnelles",
  };

  return {
    title: titles[locale],
    description: descriptions[locale],
    locale,
    author: SITE_CONFIG.author,
    type: 'website',
  };
};

/**
 * Merge meta with defaults
 */
export const mergeMeta = (meta: Partial<SEOMeta>, locale: Locale): SEOMeta => {
  const defaults = getDefaultMeta(locale);
  return {
    ...defaults,
    ...meta,
    locale: meta.locale || locale,
  };
};

/**
 * Validate meta object
 */
export const validateMeta = (
  meta: SEOMeta,
): {
  valid: boolean;
  errors: string[];
} => {
  const MAX_TITLE_LENGTH = 60;
  const MAX_DESCRIPTION_LENGTH = 160;
  const errors: string[] = [];

  if (!meta.title || meta.title.trim().length === 0) {
    errors.push('Title is required');
  }

  if (meta.title && meta.title.length > MAX_TITLE_LENGTH) {
    errors.push('Title should be 60 characters or less');
  }

  if (!meta.description || meta.description.trim().length === 0) {
    errors.push('Description is required');
  }

  if (meta.description && meta.description.length > MAX_DESCRIPTION_LENGTH) {
    errors.push('Description should be 160 characters or less');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};
