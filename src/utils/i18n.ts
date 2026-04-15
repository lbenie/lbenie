/**
 * Internationalization utility functions
 * Handles locale detection, route translation, and i18n helpers with comprehensive error handling
 */

import type { Locale, LocaleRoutes } from '@/types/index';

/**
 * Default and supported locales
 */
export const DEFAULT_LOCALE: Locale = 'en';
export const SUPPORTED_LOCALES: Locale[] = ['en', 'fr'];

/**
 * Locale display names
 */
export const LOCALE_NAMES: Record<Locale, { native: string; english: string }> = {
  en: { native: 'English', english: 'English' },
  fr: { native: 'Français', english: 'French' },
};

/**
 * Route translations for different locales
 */
export const LOCALE_ROUTES: LocaleRoutes = {
  home: {
    en: '/',
    fr: '/',
  },
  about: {
    en: '/about',
    fr: '/a-propos',
  },
  blog: {
    en: '/blog',
    fr: '/blogue',
  },
  projects: {
    en: '/projects',
    fr: '/projets',
  },
  experience: {
    en: '/experience',
    fr: '/experience',
  },
  contact: {
    en: '/contact',
    fr: '/contact',
  },
};

/**
 * Check if a locale string is valid and supported
 * Type guard function for Locale type
 *
 * @param {string} locale - The locale string to validate
 * @returns {boolean} True if locale is valid and supported
 *
 * @example
 * isValidLocale('en') // returns true
 * isValidLocale('es') // returns false
 */
export function isValidLocale(locale: string): locale is Locale {
  try {
    if (!locale || typeof locale !== 'string') {
      return false;
    }
    return SUPPORTED_LOCALES.includes(locale as Locale);
  } catch (error) {
    console.error('isValidLocale: Error validating locale', error);
    return false;
  }
}

/**
 * Extract locale from URL path
 * Returns the default locale if path is invalid or locale not found
 *
 * @param {string} path - The URL path to extract locale from
 * @returns {Locale} The extracted locale or default locale
 *
 * @example
 * getLocaleFromPath('/en/about') // returns 'en'
 * getLocaleFromPath('/fr/blogue') // returns 'fr'
 * getLocaleFromPath('/about') // returns 'en' (default)
 */
export function getLocaleFromPath(path: string): Locale {
  try {
    // Validate path
    if (!path || typeof path !== 'string') {
      console.warn('getLocaleFromPath: Invalid path provided, using default locale');
      return DEFAULT_LOCALE;
    }

    const segments = path.split('/').filter(Boolean);

    if (segments.length === 0) {
      return DEFAULT_LOCALE;
    }

    const potentialLocale = segments[0];

    if (potentialLocale && isValidLocale(potentialLocale)) {
      return potentialLocale;
    }

    return DEFAULT_LOCALE;
  } catch (error) {
    console.error('getLocaleFromPath: Error extracting locale', error);
    return DEFAULT_LOCALE;
  }
}

/**
 * Remove locale prefix from path
 * Returns the path without the locale prefix
 *
 * @param {string} path - The URL path to process
 * @returns {string} The path without locale prefix
 *
 * @example
 * removeLocaleFromPath('/en/about') // returns '/about'
 * removeLocaleFromPath('/fr/blogue') // returns '/blogue'
 * removeLocaleFromPath('/about') // returns '/about'
 */
export function removeLocaleFromPath(path: string): string {
  try {
    // Validate path
    if (!path || typeof path !== 'string') {
      console.warn('removeLocaleFromPath: Invalid path provided, returning root');
      return '/';
    }

    const segments = path.split('/').filter(Boolean);

    if (segments.length === 0) {
      return '/';
    }

    const potentialLocale = segments[0];

    if (potentialLocale && isValidLocale(potentialLocale)) {
      const remainingPath = segments.slice(1).join('/');
      return `/${remainingPath}`;
    }

    return path;
  } catch (error) {
    console.error('removeLocaleFromPath: Error removing locale', error);
    return path || '/';
  }
}

/**
 * Get localized path for a route
 * Translates routes based on locale and adds locale prefix
 *
 * @param {string} route - The route to localize
 * @param {Locale} locale - The target locale
 * @returns {string} The localized path with locale prefix
 *
 * @example
 * getLocalizedPath('/about', 'en') // returns '/en/about'
 * getLocalizedPath('/about', 'fr') // returns '/fr/a-propos'
 */
