import { vi } from 'vitest';

// Mock astro:content
vi.mock('astro:content', () => ({
  getCollection: vi.fn(() => Promise.resolve([])),
  CollectionEntry: {},
}));
