import { describe, it, expect } from 'vitest';
import {
  SITE_CONFIG,
  buildPageTitle,
  buildCanonicalURL,
  generateOpenGraphMeta,
  generateTwitterCardMeta,
  sanitizeDescription,
  validateMeta,
} from './seo';

describe('SEO utilities', () => {
  it('should have site config', () => {
    expect(SITE_CONFIG.name).toBe('Lucien Bénié');
    expect(SITE_CONFIG.url).toBe('https://lbenie.me');
  });

  it('should build page title', () => {
    expect(buildPageTitle('About')).toContain('About');
    expect(buildPageTitle('About')).toContain('|');
  });

  it('should build canonical URL', () => {
    const url = buildCanonicalURL('/blog');
    expect(url).toBe('https://lbenie.me/blog');
  });

  it('should generate Open Graph meta', () => {
    const meta = generateOpenGraphMeta({ title: 'Test', description: 'Desc', locale: 'en' });
    expect(meta.title).toBe('Test');
    expect(meta.locale).toBe('en_US');
  });

  it('should generate Twitter Card meta', () => {
    const meta = generateTwitterCardMeta({ title: 'Test', description: 'Desc', locale: 'en' });
    expect(meta.title).toBe('Test');
    expect(meta.card).toBe('summary');
  });

  it('should sanitize description', () => {
    const long = 'a'.repeat(200);
    const result = sanitizeDescription(long, 100);
    expect(result.length).toBeLessThanOrEqual(103);
  });

  it('should validate meta', () => {
    const valid = validateMeta({ title: 'Test', description: 'Desc', locale: 'en' });
    expect(valid.valid).toBe(true);

    const invalid = validateMeta({ title: '', description: '', locale: 'en' });
    expect(invalid.valid).toBe(false);
  });
});
