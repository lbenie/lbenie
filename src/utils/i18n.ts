/**
 * Internationalization utility functions
 * Handles locale detection, route translation, and i18n helpers
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
 * Check if a locale is valid
 */
export function isValidLocale(locale: string): locale is Locale {
  return SUPPORTED_LOCALES.includes(locale as Locale);
}

/**
 * Get locale from path
 */
export function getLocaleFromPath(path: string): Locale {
  const segments = path.split('/').filter(Boolean);
  const potentialLocale = segments[0];

  if (potentialLocale && isValidLocale(potentialLocale)) {
    return potentialLocale;
  }

  return DEFAULT_LOCALE;
}

/**
 * Remove locale from path
 */
export function removeLocaleFromPath(path: string): string {
  const segments = path.split('/').filter(Boolean);
  const potentialLocale = segments[0];

  if (potentialLocale && isValidLocale(potentialLocale)) {
    return `/${segments.slice(1).join('/')}`;
  }

  return path;
}

/**
 * Get localized path for a route
 */
export function getLocalizedPath(route: string, locale: Locale): string {
  // Remove leading slash for lookup
  const routeKey = route.replace(/^\//, '').split('/')[0] || 'home';

  // Check if we have a translation for this route
  const localizedRoute = LOCALE_ROUTES[routeKey];

  if (localizedRoute) {
    const path = localizedRoute[locale];
    // Always add locale prefix since site uses explicit locale prefixes
    return `/${locale}${path}`;
  }

  // For routes without specific translations, always add locale prefix
  return `/${locale}${route}`;
}

/**
 * Switch locale for current path
 */
export function switchLocale(currentPath: string, targetLocale: Locale): string {
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
    return LOCALE_ROUTES[key]?.[currentLocale] === pathWithoutLocale;
  });

  let newPath: string;
  if (routeKey) {
    const targetPath = LOCALE_ROUTES[routeKey]?.[targetLocale] || '/';
    newPath = `/${targetLocale}${targetPath}`;
  } else {
    // Fallback: always add locale prefix since site uses explicit locale prefixes
    newPath = `/${targetLocale}${pathWithoutLocale}`;
  }

  // Preserve search params and hash
  return `${newPath}${search}${hash}`;
}

/**
 * Get alternate locale
 */
export function getAlternateLocale(currentLocale: Locale): Locale {
  return currentLocale === 'en' ? 'fr' : 'en';
}

/**
 * Get locale display name
 */
export function getLocaleName(locale: Locale, inLocale?: Locale): string {
  if (inLocale) {
    return LOCALE_NAMES[locale]?.english || locale;
  }
  return LOCALE_NAMES[locale]?.native || locale;
}

/**
 * Format date according to locale
 */
export function formatDate(date: Date | string, locale: Locale, options?: Intl.DateTimeFormatOptions): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  };

  return new Intl.DateTimeFormat(locale === 'fr' ? 'fr-CA' : 'en-US', defaultOptions).format(dateObj);
}

/**
 * Format number according to locale
 */
export function formatNumber(number: number, locale: Locale, options?: Intl.NumberFormatOptions): string {
  return new Intl.NumberFormat(locale === 'fr' ? 'fr-CA' : 'en-US', options).format(number);
}

/**
 * Get reading time estimate (in minutes)
 */
export function getReadingTime(content: string, locale: Locale): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);

  if (locale === 'fr') {
    return minutes === 1 ? '1 minute' : `${minutes} minutes`;
  }

  return minutes === 1 ? '1 min read' : `${minutes} min read`;
}

/**
 * Get language direction (for RTL support if needed in future)
 */
export function getLanguageDirection(_locale: Locale): 'ltr' | 'rtl' {
  // Both English and French are LTR
  return 'ltr';
}

/**
 * Build alternate links for SEO
 */
export function getAlternateLinks(
  currentPath: string,
  baseUrl: string,
): Array<{
  hreflang: string;
  href: string;
}> {
  const links: Array<{ hreflang: string; href: string }> = SUPPORTED_LOCALES.map((locale) => ({
    hreflang: locale,
    href: `${baseUrl}${getLocalizedPath(currentPath, locale)}`,
  }));

  // Add x-default
  links.push({
    hreflang: 'x-default',
    href: `${baseUrl}${getLocalizedPath(currentPath, DEFAULT_LOCALE)}`,
  });

  return links;
}

/**
 * Normalize path (remove trailing slashes, etc.)
 */
export function normalizePath(path: string): string {
  // Remove trailing slash except for root
  if (path.length > 1 && path.endsWith('/')) {
    path = path.slice(0, -1);
  }

  // Ensure leading slash
  if (!path.startsWith('/')) {
    path = `/${path}`;
  }

  return path;
}