export function getLocalizedPath(route: string, locale: Locale): string {
  try {
    // Validate route
    if (!route || typeof route !== 'string') {
      console.warn('getLocalizedPath: Invalid route provided, using root');
      route = '/';
    }

    // Validate and sanitize locale
    const validLocale = isValidLocale(locale) ? locale : DEFAULT_LOCALE;

    if (locale !== validLocale) {
      console.warn(`getLocalizedPath: Invalid locale "${locale}", falling back to "${DEFAULT_LOCALE}"`);
    }

    // Remove leading slash for lookup
    const routeKey = route.replace(/^\//, '').split('/')[0] || 'home';

    // Check if we have a translation for this route
    const localizedRoute = LOCALE_ROUTES[routeKey];

    if (localizedRoute && localizedRoute[validLocale]) {
      const path = localizedRoute[validLocale];
      // Always add locale prefix since site uses explicit locale prefixes
      return `/${validLocale}${path}`;
    }

    // For routes without specific translations, always add locale prefix
    const normalizedRoute = route.startsWith('/') ? route : `/${route}`;
    return `/${validLocale}${normalizedRoute}`;
  } catch (error) {
    console.error('getLocalizedPath: Error generating localized path', error);
    return `/${locale || DEFAULT_LOCALE}${route || '/'}`;
  }
}

/**
 * Switch locale for current path
 * Translates the current path to the target locale, preserving query params and hash
 *
 * @param {string} currentPath - The current URL path
 * @param {Locale} targetLocale - The target locale to switch to
 * @returns {string} The path in the target locale
 *
 * @example
 * switchLocale('/en/about', 'fr') // returns '/fr/a-propos'
 * switchLocale('/fr/blogue?page=1#section', 'en') // returns '/en/blog?page=1#section'
 */
export function switchLocale(currentPath: string, targetLocale: Locale): string {
  try {
    // Validate currentPath
    if (!currentPath || typeof currentPath !== 'string') {
      console.warn('switchLocale: Invalid current path, using root');
      currentPath = '/';
    }

    // Validate and sanitize target locale
    const validTargetLocale = isValidLocale(targetLocale) ? targetLocale : DEFAULT_LOCALE;

    if (targetLocale !== validTargetLocale) {
      console.warn(`switchLocale: Invalid target locale "${targetLocale}", falling back to "${DEFAULT_LOCALE}"`);
    }

    // Parse URL to extract pathname, search, and hash
    let pathname = currentPath;
    let search = '';
    let hash = '';

    // Extract hash if present
    const hashIndex = currentPath.indexOf('#');
    if (hashIndex !== -1) {
      hash = currentPath.slice(hashIndex);
      pathname = currentPath.slice(0, hashIndex);
    }

    // Extract search params if present
    const searchIndex = pathname.indexOf('?');
    if (searchIndex !== -1) {
      search = pathname.slice(searchIndex);
      pathname = pathname.slice(0, searchIndex);
    }

    const currentLocale = getLocaleFromPath(pathname);
    const pathWithoutLocale = removeLocaleFromPath(pathname);

    // Find the route key from the current path
    const routeKey = Object.keys(LOCALE_ROUTES).find((key) => {
      const route = LOCALE_ROUTES[key];
      return route && route[currentLocale] === pathWithoutLocale;
    });

    let newPath: string;
    if (routeKey) {
      const targetPath = LOCALE_ROUTES[routeKey]?.[validTargetLocale] || '/';
      newPath = `/${validTargetLocale}${targetPath}`;
    } else {
      // Fallback: always add locale prefix since site uses explicit locale prefixes
      newPath = `/${validTargetLocale}${pathWithoutLocale}`;
    }

    // Preserve search params and hash
    return `${newPath}${search}${hash}`;
  } catch (error) {
    console.error('switchLocale: Error switching locale', error);
    return `/${targetLocale || DEFAULT_LOCALE}/`;
  }
}

/**
 * Get alternate locale (toggle between en/fr)
 * Returns the other supported locale
 *
 * @param {Locale} currentLocale - The current locale
 * @returns {Locale} The alternate locale
 *
 * @example
 * getAlternateLocale('en') // returns 'fr'
 * getAlternateLocale('fr') // returns 'en'
 */
export function getAlternateLocale(currentLocale: Locale): Locale {
  try {
    // Validate and sanitize locale
    const validLocale = isValidLocale(currentLocale) ? currentLocale : DEFAULT_LOCALE;

    if (currentLocale !== validLocale) {
      console.warn(`getAlternateLocale: Invalid locale "${currentLocale}", falling back to "${DEFAULT_LOCALE}"`);
    }

    return validLocale === 'en' ? 'fr' : 'en';
  } catch (error) {
    console.error('getAlternateLocale: Error getting alternate locale', error);
    return DEFAULT_LOCALE;
  }
}

/**
 * Get locale display name
 * Returns the native or English name of the locale
 *
 * @param {Locale} locale - The locale to get the name for
 * @param {Locale} [inLocale] - If provided, returns English name; otherwise native name
 * @returns {string} The locale display name
 *
 * @example
 * getLocaleName('fr') // returns 'Français'
 * getLocaleName('fr', 'en') // returns 'French'
 */
export function getLocaleName(locale: Locale, inLocale?: Locale): string {
  try {
    // Validate and sanitize locale
    const validLocale = isValidLocale(locale) ? locale : DEFAULT_LOCALE;

    if (locale !== validLocale) {
      console.warn(`getLocaleName: Invalid locale "${locale}", falling back to "${DEFAULT_LOCALE}"`);
    }

    const names = LOCALE_NAMES[validLocale];

    if (!names) {
      console.warn(`getLocaleName: No names found for locale "${validLocale}"`);
      return validLocale;
    }

    if (inLocale) {
      return names.english || validLocale;
    }

    return names.native || validLocale;
  } catch (error) {
    console.error('getLocaleName: Error getting locale name', error);
    return locale || DEFAULT_LOCALE;
  }
}

/**
 * Format date according to locale
 * Uses Intl.DateTimeFormat for locale-aware date formatting
 *
 * @param {Date | string} date - The date to format
 * @param {Locale} locale - The locale for formatting
 * @param {Intl.DateTimeFormatOptions} [options] - Optional formatting options
 * @returns {string} Formatted date string
 *
 * @example
 * formatDate(new Date('2024-01-15'), 'en') // returns 'January 15, 2024'
 * formatDate(new Date('2024-01-15'), 'fr') // returns '15 janvier 2024'
 */
export function formatDate(date: Date | string, locale: Locale, options?: Intl.DateTimeFormatOptions): string {
  try {
    // Validate and parse date
    let dateObj: Date;
    if (typeof date === 'string') {
      dateObj = new Date(date);
      if (isNaN(dateObj.getTime())) {
        console.warn(`formatDate: Invalid date string "${date}", using current date`);
        dateObj = new Date();
      }
    } else if (date instanceof Date) {
      if (isNaN(date.getTime())) {
        console.warn('formatDate: Invalid date object, using current date');
        dateObj = new Date();
      } else {
        dateObj = date;
      }
    } else {
      console.warn('formatDate: Invalid date type, using current date');
      dateObj = new Date();
    }

    // Validate and sanitize locale
    const validLocale = isValidLocale(locale) ? locale : DEFAULT_LOCALE;

    if (locale !== validLocale) {
      console.warn(`formatDate: Invalid locale "${locale}", falling back to "${DEFAULT_LOCALE}"`);
    }

    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      ...options,
    };

    const localeString = validLocale === 'fr' ? 'fr-CA' : 'en-US';

    return new Intl.DateTimeFormat(localeString, defaultOptions).format(dateObj);
  } catch (error) {
    console.error('formatDate: Error formatting date', error);
    return new Date().toLocaleDateString();
  }
}

