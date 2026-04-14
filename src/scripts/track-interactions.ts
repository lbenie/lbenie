// Client-side Interaction Tracking with Microsoft Clarity
// This script tracks user interactions on the portfolio site
// All tracking events are automatically initialized on page load

import clarity from './clarity';
import { debug } from '@utils/logger';

/**
 * Constants
 */
const SCROLL_MILESTONES = [25, 50, 75, 100] as const;
const TIME_MILESTONES = [30, 60, 120, 180, 300] as const;
const TIME_CHECK_INTERVAL = 10_000; // 10 seconds

type Language = 'en' | 'fr';
type ScrollMilestone = typeof SCROLL_MILESTONES[number];
type TimeMilestone = typeof TIME_MILESTONES[number];

/**
 * Social media platform selectors
 */
const SOCIAL_SELECTORS = {
  github: 'a[href*="github.com"]',
  linkedin: 'a[href*="linkedin.com"]',
  twitter: 'a[href*="twitter.com"], a[href*="x.com"]',
  email: 'a[href^="mailto:"]',
} as const;

/**
 * Helper to check if we're in browser context
 */
const isBrowser = () => typeof window !== 'undefined';

/**
 * Detect current language from pathname
 */
const getCurrentLanguage = (): Language => {
  return window.location.pathname.includes('/fr/') ? 'fr' : 'en';
};

/**
 * Route mapping for page type detection
 * Add or modify routes here to automatically track page types
 */
const PAGE_TYPE_ROUTES = {
  home: ['/', '/en/', '/fr/'],
  resume: ['/resume'],
  blog: ['/blog', '/blogue', '/posts'],
  projects: ['/projects', '/projets'],
  experience: ['/experience'],
  contact: ['/contact'],
  contributions: ['/contributions'],
} as const;

type PageType = keyof typeof PAGE_TYPE_ROUTES | 'other';

/**
 * Determine page type from pathname
 */
const getPageType = (pathname: string): PageType => {
  const pageTypes = Object.keys(PAGE_TYPE_ROUTES) as ReadonlyArray<keyof typeof PAGE_TYPE_ROUTES>;

  // Check for exact matches first (home page)
  for (const pageType of pageTypes) {
    if (PAGE_TYPE_ROUTES[pageType].some(route => pathname === route)) {
      return pageType;
    }
  }

  // Check for includes matches
  for (const pageType of pageTypes) {
    if (PAGE_TYPE_ROUTES[pageType].some(route => pathname.includes(route))) {
      return pageType;
    }
  }

  return 'other';
};

/**
 * Track CV/Resume downloads
 */
export const trackCVDownload = (language: Language) => {
  if (!isBrowser()) return;

  clarity.event(`cv_download_${language}`);
  clarity.setTag('cv_language', language);
  clarity.upgrade('cv_downloaded');

  debug('Clarity', `Tracked CV download: ${language.toUpperCase()}`);
};

/**
 * Track resume/CV page print
 */
export const trackResumePrint = (language: Language) => {
  if (!isBrowser()) return;

  clarity.event('resume_printed');
  clarity.setTag('print_language', language);
  clarity.upgrade('resume_printed');

  debug('Clarity', `Tracked resume print: ${language}`);
};

/**
 * Track theme changes
 */
export const trackThemeChange = (theme: 'light' | 'dark' | 'system') => {
  if (!isBrowser()) return;

  clarity.event('theme_changed');
  clarity.setTag('theme_preference', theme);

  debug('Clarity', `Tracked theme change: ${theme}`);
};

/**
 * Track language switch
 */
export const trackLanguageSwitch = (newLanguage: Language) => {
  if (!isBrowser()) return;

  clarity.event('language_switched');
  clarity.setTag('user_language', newLanguage);

  debug('Clarity', `Tracked language switch: ${newLanguage}`);
};

/**
 * Track navigation clicks
 */
export const trackNavigation = (section: string) => {
  if (!isBrowser()) return;

  clarity.event('navigation_click');
  clarity.setTag('nav_section', section);

  debug('Clarity', `Tracked navigation: ${section}`);
};

/**
 * Track project card/link clicks
 */
export const trackProjectClick = (projectName: string, projectUrl?: string) => {
  if (!isBrowser()) return;

  clarity.event('project_clicked');
  clarity.setTag('project_name', projectName);
  if (projectUrl) {
    clarity.setTag('project_url', projectUrl);
  }

  debug('Clarity', `Tracked project click: ${projectName}`);
};

