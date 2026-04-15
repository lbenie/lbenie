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
 * Build full page title with optional site name suffix
 *
 * @param {string} title - The page title
 * @param {boolean} [includeSiteName=true] - Whether to include the site name
 * @returns {string} The formatted page title
 * @throws {Error} If title is empty or invalid
 *
 * @example
 * buildPageTitle('About') // returns 'About | Lucien Bénié'
 * buildPageTitle('Home', false) // returns 'Home'
 */
export const buildPageTitle = (title: string, includeSiteName = true): string => {
  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    console.warn('buildPageTitle: Invalid title provided, using site name as fallback');
    return SITE_CONFIG.name;
  }

  const sanitizedTitle = title.trim();

  if (!includeSiteName) {
    return sanitizedTitle;
  }

  return sanitizedTitle === SITE_CONFIG.name ? sanitizedTitle : `${sanitizedTitle} | ${SITE_CONFIG.name}`;
};

/**
 * Build canonical URL from a path and base URL
 * Validates and normalizes URLs to ensure proper formatting
 *
 * @param {string} path - The path to append to the base URL
 * @param {string} [baseUrl=SITE_CONFIG.url] - The base URL
 * @returns {string} The complete canonical URL
 * @throws {Error} If the URL is invalid
 *
 * @example
 * buildCanonicalURL('/about') // returns 'https://lbenie.me/about'
 * buildCanonicalURL('blog/post-1') // returns 'https://lbenie.me/blog/post-1'
 */
export const buildCanonicalURL = (path: string, baseUrl = SITE_CONFIG.url): string => {
  try {
    if (!path || typeof path !== 'string') {
      console.warn('buildCanonicalURL: Invalid path provided, using base URL');
      return baseUrl;
    }

    // Validate base URL
    if (!baseUrl || typeof baseUrl !== 'string') {
      console.error('buildCanonicalURL: Invalid base URL provided');
      return SITE_CONFIG.url;
    }

    // Remove trailing slash from base URL
    const base = baseUrl.replace(/\/$/, '');

    // Ensure path starts with /
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;

    // Construct and validate the full URL
    const fullUrl = `${base}${normalizedPath}`;

    // Validate URL format
    try {
      new URL(fullUrl);
      return fullUrl;
    } catch {
      console.error(`buildCanonicalURL: Invalid URL format: ${fullUrl}`);
      return baseUrl;
    }
  } catch (error) {
    console.error('buildCanonicalURL: Unexpected error', error);
    return baseUrl;
  }
};

/**
 * Generate Open Graph meta tags from SEO meta
 * Validates input and provides sensible defaults
 *
 * @param {SEOMeta} meta - The SEO metadata object
 * @param {string} [baseUrl=SITE_CONFIG.url] - The base URL for default image
 * @returns {OpenGraphMeta} Open Graph metadata object
 *
 * @example
 * generateOpenGraphMeta({
 *   title: 'My Page',
 *   description: 'Page description',
 *   locale: 'en'
 * })
 */
export const generateOpenGraphMeta = (meta: SEOMeta, baseUrl = SITE_CONFIG.url): OpenGraphMeta => {
  try {
    // Validate meta object
    if (!meta || typeof meta !== 'object') {
      console.error('generateOpenGraphMeta: Invalid meta object provided');
      throw new Error('Invalid meta object');
    }

    if (!meta.title || !meta.description) {
      console.warn('generateOpenGraphMeta: Missing required fields (title or description)');
    }

    // Validate and sanitize baseUrl
    const validBaseUrl = baseUrl && typeof baseUrl === 'string' ? baseUrl : SITE_CONFIG.url;

    return {
      title: meta.title || SITE_CONFIG.title,
      description: meta.description || SITE_CONFIG.description,
      type: meta.type || 'website',
      url: meta.canonicalURL || validBaseUrl,
      image: meta.image || `${validBaseUrl}/images/og-default.jpg`,
      imageAlt: meta.imageAlt || meta.title || SITE_CONFIG.title,
      locale: meta.locale === 'fr' ? 'fr_CA' : 'en_US',
      siteName: SITE_CONFIG.name,
    };
  } catch (error) {
    console.error('generateOpenGraphMeta: Error generating OG meta', error);
    // Return minimal valid object
    return {
      title: SITE_CONFIG.title,
      description: SITE_CONFIG.description,
      type: 'website',
      url: baseUrl || SITE_CONFIG.url,
      image: `${baseUrl || SITE_CONFIG.url}/images/og-default.jpg`,
      imageAlt: SITE_CONFIG.title,
      locale: 'en_US',
      siteName: SITE_CONFIG.name,
    };
  }
};

