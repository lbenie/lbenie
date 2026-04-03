/**
 * Content utility functions
 * Handles date formatting, collection filtering, and content operations
 */

import { type CollectionEntry, getCollection } from 'astro:content';
import type { Locale } from '@/types/index';

/**
 * Format date based on locale
 */
export const formatDate = (date: Date, locale: Locale = 'en'): string => {
  const localeMap: Record<Locale, string> = {
    en: 'en-US',
    fr: 'fr-CA',
  };

  return new Intl.DateTimeFormat(localeMap[locale], {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

/**
 * Format date in short format (e.g., "Jan 2024")
 */
export const formatDateShort = (date: Date, locale: Locale = 'en'): string => {
  const localeMap: Record<Locale, string> = {
    en: 'en-US',
    fr: 'fr-CA',
  };

  return new Intl.DateTimeFormat(localeMap[locale], {
    year: 'numeric',
    month: 'short',
  }).format(date);
};

/**
 * Format date range with locale support
 */
export const formatDateRange = (from: Date, to: Date | undefined, locale: Locale = 'en'): string => {
  const localeMap: Record<Locale, string> = {
    en: 'en-US',
    fr: 'fr-CA',
  };

  const formatter = new Intl.DateTimeFormat(localeMap[locale], {
    year: 'numeric',
    month: 'short',
  });

  const present = locale === 'en' ? 'Present' : 'Présent';
  const fromFormatted = formatter.format(from);
  const toFormatted = to ? formatter.format(to) : present;

  return `${fromFormatted} - ${toFormatted}`;
};

/**
 * Calculate reading time in minutes
 */
export const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

/**
 * Get all blog posts for a specific locale
 */
export const getBlogPosts = async (locale: Locale) => {
  const posts = await getCollection('blog', (entry) => {
    return entry.data.locale === locale && !entry.data.draft;
  });

  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
};

/**
 * Get featured blog posts for a specific locale
 */
export const getFeaturedBlogPosts = async (locale: Locale, limit = 3) => {
  const posts = await getBlogPosts(locale);
  return posts.filter((post) => post.data.featured).slice(0, limit);
};

/**
 * Get all projects for a specific locale
 */
export const getProjects = async (locale: Locale) => {
  const projects = await getCollection('projects', (entry) => {
    return entry.data.locale === locale;
  });

  return projects.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
};

/**
 * Get featured projects for a specific locale
 */
export const getFeaturedProjects = async (locale: Locale, limit = 3) => {
  const projects = await getProjects(locale);
  return projects.filter((project) => project.data.featured).slice(0, limit);
};

/**
 * Get all experience entries for a specific locale
 */
export const getExperience = async (locale: Locale) => {
  const experiences = await getCollection('experience', (entry) => {
    return entry.data.locale === locale;
  });

  return experiences.sort((a, b) => {
    // Sort by order first, then by from date
    if (a.data.order !== b.data.order) {
      return a.data.order - b.data.order;
    }
    return b.data.from.getTime() - a.data.from.getTime();
  });
};

/**
 * Get current experience (where to is undefined or current is true)
 */
export const getCurrentExperience = async (locale: Locale) => {
  const experiences = await getExperience(locale);
  return experiences.filter((exp) => exp.data.current || !exp.data.to);
};

/**
 * Get all contributions for a specific locale
 */
export const getContributions = async (locale: Locale) => {
  const contributions = await getCollection('contributions', (entry) => {
    return entry.data.locale === locale;
  });

  return contributions.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
};

/**
 * Get translated content by translationKey
 */
export const getTranslatedContent = async <T extends 'blog' | 'projects' | 'experience' | 'contributions'>(
  collection: T,
  translationKey: string,
  targetLocale: Locale,
): Promise<CollectionEntry<T> | undefined> => {
  const entries = await getCollection(collection, (entry) => {
    return entry.data.translationKey === translationKey && entry.data.locale === targetLocale;
  });

  return entries[0] as CollectionEntry<T> | undefined;
};

/**
 * Get alternate locale URL for translated content
 */
export const getAlternateUrl = (
  currentLocale: Locale,
  _translationKey: string,
  contentType: 'blog' | 'projects' | 'experience' | 'contributions',
  slug: string,
): string => {
  const alternateLocale: Locale = currentLocale === 'en' ? 'fr' : 'en';

  const pathMap: Record<typeof contentType, Record<Locale, string>> = {
    blog: { en: 'blog', fr: 'blogue' },
    projects: { en: 'projects', fr: 'projets' },
    experience: { en: 'experience', fr: 'experience' },
    contributions: { en: 'contributions', fr: 'contributions' },
  };

  return `/${alternateLocale}/${pathMap[contentType][alternateLocale]}/${slug}`;
};

/**
 * Extract excerpt from content
 */
export const extractExcerpt = (content: string, maxLength = 160): string => {
  const plainText = content
    .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links but keep text
    .replace(/[#*_~`]/g, '') // Remove markdown formatting
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .trim();

  if (plainText.length <= maxLength) {
    return plainText;
  }

  const truncated = plainText.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');

  return lastSpace > 0 ? `${truncated.slice(0, lastSpace)}...` : `${truncated}...`;
};

/**
 * Group content by year
 */
export const groupByYear = <T extends { data: { date: Date } }>(items: T[]): Record<number, T[]> => {
  return items.reduce(
    (acc, item) => {
      const year = item.data.date.getFullYear();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(item);
      return acc;
    },
    {} as Record<number, T[]>,
  );
};

/**
 * Get unique tags from collection
 */
export const getUniqueTags = (items: Array<{ data: { tags?: string[] } }>): string[] => {
  const tags = new Set<string>();
  for (const item of items) {
    if (item.data.tags) {
      for (const tag of item.data.tags) {
        tags.add(tag);
      }
    }
  }
  return Array.from(tags).sort();
};

/**
 * Filter content by tag
 */
export const filterByTag = <T extends { data: { tags?: string[] } }>(items: T[], tag: string): T[] => {
  return items.filter((item) => item.data.tags?.includes(tag));
};

/**
 * Calculate years of experience from start date
 */
export const calculateYearsOfExperience = (startYear: number): number => {
  const currentYear = new Date().getFullYear();
  return currentYear - startYear;
};

/**
 * Format duration between two dates
 */
export const formatDuration = (from: Date, to: Date | undefined, locale: Locale = 'en'): string => {
  const MILLISECONDS_PER_SECOND = 1000;
  const SECONDS_PER_MINUTE = 60;
  const MINUTES_PER_HOUR = 60;
  const HOURS_PER_DAY = 24;
  const DAYS_PER_MONTH = 30;
  const MONTHS_PER_YEAR = 12;

  const end = to || new Date();
  const months = Math.floor(
    (end.getTime() - from.getTime()) /
      (MILLISECONDS_PER_SECOND * SECONDS_PER_MINUTE * MINUTES_PER_HOUR * HOURS_PER_DAY * DAYS_PER_MONTH),
  );
  const years = Math.floor(months / MONTHS_PER_YEAR);
  const remainingMonths = months % MONTHS_PER_YEAR;

  const translations = {
    en: {
      year: 'year',
      years: 'years',
      month: 'month',
      months: 'months',
    },
    fr: {
      year: 'an',
      years: 'ans',
      month: 'mois',
      months: 'mois',
    },
  };

  const t = translations[locale];

  if (years === 0) {
    return `${remainingMonths} ${remainingMonths === 1 ? t.month : t.months}`;
  }

  if (remainingMonths === 0) {
    return `${years} ${years === 1 ? t.year : t.years}`;
  }

  return `${years} ${years === 1 ? t.year : t.years} ${remainingMonths} ${remainingMonths === 1 ? t.month : t.months}`;
};

/**
 * Sort by date (newest first)
 */
export const sortByDateDesc = <T extends { data: { date: Date } }>(items: T[]): T[] => {
  return [...items].sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
};

/**
 * Sort by date (oldest first)
 */
export const sortByDateAsc = <T extends { data: { date: Date } }>(items: T[]): T[] => {
  return [...items].sort((a, b) => a.data.date.getTime() - b.data.date.getTime());
};

/**
 * Get related content by shared tags
 */
export const getRelatedContent = <T extends { data: { tags?: string[]; slug: string } }>(
  currentItem: T,
  allItems: T[],
  limit = 3,
): T[] => {
  const currentTags = new Set(currentItem.data.tags || []);

  if (currentTags.size === 0) {
    return [];
  }

  const scored = allItems
    .filter((item) => item.data.slug !== currentItem.data.slug)
    .map((item) => {
      const itemTags = new Set(item.data.tags || []);
      const sharedTags = [...currentTags].filter((tag) => itemTags.has(tag));
      return { item, score: sharedTags.length };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map(({ item }) => item);
};

/**
 * Paginate items
 */
export const paginate = <T>(
  items: T[],
  page: number,
  pageSize: number,
): {
  items: T[];
  totalPages: number;
  currentPage: number;
  hasNext: boolean;
  hasPrev: boolean;
} => {
  const totalPages = Math.ceil(items.length / pageSize);
  const currentPage = Math.max(1, Math.min(page, totalPages));
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  return {
    items: items.slice(startIndex, endIndex),
    totalPages,
    currentPage,
    hasNext: currentPage < totalPages,
    hasPrev: currentPage > 1,
  };
};
