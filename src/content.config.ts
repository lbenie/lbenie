import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blogCollection = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/blog',
    generateId: ({ data }) => `${data.locale}-${data.slug}`,
  }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    locale: z.enum(['en', 'fr']),
    translationKey: z.string(),
    featured: z.boolean().default(false),
    coverImage: z.string().optional(),
    coverAlt: z.string().optional(),
  }),
});

const projectsCollection = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/projects',
    generateId: ({ data }) => `${data.locale}-${data.slug}`,
  }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    url: z.url().optional(),
    repository: z.url().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    status: z.enum(['active', 'completed', 'archived']).default('completed'),
    locale: z.enum(['en', 'fr']),
    translationKey: z.string(),
    coverImage: z.string().optional(),
    coverAlt: z.string().optional(),
  }),
});

const contributionsCollection = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/contributions',
    generateId: ({ data }) => `${data.locale}-${data.slug}`,
  }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    url: z.url(),
    repository: z.url().optional(),
    tags: z.array(z.string()).default([]),
    type: z.enum(['pr', 'issue', 'feature', 'documentation', 'other']).default('pr'),
    locale: z.enum(['en', 'fr']),
    translationKey: z.string(),
  }),
});

const experienceCollection = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/experience',
    generateId: ({ data }) => `${data.locale}-${data.slug}`,
  }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    company: z.string(),
    role: z.string(),
    location: z.string(),
    remote: z.boolean().default(false),
    from: z.coerce.date(),
    to: z.coerce.date().optional(),
    current: z.boolean().default(false),
    description: z.string(),
    stack: z.array(z.string()).default([]),
    highlights: z.array(z.string()).default([]),
    locale: z.enum(['en', 'fr']),
    translationKey: z.string(),
    companyUrl: z.url().optional(),
    order: z.number().default(0),
  }),
});

export const collections = {
  blog: blogCollection,
  projects: projectsCollection,
  contributions: contributionsCollection,
  experience: experienceCollection,
};