/**
 * Generate Twitter Card meta tags from SEO meta
 * Automatically selects appropriate card type based on image presence
 *
 * @param {SEOMeta} meta - The SEO metadata object
 * @returns {TwitterCardMeta} Twitter Card metadata object
 *
 * @example
 * generateTwitterCardMeta({
 *   title: 'My Post',
 *   description: 'Post description',
 *   image: '/images/post.jpg',
 *   locale: 'en'
 * })
 */
export const generateTwitterCardMeta = (meta: SEOMeta): TwitterCardMeta => {
  try {
    // Validate meta object
    if (!meta || typeof meta !== 'object') {
      console.error('generateTwitterCardMeta: Invalid meta object provided');
      throw new Error('Invalid meta object');
    }

    if (!meta.title || !meta.description) {
      console.warn('generateTwitterCardMeta: Missing required fields (title or description)');
    }

    return {
      card: meta.image ? 'summary_large_image' : 'summary',
      title: meta.title || SITE_CONFIG.title,
      description: meta.description || SITE_CONFIG.description,
      image: meta.image,
      imageAlt: meta.imageAlt || meta.title || SITE_CONFIG.title,
      creator: '@lbenie',
    };
  } catch (error) {
    console.error('generateTwitterCardMeta: Error generating Twitter meta', error);
    // Return minimal valid object
    return {
      card: 'summary',
      title: SITE_CONFIG.title,
      description: SITE_CONFIG.description,
      imageAlt: SITE_CONFIG.title,
      creator: '@lbenie',
    };
  }
};

/**
 * Generate JSON-LD structured data for website
 * Creates schema.org WebSite structured data
 *
 * @param {Locale} locale - The locale for language specification
 * @returns {Record<string, unknown>} JSON-LD schema object
 *
 * @example
 * generateWebsiteSchema('en')
 */
export const generateWebsiteSchema = (locale: Locale): Record<string, unknown> => {
  try {
    // Validate locale
    const validLocale: Locale = locale === 'fr' || locale === 'en' ? locale : 'en';

    if (locale !== validLocale) {
      console.warn(`generateWebsiteSchema: Invalid locale "${locale}", falling back to "en"`);
    }

    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
      description: SITE_CONFIG.description,
      inLanguage: validLocale === 'fr' ? 'fr-CA' : 'en-US',
      author: {
        '@type': 'Person',
        name: SITE_CONFIG.author,
        url: SITE_CONFIG.url,
        sameAs: [SITE_CONFIG.socialLinks?.github, SITE_CONFIG.socialLinks?.linkedin].filter(Boolean),
      },
    };
  } catch (error) {
    console.error('generateWebsiteSchema: Error generating schema', error);
    // Return minimal valid schema
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    };
  }
};

/**
 * Generate JSON-LD structured data for person
 * Creates schema.org Person structured data for the author
 *
 * @returns {Record<string, unknown>} JSON-LD schema object
 *
 * @example
 * generatePersonSchema()
 */
