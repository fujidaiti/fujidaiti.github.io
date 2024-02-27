// Import utilities from `astro:content`
import { defineCollection, z } from 'astro:content'

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    tags: z.array(z.string()),
  }),
})

const tipsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    tags: z.array(z.string()),
  }),
})

// Export a single `collections` object to register your collection(s)
export const collections = {
  blog: blogCollection,
  tips: tipsCollection,
}
