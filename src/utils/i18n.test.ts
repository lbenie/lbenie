import { describe, it, expect } from 'vitest';
import {
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  isValidLocale,
  getLocaleFromPath,
  switchLocale,
  getAlternateLocale,
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
    const result = switchLocale('/en/blog', 'fr');
    expect(result).toContain('/fr/');
  });

  it('should return alternate locale', () => {
    expect(getAlternateLocale('en')).toBe('fr');
    expect(getAlternateLocale('fr')).toBe('en');
  });
});