export const generatePersonSchema = (): Record<string, unknown> => {
  try {
    return {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: SITE_CONFIG.author,
      url: SITE_CONFIG.url,
      email: SITE_CONFIG.socialLinks?.email,
      jobTitle: 'Staff Frontend Developer',
      sameAs: [SITE_CONFIG.socialLinks?.github, SITE_CONFIG.socialLinks?.linkedin].filter(Boolean),
    };
  } catch (error) {
    console.error('generatePersonSchema: Error generating schema', error);
    // Return minimal valid schema
    return {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: SITE_CONFIG.author,
    };
  }
};

/**
 * Generate JSON-LD structured data for blog post
 * Creates schema.org BlogPosting structured data
 *
 * @param {string} title - The blog post title
 * @param {string} description - The blog post description
 * @param {Date} publishDate - Publication date
 * @param {Date | undefined} modifiedDate - Last modified date (optional)
 * @param {string | undefined} image - Featured image URL (optional)
 * @param {string} url - The blog post URL
 * @param {Locale} locale - The locale for language specification
 * @returns {Record<string, unknown>} JSON-LD schema object
 *
 * @example
 * generateBlogPostSchema(
 *   'My Post',
 *   'Post description',
 *   new Date('2024-01-01'),
 *   undefined,
 *   '/images/post.jpg',
 *   'https://lbenie.me/en/blog/my-post',
 *   'en'
 * )
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
  try {
    // Validate required fields
    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      throw new Error('Title is required and must be a non-empty string');
    }

    if (!description || typeof description !== 'string' || description.trim().length === 0) {
      throw new Error('Description is required and must be a non-empty string');
    }

    if (!url || typeof url !== 'string' || url.trim().length === 0) {
      throw new Error('URL is required and must be a non-empty string');
    }

    // Validate and handle dates
    let validPublishDate: Date;
    try {
      validPublishDate = publishDate instanceof Date && !isNaN(publishDate.getTime()) ? publishDate : new Date();

      if (validPublishDate.toString() === 'Invalid Date') {
        validPublishDate = new Date();
      }
    } catch {
      console.warn('generateBlogPostSchema: Invalid publish date, using current date');
      validPublishDate = new Date();
    }

    let validModifiedDate: Date;
    try {
      if (modifiedDate instanceof Date && !isNaN(modifiedDate.getTime())) {
        validModifiedDate = modifiedDate;
      } else {
        validModifiedDate = validPublishDate;
      }
    } catch {
      validModifiedDate = validPublishDate;
    }

    // Validate locale
    const validLocale: Locale = locale === 'fr' || locale === 'en' ? locale : 'en';

    return {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: title.trim(),
      description: description.trim(),
      image: image,
      datePublished: validPublishDate.toISOString(),
      dateModified: validModifiedDate.toISOString(),
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
        '@id': url.trim(),
      },
      inLanguage: validLocale === 'fr' ? 'fr-CA' : 'en-US',
    };
  } catch (error) {
    console.error('generateBlogPostSchema: Error generating schema', error);
    // Return minimal valid schema with safe defaults
    return {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: title || 'Untitled',
      description: description || '',
      datePublished: new Date().toISOString(),
      dateModified: new Date().toISOString(),
      author: {
        '@type': 'Person',
        name: SITE_CONFIG.author,
      },
    };
  }
};

/**
 * Generate JSON-LD structured data for breadcrumbs
 * Creates schema.org BreadcrumbList structured data
 *
 * @param {Array<{ name: string; url: string }>} items - Array of breadcrumb items
 * @returns {Record<string, unknown>} JSON-LD schema object
 *
 * @example
 * generateBreadcrumbSchema([
 *   { name: 'Home', url: 'https://lbenie.me' },
 *   { name: 'Blog', url: 'https://lbenie.me/blog' }
 * ])
 */
