import { defineCollection, z } from 'astro:content'

const brags = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
    tags: z.array(z.string()).default([]),
    link: z.string().url().optional(),
  }),
})

const work = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    role: z.string(),
    period: z.string(),
    summary: z.string(),
    order: z.number().default(0),
  }),
})

export const collections = { brags, work }
