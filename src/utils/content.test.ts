/**
 * Tests for content utility functions
 */

import { describe, expect, it } from 'vitest';
import {
  calculateYearsOfExperience,
  extractExcerpt,
  filterByTag,
  formatDate,
  formatDateRange,
  formatDateShort,
  formatDuration,
  getRelatedContent,
  getUniqueTags,
  groupByYear,
  paginate,
  sortByDateAsc,
  sortByDateDesc,
} from './content';

describe('formatDate', () => {
  const testDate = new Date(Date.UTC(2024, 0, 15)); // January 15, 2024 UTC

  it('should format date in English locale', () => {
    const result = formatDate(testDate, 'en');
    // May vary by timezone, so just check it contains the expected parts
    expect(result).toContain('2024');
    expect(result).toMatch(/January|December/);
  });

  it('should format date in French locale', () => {
    const result = formatDate(testDate, 'fr');
    expect(result).toContain('2024');
    expect(result).toMatch(/janvier|décembre/);
  });

  it('should default to English when no locale is provided', () => {
    const result = formatDate(testDate);
    expect(result).toContain('2024');
  });
});

describe('formatDateShort', () => {
  const testDate = new Date(Date.UTC(2024, 0, 15));

  it('should format date in short English format', () => {
    const result = formatDateShort(testDate, 'en');
    expect(result).toBe('Jan 2024');
  });

  it('should format date in short French format', () => {
    const result = formatDateShort(testDate, 'fr');
    expect(result).toBe('janv. 2024');
  });

  it('should default to English when no locale is provided', () => {
    const result = formatDateShort(testDate);
    expect(result).toBe('Jan 2024');
  });
});

describe('formatDateRange', () => {
  const fromDate = new Date(Date.UTC(2022, 0, 15)); // Mid-month to avoid timezone issues
  const toDate = new Date(Date.UTC(2024, 0, 15));

  it('should format date range in English', () => {
    const result = formatDateRange(fromDate, toDate, 'en');
    expect(result).toContain('2022');
    expect(result).toContain('2024');
    expect(result).toContain('-');
  });

  it('should format date range in French', () => {
    const result = formatDateRange(fromDate, toDate, 'fr');
    expect(result).toContain('2022');
    expect(result).toContain('2024');
    expect(result).toContain('-');
  });

  it('should show "Present" when to date is undefined (English)', () => {
    const result = formatDateRange(fromDate, undefined, 'en');
    expect(result).toContain('2022');
    expect(result).toContain('Present');
  });

  it('should show "Présent" when to date is undefined (French)', () => {
    const result = formatDateRange(fromDate, undefined, 'fr');
    expect(result).toContain('2022');
    expect(result).toContain('Présent');
  });

  it('should default to English when no locale is provided', () => {
    const result = formatDateRange(fromDate, toDate);
    expect(result).toContain('2022');
    expect(result).toContain('2024');
  });
});



describe('formatDuration', () => {
  it('should format duration less than a year in months (English)', () => {
    const from = new Date('2024-01-01');
    const to = new Date('2024-06-01');
    const result = formatDuration(from, to, 'en');
    expect(result).toBe('5 months');
  });

  it('should format duration less than a year in months (French)', () => {
    const from = new Date('2024-01-01');
    const to = new Date('2024-06-01');
    const result = formatDuration(from, to, 'fr');
    expect(result).toBe('5 mois');
  });

  it('should format single month (English)', () => {
    const from = new Date('2024-01-01');
    const to = new Date('2024-01-15');
    const result = formatDuration(from, to, 'en');
    expect(result).toBe('0 months');
  });

  it('should format duration in years (English)', () => {
    const from = new Date('2022-01-01');
    const to = new Date('2024-01-01');
    const result = formatDuration(from, to, 'en');
    expect(result).toBe('2 years');
  });

  it('should format duration in years (French)', () => {
    const from = new Date('2022-01-01');
    const to = new Date('2024-01-01');
    const result = formatDuration(from, to, 'fr');
    expect(result).toBe('2 ans');
  });

  it('should format single year (English)', () => {
    const from = new Date('2023-01-01');
    const to = new Date('2024-01-01');
    const result = formatDuration(from, to, 'en');
    expect(result).toBe('1 year');
  });

  it('should format single year (French)', () => {
    const from = new Date('2023-01-01');
    const to = new Date('2024-01-01');
    const result = formatDuration(from, to, 'fr');
    expect(result).toBe('1 an');
  });

  it('should format years and months (English)', () => {
    const from = new Date('2022-01-01');
    const to = new Date('2024-06-01');
    const result = formatDuration(from, to, 'en');
    expect(result).toBe('2 years 5 months');
  });

  it('should format years and months (French)', () => {
    const from = new Date('2022-01-01');
    const to = new Date('2024-06-01');
    const result = formatDuration(from, to, 'fr');
    expect(result).toBe('2 ans 5 mois');
  });

  it('should use current date when to is undefined', () => {
    const from = new Date('2024-01-01');
    const result = formatDuration(from, undefined, 'en');
    expect(result).toMatch(/\d+ (month|months|year|years)/);
  });

  it('should default to English when no locale is provided', () => {
    const from = new Date('2022-01-01');
    const to = new Date('2024-01-01');
    const result = formatDuration(from, to);
    expect(result).toBe('2 years');
  });
});