export const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>): Record<string, unknown> => {
  try {
    // Validate items array
    if (!Array.isArray(items)) {
      console.error('generateBreadcrumbSchema: Items must be an array');
      return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [],
      };
    }

    if (items.length === 0) {
      console.warn('generateBreadcrumbSchema: Empty items array provided');
    }

    // Filter and validate items
    const validItems = items.filter((item) => {
      if (!item || typeof item !== 'object') {
        console.warn('generateBreadcrumbSchema: Invalid item object, skipping');
        return false;
      }
      if (!item.name || typeof item.name !== 'string' || item.name.trim().length === 0) {
        console.warn('generateBreadcrumbSchema: Item missing valid name, skipping');
        return false;
      }
      if (!item.url || typeof item.url !== 'string' || item.url.trim().length === 0) {
        console.warn('generateBreadcrumbSchema: Item missing valid URL, skipping');
        return false;
      }
      return true;
    });

    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: validItems.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name.trim(),
        item: item.url.trim(),
      })),
    };
  } catch (error) {
    console.error('generateBreadcrumbSchema: Error generating schema', error);
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [],
    };
  }
};

/**
 * Sanitize meta description to ensure optimal length
 * Truncates at word boundary if needed and adds ellipsis
 *
 * @param {string} description - The description to sanitize
 * @param {number} [maxLength=160] - Maximum length (default: 160 chars)
 * @returns {string} Sanitized description
 *
 * @example
 * sanitizeDescription('This is a very long description...', 50)
 */