/**
 * Format number according to locale
 * Uses Intl.NumberFormat for locale-aware number formatting
 *
 * @param {number} number - The number to format
 * @param {Locale} locale - The locale for formatting
 * @param {Intl.NumberFormatOptions} [options] - Optional formatting options
 * @returns {string} Formatted number string
 *
 * @example
 * formatNumber(1234.56, 'en') // returns '1,234.56'
 * formatNumber(1234.56, 'fr') // returns '1 234,56'
 */
export function formatNumber(number: number, locale: Locale, options?: Intl.NumberFormatOptions): string {
  try {
    // Validate number
    if (typeof number !== 'number' || isNaN(number)) {
      console.warn(`formatNumber: Invalid number "${number}", returning as string`);
      return String(number);
    }

    // Validate and sanitize locale
    const validLocale = isValidLocale(locale) ? locale : DEFAULT_LOCALE;

    if (locale !== validLocale) {
      console.warn(`formatNumber: Invalid locale "${locale}", falling back to "${DEFAULT_LOCALE}"`);
    }

    const localeString = validLocale === 'fr' ? 'fr-CA' : 'en-US';

    return new Intl.NumberFormat(localeString, options).format(number);
  } catch (error) {
    console.error('formatNumber: Error formatting number', error);
    return String(number);
  }
}