describe('extractExcerpt', () => {
  it('should extract plain text from markdown', () => {
    const content = '# Heading\n\nThis is some content with **bold** and *italic* text.';
    const result = extractExcerpt(content);
    expect(result).toBe('Heading This is some content with bold and italic text.');
  });

  it('should remove markdown images', () => {
    const content = 'Text before ![Alt text](image.jpg) text after.';
    const result = extractExcerpt(content);
    expect(result).toBe('Text before  text after.');
  });

  it('should remove markdown links but keep text', () => {
    const content = 'Check out [this link](https://example.com) for more info.';
    const result = extractExcerpt(content);
    expect(result).toBe('Check out this link for more info.');
  });

  it('should truncate long content', () => {
    const longContent = 'a'.repeat(200);
    const result = extractExcerpt(longContent, 100);
    expect(result).toHaveLength(103); // 100 + '...'
    expect(result.endsWith('...')).toBe(true);
  });

  it('should truncate at word boundary', () => {
    const content = 'This is a very long sentence that needs to be truncated at a word boundary.';
    const result = extractExcerpt(content, 30);
    expect(result).toBe('This is a very long sentence...');
  });

  it('should not truncate if content is shorter than maxLength', () => {
    const content = 'Short content.';
    const result = extractExcerpt(content, 100);
    expect(result).toBe('Short content.');
  });

  it('should replace newlines with spaces', () => {
    const content = 'Line 1\nLine 2\n\nLine 3';
    const result = extractExcerpt(content);
    expect(result).toBe('Line 1 Line 2 Line 3');
  });

  it('should use default maxLength of 160', () => {
    const content = 'a'.repeat(200);
    const result = extractExcerpt(content);
    expect(result.length).toBeLessThanOrEqual(164); // 160 + '...'
  });
});

describe('groupByYear', () => {
  it('should group items by year', () => {
    const items = [
      { data: { date: new Date(Date.UTC(2024, 6, 15)) } },
      { data: { date: new Date(Date.UTC(2024, 8, 15)) } },
      { data: { date: new Date(Date.UTC(2023, 6, 15)) } },
      { data: { date: new Date(Date.UTC(2022, 6, 15)) } },
    ];

    const result = groupByYear(items);

    expect(result[2024]).toHaveLength(2);
    expect(result[2023]).toHaveLength(1);
    expect(result[2022]).toHaveLength(1);
  });

  it('should handle empty array', () => {
    const result = groupByYear([]);
    expect(result).toEqual({});
  });

  it('should handle single item', () => {
    const items = [{ data: { date: new Date(Date.UTC(2024, 6, 15)) } }];
    const result = groupByYear(items);
    expect(result[2024]).toHaveLength(1);
  });
});