export const sanitizeDescription = (description: string, maxLength = 160): string => {
  try {
    if (!description || typeof description !== 'string') {
      console.warn('sanitizeDescription: Invalid description provided, returning empty string');
      return '';
    }

    const trimmed = description.trim();

    if (trimmed.length === 0) {
      console.warn('sanitizeDescription: Empty description provided');
      return '';
    }

    if (trimmed.length <= maxLength) {
      return trimmed;
    }

    // Truncate at word boundary
    const truncated = trimmed.slice(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');

    return lastSpace > 0 ? `${truncated.slice(0, lastSpace)}...` : `${truncated}...`;
  } catch (error) {
    console.error('sanitizeDescription: Error sanitizing description', error);
    return '';
  }
};

/**
 * Generate keywords string from array
 * Validates and joins keywords with proper formatting
 *
 * @param {string[]} keywords - Array of keyword strings
 * @returns {string} Comma-separated keywords string
 *
 * @example
 * generateKeywords(['javascript', 'react', 'typescript'])
 * // returns 'javascript, react, typescript'
 */
export const generateKeywords = (keywords: string[]): string => {
  try {
    if (!Array.isArray(keywords)) {
      console.warn('generateKeywords: Keywords must be an array, returning empty string');
      return '';
    }

    if (keywords.length === 0) {
      console.warn('generateKeywords: Empty keywords array provided');
      return '';
    }

    // Filter out invalid keywords and trim
    const validKeywords = keywords
      .filter((keyword) => keyword && typeof keyword === 'string' && keyword.trim().length > 0)
      .map((keyword) => keyword.trim());

    if (validKeywords.length === 0) {
      console.warn('generateKeywords: No valid keywords found after filtering');
      return '';
    }

    return validKeywords.join(', ');
  } catch (error) {
    console.error('generateKeywords: Error generating keywords', error);
    return '';
  }
};

/**
 * Get default meta for a page based on locale
 * Provides fallback metadata for pages without custom meta
 *
 * @param {Locale} locale - The locale to use
 * @returns {SEOMeta} Default SEO metadata object
 *
 * @example
 * getDefaultMeta('en')
 * getDefaultMeta('fr')
 */
export const getDefaultMeta = (locale: Locale): SEOMeta => {
  try {
    // Validate and sanitize locale
    const validLocale: Locale = locale === 'fr' || locale === 'en' ? locale : 'en';

    if (locale !== validLocale) {
      console.warn(`getDefaultMeta: Invalid locale "${locale}", falling back to "en"`);
    }

    const titles = {
      en: SITE_CONFIG.title,
      fr: 'Lucien Bénié - Développeur Logiciel',
    };

    const descriptions = {
      en: 'Staff Frontend Developer specializing in modern web technologies, accessibility, and creating exceptional user experiences',
      fr: "Développeur Frontend Staff spécialisé dans les technologies web modernes, l'accessibilité et la création d'expériences utilisateur exceptionnelles",
    };

    return {
      title: titles[validLocale],
      description: descriptions[validLocale],
      locale: validLocale,
      author: SITE_CONFIG.author,
      type: 'website',
    };
  } catch (error) {
    console.error('getDefaultMeta: Error generating default meta', error);
    // Return safe fallback
    return {
      title: SITE_CONFIG.title,
      description: SITE_CONFIG.description,
      locale: 'en',
      author: SITE_CONFIG.author,
      type: 'website',
    };
  }
};

/**
 * Merge custom meta with locale-specific defaults
 * Provides safe defaults while allowing custom overrides
 *
 * @param {Partial<SEOMeta>} meta - Custom meta object (partial)
 * @param {Locale} locale - The locale to use for defaults
 * @returns {SEOMeta} Complete merged SEO metadata object
 *
 * @example
 * mergeMeta({ title: 'Custom Title' }, 'en')
 */
export const mergeMeta = (meta: Partial<SEOMeta>, locale: Locale): SEOMeta => {
  try {
    // Validate locale
    const validLocale: Locale = locale === 'fr' || locale === 'en' ? locale : 'en';

    if (locale !== validLocale) {
      console.warn(`mergeMeta: Invalid locale "${locale}", falling back to "en"`);
    }

    // Validate meta object
    if (!meta || typeof meta !== 'object') {
      console.warn('mergeMeta: Invalid meta object provided, using defaults only');
      return getDefaultMeta(validLocale);
    }

    const defaults = getDefaultMeta(validLocale);

    return {
      ...defaults,
      ...meta,
      locale: meta.locale && (meta.locale === 'en' || meta.locale === 'fr') ? meta.locale : validLocale,
    };
  } catch (error) {
    console.error('mergeMeta: Error merging meta', error);
    return getDefaultMeta('en');
  }
};

/**
 * Validate meta object for completeness and correctness
 * Checks required fields and validates against best practices
 *
 * @param {SEOMeta} meta - The SEO metadata object to validate
 * @returns {{ valid: boolean; errors: string[] }} Validation result with error messages
 *
 * @example
 * validateMeta({ title: 'My Page', description: 'Description', locale: 'en' })
 * // returns { valid: true, errors: [] }
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

  try {
    // Validate meta object exists
    if (!meta || typeof meta !== 'object') {
      return {
        valid: false,
        errors: ['Meta object is required and must be an object'],
      };
    }

    // Validate title
    if (!meta.title || typeof meta.title !== 'string' || meta.title.trim().length === 0) {
      errors.push('Title is required and must be a non-empty string');
    } else if (meta.title.length > MAX_TITLE_LENGTH) {
      errors.push(`Title should be ${MAX_TITLE_LENGTH} characters or less (current: ${meta.title.length})`);
    }

    // Validate description
    if (!meta.description || typeof meta.description !== 'string' || meta.description.trim().length === 0) {
      errors.push('Description is required and must be a non-empty string');
    } else if (meta.description.length > MAX_DESCRIPTION_LENGTH) {
      errors.push(
        `Description should be ${MAX_DESCRIPTION_LENGTH} characters or less (current: ${meta.description.length})`,
      );
    }

    // Validate locale
    if (meta.locale && meta.locale !== 'en' && meta.locale !== 'fr') {
      errors.push(`Invalid locale "${meta.locale}". Must be "en" or "fr"`);
    }

    // Validate URL if provided
    if (meta.canonicalURL) {
      try {
        new URL(meta.canonicalURL);
      } catch {
        errors.push(`Invalid canonical URL: "${meta.canonicalURL}"`);
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  } catch (error) {
    console.error('validateMeta: Error during validation', error);
    return {
      valid: false,
      errors: ['An error occurred during validation'],
    };
  }
};