/**
 * Get language direction for locale
 * Returns text direction (LTR or RTL) - future-proofed for RTL support
 *
 * @param {Locale} _locale - The locale (currently unused, both supported locales are LTR)
 * @returns {'ltr' | 'rtl'} The text direction
 *
 * @example
 * getLanguageDirection('en') // returns 'ltr'
 * getLanguageDirection('fr') // returns 'ltr'
 */
export function getLanguageDirection(_locale: Locale): 'ltr' | 'rtl' {
  try {
    // Both English and French are LTR
    // This function is future-proofed for RTL language support
    return 'ltr';
  } catch (error) {
    console.error('getLanguageDirection: Error determining language direction', error);
    return 'ltr';
  }
}

/**
 * Build alternate links for SEO hreflang tags
 * Generates alternate link objects for all supported locales
 *
 * @param {string} currentPath - The current path to generate alternates for
 * @param {string} baseUrl - The base URL of the site
 * @returns {Array<{ hreflang: string; href: string }>} Array of alternate link objects
 *
 * @example
 * getAlternateLinks('/about', 'https://lbenie.me')
 * // returns [
 * //   { hreflang: 'en', href: 'https://lbenie.me/en/about' },
 * //   { hreflang: 'fr', href: 'https://lbenie.me/fr/a-propos' },
 * //   { hreflang: 'x-default', href: 'https://lbenie.me/en/about' }
 * // ]
 */
export function getAlternateLinks(
  currentPath: string,
  baseUrl: string,
): Array<{
  hreflang: string;
  href: string;
}> {
  try {
    // Validate currentPath
    if (!currentPath || typeof currentPath !== 'string') {
      console.warn('getAlternateLinks: Invalid current path, using root');
      currentPath = '/';
    }

    // Validate baseUrl
    if (!baseUrl || typeof baseUrl !== 'string') {
      console.error('getAlternateLinks: Invalid base URL provided');
      return [];
    }

    // Validate URL format
    try {
      new URL(baseUrl);
    } catch {
      console.error(`getAlternateLinks: Invalid base URL format: ${baseUrl}`);
      return [];
    }

    // Remove trailing slash from base URL
    const sanitizedBaseUrl = baseUrl.replace(/\/$/, '');

    const links: Array<{ hreflang: string; href: string }> = SUPPORTED_LOCALES.map((locale) => {
      try {
        const localizedPath = getLocalizedPath(currentPath, locale);
        return {
          hreflang: locale,
          href: `${sanitizedBaseUrl}${localizedPath}`,
        };
      } catch (error) {
        console.error(`getAlternateLinks: Error generating link for locale "${locale}"`, error);
        return {
          hreflang: locale,
          href: `${sanitizedBaseUrl}/${locale}`,
        };
      }
    });

    // Add x-default
    try {
      const defaultPath = getLocalizedPath(currentPath, DEFAULT_LOCALE);
      links.push({
        hreflang: 'x-default',
        href: `${sanitizedBaseUrl}${defaultPath}`,
      });
    } catch (error) {
      console.error('getAlternateLinks: Error generating x-default link', error);
      links.push({
        hreflang: 'x-default',
        href: `${sanitizedBaseUrl}/${DEFAULT_LOCALE}`,
      });
    }

    return links;
  } catch (error) {
    console.error('getAlternateLinks: Error generating alternate links', error);
    return [];
  }
}

/**
 * Normalize path by ensuring proper formatting
 * Removes trailing slashes (except root) and ensures leading slash
 *
 * @param {string} path - The path to normalize
 * @returns {string} Normalized path
 *
 * @example
 * normalizePath('about/') // returns '/about'
 * normalizePath('blog') // returns '/blog'
 * normalizePath('/') // returns '/'
 */
export function normalizePath(path: string): string {
  try {
    // Validate path
    if (!path || typeof path !== 'string') {
      console.warn('normalizePath: Invalid path provided, returning root');
      return '/';
    }

    let normalizedPath = path.trim();

    if (normalizedPath.length === 0) {
      return '/';
    }

    // Remove trailing slash except for root
    if (normalizedPath.length > 1 && normalizedPath.endsWith('/')) {
      normalizedPath = normalizedPath.slice(0, -1);
    }

    // Ensure leading slash
    if (!normalizedPath.startsWith('/')) {
      normalizedPath = `/${normalizedPath}`;
    }

    return normalizedPath;
  } catch (error) {
    console.error('normalizePath: Error normalizing path', error);
    return path || '/';
  }
}
