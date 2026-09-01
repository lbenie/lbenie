import { describe, expect, it } from 'vitest';
import {
  DEFAULT_LOCALE,
  getAlternateLinks,
  getAlternateLocale,
  getLocaleFromPath,
  isValidLocale,
  switchLocale,
} from './i18n';

describe('i18n utilities', () => {
  it('should have correct default locale', () => {
    expect(DEFAULT_LOCALE).toBe('en');
  });

  it('should validate locales', () => {
    expect(isValidLocale('en')).toBe(true);
    expect(isValidLocale('fr')).toBe(true);
    expect(isValidLocale('es')).toBe(false);
  });

  it('should extract locale from path', () => {
    expect(getLocaleFromPath('/en/blog')).toBe('en');
    expect(getLocaleFromPath('/fr/blogue')).toBe('fr');
  });

  it('should switch locales', () => {
    expect(switchLocale('/en/blog', 'fr')).toBe('/fr/blogue');
    expect(switchLocale('/fr/blogue/article', 'en')).toBe('/en/blog/article');
  });

  it('should build alternate links from localized paths', () => {
    expect(getAlternateLinks('/fr/', 'https://lbenie.me')).toEqual([
      { hreflang: 'en', href: 'https://lbenie.me/en/' },
      { hreflang: 'fr', href: 'https://lbenie.me/fr/' },
      { hreflang: 'x-default', href: 'https://lbenie.me/en/' },
    ]);
  });

  it('should return alternate locale', () => {
    expect(getAlternateLocale('en')).toBe('fr');
    expect(getAlternateLocale('fr')).toBe('en');
  });
});