describe('getUniqueTags', () => {
  it('should return unique tags sorted alphabetically', () => {
    const items = [
      { data: { tags: ['typescript', 'react'] } },
      { data: { tags: ['javascript', 'typescript'] } },
      { data: { tags: ['react', 'astro'] } },
    ];

    const result = getUniqueTags(items);
    expect(result).toEqual(['astro', 'javascript', 'react', 'typescript']);
  });

  it('should handle items without tags', () => {
    const items = [{ data: { tags: ['typescript'] } }, { data: {} }, { data: { tags: ['react'] } }];

    const result = getUniqueTags(items);
    expect(result).toEqual(['react', 'typescript']);
  });

  it('should handle empty array', () => {
    const result = getUniqueTags([]);
    expect(result).toEqual([]);
  });

  it('should handle items with empty tags array', () => {
    const items = [{ data: { tags: [] } }, { data: { tags: ['typescript'] } }];

    const result = getUniqueTags(items);
    expect(result).toEqual(['typescript']);
  });
});

describe('filterByTag', () => {
  const items = [
    { data: { tags: ['typescript', 'react'] } },
    { data: { tags: ['javascript', 'typescript'] } },
    { data: { tags: ['react', 'astro'] } },
    { data: {} },
  ];

  it('should filter items by tag', () => {
    const result = filterByTag(items, 'typescript');
    expect(result).toHaveLength(2);
  });

  it('should return empty array when no matches', () => {
    const result = filterByTag(items, 'vue');
    expect(result).toEqual([]);
  });

  it('should handle items without tags', () => {
    const result = filterByTag(items, 'react');
    expect(result).toHaveLength(2);
  });

  it('should return empty array for empty input', () => {
    const result = filterByTag([], 'typescript');
    expect(result).toEqual([]);
  });
});

describe('calculateYearsOfExperience', () => {
  it('should calculate years of experience correctly', () => {
    const currentYear = new Date().getFullYear();
    const result = calculateYearsOfExperience(currentYear - 5);
    expect(result).toBe(5);
  });

  it('should return 0 for current year', () => {
    const currentYear = new Date().getFullYear();
    const result = calculateYearsOfExperience(currentYear);
    expect(result).toBe(0);
  });

  it('should handle past years correctly', () => {
    const currentYear = new Date().getFullYear();
    const result = calculateYearsOfExperience(2010);
    expect(result).toBe(currentYear - 2010);
  });
});

describe('sortByDateDesc', () => {
  it('should sort items by date descending (newest first)', () => {
    const items = [
      { data: { date: new Date(Date.UTC(2023, 6, 15)) } },
      { data: { date: new Date(Date.UTC(2024, 6, 15)) } },
      { data: { date: new Date(Date.UTC(2022, 6, 15)) } },
    ];

    const result = sortByDateDesc(items);

    expect(result[0]!.data.date.getFullYear()).toBe(2024);
    expect(result[1]!.data.date.getFullYear()).toBe(2023);
    expect(result[2]!.data.date.getFullYear()).toBe(2022);
  });

  it('should not mutate original array', () => {
    const items = [
      { data: { date: new Date(Date.UTC(2023, 6, 15)) } },
      { data: { date: new Date(Date.UTC(2024, 6, 15)) } },
    ];

    const original = [...items];
    sortByDateDesc(items);

    expect(items).toEqual(original);
  });

  it('should handle empty array', () => {
    const result = sortByDateDesc([]);
    expect(result).toEqual([]);
  });
});

describe('sortByDateAsc', () => {
  it('should sort items by date ascending (oldest first)', () => {
    const items = [
      { data: { date: new Date(Date.UTC(2023, 6, 15)) } },
      { data: { date: new Date(Date.UTC(2024, 6, 15)) } },
      { data: { date: new Date(Date.UTC(2022, 6, 15)) } },
    ];

    const result = sortByDateAsc(items);

    expect(result[0]!.data.date.getFullYear()).toBe(2022);
    expect(result[1]!.data.date.getFullYear()).toBe(2023);
    expect(result[2]!.data.date.getFullYear()).toBe(2024);
  });

  it('should not mutate original array', () => {
    const items = [
      { data: { date: new Date(Date.UTC(2023, 6, 15)) } },
      { data: { date: new Date(Date.UTC(2024, 6, 15)) } },
    ];

    const original = [...items];
    sortByDateAsc(items);

    expect(items).toEqual(original);
  });

  it('should handle empty array', () => {
    const result = sortByDateAsc([]);
    expect(result).toEqual([]);
  });
});