/**
 * Track social media clicks
 */
export const trackSocialClick = (platform: 'github' | 'linkedin' | 'twitter' | 'email' | 'other') => {
  if (!isBrowser()) return;

  clarity.event('social_click');
  clarity.setTag('social_platform', platform);

  debug('Clarity', `Tracked social click: ${platform}`);
};

/**
 * Track external link clicks
 */
export const trackExternalLink = (url: string, linkText?: string) => {
  if (!isBrowser()) return;

  clarity.event('external_link_clicked');
  clarity.setTag('external_link_url', url);
  if (linkText) {
    clarity.setTag('link_text', linkText);
  }

  debug('Clarity', `Tracked external link: ${url}`);
};

/**
 * Track scroll depth milestones
 */
export const trackScrollDepth = (depth: ScrollMilestone) => {
  if (!isBrowser()) return;

  clarity.event(`scrolled_${depth}_percent`);
  clarity.setTag('max_scroll_depth', depth.toString());

  debug('Clarity', `Tracked scroll depth: ${depth}%`);
};

/**
 * Track time spent on page
 */
export const trackTimeOnPage = (seconds: TimeMilestone) => {
  if (!isBrowser()) return;

  const minutes = Math.floor(seconds / 60);
  const label = minutes > 0 ? `${minutes}_minute${minutes > 1 ? 's' : ''}` : `${seconds}_seconds`;

  clarity.event(`engaged_${label}`);
  clarity.setTag('engagement_time', seconds.toString());

  debug('Clarity', `Tracked time on page: ${seconds}s`);
};

/**
 * Track blog post/article reads
 */
export const trackArticleRead = (title: string, readTime?: number) => {
  if (!isBrowser()) return;

  clarity.event('article_read');
  clarity.setTag('article_title', title);
  if (readTime) {
    clarity.setTag('read_time_seconds', readTime.toString());
  }

  debug('Clarity', `Tracked article read: ${title}`);
};

/**
 * Track contact attempts (e.g., email clicks)
 */
export const trackContactAttempt = (method: 'email' | 'form' | 'social') => {
  if (!isBrowser()) return;

  clarity.event('contact_attempted');
  clarity.setTag('contact_method', method);
  clarity.upgrade('contact_attempted'); // Prioritize sessions with contact attempts

  debug('Clarity', `Tracked contact attempt: ${method}`);
};

/**
 * Track search usage (if you add search later)
 */
export const trackSearch = (query: string, resultsCount: number) => {
  if (!isBrowser()) return;

  clarity.event('search_performed');
  clarity.setTag('search_query', query);
  clarity.setTag('results_count', resultsCount.toString());

  debug('Clarity', `Tracked search: "${query}" (${resultsCount} results)`);
};

/**
 * Track filter usage (e.g., filtering projects by tech stack)
 */
export const trackFilter = (filterType: string, filterValue: string) => {
  if (!isBrowser()) return;

  clarity.event('filter_applied');
  clarity.setTag('filter_type', filterType);
  clarity.setTag('filter_value', filterValue);

  debug('Clarity', `Tracked filter: ${filterType} = ${filterValue}`);
};

/**
 * Track video/media interactions
 */
export const trackMediaInteraction = (action: 'play' | 'pause' | 'complete', mediaTitle: string) => {
  if (!isBrowser()) return;

  clarity.event(`media_${action}`);
  clarity.setTag('media_title', mediaTitle);

  debug('Clarity', `Tracked media ${action}: ${mediaTitle}`);
};

/**
 * Track accordion/expandable section interactions
 */
export const trackExpandSection = (sectionName: string) => {
  if (!isBrowser()) return;

  clarity.event('section_expanded');
  clarity.setTag('section_name', sectionName);

  debug('Clarity', `Tracked section expand: ${sectionName}`);
};

/**
 * Track copy-to-clipboard actions
 */
export const trackCopyToClipboard = (contentType: string) => {
  if (!isBrowser()) return;

  clarity.event('copied_to_clipboard');
  clarity.setTag('content_type', contentType);

  debug('Clarity', `Tracked copy to clipboard: ${contentType}`);
};

/**
 * Track 404 errors
 */
