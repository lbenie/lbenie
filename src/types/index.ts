/**
 * Type definitions for the bilingual Astro website
 */

/**
 * Supported locales
 */
export type Locale = 'en' | 'fr';

/**
 * Navigation item structure
 */
export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

/**
 * SEO metadata
 */
export interface SEOMeta {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  imageAlt?: string;
  canonicalURL?: string;
  locale?: Locale;
  author?: string;
  type?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
}

/**
 * Open Graph metadata
 */
export interface OpenGraphMeta {
  title: string;
  description: string;
  type: 'website' | 'article' | 'profile';
  url?: string;
  image?: string;
  imageAlt?: string;
  locale: string;
  siteName?: string;
}

/**
 * Twitter Card metadata
 */
export interface TwitterCardMeta {
  card: 'summary' | 'summary_large_image' | 'app' | 'player';
  site?: string;
  creator?: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
}

/**
 * Language switcher props
 */
export interface LanguageSwitcherProps {
  currentLocale: Locale;
  currentPath?: string;
  variant?: 'default' | 'compact';
}

/**
 * Base layout props
 */
export interface BaseLayoutProps {
  meta: SEOMeta;
  locale?: Locale;
  class?: string;
}

/**
 * Header props
 */
export interface HeaderProps {
  locale?: Locale;
  currentPath?: string;
}

/**
 * Footer props
 */
export interface FooterProps {
  locale?: Locale;
}

/**
 * Skip link props
 */
export interface SkipLinkProps {
  targetId?: string;
  label?: string;
}

/**
 * Locale route mapping
 */
export interface LocaleRoutes {
  [key: string]: {
    en: string;
    fr: string;
  };
}

/**
 * Translation namespace
 */
export type TranslationNamespace = 'common' | 'navigation' | 'home' | 'blog' | 'projects' | 'experience';

/**
 * Site configuration
 */
export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  author: string;
  defaultLocale: Locale;
  locales: Locale[];
  url: string;
  socialLinks?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
    email?: string;
  };
}

/**
 * Breadcrumb item
 */
export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

/**
 * Pagination info
 */
export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  hasNext: boolean;
  hasPrev: boolean;
}

/**
 * Blog post frontmatter
 */
export interface BlogPostFrontmatter {
  title: string;
  description: string;
  publishDate: Date;
  updatedDate?: Date;
  author?: string;
  tags?: string[];
  image?: string;
  imageAlt?: string;
  draft?: boolean;
  lang?: Locale;
}

/**
 * Project frontmatter
 */
export interface ProjectFrontmatter {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  tags?: string[];
  url?: string;
  github?: string;
  featured?: boolean;
  startDate?: Date;
  endDate?: Date;
  status?: 'active' | 'completed' | 'archived';
  lang?: Locale;
}

/**
 * Experience item
 */
export interface ExperienceItem {
  title: string;
  company: string;
  location?: string;
  startDate: Date;
  endDate?: Date;
  current?: boolean;
  description: string;
  highlights?: string[];
  technologies?: string[];
  url?: string;
}