describe('getRelatedContent', () => {
  const items = [
    { data: { slug: 'post-1', tags: ['typescript', 'react', 'testing'] } },
    { data: { slug: 'post-2', tags: ['typescript', 'react'] } },
    { data: { slug: 'post-3', tags: ['javascript', 'node'] } },
    { data: { slug: 'post-4', tags: ['typescript', 'astro'] } },
    { data: { slug: 'post-5', tags: ['react', 'testing'] } },
  ];

  it('should return related content based on shared tags', () => {
    const currentItem = items[0]!; // has typescript, react, testing
    const result = getRelatedContent(currentItem, items);

    expect(result).toHaveLength(3);
    // Should exclude current item
    expect(result.find((item) => item.data.slug === 'post-1')).toBeUndefined();
  });

  it('should sort by number of shared tags', () => {
    const currentItem = items[0]!; // has typescript, react, testing
    const result = getRelatedContent(currentItem, items, 5);

    // post-2 has 2 shared tags (typescript, react)
    // post-5 has 2 shared tags (react, testing)
    // post-4 has 1 shared tag (typescript)
    expect(result[0]!.data.slug).toMatch(/post-2|post-5/);
  });

  it('should respect limit parameter', () => {
    const currentItem = items[0]!;
    const result = getRelatedContent(currentItem, items, 2);

    expect(result).toHaveLength(2);
  });

  it('should return empty array when no shared tags', () => {
    const currentItem = { data: { slug: 'test', tags: ['vue', 'nuxt'] } };
    const result = getRelatedContent(currentItem, items);

    expect(result).toEqual([]);
  });

  it('should return empty array when current item has no tags', () => {
    const currentItem = { data: { slug: 'test', tags: [] } };
    const result = getRelatedContent(currentItem, items);

    expect(result).toEqual([]);
  });

  it('should default to limit of 3', () => {
    const currentItem = items[0]!;
    const result = getRelatedContent(currentItem, items);

    expect(result.length).toBeLessThanOrEqual(3);
  });
});

describe('paginate', () => {
  const items = Array.from({ length: 25 }, (_, i) => ({ id: i + 1 }));

  it('should paginate items correctly', () => {
    const result = paginate(items, 1, 10);

    expect(result.items).toHaveLength(10);
    expect(result.items[0]!.id).toBe(1);
    expect(result.totalPages).toBe(3);
    expect(result.currentPage).toBe(1);
    expect(result.hasNext).toBe(true);
    expect(result.hasPrev).toBe(false);
  });

  it('should handle middle page', () => {
    const result = paginate(items, 2, 10);

    expect(result.items).toHaveLength(10);
    expect(result.items[0]!.id).toBe(11);
    expect(result.currentPage).toBe(2);
    expect(result.hasNext).toBe(true);
    expect(result.hasPrev).toBe(true);
  });

  it('should handle last page', () => {
    const result = paginate(items, 3, 10);

    expect(result.items).toHaveLength(5);
    expect(result.items[0]!.id).toBe(21);
    expect(result.currentPage).toBe(3);
    expect(result.hasNext).toBe(false);
    expect(result.hasPrev).toBe(true);
  });

  it('should handle page number less than 1', () => {
    const result = paginate(items, 0, 10);

    expect(result.currentPage).toBe(1);
    expect(result.items[0]!.id).toBe(1);
  });

  it('should handle page number greater than total pages', () => {
    const result = paginate(items, 10, 10);

    expect(result.currentPage).toBe(3);
    expect(result.items).toHaveLength(5);
  });

  it('should handle empty array', () => {
    const result = paginate([], 1, 10);

    expect(result.items).toEqual([]);
    expect(result.totalPages).toBe(0);
    expect(result.hasNext).toBe(false);
    expect(result.hasPrev).toBe(false);
  });

  it('should handle pageSize larger than items length', () => {
    const result = paginate(items, 1, 100);

    expect(result.items).toHaveLength(25);
    expect(result.totalPages).toBe(1);
    expect(result.hasNext).toBe(false);
    expect(result.hasPrev).toBe(false);
  });
});