export const track404Error = (attemptedUrl: string) => {
  if (!isBrowser()) return;

  clarity.event('page_not_found');
  clarity.setTag('attempted_url', attemptedUrl);

  debug('Clarity', `Tracked 404: ${attemptedUrl}`);
};

/**
 * Track high engagement sessions
 * Call this when user performs multiple actions indicating high interest
 */
export const trackHighEngagement = (reason: string) => {
  if (!isBrowser()) return;

  clarity.upgrade(`high_engagement_${reason}`);
  clarity.setTag('engagement_level', 'high');

  debug('Clarity', `Tracked high engagement: ${reason}`);
};

/**
 * Initialize scroll depth tracking
 */
const initScrollTracking = () => {
  const trackedMilestones = new Set<ScrollMilestone>();

  const handleScroll = () => {
    const scrollPercent = Math.round(
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    );

    for (const milestone of SCROLL_MILESTONES) {
      if (scrollPercent >= milestone && !trackedMilestones.has(milestone)) {
        trackedMilestones.add(milestone);
        trackScrollDepth(milestone);
      }
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
};

/**
 * Initialize time on page tracking
 */
const initTimeTracking = () => {
  const trackedMilestones = new Set<TimeMilestone>();
  const startTime = Date.now();

  const checkTime = () => {
    const secondsOnPage = Math.floor((Date.now() - startTime) / 1000);

    for (const milestone of TIME_MILESTONES) {
      if (secondsOnPage >= milestone && !trackedMilestones.has(milestone)) {
        trackedMilestones.add(milestone);
        trackTimeOnPage(milestone);
      }
    }
  };

  setInterval(checkTime, TIME_CHECK_INTERVAL);
};

/**
 * Auto-initialize tracking on page load
 * Automatically sets up event listeners for common interactions
 */
export const initializeTracking = () => {
  if (!isBrowser()) return;

  // Track CV download buttons
  document.querySelectorAll('a[download][href*="/cv/"]').forEach((link) => {
    link.addEventListener('click', () => {
      const href = link.getAttribute('href') || '';
      const language = href.includes('EN') ? 'en' : 'fr';
      trackCVDownload(language);
    });
  });

  // Track print button on resume pages
  const printBtn = document.getElementById('printBtn');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      trackResumePrint(getCurrentLanguage());
    });
  }

  // Track theme toggle if it exists
  const themeToggle = document.querySelector('[data-theme-toggle]');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'system';
      trackThemeChange(currentTheme as 'light' | 'dark' | 'system');
    });
  }

  // Track language switcher
  document.querySelectorAll('a[href*="/en/"], a[href*="/fr/"]').forEach((link) => {
    const href = link.getAttribute('href') || '';
    if (href.includes('/fr/') || href.includes('/en/')) {
      link.addEventListener('click', () => {
        const newLang: Language = href.includes('/fr/') ? 'fr' : 'en';
        const currentLang = getCurrentLanguage();
        if (newLang !== currentLang) {
          trackLanguageSwitch(newLang);
        }
      });
    }
  });

  // Track social media links
  Object.entries(SOCIAL_SELECTORS).forEach(([platform, selector]) => {
    document.querySelectorAll(selector).forEach((link) => {
      link.addEventListener('click', () => {
        trackSocialClick(platform as keyof typeof SOCIAL_SELECTORS);
        if (platform === 'email') {
          trackContactAttempt('email');
        }
      });
    });
  });

  // Track external links
  document.querySelectorAll('a[href^="http"]').forEach((link) => {
    const href = link.getAttribute('href') || '';
    const isExternal = !href.includes(window.location.hostname);
    if (isExternal) {
      link.addEventListener('click', () => {
        const linkText = link.textContent?.trim() || '';
        trackExternalLink(href, linkText);
      });
    }
  });

  // Track navigation links
  document.querySelectorAll('nav a, header a').forEach((link) => {
    link.addEventListener('click', () => {
      const text = link.textContent?.trim() || '';
      if (text) {
        trackNavigation(text);
      }
    });
  });

  // Initialize scroll tracking
  initScrollTracking();

  // Initialize time tracking
  initTimeTracking();

  // Tag the current page language
  clarity.setTag('page_language', getCurrentLanguage());

  // Track page type
  clarity.setTag('page_type', getPageType(window.location.pathname));

  debug('Clarity', 'Interaction tracking initialized');
};

// Auto-initialize when DOM is ready
if (isBrowser()) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeTracking);
  } else {
    initializeTracking();
  }
}
