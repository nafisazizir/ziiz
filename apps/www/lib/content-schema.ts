import { pageSchema } from "fumadocs-core/source/schema"
import { z } from "zod"

export const contentFrontmatterSchema = pageSchema.extend({
  description: z.string(),
  date: z.iso.date().optional(),
})

export const blogFrontmatterSchema = pageSchema.extend({
  description: z.string(),
  date: z.iso.date(),
  author: z.string().default("Nafis Azizi Riza"),
})
